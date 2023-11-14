import React from 'react';
import './Page.css';
import logo from '../../images/rzd-logo.png';
import Login from '../Login/Login.js';
import LoginUser from '../Login/LoginUser/LoginUser.js';
import LoginPopup from '../LoginPopup/LoginPopup.js';

function Page({ onLogin, loginError, onHideLoginError, isLoadingLogin }) {

  const [isOpenLoginPopup, setIsOpenLoginPopup] = React.useState(false);

  const [currentRole, setCurrentRole] = React.useState('user');

  function openLoginPopup() {
    setIsOpenLoginPopup(true);
  }

  function closeLoginPopup() {
    setIsOpenLoginPopup(false);
  }

  React.useEffect(() => {
    setCurrentRole('user');
  }, []);

  return (
    <>
    <div className='page'>
      <div className='page__img'></div>
      <section className='page__section'>
        <div className='page__container'>
          <img className='page__logo' src={logo} alt="логотип РЖД"></img>
          <h1 className='page__title'>Комплексная система тестирования по вопросам ОТ при&nbsp;назначении на&nbsp;должность</h1>
          <p className='page__subtitle'>Выберите вашу роль и введите данные для авторизации</p>
          <div className='page__roles'>
            <div className={`page__role ${currentRole === 'user' && 'page__role_status_active'}`} onClick={() => setCurrentRole('user')}>
              <div className='page__role-icon page__role-icon_type_user'></div>
              <span className='page__role-name'>Участник</span>
            </div>
            <div className={`page__role ${currentRole === 'mod' && 'page__role_status_active'}`} onClick={() => setCurrentRole('mod')}>
              <div className='page__role-icon page__role-icon_type_moderator'></div>
              <span className='page__role-name'>Модератор</span>
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
              onLogin={onLogin}
              loginError={loginError}
              onHideLoginError={onHideLoginError}
              isLoadingLogin={isLoadingLogin}
            />
          }


          {
            /*
              <p className='page__caption' onClick={openLoginPopup}>Нет логина или пароля?</p>
            */
          }
          
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