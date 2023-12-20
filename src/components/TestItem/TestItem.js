import React from 'react';
import './TestItem.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { PieChart } from 'react-minimal-pie-chart';
import { API_URL } from '../../utils/config.js';

function TestItem({ item, onScreenPhoto }) {

  const [isShowPerformers, setIsShowPerformers] = React.useState(false);

  const user = React.useContext(CurrentUserContext);

  function toggleProgramPerformers () {
    setIsShowPerformers(!isShowPerformers);
  }

  function determinePercent(percent) {
    return (
      <span className='test-item__attempt-percent'>{percent}%</span>
    )
  }

  function determinePhoto(item) {
    if (item.usePhoto && !item.hasPhoto) {
      return (
        <button className='btn test-item__btn-start' type="button" onClick={() => onScreenPhoto(item)}>Начать тестирование</button>
      )
    } else {
      return (
        <a className='btn test-item__btn-start' target="_self" href={`${API_URL}/start_test?code=${user.code}`}>Начать тестирование</a>
      )
    }
  }

  return (
    <li className='test-item'>
      <div className='test-item__container'>
        <div className='test-item__section-info'>
          <h4 className='test-item__name'>{item.name}</h4>
          <div className='test-item__info-list'>
            <p className='test-item__info-item test-item__info-item_type_questions'>Количество вопросов: {item.countQuestions}</p>
            <p className='test-item__info-item test-item__info-item_type_attempts'>Осталось попыток: {item.countAttempts - item.attempts.length}</p>
            <p className='test-item__info-item test-item__info-item_type_score'>Проходной балл: {item.passingPercent}%</p>
          </div>
          <div className='test-item__control'>
            {
              item.attempts.length > 0 &&
              <button className={`btn test-item__btn-attempt ${isShowPerformers ? 'test-item__btn-attempt_type_show' : 'test-item__btn-attempt_type_hide'}`} type='button' onClick={toggleProgramPerformers}>Показать попытки</button>
            }
            {
              determinePhoto(item)
            }
            {
              item.useTrain ?
              <a className='btn test-item__btn-try' target="_blank" rel="noreferrer" href={process.env.PUBLIC_URL + '/train/index.html'}>Тренировка</a>
              :
              <div></div>
            }
          </div>
        </div>

        <div className='test-item__section-chart'>
          <PieChart
            data={[{ value: Number(item.currentPercent), color: '#e21a1a' }]}
            totalValue={100}
            lineWidth={18}
            paddingAngle={2}
            rounded
            background="#bfbfbf"
            label={({ dataEntry }) => dataEntry.value + '%'}
            labelStyle={{
              fontSize: '24px',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              fill: '#e21a1a',
            }}
            labelPosition={0}
          />
        </div>
      </div>
      {
        item.attempts.length > 0 &&
          <ul className={`test-item__attempt-list ${isShowPerformers ? 'test-item__attempt-list_type_show' : 'test-item__attempt-list_type_hide'}`}>
            {
              item.attempts.map((attempt, i) => (
                <li key={i} className='test-item__attempt-item'>
                  {determinePercent(attempt.percent)}
                  <h5 className='test-item__attempt-text'>Вы ответили правильно на {attempt.score} из {item.countQuestions} вопросов!</h5>
                  <p className='test-item__attempt-date'>Дата попытки: {attempt.date}</p>
                </li>
              ))
            }
          </ul>
      }
    </li>
  );
}

export default TestItem 