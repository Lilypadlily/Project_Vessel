import axios from 'axios';

export const dashboardData = async () => {
    let response = await axios.get("http://localhost:3000/api/GetTotalCustomer");
    let rawData = response.data;
       console.log(response);
      var TotalCustomerData = rawData.map((item) => ({
        'labels': item.date,
        'data': item.total
      }))
      // console.log(TotalCustomerData);
      return TotalCustomerData;
  };

  // export const dashboardData = async () => {
  //   let response = await axios.get("http://localhost:3000/api/GetTotalCustomer")
  //   console.log(response.data);
  //   return response.data;
  // }