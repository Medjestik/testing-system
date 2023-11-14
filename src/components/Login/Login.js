import React from 'react';
import './Login.css';

function Login({ onLogin, loginError, onHideLoginError, isLoadingLogin }) {

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [blockSubmitButton, setBlockSubmitButton] = React.useState(true);
  const [errorLogin, setErrorLogin] = React.useState({});
  const [errorPassword, setErrorPassword] = React.useState({});

  const errorForm = errorLogin.error || errorPassword.error || login.length < 1 || password.length < 1

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ login, password });
  }

  function handleChangeEmail(e) {
    setLogin(e.target.value);
    onHideLoginError();
    if (e.target.checkValidity()) {
      setErrorLogin({
          errorText: '',
          error: false
      });
    }
    else {
      setErrorLogin({
          errorText: 'Поле не может быть пустым',
          error: true
      });
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    onHideLoginError();
    if (e.target.checkValidity()) {
      setErrorPassword({
          errorText: '',
          error: false
      });
    }
    else {
        setErrorPassword({
            errorText: 'Поле не может быть пустым',
            error: true
        });
    }  
  }

  React.useEffect(() => {
    setLogin('');
    setPassword('');
    setBlockSubmitButton(true);
    onHideLoginError();
    setErrorLogin({
      errorText: '',
      error: false
    });
    setErrorPassword({
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
    <form className="login__form" name="login-form" action="#" noValidate onSubmit={handleSubmit} autoComplete='off'>
      <div className="login__form-line">
        <input 
          className="login__input"
          placeholder="Введите логин.."
          minLength="1"
          type="text" 
          id="login"
          name="login" 
          value={login}
          onChange={handleChangeEmail}
          required
          autoComplete='off'
        >
        </input>
        <span className={`login__input-error ${errorLogin.error ? "login__input-error_active" : ""}`}>
          {errorLogin.errorText}
        </span>
      </div>
      <div className="login__form-line">
        <input 
          className="login__input"
          placeholder="Введите пароль.."
          minLength="1"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChangePassword}
          required
          autoComplete='new-password'
        >
        </input>
        <span className={`login__input-error ${errorPassword.error ? "login__input-error_active" : ""}`}>
          {errorPassword.errorText}
        </span>
      </div>
      <div className="login__submit">
        <span className={`login__submit-error ${loginError ? "login__submit-error_type_show" : "login__submit-error_type_hide"}`}> 
          Неправильный логин или пароль
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

export default Login;