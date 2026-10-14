import React from 'react';
import './Admin.css';
import * as api from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.js';
import Table from '../Table/Table.js';
import Pagination from '../Pagination/Pagination.js';
import RequestPopup from '../Popup/RequestPopup/RequestPopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import SettingPopup from './SettingPopup/SettingPopup.js';
import { parseApiError } from '../../utils/parseApiError.js';
import { API_URL } from '../../utils/config.js';

function Admin() {

  const [logs, setLogs] = React.useState([]);
  const [settings, setSettings] = React.useState([]);
  const [settingForm, setSettingForm] = React.useState(null);
  const [settingToDelete, setSettingToDelete] = React.useState(null);
  const [settingError, setSettingError] = React.useState('');
  const [isLoadingSetting, setIsLoadingSetting] = React.useState(false);

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
        api.getSettings({ token: token }),
      ])
        .then(([adminLogs, adminSettings]) => {
          console.log(adminLogs, 'AdminLogs');
          setLogs(adminLogs);
          setSettings(Array.isArray(adminSettings) ? adminSettings : []);
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

  function loadSettings() {
    const token = localStorage.getItem("token");
    return api.getSettings({ token: token })
      .then((adminSettings) => {
        setSettings(Array.isArray(adminSettings) ? adminSettings : []);
      });
  }

  function openCreateSetting() {
    setSettingError('');
    setSettingForm({ id: null, key: '', value: '' });
  }

  function openEditSetting(item) {
    setSettingError('');
    setSettingForm(item);
  }

  function closeSettingPopup() {
    setSettingForm(null);
    setSettingError('');
  }

  function saveSetting(payload) {
    const token = localStorage.getItem("token");
    setIsLoadingSetting(true);
    setSettingError('');
    const request = settingForm && settingForm.id
      ? api.updateSetting({ token, id: settingForm.id, key: payload.key, value: payload.value })
      : api.createSetting({ token, key: payload.key, value: payload.value });
    request
      .then(() => {
        closeSettingPopup();
        return loadSettings();
      })
      .catch((err) => {
        parseApiError(err).then((text) => {
          setSettingError(text);
        });
      })
      .finally(() => {
        setIsLoadingSetting(false);
      });
  }

  function removeSetting() {
    if (!settingToDelete) {
      return;
    }
    const token = localStorage.getItem("token");
    setIsLoadingSetting(true);
    api.deleteSetting({ token, id: settingToDelete.id })
      .then(() => {
        setSettingToDelete(null);
        return loadSettings();
      })
      .catch((err) => {
        parseApiError(err).then((text) => {
          setSettingError(text);
        });
      })
      .finally(() => {
        setIsLoadingSetting(false);
      });
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

        <div className='admin__settings'>
          <div className='section__header'>
            <h2 className='admin__settings-title'>Настройки</h2>
            <button className="btn btn_type_add btn_margin-left_auto" type="button" onClick={openCreateSetting}>Добавить</button>
          </div>
          <Table>
            <div className='table__container table__container_margin_top'>
              <div className='table__header'>
                <div className='table__main-column'>
                  <div className='table__column table__column_type_header table__column_type_name'>
                    <p className='table__text table__text_type_header'>Ключ</p>
                  </div>
                  <div className='table__column table__column_type_header table__column_type_full'>
                    <p className='table__text table__text_type_header'>Значение</p>
                  </div>
                </div>
              </div>
              <ul className='table__main'>
                {
                  settings.length > 0
                  ?
                  settings.map((item) => (
                    <li className='table__row' key={item.id}>
                      <div className='table__main-column'>
                        <div className='table__column table__column_type_name'>
                          <p className='table__text'>{item.key}</p>
                        </div>
                        <div className='table__column table__column_type_full'>
                          <p className='table__text admin__settings-value'>{item.value}</p>
                        </div>
                        <div className='admin__settings-buttons'>
                          <button className='btn btn_type_edit' type='button' onClick={() => openEditSetting(item)}>Редактировать</button>
                          <button className='btn btn_type_edit' type='button' onClick={() => setSettingToDelete(item)}>Удалить</button>
                        </div>
                      </div>
                    </li>
                  ))
                  :
                  <p className='table__caption_type_empty'>Настроек пока нет.</p>
                }
              </ul>
            </div>
          </Table>
        </div>

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
              logs.data && logs.data.length > 0
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

        {
          settingForm &&
          <SettingPopup
            isOpen={Boolean(settingForm)}
            onClose={closeSettingPopup}
            onSave={saveSetting}
            setting={settingForm}
            isLoading={isLoadingSetting}
            errorText={settingError}
          />
        }

        {
          settingToDelete &&
          <ConfirmRemovePopup
            isOpen={Boolean(settingToDelete)}
            onClose={() => setSettingToDelete(null)}
            onConfirm={removeSetting}
            item={settingToDelete}
            isLoadingRequest={isLoadingSetting}
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