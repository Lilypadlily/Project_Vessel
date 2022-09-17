const tableStore = require("azure-storage");

//2. read config variable
const configVar = require("./configVariable");

//3. read access keys
const authStore = require("./keys");
const authObject = new authStore();
const tableClient = tableStore.createTableService(
    authObject.accountName,
    authObject.accessKey
  );

////////////////////////
//GENERAL FUNCTION//////
////////////////////////
function CreateTableIfNotExists(AzureTableName){
  return new Promise(resolve => {
      tableClient.createTableIfNotExists(AzureTableName, (error, result) => {
        if (error) {
          // context.log(`[CreateTableIfNotExists] Log : Error Occured in table creation ${error.message}`);
          resolve(`ERROR`);
        } else {
          // context.log( `[CreateTableIfNotExists] Log : Result Table create success ${result.TableName} \n\n ${result.created}`);
          resolve(result.TableName);
        }
      });
  });
}

function QueryDataByPartitionKeyAndRowKey(tableName, partitionKey, rowKey){
  return new Promise(resolve => {
      tableClient.retrieveEntity(tableName, partitionKey, rowKey, (error, result, resp) => {
          if (error) {
            resolve(error.message);
          } else {
            // // context.log(`[QueryDataByPartitionKeyAndRowKey] LOG result: ${JSON.stringify(result)} `);
            resolve(resp.body);
          }
        }
      );
  });
} 

function QueryDataByPartitionKey(tableName, partitionKey){
  return new Promise(resolve => {
    var query = new tableStore.TableQuery().where("PartitionKey eq ?",partitionKey);
    tableClient.queryEntities(tableName, query, null, (error, result, resp) => {
      if (error) {
        // response.send(`Error Occured in table creation ${error.message}`);
        resolve({ statusCode: 400, data: error.message });
      } else {
        resolve({ statusCode: 200, data: resp.body.value });
      }
    });
  });
}


function GetTableItemsNumber(tableName){
  return new Promise(resolve => {
    var query = new tableStore.TableQuery(); 
    tableClient.queryEntities(tableName, query, null, (error, result, resp) => {
      if (error) {
        // response.send(`Error Occured in table creation ${error.message}`);
        resolve({ statusCode: 400,totalItems:0 });
      } else {
        resolve({ statusCode: 200, totalItems:resp.body.value.length});
      }
    });
  });
}

//Get Customer Table name from Table Master by datetime
function GetTableName( category, datetime){
  return new Promise(async(resolve) => {
    let tableName = '';
    try {
      datetime = (datetime)?datetime : new Date();
      tableName = configVar.configTable[category]
      if (category == "customerDuration") {
        let yearName = datetime.getFullYear();
        if (datetime.getMonth() < 10) {
          yearName += "0" + String(datetime.getMonth() + 1);
        } else {
          yearName += String(datetime.getMonth() + 1);
        }
        tableName +=yearName;
      }
    }catch(err){
    }
    let checkTable = await CreateTableIfNotExists(tableName);
    resolve(tableName)
  });
}

//Get Customer Table name of customer history by datetime
function GetCustomerDurationTable(datetime){
  return new Promise(async(resolve) => {
    // let datetime = new Date(2022,1);

    let tableCategory = `customerDuration`;
    let customerDurationTable = await  GetTableName(tableCategory,datetime);
    checkTable = await  CreateTableIfNotExists(customerDurationTable);
    // // context.log(`[GetCustomerDurationTable] LOG : ${customerDurationTable} `);
    resolve(customerDurationTable)
  });
}
/////////////////////////////////////////////

function GetDeviceLocationByDeviceId(deviceId){
  return new Promise(async(resolve) => {
    try {
      let queryLocation = await QueryDataByPartitionKeyAndRowKey(configVar.configTable['deviceManagement'], deviceId,'assignment');//
      // let locId = queryLocation.LocationID;
      resolve(queryLocation);
    }catch(error){
      resolve(null);
    }
  });

}

