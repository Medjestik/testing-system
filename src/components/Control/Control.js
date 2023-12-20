import React from 'react';
import './Control.css';
import * as api from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.js';
import ControlUserAddPopup from './ControlUserAddPopup/ControlUserAddPopup.js';
import ControlUserEditPopup from './ControlUserEditPopup/ControlUserEditPopup.js';
import ResetPasswordPopup from '../Popup/ResetPasswordPopup/ResetPasswordPopup.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { API_URL } from '../../utils/config.js';
import Table from '../Table/Table.js';
import Pagination from '../Pagination/Pagination.js';

function Control() {

  const [searchText, setSearchText] = React.useState('');

  const [isAddUserPopupOpen, setIsAddUserPopupOpen] = React.useState(false);
  const [isEditUserPopupOpen, setIsEditUserPopupOpen] = React.useState(false);
  const [isResetPasswordPopupOpen, setIsResetPasswordPopupOpen] = React.useState(false);

  const [isLoadingControl, setIsLoadingControl] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);

  const [isShowErrorRequest, setIsShowErrorRequest] = React.useState({text: "", isShow: false});

  const [filial, setFilial] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [tests, setTests] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const user = React.useContext(CurrentUserContext);

  function getPage(link) {
    setIsLoadingPage(true);
    const token = localStorage.getItem("token");
    api.getPageData({ token: token, link: link })
    .then((res) => {
      setUsers(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingPage(false));
  }

  function handleChangeSearch(e) {
    setSearchText(e.target.value);
  }

  function onSearch() {
    setIsLoadingPage(true);
    console.log(searchText);
    const token = localStorage.getItem("token");
    api.searchPage({ token: token, searchText: searchText })
    .then((res) => {
      console.log(res);
      setUsers(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingPage(false));
  }

  function openAddUserPopup() {
    setIsAddUserPopupOpen(true);
  }

  function handleAddUser(user) {
    setIsShowErrorRequest({text: "", isShow: false});
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.addUser({ token: token, user: user })
    .then((res) => {
      setUsers({...users, data: [res.data, ...users.data]});
      closeControlPopups();
    })
    .catch((err) => {
      setIsShowErrorRequest({ isShow: true, text: "К сожалению, произошла ошибка!" });
      console.error(err);
    })
    .finally(() => setIsLoadingRequest(false));
  }

  function openEditUserPopup(user) {
    setIsEditUserPopupOpen(true);
    setCurrentUser(user);
  }

  function handleEditUser(user) {
    setIsShowErrorRequest({text: "", isShow: false});
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.editUser({ token: token, user: user })
    .then((res) => {
      const index = users.data.indexOf(users.data.find((elem) => (elem.id === res.data.id)));
      setUsers({...users, data: [...users.data.slice(0, index), res.data, ...users.data.slice(index + 1)]});
      closeControlPopups();
    })
    .catch((err) => {
      setIsShowErrorRequest({ isShow: true, text: "К сожалению, произошла ошибка!" });
      console.error(err);
    })
    .finally(() => setIsLoadingRequest(false));
  }

  function openResetPasswordPopup(user) {
    setIsResetPasswordPopupOpen(true);
    setCurrentUser(user);
  }

  function handleResetPassword(user) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.resetPassword({ token: token, user: user })
    .then((res) => {
      console.log(res);
      closeControlPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingRequest(false));
  }

  function closeControlPopups() {
    setIsShowErrorRequest({text: "", isShow: false});
    setIsAddUserPopupOpen(false);
    setIsEditUserPopupOpen(false);
    setIsResetPasswordPopupOpen(false);
    //setIsRemoveUserPopupOpen(false);
  }

  React.useEffect(() => {
    setIsShowErrorRequest({text: "", isShow: false});
    setIsLoadingControl(true);
    const token = localStorage.getItem("token");
    if (token) {
      Promise.all([
        api.getControlUsers({ token: token }),
        api.getControlTests({ token: token }),
        api.getControlFilials({ token: token }),
        api.getControlRoles({ token: token }),
      ])
        .then(([controlUsers, controlTests, controlFilials, controlRoles,]) => {
          console.log(controlUsers, 'ControlUsers');
          setUsers(controlUsers);
          setTests(controlTests.data);
          setFilial(controlFilials.data);
          setRoles(controlRoles.data);
        })
        .catch((err) => {
          console.error(err);
          setIsShowErrorRequest({text: "К сожалению, произошла ошибка", isShow: false});
        })
        .finally(() => {
          setIsLoadingControl(false);
        });
      }
    return (() => {
      setFilial([]);
      setRoles([]);
      setUsers([]);
      setTests([]);
      setIsShowErrorRequest({text: "", isShow: false});
    })  
  }, []);

  return (

    <>
    {
      isLoadingControl 
      ?
        <Preloader />
      :
        <> 
          <div className='section__header'>
            <Pagination data={users} onChoose={getPage} />
            <input className='search' id='control-search' name='control-search' value={searchText} onChange={handleChangeSearch} placeholder='Введите текст запроса..'></input>
            <button className='search-btn' onClick={onSearch}>Поиск</button>
            <button className="btn btn_type_add" type="button" onClick={openAddUserPopup}>{user.role_id === 1 ? 'Добавить пользователя' : 'Добавить тестируемого'}</button>
          </div>

          {
            isLoadingPage
            ?
            <Preloader />
            :
            <Table>
              <div className='table__container table__container_margin_top'>
                <div className='table__header'>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_header table__column_type_large'>
                      <p className='table__text table__text_type_header'>Наименование</p>
                    </div>
                    <div className='table__column table__column_type_header table__column_type_large'>
                      <p className='table__text table__text_type_header'>Должность</p>
                    </div>
                    <div className='table__column table__column_type_header table__column_type_full'>
                      <p className='table__text table__text_type_header'>Подразделение</p>
                    </div>
                    <div className='table__column table__column_type_header table__column_type_large'>
                      <p className='table__text table__text_type_header'>Филиал</p>
                    </div>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_btn table__column_type_btn-header'>
                    <div className='btn-icon'></div>
                    {
                      user.role_id === 1 &&
                      <div className='btn-icon btn-icon_margin_left'></div>
                    }
                    <div className='btn-icon'></div>
                  </div>
                </div>
                <ul className={`table__main`}>
                {
                users.data.length > 0
                ?
                  <>
                  {
                    users.data.map((elem) => (
                      <li className='table__row' key={elem.id}>
                        <div className='table__main-column'>
                          <div className='table__column table__column_type_large'>
                            <p className='table__text'>{elem.name}</p>
                          </div>
                          <div className='table__column table__column_type_large'>
                            <p className='table__text'>{elem.position}</p>
                          </div>
                          <div className='table__column table__column_type_full'>
                            <p className='table__text'>{elem.division}</p>
                          </div>
                          <div className='table__column table__column_type_large'>
                            <p className='table__text'>{elem.filial.name}</p>
                          </div>
                        </div>
                        <div className='table__column table__column_type_btn'>
                          <button className='btn-icon btn-icon_color_accent-orange btn-icon_type_edit' type='button' onClick={() => openEditUserPopup(elem)}></button>
                          {
                            user.role_id === 1 &&
                            <button className='btn-icon btn-icon_margin_left btn-icon_color_accent-orange btn-icon_type_pass' type='button' onClick={() => openResetPasswordPopup(elem)}></button>
                          }
                          <a className='btn-icon btn-icon_margin_left btn-icon_color_accent-red btn-icon_type_download' target='_blank' rel='noreferrer' href={`${API_URL}/users/${elem.id}/data`}> </a>
                        </div>
                      </li>
                    ))
                  }
                  </>
                  :
                  <p className='table__caption_type_empty'>Список пока пуст.</p>
                }
                </ul>
              </div>
            </Table>
          }
        </>
    }

    {
      isAddUserPopupOpen &&
      <ControlUserAddPopup
        isOpen={isAddUserPopupOpen}
        onClose={closeControlPopups}
        onAdd={handleAddUser}
        isLoading={isLoadingRequest}
        isShowError={isShowErrorRequest}
        filial={filial}
        roles={roles}
        tests={tests}
        user={user}
      />
    }
    {
      isEditUserPopupOpen &&
      <ControlUserEditPopup
        isOpen={isEditUserPopupOpen}
        onClose={closeControlPopups}
        onEdit={handleEditUser}
        isLoading={isLoadingRequest}
        isShowError={isShowErrorRequest}
        filial={filial}
        roles={roles}
        tests={tests}
        currentUser={currentUser}
        user={user}
      />
    }
    {
      isResetPasswordPopupOpen &&
      <ResetPasswordPopup
        isOpen={isResetPasswordPopupOpen}
        onClose={closeControlPopups}
        onConfirm={handleResetPassword} 
        item={currentUser} 
        isLoadingRequest={isLoadingRequest}
      />
    }
    </>
  );
}

export default Control;