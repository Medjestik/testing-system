import React from 'react';
import './Page.css';
import logo from '../../images/rzd-logo.png';
import Login from '../Login/Login.js';
import LoginPopup from '../LoginPopup/LoginPopup.js';

function Page({ onLogin, loginError, onHideLoginError, isLoadingLogin }) {

  const [isOpenLoginPopup, setIsOpenLoginPopup] = React.useState(false);

  function openLoginPopup() {
    setIsOpenLoginPopup(true);
  }

  function closeLoginPopup() {
    setIsOpenLoginPopup(false);
  }

  return (
    <>
    <div className='page'>
      <div className='page__img'></div>
      <section className='page__section'>
        <div className='page__container'>
          <img className='page__logo' src={logo} alt="логотип РЖД"></img>
          <h1 className='page__title'>Комплексная система тестирования по вопросам ОТ при&nbsp;назначении на&nbsp;должность</h1>
          <Login
            onLogin={onLogin}
            loginError={loginError}
            onHideLoginError={onHideLoginError}
            isLoadingLogin={isLoadingLogin}
          />
          <p className='page__caption' onClick={openLoginPopup}>Нет логина или пароля?</p>
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