function QueryDataByDate(tableName, year, month, date){
  return new Promise(resolve => {
      let startTime, endTime;
      if (date>0){
        startTime= new Date(year,month,date).toISOString();
        endTime= new Date(year,month,date+1).toISOString();
      } else {
        startTime= new Date(year,month,1).toISOString();
        endTime= new Date(year,month+1,1).toISOString();
      }
     
      let filter = "datetime ge datetime'"+startTime+"' and datetime le datetime'"+endTime+"' ";
      // context.log('QueryData'+ filter);
      var query = new tableStore.TableQuery().where(filter);//("datetime eq ?", 600); .top(5)
      tableClient.queryEntities(tableName, query, null, function (error, result, resp) {
          if (error) {
            // query was unsuccessful
            // context.log(`Error Occured while retrieving data ${error.message}`);
            resolve(error.message);
          } else {
            // query was successful
          //   // context.log(`Success retrieving data ${JSON.stringify(resp.body.value)}`);
            resolve(resp.body.value);
          }
      });
  });
  
}

function QueryDataFromTable(tableName, filter){
  filter = (filter)?filter : '';
  return new Promise(resolve => {
    // filter = "datetime ge datetime'"+startTime+"' and datetime le datetime'"+endTime+"' ";
    // context.log(`[QueryDataFromTable] from ${tableName} - filter : ${filter}`);
    var query = new tableStore.TableQuery().where(filter);//("datetime eq ?", 600); .top(5)
    tableClient.queryEntities(tableName, query, null, function (error, result, resp) {
        if (error) {
          // query was unsuccessful
          // context.log(`[QueryDataFromTable] Error Occured while retrieving data ${error.message}`);
          resolve(error.message);
        } else {
          // query was successful
          // context.log(`[QueryDataFromTable] Success retrieving data ${JSON.stringify(resp.body.value)}`);
          resolve(resp.body.value);
        }
    });
  });

}

function GetCurrentDashBoardDataByUsername(username) {
  return new Promise(async (resolve) => {
    let result = {
      todayCustomer: 0,
      weeklyCustomer: 0,
      connectedDevice: 0,
      totalDevice: 0,
    };
    let filter = "";
    // filter = "datetime ge datetime'"+startTime+"' and datetime le datetime'"+endTime+"' ";
    // context.log(`[QueryDataFromTable] from ${tableName} - filter : ${filter}`);
    let endTime = new Date().setHours(0, 0, 0, 0);
    let startTime = new Date(); //cari hari pertama weekly
    let filterSummary =
      "datetime ge datetime'" +
      startTime +
      "' and datetime le datetime'" +
      endTime +
      "' ";

    let customerSummary = await QueryDataFromTable(
      configVar.configTable["customerSummary"],
      filterSummary,
      context
    );
  });
}

function InsertDeviceConditionData(tableName, data) {
  tableClient.retrieveEntity(
    tableName,
    data.PartitionKey,
    data.RowKey,
    (error, result, resp) => {
      if (error) {
        tableClient.insertEntity(
          tableName,
          data,
          (errorInsert, resultInsert) => {
            if (errorInsert) {
              // context.log(`[InsertNewCustomerDurationData] LOG ERROR : ${error.message}`);
              //   resolve(errorInsert.message);
            } else {
              // context.log(`[InsertNewCustomerDurationData] LOG RESULT: ${result}`);
              //   resolve(resultInsert);
            }
          }
        );
      } else {
        // if the record is found then update

        //update entity if available
        tableClient.replaceEntity(
          tableName,
          data,
          (errorUpdate, resultUpdate) => {
            if (error) {
              //context.log(`Error Occured during entity update ${errorUpdate.message}`);
            } else {
              //context.log({ statusCode: 200, message: 'update successfull', data: resultUpdate });
            }
          }
        );
      }
    }
  );
}


