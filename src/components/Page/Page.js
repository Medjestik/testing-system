import React from 'react';
import './Page.css';
import logo from '../../images/rzd-logo.png';
import Login from '../Login/Login.js';

function Page({ onLogin, loginError, onHideLoginError, isLoadingLogin }) {

  return (
    <div className='page'>
      <div className='page__img'></div>
      <section className='page__section'>
        <div className='page__container'>
          <img className='page__logo' src={logo} alt="логотип РЖД"></img>
          <h1 className='page__title'>Комплексная система тестирования по вопросам ОТ при назначении на должность</h1>
          <Login
            onLogin={onLogin}
            loginError={loginError}
            onHideLoginError={onHideLoginError}
            isLoadingLogin={isLoadingLogin}
          />
          <p className='page__caption'>Для доступа к системе необходим логин и пароль, который Вы можете получить у сотрудника, ответственного за проведение тестирования в Вашем филиале.</p>
          <p className='page__caption'>Если Вы являетесь лицом, ответственным за тестирование в филиале, то пожалуйста. свяжитесь с технической поддержкой, чтобы получить логин и пароль для доступа к системе. Адрес тех. поддержки: ief07@bk.ru. Номер телефона тех. поддрежки: 84996535516 В письме необходимо указать название Вашего филиала, должность, контактный телефон и адрес электронной почты в сети Интернет.</p>
          
        </div>
      </section>
    </div>
  );
}

export default Page;