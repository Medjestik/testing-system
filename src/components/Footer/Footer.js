import React from 'react';
import './Footer.css';

function Footer() {

  return (
    <footer className='footer'>
      <div className='container footer__container'>
        <h3 className='footer__title'>Контактная информация</h3>
        <ul className='footer__contact-list'>
          <li className='footer__contact-item'>
            <h5 className='footer__contact-title'>Департамент экологии и техносферной безопасности (ЦБТ)</h5>
            <p className='footer__contact-caption'>+7 (499) 262-04-77</p>
          </li>
          <li className='footer__contact-item'>
            <h5 className='footer__contact-title'>Техническая поддержка системы</h5>
            <p className='footer__contact-caption'>+7 (499) 653-55-16</p>
          </li>
        </ul>
        <p className='footer__copy'>&copy; 2021 Все права защищены, ИЭФ РУТ (МИИТ)</p>
      </div>
    
    </footer>
  );
}

export default Footer;