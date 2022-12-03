const e = require('express');
var express = require('express');
// const { GetTableName } = require('../../AzureFunctionApp3/SharedModules/AzureTableStorageFuncV2');
var router = express.Router();
var AzureFunction = require('../shared_modules/AzureTableStorageFuncWebsite');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('{"body":"test"}');
});

router.get('/test', async function(req, res, next) {
  let data = await AzureFunction.GetTableName('userList');
  res.send(`{"body":${JSON.stringify(data)}}`);
});

router.get('/CheckUsernameExist', async function(req, res, next) {
  // console.log(req.body);
  // let userData = { username: "isrosyaeful", password: "password123456" };
  userData = req.body;
  let data = await AzureFunction.CheckUsernameExist(userData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});

router.get('/ValidateUserCredential', async function(req, res, next) {
  let userData = { username: "isrosyaeful", password: "password123456" };
  let data = await AzureFunction.ValidateUserCredential(userData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});

router.get('/InsertNewUser', async function(req, res, next) {
  // format req.body 
  // {
  //   username: "isrosyaeful2",
  //   password: "password1234568",
  //   fullName: "Isro Syaeful Iman 2",
  //   role: "Administrator",
  // };
  let userData = {};
  userData = req.body;
  let data = await AzureFunction.InsertNewUser(userData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});

router.get('/UpdateUserInformation', async function(req, res, next) {
  // format req.body 
  // {
  //   username: "isrosyaeful2",
  //   // password: "password123",
  //   fullName: "Isro Syaeful Iman Test 2",
  //   role: "Administrator",
  // };
  let userData = {};
 
  userData = req.body;
  let data = await AzureFunction.UpdateUserInformation(userData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});

router.get('/GetTableItemsNumber', async function(req, res, next) {
  let tableName = await GetTableName('userLocation');
  let data = await AzureFunction.GetTableItemsNumber(tableName);
  res.send(`{"body":${JSON.stringify(data)}}`);//{"totalItems":${(data.data.length)?data.data.length:0}}}`);//${JSON.stringify(data)},
});

router.get('/InsertNewUserLocation', async function(req, res, next) {
  let locationData = {
    username: "isrosyaeful2",
    // password: "password123",
    locationName:"Test Location 1",
    locationAddress: "TestLocationAddress1",
  };
  let data = await AzureFunction.InsertNewUserLocation(locationData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});

router.get('/GetUserLocationList', async function(req, res, next) {
  //format req.body
  let userData = {
    username: "isrosyaeful"
  };
  // console.log(JSON.stringify(req.body));
  userData = req.body;
  let data = await AzureFunction.GetUserLocationList(userData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});


router.get('/UpdateUserLocationInformation', async function(req, res, next) {
  let userData = {
    username: "isrosyaeful2",
    locationID:2,
    locationName:"Test Location 2",
    locationAddress: "TestLocationAddress2",
  };
  let data = await AzureFunction.UpdateUserLocationInformation(userData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});

router.get('/DeleteUserLocation', async function(req, res, next) {
  let locationData = {
    username: "isrosyaeful2",
    locationID:2
  };
  let data = await AzureFunction.DeleteUserLocation(locationData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});

router.get('/InsertNewDevice', async function(req, res, next) {
  let deviceData = {
    deviceID: "111222333",
    locationID:2,
    locationName: "Location Testing 2"
  };
  let data = await AzureFunction.InsertNewDevice(deviceData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});

router.get('/DeleteDevice', async function(req, res, next) {
  let deviceData = {
    deviceID: "111222333",
    locationID:2
  };
  let data = await AzureFunction.DeleteDevice(deviceData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});

router.get('/test2', async function(req, res, next) {
  let username='isrosyaeful';
  let today = new Date(2022,3,3);
  let todayConnection = new Date(Number(today)-1000*60*10); //today - 10 minutes
  let nextDay = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);
  let firstDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay());
  let lastDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()+7);
  let startTime = new Date(today.getFullYear(),today.getMonth(),1,0,0,0);
  let endTime = new Date(today.getFullYear(),today.getMonth()+1,1,0,0,0); //cari hari pertama weekly
  
  let filter = "EndTime ge '"+startTime.toISOString()+"' and EndTime le '"+endTime.toISOString()+"' ";
  let customerTable = await AzureFunction.GetTableName('customerDuration',today);
  let data = await AzureFunction.QueryDataFromTable(customerTable,filter);
  console.log(`${today} - ${todayConnection} - ${firstDayOfTheWeek} - ${lastDayOfTheWeek}`);
  // console.log(`${data} - \n\n${JSON.stringify(data)} - ${lastDayOfTheWeek}`);
  // let data = await AzureFunction.QueryDataByPartitionKey(table,'3');
  let customerOfTheWeek=0;
  let customerOfTheDay=0;
  for (let i=0;i<data.length;i++){
    if (data[i].EndTime>=firstDayOfTheWeek.toISOString() && data[i].EndTime<lastDayOfTheWeek.toISOString()){
      customerOfTheWeek++;
    }
    if (data[i].EndTime>=today.toISOString() && data[i].EndTime<nextDay.toISOString()){
      customerOfTheDay++;
    }
  }

  let deviceTable = await AzureFunction.GetTableName('deviceConnectivity');
  let arrLocId = ['6'];
  let filterDevice = ''
  for (let i=0;i<arrLocId.length;i++){
    if (filterDevice===''){
      filterDevice+=`( PartitionKey eq '${arrLocId[i]}' `;
    } else {
      filterDevice+=` or PartitionKey eq '${arrLocId[i]}' `;
    }
  }
  if (filterDevice!=='') filterDevice+=')';
  let deviceData = [];
  try {
    deviceData = await AzureFunction.QueryDataFromTable(deviceTable,filterDevice);
  }catch(err){
    deviceData = [];
  }
  let connectedDevice = 0;
  for (let i=0;i<deviceData.length;i++){
    if ( deviceData[i].DateTime>=todayConnection.toISOString() ){
      connectedDevice++;
    }
  }

  let result = {
    'filter':filter
    ,'tableName':customerTable
    ,'customerOfTheWeek':customerOfTheWeek
    ,'customerOfTheDay':customerOfTheDay
    ,'filterDevice':filterDevice
    ,'totalDevice':deviceData.length
    ,'connectedDevice':connectedDevice
    ,'data':data
  }
  console.log(`count : ${customerOfTheWeek} \n\n ${JSON.stringify(result)}`);
  res.send(result);
  //   `result : \n 
  //  ${(result)}`);
}
);

router.get('/GetTotalCustomer', async function(req, res, next) {
  // let username='isrosyaeful';
  let today = new Date(2022,3,3);
  // let today = new Date();
  let firstDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()); //start from sunday
  let lastDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()+7);
  let startTime = new Date(today.getFullYear(),today.getMonth(),1,0,0,0);
  let endTime = new Date(today.getFullYear(),today.getMonth()+1,1,0,0,0); //cari hari pertama weekly
  // let fd = firstDayOfTheWeek.toLocaleString('id-ID');
  // let ld = lastDayOfTheWeek.toLocaleString('id-ID');
  
  // let filter = "EndTime ge '"+startTime.toISOString()+"' and EndTime le '"+endTime.toISOString()+"' ";
  let filter = "EndTime ge '"+firstDayOfTheWeek.toISOString()+"' and EndTime le '"+lastDayOfTheWeek.toISOString()+"' ";
  let customerTable = await AzureFunction.GetTableName('customerDuration',today);
  let data = await AzureFunction.QueryDataFromTable(customerTable,filter);
  // console.log(data);
  let resultData =[];
  let hash = {};

  if (data.length !== 0) {
    console.log(data.length)
    for (let j = firstDayOfTheWeek; j < lastDayOfTheWeek; j.setDate(j.getDate()+1)){
      // for (let j = startTime; j < endTime; j.setDate(j.getDate()+1)){
        for (let i = 0; i < data.length; i++){
          // initiate hash
          if (!hash[new Date(j)]){
            hash[new Date(j)] = 0;
          }
          //  console.log('start = ' + new Date(j));
          //  console.log(new Date(data[i].Timestamp));
          // console.log('end = ' + new Date(j.getFullYear(),j.getMonth(),j.getDate()+1));
          if ((new Date(data[i].Timestamp) > new Date(j)) && (new Date(data[i].Timestamp) < new Date(j.getFullYear(),j.getMonth(),j.getDate()+1))) {
            // console.log('items.data[i].Timestamp: ' + new Date(data[i].Timestamp) + ' > ' + j);
            // if (resultData[new Date(j)] == 0) { //check whether hash exists
            //   resultData[new Date(j)] = 1; //initial sum
            // } 
            // else {
            //   resultData[new Date(j)]++; 
            // }
            hash[new Date(j)]++; 
          } 
        }
      }
      resultData = Object.keys(hash).map((date) => {
        formattedDate = (new Date(date)).toDateString();
        return {
          formattedDate,
          total: hash[date]
        }
      })
  } else { /** if no data */
    for (let j = firstDayOfTheWeek; j < lastDayOfTheWeek; j.setDate(j.getDate()+1)){
      formattedDate = (new Date(j)).toDateString();
      resultData.push({
        formattedDate,
        total: 0
      })
    }
  }

let result = resultData;
// console.log(resultData[0].date);
res.send(result);

});

router.get('/GetCustomerDuration', async function(req, res, next) {
  let today = new Date(2022,3,3);
  // let today = new Date();
  let firstDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()); //start from sunday
  let lastDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()+7);
  // let startTime = new Date(today.getFullYear(),today.getMonth(),1,0,0,0);
  // let endTime = new Date(today.getFullYear(),today.getMonth()+1,1,0,0,0); //cari hari pertama weekly

  let filter = "EndTime ge '"+firstDayOfTheWeek.toISOString()+"' and EndTime le '"+lastDayOfTheWeek.toISOString()+"' ";
  let customerTable = await AzureFunction.GetTableName('customerDuration',today);
  let data = await AzureFunction.QueryDataFromTable(customerTable,filter);
  // console.log(data);
  let resultData =[];
  let hash = {};

  if (data.length !== 0) {
    console.log(data.length)
    for (let j = firstDayOfTheWeek; j < lastDayOfTheWeek; j.setDate(j.getDate()+1)){
        for (let i = 0; i < data.length; i++){
          // console.log(data[i].Duration);
          // initiate hash for duration
          if (!hash[new Date(j)]){
            hash[new Date(j)] = 0;
          }
          if ((new Date(data[i].Timestamp) > new Date(j)) && (new Date(data[i].Timestamp) < new Date(j.getFullYear(),j.getMonth(),j.getDate()+1))) {
            hash[new Date(j)] = hash[new Date(j)] + data[i].Duration; 
            // console.log(hash[new Date(j)]);
            // console.log(data[i].RowKey);
          } 
        }
      }
      resultData = Object.keys(hash).map((date) => {
        formattedDate = (new Date(date)).toDateString();
        return {
          formattedDate,
          totalDuration: hash[date]
        }
      })
  } else { /** if no data */
    for (let j = firstDayOfTheWeek; j < lastDayOfTheWeek; j.setDate(j.getDate()+1)){
      formattedDate = (new Date(j)).toDateString();
      resultData.push({
        formattedDate,
        totalDuration: 0
      })
    }
  }

let result = resultData;
// console.log(resultData[0].date);
res.send(result);
});

router.get('/GetDashboardData', async function(req, res, next) {
  let username='isrosyaeful';
  let today = new Date(2022,3,3);
  let todayConnection = new Date(Number(today)-1000*60*10); //today - 10 minutes
  let nextDay = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);
  let firstDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay());
  let lastDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()+7);
  let startTime = new Date(today.getFullYear(),today.getMonth(),1,0,0,0);
  let endTime = new Date(today.getFullYear(),today.getMonth()+1,1,0,0,0); //cari hari pertama weekly
  
  let filter = "EndTime ge '"+startTime.toISOString()+"' and EndTime le '"+endTime.toISOString()+"' ";
  let customerTable = await AzureFunction.GetTableName('customerDuration',today);
  let data = await AzureFunction.QueryDataFromTable(customerTable,filter);
  console.log(`${today} - ${todayConnection} - ${firstDayOfTheWeek} - ${lastDayOfTheWeek}`);
  // console.log(`${data} - \n\n${JSON.stringify(data)} - ${lastDayOfTheWeek}`);
  // let data = await AzureFunction.QueryDataByPartitionKey(table,'3');
  let customerOfTheWeek=0;
  let customerOfTheDay=0;
  for (let i=0;i<data.length;i++){
    if (data[i].EndTime>=firstDayOfTheWeek.toISOString() && data[i].EndTime<lastDayOfTheWeek.toISOString()){
      customerOfTheWeek++;
    }
    if (data[i].EndTime>=today.toISOString() && data[i].EndTime<nextDay.toISOString()){
      customerOfTheDay++;
    }
  }

  let deviceTable = await AzureFunction.GetTableName('deviceConnectivity');
  let arrLocId = ['6'];
  let filterDevice = ''
  for (let i=0;i<arrLocId.length;i++){
    if (filterDevice===''){
      filterDevice+=`( PartitionKey eq '${arrLocId[i]}' `;
    } else {
      filterDevice+=` or PartitionKey eq '${arrLocId[i]}' `;
    }
  }
  if (filterDevice!=='') filterDevice+=')';
  let deviceData = [];
  try {
    deviceData = await AzureFunction.QueryDataFromTable(deviceTable,filterDevice);
  }catch(err){
    deviceData = [];
  }
  let connectedDevice = 0;
  for (let i=0;i<deviceData.length;i++){
    if ( deviceData[i].DateTime>=todayConnection.toISOString() ){
      connectedDevice++;
    }
  }

  let result = {
    'todayCustomer': customerOfTheDay
    ,'weeklyCustomer':customerOfTheWeek
    ,'totalDevice':deviceData.length
    ,'connectedDevice':connectedDevice
  }
  // console.log(`count : ${customerOfTheWeek} \n\n ${JSON.stringify(result)}`);
  res.send(result);
  //   `result : \n 
  //  ${(result)}`);
}
);


