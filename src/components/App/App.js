import React from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import * as api from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Page from '../Page/Page.js';
import Main from '../Main/Main.js';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = React.useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleLogin({ login, password }) {
    setLoginError(false);
    setIsLoadingLogin(true);
    api.login({ login, password })
    .then((res) => {
      localStorage.setItem("token", res.access_token);
      tokenCheck();
    })
    .catch((err) => {
      setLoginError(true);
    })
    .finally(() => {
      setIsLoadingLogin(false);
    });
  }

  function handleHideLoginError() {
    setLoginError(false);
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoadingPage(true);
      api.getMe({ token: token })
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            if (pathname === "/") {
              navigate("/main/test");
            } else {
              navigate(pathname);
            }
          } else {
            localStorage.removeItem("token");
            setLoggedIn(false);
            setCurrentUser({});
          }
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingPage(false);
        });
    }
  }

  function handleLogout() {
    const token = localStorage.getItem("token");
    api.logout({ token: token })
    .then(() => {
      localStorage.removeItem('token');
      setLoggedIn(false);
      setCurrentUser({});
      navigate('/');
    })
    .catch((err) => {
      console.error(err);
    })
  }

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      {
        isLoadingPage ?
        <Preloader />
        :
        <Routes>
          <Route exact path="/" element={
            <Page 
              onLogin={handleLogin}
              loginError={loginError}
              onHideLoginError={handleHideLoginError}
              isLoadingLogin={isLoadingLogin}
            />
          }
          />

          <Route path="/main/*" element={
            loggedIn === true ? 
            <Main
              loggedIn={loggedIn}
              onLogout={handleLogout}
            /> 
            : 
            <Navigate to="/" />}
          />
        </Routes> 
      }
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
