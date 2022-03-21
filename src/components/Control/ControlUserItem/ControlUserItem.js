import React from 'react';
import './ControlUserItem.css';
import { API_URL } from '../../../utils/config.js';

function ControlUserItem({ user, onEdit }) {

  return (
    <li className='control-user__item'>
      <div className='control-user__container'>
        <div className='control-user__section-info'>
          <h4 className='control-user__name'>{user.name}</h4>
          <div className='control-user__info-list'>
            <p className='control-user__info-item control-user__info-item_type_division'>Подразделение: {user.division}</p>
            <p className='control-user__info-item control-user__info-item_type_position'>Должность: {user.position}</p>
            <p className='control-user__info-item control-user__info-item_type_filial'>Филиал: {user.filial.name}</p>
          </div>
        </div>
        <div className='control-user__section-data'>
          <h6 className='control-user__data-title'>Логин: {user.login}</h6>
          <h6 className='control-user__data-title'>Пароль: {user.plainPassword}</h6>
        </div>
      </div>
      <div className='control-user__control'>
          <button className='btn btn_type_edit control-user__btn-edit' type='button' onClick={() => onEdit(user)}>Редактировать</button>
          <a className='btn btn_type_export control-user__btn-export' target='_blank' rel='noreferrer' href={`${API_URL}/users/${user.id}/data`}>Экспорт данных</a>
        </div>
    </li>
  );
}

export default ControlUserItem;