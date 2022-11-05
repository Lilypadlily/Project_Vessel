import React from 'react'
import { Link } from 'react-router-dom'

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

import WidgetsDropdown2 from '../widgets/WidgetsDropdown2'

const Branch = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  return (
    <>
      <WidgetsDropdown2 />
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
          labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
          datasets: [
            {
              label: 'My Second dataset',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-dark'),
              pointHoverBackgroundColor: getStyle('--cui-dark'),
              borderWidth: 1,
              data: [
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
                random(50, 200),
              ],
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

      <CRow>
        <CCol sm={5}>
          <h4 id="traffic" className="card-title mb-0">
            Rata-rata Durasi Pelanggan
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
          labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
          datasets: [
            {
              label: 'Rata-rata Durasi (menit)',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-dark'),
              pointHoverBackgroundColor: getStyle('--cui-dark'),
              borderWidth: 1,
              data: [
                random(15, 150),
                random(15, 150),
                random(15, 150),
                random(15, 150),
                random(15, 150),
                random(15, 150),
                random(15, 150),
              ],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
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
        <CTableCaption>Daftar Perangkat</CTableCaption>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">Device ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">K829-JI173-2208</CTableHeaderCell>
            <CTableDataCell>On</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">K829-JI173-2209</CTableHeaderCell>
            <CTableDataCell>On</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">K829-JI173-2211</CTableHeaderCell>
            <CTableDataCell>Off</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default Branch