router.get("/DeviceConnectivity", async function (req, res, next) {
  let result = {};//data;
  let locationID = '11';
  let deviceID = '11';
  let deviceStatus = 'Online'
  let message = `message ---- locationID: ${locationID}, deviceID: ${deviceID} ,batteryStatus ${deviceStatus}`; //
  console.log(message);
  //////MAIN PROGRAM

  let userLocationTable = await AzureFunction.GetTableName("userLocation");
  console.log(`userLocationTable ${userLocationTable}`);
  let userLocationFilter =`LocationID eq '${locationID}'`;
  let userLocation = await AzureFunction.QueryDataFromTable(userLocationTable,userLocationFilter);
  console.log('userLocation : ' + JSON.stringify(userLocation));
  if (userLocation.length>0){
    let username = userLocation[0].PartitionKey;
    let deviceConnectivityTable = await AzureFunction.GetTableName("deviceConnectivity");
    
    let data = {
      PartitionKey: String(username), 
      RowKey: String(locationID), 
      username: String(username), 
      LocationID: String(locationID),
      DeviceID: String(deviceID),
      DeviceStatus: String(deviceStatus),
      LastConnection: new Date().toISOString()
    };
    console.log(`Data : ${JSON.stringify(data)}`);
    await AzureFunction.InsertDeviceConditionData(deviceConnectivityTable, data);

  } else {
    result = {
      body:'Error, LocationID not Found'
    }
  }
  
  
  
  
  res.send(result);
});

