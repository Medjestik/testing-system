import React from 'react';
import './Main.css';
import { Route, NavLink, Routes } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header.js';
import Person from '../Person/Person.js';
import TestList from '../TestList/TestList.js';
import Result from '../Result/Result.js';
import Control from '../Control/Control.js';
import Footer from '../Footer/Footer.js';

function Main({ loggedIn, onLogout }) {

  const user = React.useContext(CurrentUserContext);
  
  return (
    <div className='main'>

      <Header
        loggedIn={loggedIn}
        onLogout={onLogout}
      />
      
      <main className='container'>
        <h1 className='main__title'>Комплексная система тестирования назначаемых на должность руководителей ОАО «РЖД» по вопросам охраны труда, окружающей среды, промышленной и пожарной безопасности</h1>

        <nav className="main__nav">
          <NavLink className={({ isActive }) => "main__nav-link " + (isActive ? "main__nav-link_type_active" : "")} to="/main/test">
            Тестирование
          </NavLink>
          {
            user.role_id < 3 &&
            <>
            <NavLink className={({ isActive }) => "main__nav-link " + (isActive ? "main__nav-link_type_active" : "")} to="/main/result">
              Результаты
            </NavLink>
            <NavLink className={({ isActive }) => "main__nav-link " + (isActive ? "main__nav-link_type_active" : "")} to="/main/control">
              Управление
            </NavLink>
            </>
          }
        </nav>

        <Routes>
          <Route path='person' element={<Person />} />
          <Route path='test' element={<TestList />} />
          <Route path='result' element={<Result />} />
          <Route path='control' element={<Control />} />
        </Routes>
      </main>

      <Footer />
      
    </div>
  );
}

export default Main;