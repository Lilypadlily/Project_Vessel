import React, { useEffect } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableCaption,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'


import axios from 'axios';
// import {weeklyData, dashboardSummaryData} from '../data/dashboardData';

// REF: https://stackoverflow.com/questions/68670660/react-call-api-and-export-value


const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const [labels, setLabels] = React.useState(null);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://localhost:3000/api/GetTotalCustomer").then((res) => {
    let rawData = res.data;
    let labelsArr = [];
    let dataArr = [];
    rawData.forEach((item) => {
      labelsArr.push(item.formattedDate);
      dataArr.push(item.total);
    })
    setLabels(labelsArr);
    setData(dataArr);
    });
  }, []);

  if (!labels) return 'Loading...';
  if (!data) return 'Loading...';

  return (
    <>
    <div>
      {/* <h1>{post}</h1> */}
    </div>
      <WidgetsDropdown />
      <CRow>
        <CCol sm={5}>
          <h4 id="traffic" className="card-title mb-0">
            Total Pelanggan
          </h4>
          <div className="small text-medium-emphasis">Minggu Ini</div>
        </CCol>
        <CCol sm={7} className="d-none d-md-block">
          <CButton color="primary" className="float-end">
            <CIcon icon={cilCloudDownload} />
          </CButton>
          <CButtonGroup className="float-end me-3">
            {['Hari', 'Bulan', 'Tahun'].map((value) => (
              <CButton
                color="outline-secondary"
                key={value}
                className="mx-0"
                active={value === 'Hari'}
              >
                {value}
              </CButton>
            ))}
          </CButtonGroup>
        </CCol>
      </CRow>
      <CChartLine
        style={{ height: '200px', marginTop: '20px' }}
        data={{
          // labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
          labels: labels,
          datasets: [
            {
              label: 'Total Customer',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-dark'),
              pointHoverBackgroundColor: getStyle('--cui-dark'),
              borderWidth: 1,
              data: data,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                drawOnChartArea: false,
              },
            },
            y: {
              ticks: {
                beginAtZero:
                true,
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
                max: 250,
              },
            },
          },
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
        }}
      />
      <CTable caption="top" align="middle" bordered borderColor="secondary" hover responsive>
        <CTableCaption>Top 5 Cabang</CTableCaption>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nama Cabang</CTableHeaderCell>
            <CTableHeaderCell scope="col">Jumlah Pelanggan</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Jakarta Selatan 1</CTableDataCell>
            <CTableDataCell>12</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Jakarta Timur 4</CTableDataCell>
            <CTableDataCell>10</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell>Bandung 3</CTableDataCell>
            <CTableDataCell>8</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell>Bekasi 1</CTableDataCell>
            <CTableDataCell>6</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell>Bogor 2</CTableDataCell>
            <CTableDataCell>3</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default Dashboard
