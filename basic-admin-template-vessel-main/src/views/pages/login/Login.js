import { React, useState, useEffect } from 'react'
import { Link, useNavigate, Routes, Route, Navigate } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios';

const Login = () => {
  //validate username
  const [loginStatus, setLoginStatus] = useState();
  const [userData, setUserData] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");

  const handlePasswordInput = (event) => {
    setPass(event.target.value);
    // console.log(event.target);
  };

  const handleUserInput = (event) => {
    setUser(event.target.value);
  }

  const submitData = () => {
    axios.post("http://localhost:3000/api/CheckUsernameExist",
    { data: { username: user, password: pass } }
  ).then((res) => {
    setLoginStatus(res.data.body.credentialValid)
  });
  }

  // useEffect(() => {
  //   console.log(loginStatus);
  //   if (loginStatus == 1) {
  //     // useNavigate("/");
  //   }
  // }, [loginStatus]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Vessel Barbershop Monitoring</h1>
                    <p className="text-medium-emphasis">Masuk ke Akunmu</p>
                    {(loginStatus === 0) && <p style={{color: 'red'}}>Username atau password salah. Silakan ulangi.</p>} 
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                      placeholder="Email" 
                      autoComplete="username" 
                      value={user} 
                      onChange={handleUserInput}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={pass}
                        onChange = {handlePasswordInput}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton 
                        color="dark" 
                        className="px-4"
                        onClick={submitData}
                        >
                          Masuk
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Lupa password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '45%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Vessel Philosophy</h2>
                    <h4> A Ship or Large Boat</h4>
                    <h6> A person, especially regarded as </h6>
                    <h6>holding or embodying a particular quality</h6>
                    <Link to="/register">
                      <CButton color="dark" className="mt-3" active tabIndex={-1}>
                        Buat Akun
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <Routes>
      <Route
      path="/"
      element={ (loginStatus == 1) && <Navigate replace to="/" /> }
  />;
      </Routes>
      
    </div>
  )
}

export default Login