//USER MANAGEMENT SECTION
function InsertNewUser(data,console){
  return new Promise(async(resolve) => {
    let tableName = await GetTableName('userList');
    console.log(`InsertNewUser TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);
    let PartitionKey = String((data.username)?(data.username):''); 
    let RowKey = '';
    
    let entity = {
      PartitionKey: PartitionKey,
      RowKey: RowKey,
      // Username: (data.username)?(data.username):'',
      Password: (data.password)?(data.password):'',
      FullName: (data.fullName)?(data.fullName):'',
      Role: (data.role)?(data.role):''
    };
    // context.log(`entity: ${JSON.stringify(entity)}`);

    //check the user if exist
    tableClient.retrieveEntity(tableName, PartitionKey, RowKey, (error, result, resp) => {

      if (error) {
        console.log(`[InsertNewUser] error retrieveEntity : ${error.message}`);
        tableClient.insertEntity(tableName, entity, (errorInsert, resultInsert) => {
            if (errorInsert) {
              // console.log(`[InsertNewUser] ERROR insertEntity : ${error.message}`);
              resolve({message : "User registration failed, please contact your administrator"});
            } else {
              // console.log(`[InsertNewUser] new data has been successfuly inserted : ${JSON.stringify(resultInsert)}`);
              // resolve(resultInsert);
              resolve({message : "User has been registered successfully!"});
            }
        });
      } else {
        // console.log(`[UpdateCustomerDurationData] Entity found : ${JSON.stringify(resp.body)}`);
        resolve({message:'user already exist!'});
      }
    });

  });
}


function UpdateUserInformation(data,console){
  return new Promise(async(resolve) => {
    let tableName = await GetTableName('userList');
    // console.log(`UpdateUserInformation TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);
    let PartitionKey = String((data.username)?(data.username):''); 
    let RowKey = '';
    
    let entity = {
      PartitionKey: PartitionKey,
      RowKey: RowKey,
      // Username: (data.username)?(data.username):'',
      // Password: (data.password)?(data.password):'',
      FullName: (data.fullName)?(data.fullName):'',
      Role: (data.role)?(data.role):''
    };
    // context.log(`entity: ${JSON.stringify(entity)}`);

    //check the user if exist
    tableClient.retrieveEntity(tableName, PartitionKey, RowKey, (error, result, resp) => {

      if (error) {
        console.log(`[UpdateUserInformation] error retrieveEntity : ${error.message}`);
        resolve({message : "User not found!"});
      } else {
        entity.Password=(data.password)?(data.password):resp.body.Password;
        tableClient.replaceEntity(tableName, entity, (errorUpdate, resultUpdate) => {
          if (error) {
              context.log(`[UpdateUserInformation] Error Occured during entity update ${errorUpdate.message}`);
              resolve(errorUpdate.message);
          } else {
              // context.log(`[UpdateUserInformation] data has been successfuly updated: ${JSON.stringify(resultUpdate)}`);
              resolve(resultUpdate);
          }
        });
        resolve({message:'User information have been updated successfully!'});
      }
    });

  });
}

function CheckUsernameExist(data,console){
  return new Promise(async(resolve) => {
    let tableName = await GetTableName('userList');
    // console.log(`InsertNewUser TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);
    let PartitionKey = String((data.username));
    
    let RowKey = '';
    
    let credentialValid = 0;

    tableClient.retrieveEntity(tableName, PartitionKey, RowKey, (error, result, resp) => {

      if (error) {
        console.log(`[UpdateCustomerDurationData] error retrieveEntity : ${error.message}`);
        resolve({credentialValid:credentialValid});
      } else {
        // console.log(`[UpdateCustomerDurationData] Entity found : ${JSON.stringify(resp.body)}`);
        if (data.password===resp.body.Password){
          credentialValid = 1;
        }
        
        resolve({credentialValid:credentialValid});
      }
    });

  });
}


function ValidateUserCredential(data,console){
  return new Promise(async(resolve) => {
    let tableName = await GetTableName('userList');
    // console.log(`InsertNewUser TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);
    let PartitionKey = String((data.username));
    let RowKey = '';

    let credentialValid = 0;

    tableClient.retrieveEntity(tableName, PartitionKey, RowKey, (error, result, resp) => {

      if (error) {
        console.log(`[UpdateCustomerDurationData] error retrieveEntity : ${error.message}`);
        resolve({credentialValid:credentialValid,username:data.username});
      } else {
        // console.log(`[UpdateCustomerDurationData] Entity found : ${JSON.stringify(resp.body)}`);
        if (data.password===resp.body.Password){
          credentialValid = 1;
        }
        
        resolve({credentialValid:credentialValid,username:data.username});
      }
    });

  });
}

