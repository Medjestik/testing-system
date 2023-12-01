import React from 'react';
import Popup from '../Popup.js';

function ConfirmRemovePopup({ isOpen, onClose, onConfirm, item, isLoadingRequest }) {

  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    >
      <h2 className='popup__title'>Запрос на удаление</h2>
      <p className='popup__subtitle'>Вы действительно хотите отправить запрос на&nbsp;удаление?</p>

      {
        isLoadingRequest ? 
        <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Удаление..</button>
        :
        <button className='popup__btn-save' type='button' onClick={() => onConfirm(item)}>Удалить</button>
      }

    </Popup>
  )
}

export default ConfirmRemovePopup;