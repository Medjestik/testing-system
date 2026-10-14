import React from 'react';
import { Link } from 'react-router-dom';
import '../Page/Page.css';
import '../Login/Login.css';
import './Register.css';
import logo from '../../images/rzd-logo.png';
import * as api from '../../utils/api.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register({ onRegister, registerError, onHideRegisterError, isLoadingRegister }) {
  const [lastname, setLastname] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [middlename, setMiddlename] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [filialId, setFilialId] = React.useState('');
  const [filials, setFilials] = React.useState([]);
  const [filialsError, setFilialsError] = React.useState('');
  const [fieldErrors, setFieldErrors] = React.useState({});

  React.useEffect(() => {
    api.getPublicFilials()
      .then((res) => {
        const list = Array.isArray(res) ? res : (res.data || []);
        setFilials(list);
      })
      .catch(() => {
        setFilialsError('Не удалось загрузить список филиалов. Обновите страницу.');
      });
  }, []);

  function clearFieldError(name) {
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    onHideRegisterError();
  }

  function validate() {
    const nextErrors = {};
    if (!lastname.trim()) {
      nextErrors.lastname = 'Укажите фамилию';
    }
    if (!firstname.trim()) {
      nextErrors.firstname = 'Укажите имя';
    }
    if (!email.trim()) {
      nextErrors.email = 'Укажите email';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = 'Укажите корректный email';
    }
    if (!filialId) {
      nextErrors.filialId = 'Выберите филиал';
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isLoadingRegister) {
      return;
    }
    if (!validate()) {
      return;
    }
    onRegister({
      lastname: lastname.trim(),
      firstname: firstname.trim(),
      middlename: middlename.trim(),
      email: email.trim(),
      filial_id: Number(filialId),
    });
  }

  return (
    <div className='page'>
      <div className='page__img'></div>
      <section className='page__section'>
        <div className='page__container'>
          <div className='page__head'>
            <img className='page__logo' src={logo} alt="логотип РЖД"></img>
            <h1 className='page__title'>Регистрация</h1>
          </div>
          <div className='page__auth'>
            <p className='page__subtitle'>Укажите ФИО, email и филиал</p>
            <form className="login__form register__form" name="register-form" noValidate onSubmit={handleSubmit} autoComplete="off">
              <div className="login__form-line">
                <input
                  className="login__input"
                  placeholder="Фамилия"
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                    clearFieldError('lastname');
                  }}
                  required
                />
                <span className={`login__input-error ${fieldErrors.lastname ? "login__input-error_active" : ""}`}>
                  {fieldErrors.lastname}
                </span>
              </div>
              <div className="login__form-line">
                <input
                  className="login__input"
                  placeholder="Имя"
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                    clearFieldError('firstname');
                  }}
                  required
                />
                <span className={`login__input-error ${fieldErrors.firstname ? "login__input-error_active" : ""}`}>
                  {fieldErrors.firstname}
                </span>
              </div>
              <div className="login__form-line">
                <input
                  className="login__input"
                  placeholder="Отчество (необязательно)"
                  type="text"
                  name="middlename"
                  value={middlename}
                  onChange={(e) => setMiddlename(e.target.value)}
                />
              </div>
              <div className="login__form-line">
                <input
                  className="login__input"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError('email');
                  }}
                  required
                />
                <span className={`login__input-error ${fieldErrors.email ? "login__input-error_active" : ""}`}>
                  {fieldErrors.email}
                </span>
              </div>
              <div className="login__form-line">
                <select
                  className="login__input register__select"
                  name="filial_id"
                  value={filialId}
                  onChange={(e) => {
                    setFilialId(e.target.value);
                    clearFieldError('filialId');
                  }}
                  required
                >
                  <option value="">Выберите филиал</option>
                  {filials.map((filial) => (
                    <option key={filial.id} value={filial.id}>{filial.name}</option>
                  ))}
                </select>
                <span className={`login__input-error ${fieldErrors.filialId ? "login__input-error_active" : ""}`}>
                  {fieldErrors.filialId}
                </span>
              </div>
              {filialsError && <p className="register__hint">{filialsError}</p>}
              <div className="login__submit">
                <span className={`login__submit-error ${registerError.isShow ? "login__submit-error_type_show" : "login__submit-error_type_hide"}`}>
                  {registerError.text}
                </span>
                <button
                  className={`login__submit-button ${isLoadingRegister ? "login__submit-button_type_block" : ""}`}
                  type="submit"
                >
                  {isLoadingRegister ? "Загрузка.." : "Зарегистрироваться"}
                </button>
              </div>
            </form>
          </div>
          <p className='page__caption'>
            <Link className='page__caption-link' to="/">Уже есть учётная запись? Войти</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;
