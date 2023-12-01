import React from 'react';
import Popup from '../Popup.js';

function RequestPopup({ isOpen, onClose, onConfirm, requestResult, isLoadingRequest }) {

  const [text, setText] = React.useState('');

  function handleSubmit() {
    onConfirm(text);
  }

  function handleChangeText(e) {
    setText(e.target.value);
  }

  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    >
      <div className='popup__form'>
        <h2 className='popup__title'>SQL-запрос</h2>

        <textarea 
          className='popup__textarea popup__textarea_height_medium'
          name='request-text'
          id='request-text'
          placeholder='Введите текст запроса..'            
          value={text}
          onChange={handleChangeText}
          required
        >
        </textarea>

        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Отправление..</button>
          :
          <button className='popup__btn-save' type='button' onClick={handleSubmit}>Отправить</button>
        }

        <textarea 
          className='popup__textarea popup__textarea_height_medium'
          name='request-result'
          id='request-result'
          placeholder='Результат запроса..'            
          value={JSON.stringify(requestResult)}
          disabled
          required
        >
        </textarea>

      </div>


    </Popup>
  )
}

export default RequestPopup;