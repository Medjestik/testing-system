import React from 'react';
import './Report.css';
import * as api from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.js';
import Table from '../Table/Table.js';
import { API_URL } from '../../utils/config.js';

function Report() {

  const [isLoadingData, setIsLoadingData] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const [reports, setReports] = React.useState([]);

  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  function getData(start, end) {
    const token = localStorage.getItem("token");
    if (token) {
      Promise.all([
        api.getReports({ token: token, startDate: start, endDate: end }),
      ])
        .then(([reports]) => {
          setReports(reports);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingPage(false);
          setIsLoadingData(false);
        });
    }
  }

  function onSearch() {
    getData(startDate, endDate);
    setIsLoadingData(true);
  }

  function handleChangeStartDate(e) {
    setStartDate(e.target.value);
  }

  function handleChangeEndDate(e) {
    setEndDate(e.target.value);
  }

  function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    const formattedDate = year + '-' + month + '-' + day;

    return formattedDate;
  }

  function countUsers(users) {
    return users.reduce(function(acc, user) {
      return acc + user.users_count;
    }, 0);
  }

  React.useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), 0, 1);
    setStartDate(formatDate(firstDay));
    setEndDate(formatDate(today));
    getData(formatDate(firstDay), formatDate(today));

    return(() => {
      setReports([]);
    })
  // eslint-disable-next-line
  }, []);

  return (
    <>
    {
      isLoadingPage
      ?
      <Preloader />
      :
      <>
      {
        <>
        <div className='section__header'>
          <input 
          className='search search_border_right search_border_left' 
          id='report-date-start' 
          type='date' 
          name='report-date-start' 
          value={startDate} 
          onChange={handleChangeStartDate}
          >
          </input>
          <div className='search__separate' >—</div>
          <input 
          className='search search_border_right search_border_left' 
          id='report-date-end' 
          type='date' 
          name='report-date-end'
          value={endDate} 
          onChange={handleChangeEndDate}
          >
          </input>
          <button 
          className='search-btn search-btn_border_right search-btn_border_left search_border_left search-btn_margin_right search-btn_margin_left' 
          onClick={onSearch}
          type='button'
          >
            Поиск
          </button>
          <a 
          className="btn btn_type_export" 
          type="button" 
          target='_blank' 
          rel='noreferrer' 
          href={`${API_URL}/report/export_report?startDate=${startDate}&endDate=${endDate}`}
          >
            Экспорт отчета
          </a>
        </div>

        {
          isLoadingData
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
                  <div className='table__column table__column_type_header table__column_type_medium'>
                    <p className='table__text table__text_type_header'>Количество</p>
                  </div>
                </div>
              </div>
              <ul className={`table__main table__main_scroll_auto`}>
              {
              reports.data.length > 0
              ?
                <>
                <li className='table__row'>
                  <div className='table__main-column'>
                    <div className='table__column table__column_type_large'>
                      <p className='table__text'>Общее число</p>
                    </div>
                    <div className='table__column table__column_type_medium'>
                      <p className='table__text'>{countUsers(reports.data)}</p>
                    </div>
                  </div>
                </li>
                {
                  reports.data.map((user, i) => (
                    <li className='table__row' key={i}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_large'>
                          <p className='table__text'>{user.filial}</p>
                        </div>
                        <div className='table__column table__column_type_medium'>
                          <p className='table__text'>{user.users_count}</p>
                        </div>
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
      </>
    }
    </>
  )
}

export default Report;