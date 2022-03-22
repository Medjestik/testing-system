import React from 'react';
import Popup from '../Popup/Popup.js';
import './LoginPopup.css';

function LoginPopup({ isOpen, onClose }) {

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <div className='login-popup'>
        <p className='popup__subtitle'>Для доступа к системе необходим логин и пароль, который Вы можете получить у сотрудника, ответственного за проведение тестирования в Вашем филиале.</p>
        <p className='popup__subtitle'>Если Вы являетесь лицом, ответственным за тестирование в филиале, то пожалуйста. свяжитесь с технической поддержкой, чтобы получить логин и пароль для доступа к системе. Адрес тех. поддержки: ief07@bk.ru. Номер телефона тех. поддрежки: 84996535516 В письме необходимо указать название Вашего филиала, должность, контактный телефон и адрес электронной почты в сети Интернет.</p>
      </div>

    </Popup>
  )
}

export default LoginPopup;