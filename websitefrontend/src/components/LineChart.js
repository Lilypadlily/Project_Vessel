import React from "react";
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

function LineChart ({xAxisData, yAxisData}) {
    return <div> 
        <Line
        data={{
          labels: xAxisData,
          datasets: [
            {
              label: '# of Customers',
              data: yAxisData, 
              backgroundColor: xAxisData.map((data) => 'rgba(255, 159, 64, 0.2)'),
              borderColor: xAxisData.map((data) => 'rgba(255, 159, 64, 1)'),
              borderWidth: 1,
            },
          ],
        }}
        height={300}
        width={800}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    grid: {display: true}, //show y-axis grid
                    title: {display: true, text: 'Total of Customers', font: {weight: 'bold'}} //y-axis title styling
                },
                x: {
                    grid: {display: false}, //hide x-axis grid
                    title: {display: true, text: 'Days', font: {weight: 'bold'}} //x-axis title styling
                }
          },
          plugins: {
              legend: {display: false} //hide legend
          }
        }}
      />
    </div>
}

export default LineChart;