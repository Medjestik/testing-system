import React from 'react';
import './Main.css';
import { Route, Routes } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as api from '../../utils/api.js';
import SectionTabs from '../Section/SectionTabs/SectionTabs.js';
import Header from '../Header/Header.js';
import Admin from '../Admin/Admin.js';
import Person from '../Person/Person.js';
import TestList from '../TestList/TestList.js';
import Result from '../Result/Result.js';
import Control from '../Control/Control.js';
import Report from '../Report/Report.js';
import Footer from '../Footer/Footer.js';
import ChangePasswordPopup from '../Popup/ChangePasswordPopup/ChangePasswordPopup.js';

function Main({ loggedIn, onLogout }) {

  const user = React.useContext(CurrentUserContext);

  const tabsHeadAdmin = [
    {
      title: 'Тестирование',
      link: '/main/test'
    },
    {
      title: 'Результаты',
      link: '/main/result'
    },
    {
      title: 'Управление',
      link: '/main/control'
    },
    {
      title: 'Отчеты',
      link: '/main/report'
    },
    {
      title: 'Администрирование',
      link: '/main/admin'
    },
  ]

  const tabsAdmin = [
    {
      title: 'Тестирование',
      link: '/main/test'
    },
    {
      title: 'Результаты',
      link: '/main/result'
    },
    {
      title: 'Управление',
      link: '/main/control'
    },
  ]

  const tabsUser = [
    {
      title: 'Тестирование',
      link: '/main/test'
    },
  ]

  const [isOpenChangePasswordPopup, setIsOpenChangePasswordPopup] = React.useState(user.change_password == 1 ? true : false); 

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  function handleChangePassword(password) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.changePassword({ token: token, password: password })
    .then((res) => {
      //setUsers({...users, data: [res.data, ...users.data]});
      setIsOpenChangePasswordPopup(false);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingRequest(false));
  }

  function defineTabs(id) {
    if (id === 3) {
      return tabsUser;
    } else if (id === 2) {
      return tabsAdmin;
    } else {
      return tabsHeadAdmin;
    }
  }

  return (
    <div className='main'>

      <Header
        loggedIn={loggedIn}
        onLogout={onLogout}
      />
      
      <main className='container'>
        
        {
          /*
            <h1 className='main__title'>Комплексная система тестирования назначаемых на должность руководителей ОАО «РЖД» по вопросам охраны труда, окружающей среды, промышленной и пожарной безопасности</h1>
          */
        }

        <SectionTabs type='small' tabs={defineTabs(user.role_id)} > 

          <Routes>
            <Route path='person' element={<Person />} />
            <Route path='test' element={<TestList />} />
            <Route path='result' element={<Result />} />
            <Route path='control' element={<Control />} />
            <Route path='report' element={<Report />} />
            <Route path='admin' element={<Admin />} />
          </Routes>

        </SectionTabs>

      </main>

      <Footer />

      {
        isOpenChangePasswordPopup &&
        <ChangePasswordPopup 
          isOpen={isOpenChangePasswordPopup}
          onConfirm={handleChangePassword}
          isLoadingRequest={isLoadingRequest}
        />
      }
      
    </div>
  );
}

export default Main;