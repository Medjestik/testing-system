import React from 'react';
import './Report.css';
import * as api from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.js';
import Table from '../Table/Table.js';
import { API_URL } from '../../utils/config.js';
import Select from '../Select/Select.js'

function Report() {

  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);

  const [reports, setReports] = React.useState([]);

  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const [options, setOptions] = React.useState([]);

  function getData() {
    setIsLoadingData(true);
    const token = localStorage.getItem("token");
    if (token) {
      Promise.all([
        api.getReports({ token: token, year: currentYear, }),
      ])
        .then(([reports,]) => {
          setReports(reports);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingData(false);
        });
    }
  }

  function changeYear(option) {
    setCurrentYear(option);
    setIsLoadingPage(true);
    const token = localStorage.getItem("token");
    if (token) {
      Promise.all([
        api.getReports({ token: token, year: option, }),
      ])
        .then(([reports,]) => {
          setReports(reports);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingPage(false);
        });
    }
  }

  function getDate() {
    let currentYear = new Date().getFullYear();
    const yearsArray = [];
  
    while (currentYear >= 2022) {
      yearsArray.push(currentYear);
      currentYear -= 1;
    }
  
    return yearsArray;
  }

  React.useEffect(() => {
    getData();
    setOptions(getDate());
    
    return(() => {
      setOptions([]);
      setReports([]);
    })
  // eslint-disable-next-line
  }, []);

  return (
    <>
    {
      isLoadingData
      ?
      <Preloader />
      :
      <>
      {
        <>
        <div className='section__header'>
          <Select options={options} currentOption={currentYear} onChooseOption={changeYear} />
          <a className="btn btn_type_export" type="button" target='_blank' rel='noreferrer' href={`${API_URL}/report/export_report`}>Экспорт отчета</a>
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