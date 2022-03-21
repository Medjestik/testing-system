import React from 'react';
import './TestList.css';
import TestItem from '../TestItem/TestItem.js';
import * as api from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.js';
import ScreenPhotoPopup from '../ScreenPhotoPopup/ScreenPhotoPopup.js';

function TestList() {

  const [isLoadingTests, setIsLoadingTests] = React.useState(true);
  const [tests, setTests] = React.useState([]);
  const [currentTest, setCurrentTest] = React.useState({});
  const [isScreenPhotoPopupOpen, setIsScreenPhotoPopupOpen] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowMessage, setIsShowMessage] = React.useState({text: "", isShow: false, success: false});

  function handleAddPhoto(photo) {
    setIsShowMessage({text: "", isShow: false, success: false});
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.addPhoto({ token: token, test: currentTest, photo })
    .then((res) => {
      setIsShowMessage({ isShow: true, text: "Фотография успешно загружена! Вы можете приступить к тестированию.", success: true });
    })
    .catch((err) => {
      setIsShowMessage({ isShow: true, text: "К сожалению, произошла ошибка!", success: false });
      console.error(err);
    })
    .finally(() => setIsLoadingRequest(false));
  }

  function openScreenPhotoPopup(test) {
    setCurrentTest(test);
    setIsScreenPhotoPopupOpen(true);
    setIsShowMessage({text: "", isShow: false, success: false});
    setIsLoadingRequest(false);
  }

  function closeScreenPhotoPopup() {
    setIsScreenPhotoPopupOpen(false);
    setIsLoadingRequest(false);
  }

  React.useEffect(() => {
    setIsLoadingTests(true);
    const token = localStorage.getItem("token");
    if (token) {
      api.getTests({ token: token })
        .then((res) => {
          setTests(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingTests(false);
        });
      }
    return (() => {
      setTests([]);
      setCurrentTest({});
    })
  }, []);

  return (
    <>
    <div className='test-list'>
      <h3 className='main__subtitle'>Список доступных тестирований</h3>
      {
        isLoadingTests 
        ?
          <Preloader />
        :
          <>
          {
            tests.length < 1 
            ?
            <p className='test-list__empty'>Список доступных тестирований пока пуст!</p>
            :
            <>
            <p className='test-list__caption'>Выберите тестирование из списка и нажмите кнопку «Начать».</p>
            <ul className='test-list__container'>
              {
                tests.map((item, index) => (
                  <TestItem key={index} item={item} onScreenPhoto={openScreenPhotoPopup} />
                ))
              }
            </ul>
            </>
          }
          {
            isScreenPhotoPopupOpen &&
            <ScreenPhotoPopup
              isOpen={isScreenPhotoPopupOpen}
              onClose={closeScreenPhotoPopup}
              onAdd={handleAddPhoto}
              isLoading={isLoadingRequest}
              isShowMessage={isShowMessage}
            />
          }
          </>
      }
    </div>
    </>
  );
}

export default TestList; 