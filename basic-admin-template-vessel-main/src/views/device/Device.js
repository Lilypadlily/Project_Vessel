import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Device = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>Tambah Perangkat Baru</h2>
                    <CFormSelect aria-label="Default select example" className="mb-3"
                        options={[
                            'Pilih Cabang',
                            { label: 'Jakarta Selatan 1', value: '1' },
                            { label: 'Jakarta Timur 4', value: '2' },
                            { label: 'Bekasi 2', value: '3' },
                            { label: 'Depok 1', value: '4' },
                            { label: 'Bandung 3', value: '', disabled: true }
                      ]}
                    />
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="perangkat"
                        placeholder="No. Serial Perangkat"
                        autoComplete="perangkat"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="dark" className="px-4">
                          Tambahkan
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Device