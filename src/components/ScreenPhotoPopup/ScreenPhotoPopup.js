import React from 'react';
import './ScreenPhotoPopup.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Popup from '../Popup/Popup.js';
import Webcam from "react-webcam";
import { API_URL } from '../../utils/config.js';

function ScreenPhotoPopup({ isOpen, onClose, onAdd, isLoading, isShowMessage }) { 

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);
  const [isEmptyPhoto, setIsEmptyPhoto] = React.useState(true);

  const [photo, setPhoto] = React.useState();

  const user = React.useContext(CurrentUserContext);

  const videoConstraints = {
    width: 320,
    height: 320,
    facingMode: "user"
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(photo);

    onAdd(photo);
  }

  function ScreenPhoto(photo) {
    setPhoto(photo);
    setIsEmptyPhoto(false);
    setIsBlockSubmitButton(false);
  }

  React.useEffect(() => {
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="screen-photo-popup" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Добавление фото</h3>
        <p className="popup__subtitle">Для начала прохождения тестирования необходимо сделать фото. Сделайте снимок и нажмите кнопку «Сохранить».</p>

        <div className="screen-photo-popup__container">
          <div className="screen-photo-popup__photo-screen">
            <Webcam
              audio={false}
              height={320}
              screenshotFormat="image/jpeg"
              width={320}
              videoConstraints={videoConstraints}
            >
              {({ getScreenshot }) => (
                <button className="screen-photo-popup__btn screen-photo-popup__btn_type_screen" type="button" onClick={() => {ScreenPhoto(getScreenshot())}}>Сделать снимок</button>
              )}
            </Webcam>
          </div>

          <div className="screen-photo-popup__photo-result">
            {
              isEmptyPhoto 
              ?
              <div className="screen-photo-popup__empty-photo"></div>
              :
              <img src={photo} alt="Фото с веб камеры"></img>
            }
            <button className={`screen-photo-popup__btn screen-photo-popup__btn_type_save ${isBlockSubmitButton ? "screen-photo-popup__btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>
          </div>

        </div>

        <span className={`popup__submit-error ${isShowMessage.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowMessage.isShow ? isShowMessage.text : ""}</span>
        <a className={`btn test-item__btn-start screen-photo-popup__link ${!isShowMessage.success ? 'screen-photo-popup__link_type_block' : '' }`} target="_self" href={`${API_URL}/start_test?code=${user.code}`}>Начать тестирование</a>

      </form>
    </Popup>
  )
}

export default ScreenPhotoPopup;