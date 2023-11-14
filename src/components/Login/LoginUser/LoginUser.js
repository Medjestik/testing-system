import React from 'react';
import '../Login.css';

function LoginUser({ onLogin, loginError, onHideLoginError, isLoadingLogin }) {

  const [name, setName] = React.useState('');
  const [code, setCode] = React.useState('');
  const [blockSubmitButton, setBlockSubmitButton] = React.useState(true);
  const [errorName, setErrorName] = React.useState({});
  const [errorCode, setErrorCode] = React.useState({});

  const errorForm = errorName.error || errorCode.error || name.length < 1 || code.length < 1

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ name, code });
  }

  function handleChangeName(e) {
    setName(e.target.value);
    onHideLoginError();
    if (e.target.checkValidity()) {
      setErrorName({
          errorText: '',
          error: false
      });
    }
    else {
        setErrorName({
          errorText: 'Поле не может быть пустым',
          error: true
      });
    }
  }

  function handleChangeCode(e) {
    setCode(e.target.value);
    onHideLoginError();
    if (e.target.checkValidity()) {
        setErrorCode({
          errorText: '',
          error: false
      });
    }
    else {
        setErrorCode({
            errorText: 'Поле не может быть пустым',
            error: true
        });
    }  
  }

  React.useEffect(() => {
    setName('');
    setCode('');
    setBlockSubmitButton(true);
    onHideLoginError();
    setErrorName({
      errorText: '',
      error: false
    });
    setErrorCode({
      errorText: '',
      error: false
    });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!errorForm) {
      setBlockSubmitButton(false);
    } else {
      setBlockSubmitButton(true);

    }
  }, [errorForm]);


  return (
    <form className="login__form" name="login-user-form" action="#" noValidate onSubmit={handleSubmit} autoComplete='off'>
      <div className="login__form-line">
        <input 
          className="login__input"
          placeholder="Введите ваше ФИО.."
          minLength="1"
          type="text" 
          id="login-name"
          name="login-name" 
          value={name}
          onChange={handleChangeName}
          required
          autoComplete='off'
        >
        </input>
        <span className={`login__input-error ${errorName.error ? "login__input-error_active" : ""}`}>
          {errorName.errorText}
        </span>
      </div>
      <div className="login__form-line">
        <input 
          className="login__input"
          placeholder="Введите код доступа.."
          minLength="1"
          type="text"
          id="text"
          name="login-code"
          value={code}
          onChange={handleChangeCode}
          required
          autoComplete='new-password'
        >
        </input>
        <span className={`login__input-error ${errorCode.error ? "login__input-error_active" : ""}`}>
          {errorCode.errorText}
        </span>
      </div>
      <div className="login__submit">
        <span className={`login__submit-error ${loginError ? "login__submit-error_type_show" : "login__submit-error_type_hide"}`}> 
          Неправильный код доступа
        </span>
        <button 
          className={`login__submit-button ${blockSubmitButton ? "login__submit-button_type_block" : ""} ${isLoadingLogin ? "login__submit-button_type_block" : ""}`} 
          type="submit"
        >
          {isLoadingLogin ? "Загрузка.." : "Войти"}
        </button>
      </div>
    </form>
  )
}

export default LoginUser;