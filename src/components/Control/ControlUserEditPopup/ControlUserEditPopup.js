import React from 'react';
import Popup from '../../Popup/Popup.js';

function ControlUserEditPopup({ isOpen, onClose, onEdit, isLoading, isShowError, filial, roles, tests, currentUser, user }) { 

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
  const [filialId, setFilialId] = React.useState(currentUser.filial.id);
  const [roleId, setRoleId] = React.useState(currentUser.role.id);
  const [testId, setTestId] = React.useState(currentUser.test.testId);
  const [attempts, setAttempts] = React.useState(currentUser.test.attempts);
  const [errorAttempts, setErrorAttempts] = React.useState(false);
  const [practiceAttempts, setPracticeAttempts] = React.useState(currentUser.test.practiceAttempts);
  const [userPhoto, setUserPhoto] = React.useState(currentUser.test.userPhoto);
  const [phone, setPhone] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [date, setDate] = React.useState(currentUser.valid_till);
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
      id: currentUser.id,
      phone: phone,
      email: mail,
      valid_till: date,
    }

    onEdit(newUser, onClose);
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

  function handleChangeDate(e) {
    setDate(e.target.value);
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
    setFirstname(currentUser.firstname);
    setErrorFirstname(false);
    setLastname(currentUser.lastname);
    setErrorLastname(false);
    setMiddlename(currentUser.middlename);
    setErrorMiddlename(false);
    setPosition(currentUser.position);
    setErrorPosition(false);
    setDivision(currentUser.division);
    setErrorDivision(false);
    setFilialId(currentUser.filial.id);
    setRoleId(currentUser.role.id);
    setTestId(currentUser.test.testId);
    setAttempts(currentUser.test.attempts);
    setErrorAttempts(false);
    setPracticeAttempts(currentUser.test.practiceAttempts);
    setUserPhoto(currentUser.test.userPhoto);
    setPhone(currentUser.phone);
    setMail(currentUser.email);
    setDate(currentUser.valid_till);
    setIsBlockSubmitButton(true);
  }, [isOpen, currentUser]);

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
      <form className="popup__form popup__form_type_large" name="control-user-edit-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Редактирование пользователя</h3>
        <ul className="popup__list-input">
          <li className="popup__item-input">
            <h5 className="popup__input-name">Фамилия*</h5>
            <input 
            className="popup__input"
            placeholder="введите фамилию"
            type="text"
            id="edit-new-user-lastname"
            name="edit-new-user-lastname"
            autoComplete="off"
            minLength="2"
            value={lastname || ""}
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
            placeholder="введите имя"
            type="text"
            id="edit-new-user-firstname"
            name="edit-new-user-firstname"
            autoComplete="off"
            minLength="2"
            value={firstname || ""}
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
            placeholder="введите отчество"
            type="text"
            id="edit-new-user-middlename"
            name="edit-new-user-middlename"
            autoComplete="off"
            minLength="2"
            value={middlename || ""}
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
            id="edit-new-user-division"
            name="edit-new-user-division"
            autoComplete="off"
            minLength="2"
            value={division || ""}
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
            id="edit-new-user-position"
            name="edit-new-user-position"
            autoComplete="off"
            minLength="2"
            value={position || ""}
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
                id="edit-new-user-filial"
                name="edit-new-user-filial"
                onChange={handleChangeFilial}
                defaultValue={filialId || ""}
                required   
                >
                  <option value="placeholder" disabled hidden>Выберите филиал</option>
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
                id="edit-new-user-role"
                name="edit-new-user-role"
                onChange={handleChangeRole}
                defaultValue={roleId || ""}
                required   
                >
                  <option value="placeholder" disabled hidden>Выберите роль</option>
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
                id="edit-new-user-test"
                name="edit-new-user-test"
                onChange={handleChangeTest}
                defaultValue={testId || ""}
                required   
                >
                  <option value="placeholder" disabled hidden>Выберите тестирование</option>
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
              id="edit-new-user-attempts"
              name="edit-new-user-attempts"
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
                value={phone || ""}
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
                value={mail || ""}
                onChange={handleChangeMail}
                required
                >
                </input>
              </li>
              <li className="popup__item-input">
                <h5 className="popup__input-name">Дата доступа</h5>
                <input 
                className="popup__input"
                placeholder="введите дату"
                type="date"
                id="add-new-user-date"
                name="add-new-user-date"
                autoComplete="off"
                value={date || ""}
                onChange={handleChangeDate}
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
        <button className={`btn btn_type_save popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>

      </form>
    </Popup>
  )
}

export default ControlUserEditPopup;