import React from 'react';
import './Header.css';
import logo from '../../images/rzd-logo.png';
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Header({ loggedIn, onLogout }) {

  const user = React.useContext(CurrentUserContext);

  /*
    <NavLink className={({ isActive }) => "btn header__btn header__btn-person " + (isActive ? "header__btn-person_type_block" : "")} to="/main/person">
    Личный кабинет
  </NavLink>
  */

  return (
    <header className='header'>
      <div className='container header__container'>
        <img className='header__logo' src={logo} alt="логотип РЖД"></img>
        <p className='header__name'>Добро пожаловать, {user.name}!</p>

        <button className='btn header__btn header__btn-logout' onClick={onLogout}>Выход</button>
      </div>

    </header>
  );
}

export default Header;