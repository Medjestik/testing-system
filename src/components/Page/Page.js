import React from 'react';
import { Link } from 'react-router-dom';
import './Page.css';
import logo from '../../images/rzd-logo.png';
import Login from '../Login/Login.js';
import LoginUser from '../Login/LoginUser/LoginUser.js';
import LoginPopup from '../LoginPopup/LoginPopup.js';
import * as api from '../../utils/api.js';

const ALERT_STATES = ['warning', 'danger', 'success', 'info'];

function Page({ onLogin, onLoginUser, loginError, onHideLoginError, isLoadingLogin }) {

  const [isOpenLoginPopup, setIsOpenLoginPopup] = React.useState(false);
  const [alertSettings, setAlertSettings] = React.useState(null);

  const [currentRole, setCurrentRole] = React.useState('user');

  function closeLoginPopup() {
    setIsOpenLoginPopup(false);
  }

  React.useEffect(() => {
    setCurrentRole('user');
    api.getPublicSettings()
      .then((res) => {
        setAlertSettings(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const alertState = alertSettings && ALERT_STATES.includes(alertSettings.alert_state)
    ? alertSettings.alert_state
    : 'info';

  return (
    <>
    <div className='page'>
      <div className='page__img'>
        {
          alertSettings && alertSettings.show_alert &&
          <div className={`page__alert page__alert_${alertState}`} role="alert">
            <p className='page__alert-text'>{alertSettings.alert_message}</p>
            <Link className='page__alert-link' to="/register">Регистрация</Link>
          </div>
        }
      </div>
      <section className='page__section'>
        <div className='page__container'>
          <div className='page__head'>
            <img className='page__logo' src={logo} alt="логотип РЖД"></img>
            <h1 className='page__title'>Комплексная система тестирования по вопросам ОТ при&nbsp;назначении на&nbsp;должность</h1>
          </div>

          <div className='page__auth'>
            <p className='page__subtitle'>Выберите вашу роль и введите данные для авторизации</p>
            <div className='page__roles'>
              <div className={`page__role ${currentRole === 'user' && 'page__role_status_active'}`} onClick={() => setCurrentRole('user')}>
                <div className='page__role-icon page__role-icon_type_user'></div>
                <span className='page__role-name'>Тестируемый</span>
              </div>
              <div className={`page__role ${currentRole === 'mod' && 'page__role_status_active'}`} onClick={() => setCurrentRole('mod')}>
                <div className='page__role-icon page__role-icon_type_moderator'></div>
                <span className='page__role-name'>Пользователь</span>
              </div>
            </div>

            {
              currentRole === 'mod' &&
              <Login
                onLogin={onLogin}
                loginError={loginError}
                onHideLoginError={onHideLoginError}
                isLoadingLogin={isLoadingLogin}
              />
            }

            {
              currentRole === 'user' &&
              <LoginUser
                onLogin={onLoginUser}
                loginError={loginError}
                onHideLoginError={onHideLoginError}
                isLoadingLogin={isLoadingLogin}
              />
            }
          </div>

          <p className='page__caption'>
            <Link className='page__caption-link' to="/register">Регистрация</Link>
          </p>
          
        </div>
      </section>
    </div>
    {
      isOpenLoginPopup &&
      <LoginPopup 
      isOpen={isOpenLoginPopup}
      onClose={closeLoginPopup}
      />
    }
    </>
  );
}

export default Page;