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

const WidgetsDropdown2 = () => {
  return (
    <CRow>
      <CCol m={5} lg={3}>
        <CWidgetStatsD
          className="mb-3"
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
            { title: 'Jln. ABC No. XX, Jakarta Selatan, DKI Jakarta', value: 'Deskripsi Cabang' },
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
            { title: 'Minggu Ini', value: '80' },
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
            { title: 'Perangkat Terhubung', value: '12' },
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
            { title: 'Total Perangkat', value: '20' },
          ]}
        />
      </CCol> 
    </CRow>
  )
}

export default WidgetsDropdown2
