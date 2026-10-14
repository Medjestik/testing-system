import React from 'react';
import Popup from '../../Popup/Popup.js';
import '../Admin.css';

const ALERT_STATES = ['warning', 'danger', 'success', 'info'];

function SettingPopup({ isOpen, onClose, onSave, setting, isLoading, errorText }) {
  const [key, setKey] = React.useState('');
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    setKey(setting && setting.key ? setting.key : '');
    setValue(setting && setting.value != null ? setting.value : '');
  }, [isOpen, setting]);

  function handleKeyChange(event) {
    const nextKey = event.target.value;
    setKey(nextKey);
    if (nextKey === 'show_alert' && value !== 'true' && value !== 'false') {
      setValue('false');
    }
    if (nextKey === 'alert_state' && !ALERT_STATES.includes(value)) {
      setValue('info');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    onSave({ key: key.trim(), value });
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className='popup__form' onSubmit={handleSubmit}>
        <h2 className='popup__title'>{setting && setting.id ? 'Редактирование настройки' : 'Новая настройка'}</h2>
        <label className='popup__item-input'>
          <span className='popup__input-name'>Ключ</span>
          <input
            className='popup__input'
            name='key'
            value={key}
            onChange={handleKeyChange}
            placeholder='Например, show_alert'
            required
          />
        </label>
        <label className='popup__item-input'>
          <span className='popup__input-name'>Значение</span>
          {key === 'show_alert' && (
            <select className='popup__input' name='value' value={value} onChange={(event) => setValue(event.target.value)}>
              <option value='true'>true</option>
              <option value='false'>false</option>
            </select>
          )}
          {key === 'alert_state' && (
            <select className='popup__input' name='value' value={value} onChange={(event) => setValue(event.target.value)}>
              {ALERT_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          )}
          {key !== 'show_alert' && key !== 'alert_state' && (
            <textarea
              className='popup__textarea popup__textarea_height_small'
              name='value'
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder='Значение'
              required
            />
          )}
        </label>
        {errorText ? <p className='admin__setting-error'>{errorText}</p> : null}
        <button className={`popup__btn-save ${isLoading ? 'popup__btn-save_type_loading' : ''}`} type='submit' disabled={isLoading}>
          {isLoading ? 'Сохранение..' : 'Сохранить'}
        </button>
      </form>
    </Popup>
  );
}

export default SettingPopup;
