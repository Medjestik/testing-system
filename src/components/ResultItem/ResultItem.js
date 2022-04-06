import React from 'react';
import './ResultItem.css';
import { PieChart } from 'react-minimal-pie-chart';
import { API_URL } from '../../utils/config.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function ResultItem({ result }) {

  const [isShowPerformers, setIsShowPerformers] = React.useState(false);

  const user = React.useContext(CurrentUserContext);

  console.log(result);

  function toggleProgramPerformers () {
    setIsShowPerformers(!isShowPerformers);
  }

  function determinePercent(percent) {
    return (
      <span className='test-item__attempt-percent'>{percent}%</span>
    )
  }

  return (
    <li className='result-item'>
      <div className='result-item__container'>
        <div className='result-item__section-info'>
          <h4 className='result-item__name'>{result.name}</h4>
          <p className='result-item__test'>{result.tests[0].name}</p>
          <div className='result-item__control'>
            {
              result.tests[0].attempts.length > 0 &&
              <>
              <button className={`btn result-item__btn-attempt ${isShowPerformers ? 'result-item__btn-attempt_type_show' : 'result-item__btn-attempt_type_hide'}`} type='button' onClick={toggleProgramPerformers}>Показать попытки</button>
              <a className='btn result-item__btn-export' target='_blank' rel='noreferrer' href={`${API_URL}/users/${result.id}/tests/${result.tests[0].id}/protocol`}>Экспорт результатов</a>
              </>
            }

          </div>
        </div>

        <div className='result-item__section-chart'>
          <PieChart
            data={[{ value: Number(result.tests[0].currentPercent), color: '#e21a1a' }]}
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
        result.tests[0].attempts.length > 0 &&
          <ul className={`result-item__attempt-list ${isShowPerformers ? 'result-item__attempt-list_type_show' : 'result-item__attempt-list_type_hide'}`}>
            {
              result.tests[0].attempts.map((attempt, i) => (
                <li key={i} className='result-item__attempt-item'>
                  {determinePercent(attempt.percent)}
                  <h5 className='result-item__attempt-text'>Вы ответили правильно на {attempt.score} из {result.tests[0].countQuestions} вопросов!</h5>
                  <p className='result-item__attempt-date'>Дата попытки: {attempt.date}</p>
                  <a className='btn result-item__btn-export-attempt' target='_blank' rel='noreferrer' href={`${API_URL}/attempts/${attempt.id}/protocol`}>Экспорт протокола</a>
                </li>
              ))
            }
          </ul>
      }
    </li>
  );
}

export default ResultItem;