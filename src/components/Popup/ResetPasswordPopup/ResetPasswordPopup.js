import React from 'react';
import Popup from '../Popup.js';

function ResetPasswordPopup({ isOpen, onClose, onConfirm, item, isLoadingRequest }) {

  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    >
      <div className='popup__form'>
        <h2 className='popup__title'>Сброс пароля</h2>
        <p className='popup__subtitle'>Вы действительно хотите сбросить пароль на&nbsp;базовый?</p>

        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Обновление..</button>
          :
          <button className='popup__btn-save' type='button' onClick={() => onConfirm(item)}>Обновить</button>
        }
      </div>
    </Popup>
  )
}

export default ResetPasswordPopup;