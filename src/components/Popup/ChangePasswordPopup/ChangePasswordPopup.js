import React from 'react';
import '../Popup.css';

function ChangePasswordPopup({ isOpen, onConfirm, isLoadingRequest }) {

  const [newPassword, setNewPassword] = React.useState('');
  const [newPasswordError, setNewPasswordError] = React.useState({ isShow: false, text: '' });

  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [repeatPasswordError, setRepeatPasswordError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit() {
    onConfirm(newPassword);
  }

  const checkPassword = (value) => {
    // Проверка длины пароля
    const isLengthValid = value.length >= 12;

    // Проверка наличия строчных букв
    const hasLowerCase = /[a-z]/.test(value);

    // Проверка наличия прописных букв
    const hasUpperCase = /[A-Z]/.test(value);

    // Проверка наличия цифр
    const hasDigit = /\d/.test(value);

    // Проверка наличия знаков препинания
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);

    // Общая валидация пароля
    const isValidPassword = isLengthValid && hasLowerCase && hasUpperCase && hasDigit && hasSpecialChar;

    if (isValidPassword) {
      setNewPasswordError({ text: '', isShow: false });
    } else {
      setNewPasswordError({ text: 'Пароль не соответствует правилам безопасности', isShow: true });
    }
  };

  function changeNewPassword(e) {
    setNewPassword(e.target.value);
    checkPassword(e.target.value);
  }

  function changeRepeatPassword(e) {
    setRepeatPassword(e.target.value);
    if (e.target.value === newPassword) {
      setRepeatPasswordError({ text: '', isShow: false });
    } else {
      setRepeatPasswordError({ text: 'Пароли не совпадают', isShow: true });
    }
  }

  React.useEffect(() => {
    if (newPassword.length < 1 || repeatPassword.length < 1 || newPasswordError.isShow || repeatPasswordError.isShow) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [newPassword, repeatPassword]);

  React.useEffect(() => {
    setNewPassword('');
    setNewPasswordError({ isShow: false, text: '' });
    setRepeatPassword('');
    setRepeatPasswordError({ isShow: false, text: '' });
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
    <div className="popup__container">
      <div className='popup__form'>
          <h2 className='popup__title'>Изменения пароля</h2>
          <p className='popup__subtitle'>Вам необходимо изменить пароль.</p>

          <label className='popup__item-input'>
            <h4 className='popup__input-name'>Пароль:</h4>
            <input 
              className='popup__input'
              type='text'
              id='newPassword'
              value={newPassword}
              onChange={changeNewPassword}
              name='newPassword'
              placeholder='Введите ваш новый пароль'
              minLength='6'
              autoComplete='disabled'
              required 
            />
            <span className={`popup__input-error ${newPasswordError.isShow ? 'popup__input-error_type_show' : ''}`}>
              {newPasswordError.text}
            </span>
          </label>

          <label className='popup__item-input'>
            <h4 className='popup__input-name'>Повторите пароль:</h4>
            <input 
              className='popup__input'
              type='text'
              id='repeatPassword'
              value={repeatPassword}
              onChange={changeRepeatPassword}
              name='repeatPassword' 
              placeholder='Повторите ваш новый пароль' 
              minLength='6'
              autoComplete='disabled'
              required 
            />
            <span className={`popup__input-error ${repeatPasswordError.isShow ? 'popup__input-error_type_show' : ''}`}>
              {repeatPasswordError.text}
            </span>
          </label>

          {
            isLoadingRequest ? 
            <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Обновление..</button>
            :
            <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='button' onClick={handleSubmit}>Обновить</button>
          }
        </div>  
      </div>
  </div>
  )
}

export default ChangePasswordPopup;