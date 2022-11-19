import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CWidgetStatsD,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilCast, cilDevices, cilOptions, cilUser } from '@coreui/icons'

import axios from 'axios';


const WidgetsDropdown = () => {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://localhost:3000/api/GetDashboardData").then((res) => {
    setPost(res.data);
    });
  }, []);

   if (!post) return 'Loading...';

  const todayCustomer = post.todayCustomer;
  const weeklyCustomer = post.weeklyCustomer;
  const totalDevice = post.totalDevice;
  const connectedDevice = post.connectedDevice;

  return (
    <CRow>
      <CCol m={5} lg={3}>
        <CWidgetStatsD
          className="mb-3"
          icon={<CIcon className="my-4 text-white" icon={cilUser} height={52} />}
          chart={
            <CChartLine
              className="position-absolute w-100 h-100"
              options={{
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          }
          style={{ '--cui-card-cap-bg': '#3b5998' }}
          values={[
            { title: 'Hari Ini', value: (todayCustomer) },
            //{ title: 'feeds', value: '459' },//
          ]}
        />
      </CCol>

      <CCol m={5} lg={3}>
        <CWidgetStatsD
          className="mb-3"
          icon={<CIcon className="my-4 text-white" icon={cilUser} height={52} />}
          chart={
            <CChartLine
              className="position-absolute w-100 h-100"
              options={{
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          }
          style={{ '--cui-card-cap-bg': '#3b5998' }}
          values={[
            { title: 'Minggu Ini', value: weeklyCustomer},
          ]}
        />
      </CCol>

      <CCol m={5} lg={3}>
        <CWidgetStatsD
          className="mb-3"
          icon={<CIcon className="my-4 text-white" icon={cilCast} height={52} />}
          chart={
            <CChartLine
              className="position-absolute w-100 h-100"
              options={{
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          }
          style={{ '--cui-card-cap-bg': '#3b5998' }}
          values={[
            { title: 'Perangkat Terhubung', value: connectedDevice},
          ]}
        />
      </CCol>

      <CCol m={5} lg={3}>
        <CWidgetStatsD
          className="mb-3"
          icon={<CIcon className="my-4 text-white" icon={cilDevices} height={52} />}
          chart={
            <CChartLine
              className="position-absolute w-100 h-100"
              options={{
                elements: {
                  line: {
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                  },
                },
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          }
          style={{ '--cui-card-cap-bg': '#3b5998' }}
          values={[
            { title: 'Total Perangkat', value: totalDevice },
          ]}
        />
      </CCol> 
    </CRow>
  )
}

export default WidgetsDropdown
