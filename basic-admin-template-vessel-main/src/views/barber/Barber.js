import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableCaption,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClipboard, cilColorBorder, cilLockLocked, cilLockUnlocked, cilUser } from '@coreui/icons'

const Barber = () => {
  return (
    <CTable caption="top" align="middle" bordered borderColor="secondary">
        <CTableCaption>Daftar Tukang Cukur</CTableCaption>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Lokasi Barbershop</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Total Service</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Jakarta Selatan 1</CTableDataCell>
            <CTableDataCell>Kim Namjoon</CTableDataCell>
            <CTableDataCell>
                <CBadge color="success" shape="rounded-pill">online</CBadge>
            </CTableDataCell>
            <CTableDataCell>6 Pelanggan</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">2</CTableHeaderCell>
            <CTableDataCell>Jakarta Timur 3</CTableDataCell>
            <CTableDataCell>Kim Seokjin</CTableDataCell>
            <CTableDataCell>
                <CBadge color="success" shape="rounded-pill">online</CBadge>
            </CTableDataCell>
            <CTableDataCell>4 Pelanggan</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">3</CTableHeaderCell>
            <CTableDataCell>Bekasi 2</CTableDataCell>
            <CTableDataCell>Min Yoongi</CTableDataCell>
            <CTableDataCell>
                <CBadge color="danger" shape="rounded-pill">offline</CBadge>
            </CTableDataCell>
            <CTableDataCell>7 Pelanggan</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">4</CTableHeaderCell>
            <CTableDataCell>Bandung 3</CTableDataCell>
            <CTableDataCell>Jung Hoseok</CTableDataCell>
            <CTableDataCell>
                <CBadge color="success" shape="rounded-pill">online</CBadge>
            </CTableDataCell>
            <CTableDataCell>5 Pelanggan</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">5</CTableHeaderCell>
            <CTableDataCell>Jakarta Utara 2</CTableDataCell>
            <CTableDataCell>Park Jimin</CTableDataCell>
            <CTableDataCell>
                <CBadge color="success" shape="rounded-pill">online</CBadge>
            </CTableDataCell>
            <CTableDataCell>4 Pelanggan</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">6</CTableHeaderCell>
            <CTableDataCell>Bekasi 1</CTableDataCell>
            <CTableDataCell>Kim Taehyung</CTableDataCell>
            <CTableDataCell>
                <CBadge color="success" shape="rounded-pill">offline</CBadge>
            </CTableDataCell>
            <CTableDataCell>8 Pelanggan</CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">7</CTableHeaderCell>
            <CTableDataCell>Bandung 2</CTableDataCell>
            <CTableDataCell>Jeon Jungkook</CTableDataCell>
            <CTableDataCell>
                <CBadge color="success" shape="rounded-pill">online</CBadge>
            </CTableDataCell>
            <CTableDataCell>8 Pelanggan</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
  )
}

export default Barber