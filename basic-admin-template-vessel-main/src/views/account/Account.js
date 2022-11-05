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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClipboard, cilColorBorder, cilLockLocked, cilLockUnlocked, cilUser } from '@coreui/icons'

const Account = () => {
  return (
    <>
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h2>Pengaturan Akun</h2>
                  <h5 className="text-medium-emphasis">Email Saya</h5>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="name_example@gmail.com"/>
                  </CInputGroup>
                  <h5 className="text-medium-emphasis">Pengaturan Umum</h5>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilColorBorder} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Edit Profil"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockUnlocked} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Ganti Password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilClipboard} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Pusat Bantuan"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="dark">Keluar Akun</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    <CTable caption="top" align="middle" bordered borderColor="secondary">
        <CTableCaption>Daftar Cabang</CTableCaption>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell scope="col">Nama Cabang</CTableHeaderCell>
            <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
            <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row">Jakarta Selatan 1</CTableHeaderCell>
            <CTableDataCell>Jln. ABC No. XX, Jakarta Selatan, DKI Jakarta</CTableDataCell>
            <CTableDataCell>
                <CButton color="secondary" variant="outline" shape="square" size="sm" className="me-md-3">
                    Pengaturan Cabang
                </CButton>
                <CButton color="danger" variant="outline" shape="square" size="sm">
                    Hapus Cabang
                </CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Jakarta Timur 4</CTableHeaderCell>
            <CTableDataCell>Jln. CDE No. YY, Jakarta Timur, DKI Jakarta</CTableDataCell>
            <CTableDataCell>
                <CButton color="secondary" variant="outline" shape="square" size="sm" className="me-md-3">
                    Pengaturan Cabang
                </CButton>
                <CButton color="danger" variant="outline" shape="square" size="sm">
                    Hapus Cabang
                </CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell scope="row">Bandung 3</CTableHeaderCell>
            <CTableDataCell>Jln. FGH No. ZZ, Bandung, Jawa Barat</CTableDataCell>
            <CTableDataCell>
                <CButton color="secondary" variant="outline" shape="square" size="sm" className="me-md-3">
                    Pengaturan Cabang
                </CButton>
                <CButton color="danger" variant="outline" shape="square" size="sm">
                    Hapus Cabang
                </CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default Account