router.get('/TestAPI', async function(req, res, next) {
  let userData = req.body
  // console.log(JSON.stringify(req));
  let data = await AzureFunction.GetUserLocationList(userData,console);

  res.send(`{"body":${JSON.stringify(data)}}`);
});





///////////////////
///REQUESTED API///
///////////////////

router.get('/GetUserBranchDetails', async function(req, res, next) {
  //format req.body
  // {"UserID":"isrosyaeful"}
  let userData = {
    username: req.body.userID
  };
  // console.log(JSON.stringify(req.body));
  // userData = req.body;
  let data = await AzureFunction.GetUserLocationList(userData,console);
  // res.send(`{"body":${JSON.stringify(data)}}`);
  res.json({"data":(data)});
  res.end();
});

router.get('/AddNewDevice', async function(req, res, next) {
  let deviceData = {
    deviceID: req.body.deviceID,//"111222333",
    locationID: req.body.locationID, //2,
    locationName: req.body.locationName //"Location 2"
  };
  let data = await AzureFunction.InsertNewDevice(deviceData,console);
  // res.send(`{"body":${JSON.stringify(data)}}`);
  res.json(data)
});

router.get('/AddNewBranch', async function(req, res, next) {
  let locationData = {
    username: req.body.userID,//"isrosyaeful2",
    locationName: req.body.locationName,//"Test Location 1",
    locationAddress: req.body.locationAddress,//"TestLocationAddress1",
  };
  let data = await AzureFunction.InsertNewUserLocation(locationData,console);
  // res.send(`{"body":${JSON.stringify(data)}}`);
  res.json(data);
});

router.get('/DeleteUserBranch', async function(req, res, next) {
  let locationData = {
    username: req.body.userID,// "isrosyaeful2",
    locationID: req.body.locationID,//2
  };
  let data = await AzureFunction.DeleteUserLocation(locationData,console);
  // res.send(`{"body":${JSON.stringify(data)}}`);
  res.json(data);
});

router.post('/CheckUsernameExist', async function(req, res, next) {
  // let userData = { username: "isrosyaeful", password: "password123456" };
  userData = req.body.data;
  console.log(userData);
  let data = await AzureFunction.CheckUsernameExist(userData,console);
  res.send(`{"body":${JSON.stringify(data)}}`);
});


module.exports = router; 

