import { React, useState, useEffect } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import axios from "axios";
const Register = () => {
  const [loginStatus, setLoginStatus] = useState();
  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    password: "",
    passwordConfirmation: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    // setUserData[name] = event.target.value;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value
      }
      
    })

    // if (name === "password" || name === "passwordConfirmation") {
    //   if (userData.password === userData.passwordConfirmation) {
    //     setLoginStatus(1)
    //   } else {
    //     setLoginStatus(0);
    //   }
    // }

    //  console.log(userData);
  }

  const handleSubmit = () => {
    const InputUserData = async (userData) => {
      const res = await axios.post("http://localhost:3000/api/InsertNewUser", userData);
    }
    if (userData.password === userData.passwordConfirmation) {
      setLoginStatus();
      InputUserData(userData);
      console.log("User inputted");
      setUserData({
        username: "",
        fullName: "",
        password: "",
        passwordConfirmation: ""
      })
    } else {
      setLoginStatus(0);
      console.log("Password is not the same");
    }

  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Vessel Barbershop Monitoring</h1>
                  <p className="text-medium-emphasis">Buat Akun Baru</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Nama" autoComplete="username" name="fullName" value={userData.fullName} onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" name="username" value={userData.username} onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password" value={userData.password} onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Konfirmasi password"
                      autoComplete="new-password"
                      name="passwordConfirmation"
                      value={userData.passwordConfirmation}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  {(loginStatus === 0) && <p style={{color: 'red'}}>Password dan konfirmasi password berbeda. Mohon cek ulang.</p>} 
                  <div className="d-grid">
                    <CButton color="dark" onClick={handleSubmit}>Daftar</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