//LOCATION MANAGEMENT SECTION

function GetUserLocationList(data,console){
  return new Promise(async(resolve) => {
    let tableName = await GetTableName('userLocation');
    // console.log(`InsertNewUser TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);
    let totalItems = (await GetTableItemsNumber(tableName)).totalItems+1;
    let PartitionKey = String((data.username)?(data.username):''); 
    let RowKey = (totalItems)?String(totalItems):'';
    let result = await QueryDataByPartitionKey(tableName,PartitionKey);
    resolve(result.data);
  });
}

function InsertNewUserLocation(data,console){
  return new Promise(async(resolve) => {
    let tableName = await GetTableName('userLocation');
    // console.log(`InsertNewUser TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);
    let totalItems = (await GetTableItemsNumber(tableName)).totalItems+1;
    let PartitionKey = String((data.username)?(data.username):''); 
    let RowKey = (totalItems)?String(totalItems):'';
    
    let entity = {
      PartitionKey: PartitionKey,
      RowKey: RowKey,
      // Username: (data.username)?(data.username):'',
      LocationID: (totalItems)?(totalItems):'',
      LocationName: (data.locationName)?(data.locationName):'',
      IsActive:true,
      LocationAddress: (data.locationAddress)?(data.locationAddress):'',
    };
    // context.log(`entity: ${JSON.stringify(entity)}`);

    tableClient.insertEntity(tableName, entity, (errorInsert, resultInsert) => {
      if (errorInsert) {
        // console.log(`[InsertNewUser] ERROR insertEntity : ${error.message}`);
        resolve({message : "Location registration failed, please contact your administrator"});
      } else {
        // console.log(`[InsertNewUser] new data has been successfuly inserted : ${JSON.stringify(resultInsert)}`);
        // resolve(resultInsert);
        resolve({message : "Location has been registered successfully!"});
      }
  });

  });
}


function UpdateUserLocationInformation(data,console){
  return new Promise(async(resolve) => {
    let tableName = await GetTableName('userLocation');
    console.log(`UpdateUserLocationInformation TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);
    let PartitionKey = String((data.username)?(data.username):''); 
    let RowKey = String(data.locationID);
    
    let entity = {
      PartitionKey: PartitionKey,
      RowKey: RowKey,
      // Username: (data.username)?(data.username):'',
      // Password: (data.password)?(data.password):'',
      LocationID: (data.locationID)?(data.locationID):'',
      LocationName: (data.locationName)?(data.locationName):'',
      IsActive:true,
      LocationAddress: (data.locationAddress)?(data.locationAddress):'',
    };
    // console.log(`UpdateUserLocationInformation TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);

    console.log(`entity: ${JSON.stringify(entity)}`);

    //check the user if exist
    tableClient.retrieveEntity(tableName, PartitionKey, RowKey, (error, result, resp) => {

      if (error) {
        console.log(`[UpdateUserLocationInformation] error retrieve Entity : ${error.message}`);
        resolve({message : "User Location not found!"});
      } else {
        tableClient.replaceEntity(tableName, entity, (errorUpdate, resultUpdate) => {
          if (error) {
              context.log(`[UpdateUserLocationInformation] Error Occured during entity update ${errorUpdate.message}`);
              resolve(errorUpdate.message);
          } else {
              // context.log(`[UpdateUserInformation] data has been successfuly updated: ${JSON.stringify(resultUpdate)}`);
              resolve(resultUpdate);
          }
        });
        resolve({message:'User Location information have been updated successfully!'});
      }
    });

  });
}


