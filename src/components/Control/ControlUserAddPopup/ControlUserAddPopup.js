import React from 'react';
import Popup from '../../Popup/Popup.js';

function ControlUserAddPopup({ isOpen, onClose, onAdd, isLoading, isShowError, filial, roles, tests, user }) { 

  const [firstname, setFirstname] = React.useState("");
  const [errorFirstname, setErrorFirstname] = React.useState(false);
  const [lastname, setLastname] = React.useState("");
  const [errorLastname, setErrorLastname] = React.useState(false);
  const [middlename, setMiddlename] = React.useState("");
  const [errorMiddlename, setErrorMiddlename] = React.useState(false);
  const [division, setDivision] = React.useState("");
  const [errorDivision, setErrorDivision] = React.useState(false);
  const [position, setPosition] = React.useState("");
  const [errorPosition, setErrorPosition] = React.useState(false);
  const [filialId, setFilialId] = React.useState(filial.length === 1 ? filial[0].id : "placeholder");
  const [roleId, setRoleId] = React.useState(roles.length === 1 ? roles[0].id : "placeholder");
  const [testId, setTestId] = React.useState(tests.length === 1 ? tests[0].id : "placeholder");
  const [attempts, setAttempts] = React.useState(1);
  const [errorAttempts, setErrorAttempts] = React.useState(false);
  const [practiceAttempts, setPracticeAttempts] = React.useState(false);
  const [userPhoto, setUserPhoto] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      position: position,
      division: division || "",
      filialId: filial.length === 1 ? filial[0].id : filialId,
      roleId: roles.length === 1 ? roles[0].id : roleId,
      testId: roles.length === 1 ? tests[0].id : testId,
      attempts: attempts,
      practiceAttempts: practiceAttempts,
      userPhoto: userPhoto,
      phone: phone,
      email: mail,
    }

    onAdd(newUser, onClose);
  }

  function handleAddFirstname(e) {
    setFirstname(e.target.value);
    if (e.target.checkValidity()) {
      setErrorFirstname(false);
    } else {
      setErrorFirstname(true);
    }
  }

  function handleAddLastname(e) {
    setLastname(e.target.value);
    if (e.target.checkValidity()) {
      setErrorLastname(false);
    } else {
      setErrorLastname(true);
    }
  }

  function handleAddMiddlename(e) {
    setMiddlename(e.target.value);
    if (e.target.checkValidity()) {
      setErrorMiddlename(false);
    } else {
      setErrorMiddlename(true);
    }
  }

  function handleAddPosition(e) {
    setPosition(e.target.value);
    if (e.target.checkValidity()) {
      setErrorPosition(false);
    } else {
      setErrorPosition(true);
    }
  }

  function handleAddDivision(e) {
    setDivision(e.target.value);
    if (e.target.checkValidity()) {
      setErrorDivision(false);
    } else {
      setErrorDivision(true);
    }
  }

  function handleChangeFilial(e) {
    setFilialId(e.target.value);
  }

  function handleChangeRole(e) {
    setRoleId(e.target.value);
  }

  function handleChangeTest(e) {
    setTestId(e.target.value);
  }

  function handleChangePhone(e) {
    setPhone(e.target.value);
  }

  function handleChangeMail(e) {
    setMail(e.target.value);
  }

  function handleChangeAttempts(e) {
    setAttempts(e.target.value);
    if (e.target.checkValidity()) {
      setErrorAttempts(false);
    } else {
      setErrorAttempts(true);
    }
  }

  React.useEffect(() => {
    setFirstname('');
    setErrorFirstname(false);
    setLastname('');
    setErrorLastname(false);
    setMiddlename('');
    setErrorMiddlename(false);
    setPosition('');
    setErrorPosition(false);
    setDivision("");
    setErrorDivision(false);
    setFilialId(filial.length === 1 ? filial[0].id : "placeholder");
    setRoleId(roles.length === 1 ? roles[0].id : "placeholder");
    setTestId(tests.length === 1 ? tests[0].id : "placeholder");
    setAttempts(1);
    setErrorAttempts(false);
    setPracticeAttempts(false);
    setUserPhoto(false);
    setPhone("");
    setMail("");
    setIsBlockSubmitButton(true);
  }, [isOpen, filial, roles, tests]);

  React.useEffect(() => {
    if (
      errorFirstname || 
      firstname.length < 2 ||
      errorLastname || 
      lastname.length < 2 ||
      errorMiddlename || 
      middlename.length < 2 ||
      errorPosition || 
      position.length < 2 ||
      errorDivision ||
      division.length < 2 ||
      roleId === "placeholder" ||
      filialId === "placeholder" ||
      testId === "placeholder" ||
      errorAttempts ||
      attempts < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [firstname, lastname, middlename, position, division, filialId, roleId, testId, attempts]);

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="control-user-add-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Добавление нового пользователя</h3>
        <ul className="popup__list-input">
          <li className="popup__item-input">
            <h5 className="popup__input-name">Фамилия*</h5>
            <input 
            className="popup__input"
            placeholder="введите фамилию пользователя"
            type="text"
            id="add-new-user-lastname"
            name="add-new-user-lastname"
            autoComplete="off"
            minLength="2"
            value={lastname}
            onChange={handleAddLastname}
            required
            >
            </input>
            <span className={`popup__input-error ${errorLastname ? "popup__input-error_type_show" : ""}`}>Фамилия должна быть не короче 2 символов</span>
          </li>
          <li className="popup__item-input">
            <h5 className="popup__input-name">Имя*</h5>
            <input 
            className="popup__input"
            placeholder="введите имя пользователя"
            type="text"
            id="add-new-user-firstname"
            name="add-new-user-firstname"
            autoComplete="off"
            minLength="2"
            value={firstname}
            onChange={handleAddFirstname}
            required
            >
            </input>
            <span className={`popup__input-error ${errorFirstname ? "popup__input-error_type_show" : ""}`}>Имя должно быть не короче 2 символов</span>
          </li>
          <li className="popup__item-input">
            <h5 className="popup__input-name">Отчество*</h5>
            <input 
            className="popup__input"
            placeholder="введите отчество пользователя"
            type="text"
            id="add-new-user-middlename"
            name="add-new-user-middlename"
            autoComplete="off"
            minLength="2"
            value={middlename}
            onChange={handleAddMiddlename}
            required
            >
            </input>
            <span className={`popup__input-error ${errorMiddlename ? "popup__input-error_type_show" : ""}`}>Отчество должно быть не короче 2 символов</span>
          </li>
          <li className="popup__item-input">
            <h5 className="popup__input-name">Подразделение*</h5>
            <input 
            className="popup__input"
            placeholder="введите подразделение"
            type="text"
            id="add-new-user-division"
            name="add-new-user-division"
            autoComplete="off"
            minLength="2"
            value={division}
            onChange={handleAddDivision}
            required
            >
            </input>
            <span className={`popup__input-error ${errorDivision ? "popup__input-error_type_show" : ""}`}>Введите корректное подразделение</span>
          </li>
          <li className="popup__item-input">
            <h5 className="popup__input-name">Должность*</h5>
            <input 
            className="popup__input"
            placeholder="введите должность"
            type="text"
            id="add-new-user-position"
            name="add-new-user-position"
            autoComplete="off"
            minLength="2"
            value={position}
            onChange={handleAddPosition}
            required
            >
            </input>
            <span className={`popup__input-error ${errorPosition ? "popup__input-error_type_show" : ""}`}>Введите корректную должность</span>
          </li>

          <li className={`popup__item-input`}>
              <h5 className="popup__input-name">Филиал*</h5>
              <div className="select-wrapper">
                <select           
                id="add-new-user-filial"
                name="add-new-user-filial"
                onChange={handleChangeFilial}
                defaultValue={filialId}
                required   
                >
                  <option value={filial.length === 1 ? filial[0].id : "placeholder"} disabled hidden>Выберите филиал</option>
                  {
                    filial.map((fil) => (
                      <option key={fil.id} value={fil.id}>{fil.name}</option>
                    ))
                  }
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>

          <li className={`popup__item-input`}>
              <h5 className="popup__input-name">Роль*</h5>
              <div className="select-wrapper">
                <select           
                id="add-new-user-role"
                name="add-new-user-role"
                onChange={handleChangeRole}
                defaultValue={roleId}
                required   
                >
                  <option value={roles.length === 1 ? roles[0].id : "placeholder"} disabled hidden>Выберите роль</option>
                  {
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))
                  }
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>

            <li className={`popup__item-input`}>
              <h5 className="popup__input-name">Тестирование*</h5>
              <div className="select-wrapper">
                <select           
                id="add-new-user-test"
                name="add-new-user-test"
                onChange={handleChangeTest}
                defaultValue={testId}
                required   
                >
                  <option value={tests.length === 1 ? tests[0].id : "placeholder"} disabled hidden>Выберите тестирование</option>
                  {
                    tests.map((test) => (
                      <option key={test.id} value={test.id}>{test.name}</option>
                    ))
                  }
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>

            <li className="popup__item-input">
              <h5 className="popup__input-name">Количество попыток*</h5>
              <input 
              className="popup__input"
              placeholder="введите количество попыток"
              type="number"
              id="add-new-user-attempts"
              name="add-new-user-attempts"
              autoComplete="off"
              min="1"
              value={attempts || 1}
              onChange={handleChangeAttempts}
              required
              >
              </input>
              <span className={`popup__input-error ${errorAttempts ? "popup__input-error_type_show" : ""}`}>Введите количество попыток</span>
            </li>
            {
              user.role_id < 2 &&
              <>
              <li className="popup__item-input">
                <h5 className="popup__input-name">Телефон</h5>
                <input 
                className="popup__input"
                placeholder="введите телефон"
                type="text"
                id="add-new-user-phone"
                name="add-new-user-phone"
                autoComplete="off"
                value={phone}
                onChange={handleChangePhone}
                required
                >
                </input>
              </li>
              <li className="popup__item-input">
                <h5 className="popup__input-name">Почта</h5>
                <input 
                className="popup__input"
                placeholder="введите почту"
                type="text"
                id="add-new-user-mail"
                name="add-new-user-mail"
                autoComplete="off"
                value={mail}
                onChange={handleChangeMail}
                required
                >
                </input>
              </li>
              </>
            }
            <li className="">
              <label className="checkbox">
                <input 
                  name="practice-attempts"
                  type="checkbox"
                  id="practice-attempts"
                  value={practiceAttempts || false}
                  defaultChecked={practiceAttempts}
                  onChange={() => setPracticeAttempts(!practiceAttempts)}
                  >
                </input>
                <span>Добавить тренировочные попытки</span>
              </label>
              <label className="checkbox">
                <input 
                  name="user-photo"
                  type="checkbox"
                  id="user-photo"
                  value={userPhoto || false}
                  defaultChecked={userPhoto}
                  onChange={() => setUserPhoto(!userPhoto)}
                  >
                </input>
                <span>Добавить фото с веб-камеры</span>
              </label>
            </li>
        </ul>
       
        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <button className={`btn btn_type_save popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Добавление.." : "Добавить"}</button>

      </form>
    </Popup>
  )
}

export default ControlUserAddPopup;