import React from 'react';
import './Pagination.css';

function Pagination({ data, onChoose }) {

  return (
    <div className='pagination'>
      <ul className='pagination__list'>
      <li className='pagination__item'>
          <button className={`btn-icon btn-icon_type_first ${data.meta.current_page === 1 ? 'btn-icon_type_block' : 'btn-icon_color_accent-orange'}`} type='button' onClick={() => onChoose(data.links.first)}></button>
        </li>
        <li className='pagination__item'>
          <button className={`btn-icon btn-icon_type_prev ${data.meta.current_page === 1 ? 'btn-icon_type_block' : 'btn-icon_color_accent-orange'}`} type='button' onClick={() => onChoose(data.links.prev)}></button>
        </li>
        <li className='pagination__item'>
          <button className='btn-icon btn-icon_color_accent-orange' type='button' disabled>{data.meta.current_page}</button>
        </li>
        <li className='pagination__item'>
          <button className={`btn-icon btn-icon_type_next ${data.meta.current_page === data.meta.last_page ? 'btn-icon_type_block' : 'btn-icon_color_accent-orange'}`} type='button' onClick={() => onChoose(data.links.next)}></button>
        </li>
        <li className='pagination__item'>
          <button className={`btn-icon btn-icon_type_last ${data.meta.current_page === data.meta.last_page ? 'btn-icon_type_block' : 'btn-icon_color_accent-orange'}`} type='button' onClick={() => onChoose(data.links.last)}></button>
        </li>
      </ul>
    </div>

  )
}

export default Pagination;