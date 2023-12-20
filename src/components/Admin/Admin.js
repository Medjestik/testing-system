import React from 'react';
import './Admin.css';
import * as api from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.js';
import Table from '../Table/Table.js';
import Pagination from '../Pagination/Pagination.js';
import RequestPopup from '../Popup/RequestPopup/RequestPopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import { API_URL } from '../../utils/config.js';

function Admin() {

  const [logs, setLogs] = React.useState([]);

  const [requestResult, setRequestResult] = React.useState('');

  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  const [isOpenRequestPopup, setIsOpenRequestPopup] = React.useState(false);
  const [isOpenConfirmPopup, setIsOpenConfirmPopup] = React.useState(false);
  
  function getData() {
    setIsLoadingData(true);
    const token = localStorage.getItem("token");
    if (token) {
      Promise.all([
        api.getLogs({ token: token }),
      ])
        .then(([adminLogs]) => {
          console.log(adminLogs, 'AdminLogs');
          setLogs(adminLogs);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingData(false);
        });
    }
  }

  function getPage(link) {
    setIsLoadingPage(true);
    const token = localStorage.getItem("token");
    api.getPageData({ token: token, link: link })
    .then((res) => {
      setLogs(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingPage(false));
  }

  function adminRequest(data) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.adminRequest({ token: token, query: data })
    .then((res) => {
      setRequestResult(res);
      console.log(res, 'Результат запроса: ');
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingRequest(false));
  }

  function removeLogs() {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.removeLogs({ token: token })
    .then(() => {
      closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingRequest(false));
  }

  function openConfirmRemovePopup() {
    setIsOpenConfirmPopup(true);
  }

  function openRequestRemovePopup() {
    setIsOpenRequestPopup(true);
  }

  function closePopup() {
    setRequestResult('');
    setIsOpenConfirmPopup(false);
    setIsOpenRequestPopup(false);
  }

  React.useEffect(() => {
    getData();
    
    return(() => {
      setRequestResult('');
      setLogs([]);
    })

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
          <Pagination data={logs} onChoose={getPage} />
          <button className="btn btn_type_add btn_margin-left_auto" type="button" onClick={openRequestRemovePopup}>SQL-запрос</button>
          <a className="btn btn_type_export btn_margin-left_20" href={`${API_URL}/logs/export_logs`} target='_blank' rel='noreferrer'>Экспорт логов</a>
          <button className="btn btn_type_edit btn_margin-left_20" type="button" onClick={openConfirmRemovePopup}>Очистка логов старше 90 дней</button>
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
                  <div className='table__column table__column_type_header table__column_type_date'>
                    <p className='table__text table__text_type_header'>Дата</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_small'>
                    <p className='table__text table__text_type_header'>Уровень</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_full'>
                    <p className='table__text table__text_type_header'>Сообщение</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_large'>
                    <p className='table__text table__text_type_header'>Информация</p>
                  </div>
                </div>
              </div>
              <ul className={`table__main`}>
              {
              logs.data.length > 0
              ?
                <>
                {
                  logs.data.map((item) => (
                    <li className='table__row' key={item.id}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_date'>
                          <p className='table__text'>{item.created_at || ''}</p>
                        </div>
                        <div className='table__column table__column_type_small'>
                          <p className='table__text'>{item.level || ''}</p>
                        </div>
                        <div className='table__column table__column_type_full'>
                          <p className='table__text'>{item.message || ''}</p>
                        </div>
                        <div className='table__column table__column_type_large'>
                          <p className='table__text'>{item.extra || ''}</p>
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

        { 
          isOpenRequestPopup &&
          <RequestPopup 
            isOpen={isOpenRequestPopup} 
            onClose={closePopup} 
            onConfirm={adminRequest} 
            requestResult={requestResult}
            isLoadingRequest={isLoadingRequest}
          />
        }

        { 
          isOpenConfirmPopup &&
          <ConfirmRemovePopup 
            isOpen={isOpenConfirmPopup} 
            onClose={closePopup} 
            onConfirm={removeLogs} 
            item={{}}
            isLoadingRequest={isLoadingRequest}
          />
        }

        </>
      }       
      </>
    }
    
    </>
  )
}

export default Admin;