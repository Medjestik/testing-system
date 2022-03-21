import React from 'react';
import './Control.css';
import * as api from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.js';
import ControlUserItem from './ControlUserItem/ControlUserItem.js';
import ControlUserAddPopup from './ControlUserAddPopup/ControlUserAddPopup.js';
import ControlUserEditPopup from './ControlUserEditPopup/ControlUserEditPopup.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Control() {

  const [isAddUserPopupOpen, setIsAddUserPopupOpen] = React.useState(false);
  const [isEditUserPopupOpen, setIsEditUserPopupOpen] = React.useState(false);
  const [isLoadingControl, setIsLoadingControl] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowErrorRequest, setIsShowErrorRequest] = React.useState({text: "", isShow: false});
  const [filial, setFilial] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [tests, setTests] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const user = React.useContext(CurrentUserContext);

  function openAddUserPopup() {
    setIsAddUserPopupOpen(true);
  }

  function handleAddUser(user) {
    setIsShowErrorRequest({text: "", isShow: false});
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.addUser({ token: token, user: user })
    .then((res) => {
      setUsers([...users, res.data]);
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
      const index = users.indexOf(users.find((elem) => (elem.id === res.data.id)));
      setUsers([...users.slice(0, index), res.data, ...users.slice(index + 1)]);
      closeControlPopups();
    })
    .catch((err) => {
      setIsShowErrorRequest({ isShow: true, text: "К сожалению, произошла ошибка!" });
      console.error(err);
    })
    .finally(() => setIsLoadingRequest(false));
  }


  function closeControlPopups() {
    setIsShowErrorRequest({text: "", isShow: false});
    setIsAddUserPopupOpen(false);
    setIsEditUserPopupOpen(false);
    //setIsRemoveUserPopupOpen(false);
  }

  React.useEffect(() => {
    setIsShowErrorRequest({text: "", isShow: false});
    setIsLoadingControl(true);
    const token = localStorage.getItem("token");
    if (token) {
      api.getControl({ token: token })
        .then((res) => {
          console.log(res);
          setFilial(res.data.filials);
          setRoles(res.data.roles);
          setUsers(res.data.users);
          setTests(res.data.tests);
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
        <div className='control'> 
          <h3 className='main__subtitle'>Управление пользователями</h3>
          <button className="btn btn_type_add" type="button" onClick={openAddUserPopup}>Добавить пользователя</button>
          <ul className="control-user__list">
            {
              users.map((user) => (
                <ControlUserItem user={user} key={user.id} onEdit={openEditUserPopup} />
              ))
            }
          </ul>
        </div>
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
    </>
  );
}

export default Control;