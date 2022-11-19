import axios from 'axios';

// export const dashboardData = [
//   {
//       id: 1,
//       day: 'Monday',
//       total: 7
//   },
//   {
//       id: 2,
//       day: 'Tuesday',
//       total: 8
//   },
//   {
//       id: 4,
//       day: 'Wednesday',
//       total: 6
//   },
//   {
//       id: 5,
//       day: 'Thursday',
//       total: 5
//   },
//   {
//       id: 6,
//       day: 'Friday',
//       total: 10
//   },
//   {
//       id: 7,
//       day: 'Saturday',
//       total: 20
//   },
//   {
//       id: 8,
//       day: 'Sunday',
//       total: 30
//   },
// ]

// async function GetTotalCustomer() {
//   let response = await axios.get("http://localhost:3000/api/GetTotalCustomer");
//   let rawData = response.data;
//     //  console.log(response);
//     var TotalCustomerData = rawData.map((item) => ({
//       'labels': item.date,
//       'data': item.total
//     }))
//     // console.log(TotalCustomerData);
//     return TotalCustomerData;
// }

const GetWeeklyCustomerData = axios.get("http://localhost:3000/api/GetTotalCustomer")
.then((res) => {
  let rawData = res.data;
  // console.log(res);
  var TotalCustomerData = rawData.map((item) => ({
    'labels': item.date,
    'data': item.total
  }))
  // console.log(TotalCustomerData);
  return TotalCustomerData;
});

const GetWeeklyTotalCustomer = async () => {
  const a = await GetWeeklyCustomerData;
  // console.log('data from func: ');
  // console.log(a);
  return a;
}

export const weeklyData = GetWeeklyTotalCustomer();

const GetDashboardSummaryData = axios.get("http://localhost:3000/api/GetDashboardData")
.then((res) => {
  // console.log(res.data.todayCustomer);
  return res.data;
});

const GetDashboardSummary = async () => {
  const a = await GetDashboardSummaryData;
  console.log('data from func: ');
  console.log(a.todayCustomer);
  return a.todayCustomer;
}

export const dashboardSummaryData = GetDashboardSummary();

// export const dashboardData = async () => {
    // let response = await axios.get("http://localhost:3000/api/GetTotalCustomer");
    // let rawData = response.data;
    //    console.log(response);
    //   var TotalCustomerData = rawData.map((item) => ({
    //     'labels': item.date,
    //     'data': item.total
    //   }))
    //   // console.log(TotalCustomerData);
    //   return TotalCustomerData;
//   };

  // export const dashboardData = async () => {
  //   let response = await axios.get("http://localhost:3000/api/GetTotalCustomer")
  //   console.log(response.data);
  //   return response.data;
  // }