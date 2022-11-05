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
import { cilClipboard, cilLightbulb, cilLockLocked, cilSpeech, cilUser } from '@coreui/icons'

const Helpcenter = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>Pusat Bantuan</h2>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilClipboard} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="User Manual"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLightbulb} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="FAQ"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilSpeech} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Hubungi Kami"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="dark" className="px-4">
                          Kembali
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

export default Helpcenter