function DeleteUserLocation(data,console){
  return new Promise(async(resolve) => {
    let tableName = await GetTableName('userLocation');
    // console.log(`DeleteUserLocation TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);
    let PartitionKey = String((data.username)?(data.username):''); 
    let RowKey = String(data.locationID);
    
    let entityDesc = {
      PartitionKey:PartitionKey, 
      RowKey:RowKey
    }
    tableClient.deleteEntity(tableName, entityDesc, (error, result, resp) => {

      if (error) {
        console.log(`[DeleteUserLocation] error delete Entity : ${error.message}`);
        resolve({message : "Failed to remove User Location assignment!"});
      } else {
        resolve({message:'User Location assignment have been removed successfully!'});
      }
    });


    
    // //check the location if exist
    // tableClient.retrieveEntity(tableName, PartitionKey, RowKey, (error, result, resp) => {

    //   if (error) {
    //     console.log(`[UpdateUserLocationInformation] error retrieve Entity : ${error.message}`);
    //     resolve({message : "User Location not found!"});
    //   } else {
        
    //     let entity = {
    //       PartitionKey: PartitionKey,
    //       RowKey: RowKey,
    //       // Username: (data.username)?(data.username):'',
    //       // Password: (data.password)?(data.password):'',
    //       LocationID: (resp.body.LocationID),
    //       LocationName: (resp.body.LocationName),
    //       IsActive:false,
    //       LocationAddress: (resp.body.LocationAddress)
    //     };
    //     tableClient.replaceEntity(tableName, entity, (errorUpdate, resultUpdate) => {
    //       if (error) {
    //           context.log(`[UpdateUserLocationInformation] Error Occured during entity update ${errorUpdate.message}`);
    //           resolve(errorUpdate.message);
    //       } else {
    //           // context.log(`[UpdateUserInformation] data has been successfuly updated: ${JSON.stringify(resultUpdate)}`);
    //           resolve(resultUpdate);
    //       }
    //     });
    //     resolve({message:'User Location information have been removed successfully!'});
    //   }
    // });

  });
}



function InsertNewDevice(data,console){
  return new Promise(async(resolve) => {
    let tableName = await GetTableName('deviceManagement');
    // console.log(`InsertNewUser TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);
    let PartitionKey = String((data.deviceID)?(data.deviceID):''); 
    let RowKey = 'assignment';
    
    let entity = {
      PartitionKey: PartitionKey,
      RowKey: RowKey,
      // Username: (data.username)?(data.username):'',
      LocationID: (data.locationID)?(data.locationID):'',
      LocationName: (data.locationName)?(data.locationName):'',
      IsActive:true,
      IoTHubName:'AlwanDevice',
      DeviceID:(data.deviceID)?(data.deviceID):''
    };
    // context.log(`entity: ${JSON.stringify(entity)}`);

    tableClient.insertEntity(tableName, entity, (errorInsert, resultInsert) => {
      if (errorInsert) {
        // console.log(`[InsertNewUser] ERROR insertEntity : ${error.message}`);
        resolve({message : "Device registration failed, please contact your administrator"});
      } else {
        // console.log(`[InsertNewUser] new data has been successfuly inserted : ${JSON.stringify(resultInsert)}`);
        // resolve(resultInsert);
        resolve({message : "Device has been registered successfully!"});
      }
  });

  });
}


function DeleteDevice(data,console){
  return new Promise(async(resolve) => {
    let tableName = await GetTableName('deviceManagement');
    console.log(`UpdateUserLocationInformation TableName ${tableName} /n DATA: ${JSON.stringify(data)}`);
    let PartitionKey = String((data.deviceID)?(data.deviceID):''); 
    let entityDesc = {
      PartitionKey:PartitionKey, 
      RowKey:'assignment'
    }
    tableClient.deleteEntity(tableName, entityDesc, (error, result, resp) => {

      if (error) {
        console.log(`[DeleteDevice] error delete Entity : ${error.message}`);
        resolve({message : "Failed to remove device assignment!"});
      } else {
        resolve({message:'Device assignment have been removed successfully!'});
      }
    });

  });
}





module.exports = {
  CreateTableIfNotExists,
  QueryDataByPartitionKeyAndRowKey,
  QueryDataByPartitionKey,
  GetTableItemsNumber,
  GetTableName,
  GetCustomerDurationTable,
  GetDeviceLocationByDeviceId,
  QueryDataByDate,
  QueryDataFromTable,
  // GetCurrentDashBoardDataByUsername,
  InsertDeviceConditionData,
  InsertNewUser,
  UpdateUserInformation,
  CheckUsernameExist,
  ValidateUserCredential,
  GetUserLocationList,
  InsertNewUserLocation,
  UpdateUserLocationInformation,
  DeleteUserLocation,
  InsertNewDevice,
  DeleteDevice
}