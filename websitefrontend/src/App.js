import React from 'react';
import './App.css';
import BarChart from './components/BarChart';
 import {TotalCustomerPerBranch,CustomerData} from './Data';
import chart from 'chart.js/dist/chart';
import Moment from 'react-moment';
import 'moment-timezone';
import LineChart from './components/LineChart';

class App extends React.Component {

  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false
    };
  }

  //ComponentDidMount is used to execute the code
  componentDidMount() {
    fetch("http://localhost:3000/api/GetTotalCustomer")
    .then((res) => res.json())
    .then((json) => {
      // console.log(json);
        var TotalCustomerData = json.map((item) => ({
          'labels': item.date,
          'data': item.total
        }))
        // console.log(TotalCustomerData);
        this.setState({
          items: TotalCustomerData,
          DataisLoaded: true
        })
      });
    // .then((res) => res.json())
    // .then((json) => {
    //   this.setState({
    //     items: json,
    //     DataisLoaded: true
    //   });
    // })
  }
  render() {
    const { DataisLoaded, items } = this.state;
    // console.log(items);
    if (!DataisLoaded) return <div> <h1> Please wait some time... </h1></div>;
    // if (DataisLoaded) return <div><p>{items}</p></div>;
    // console.log(items);
    // let today = new Date(2022,3,3);
    // let firstDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()); //start from monday
    // let lastDayOfTheWeek = new Date(today.getFullYear(),today.getMonth(),today.getDate()-today.getDay()+7);
    // let fd = firstDayOfTheWeek.toLocaleString('id-ID');
    // let ld = lastDayOfTheWeek.toLocaleString('id-ID');
    //console.log(today + ' ' + firstDayOfTheWeek + ' ' + lastDayOfTheWeek);
    //console.log('fd = ' + fd);
    // for (let j = firstDayOfTheWeek; j < lastDayOfTheWeek; j.setDate(j.getDate()+1)){
    //   console.log('j = ' + j);
    //   //console.log(items.data.length);
    //   for (let i = 0; i < items.data.length; i++){
    //     console.log(new Date(items.data[i].Timestamp));
    //     //console.log(new Date(items.data[i].Timestamp) + ' > ' + j)
    //     if (new Date(items.data[i].Timestamp) > j && new Date(items.data[i].Timestamp) < j.getDate()+1) {
    //       console.log('items.data[i].Timestamp' + items.data[i].Timestamp + ' > ' + j)
    //     } 
    //   }
    // }

    return (
      <div className = "App">
        
        <h1> Vessel Barbershop </h1>
        {
          items.map((item) => (
            <div> Timestamp = {item.labels},  
            total = {item.data}, 
            </div>
          ))}
        {/* <p> Current Date = { String(today) } </p>
        <p> Start of The Week = { fd } </p>
        <p> End of The Week = {ld} </p> */}

        {/* <p>Customers of the week = { items.customerOfTheWeek }</p>
        {
          items.data.map((item) => (
            <div> Timestamp = {item.Timestamp},  
            DeviceID = {item.DeviceID}, 
            Customer duration = {item.Duration} </div>
          ))} */}
      </div>
    )
  }

}

export default App;

// REF: https://stackoverflow.com/questions/68670660/react-call-api-and-export-value
export function BarChartApp() {

  const xAxisData = TotalCustomerPerBranch.map((data) => data.day); //retrieve x-axis data
  const yAxisData = TotalCustomerPerBranch.map((data) => data.total); //retrieve y-axis data
  // console.log(xAxisData);
  // console.log(yAxisData);
  
  return (
    <div className="BarChartApp"> 
    <h1>Total Pelanggan Per Cabang</h1>
    <BarChart xAxisData={xAxisData} yAxisData={yAxisData}/> 
    </div>
  );
}

export function LineChartApp() {

  // const xAxisData = CustomerData.map((data) => data.day); //retrieve x-axis data
  // const yAxisData = CustomerData.map((data) => data.total); //retrieve y-axis data

  const xAxisData = CustomerData.map((data) => data.day); //retrieve x-axis data
  const yAxisData = CustomerData.map((data) => data.total); //retrieve y-axis data

  // console.log(xAxisData);
  // console.log(yAxisData);
  
  return (
    <div className="LineChartApp"> 
    <h1> Total Pelanggan </h1>
    <LineChart xAxisData={xAxisData} yAxisData={yAxisData}/> 
    </div>
  );
}
