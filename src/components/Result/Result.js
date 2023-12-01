import React from 'react';
import './Result.css';
import * as api from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.js';
import ResultItem from '../ResultItem/ResultItem.js';

function Result() {

  const [isLoadingResult, setIsLoadingResult] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [links, setLinks] = React.useState({});
  const [currentResult, setCurrentResult] = React.useState({});

  function getNextPage() {
    console.log(links);
    setIsLoadingResult(true);
    const token = localStorage.getItem("token");
    if (token) {
      api.getPage({ token: token, link: links.next })
        .then((res) => {
          console.log(res);
          setResult(res.data);
          setLinks(res.links);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingResult(false);
        });
      }
  }

  function getPrevPage() {
    setIsLoadingResult(true);
    const token = localStorage.getItem("token");
    if (token) {
      api.getPage({ token: token, link: links.prev })
        .then((res) => {
          console.log(res);
          setResult(res.data);
          setLinks(res.links);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingResult(false);
        });
      }
  }

  React.useEffect(() => {
    setIsLoadingResult(true);
    const token = localStorage.getItem("token"); 
    if (token) {
      api.getResult({ token: token })
        .then((res) => {
          setResult(res.data);
          setLinks(res.links);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingResult(false);
        });
      }
    return (() => {
      setResult([]);
      setCurrentResult({});
    })
  }, []);

  return (
    <div className='result'>
      {
        isLoadingResult 
        ?
        <Preloader />
        :
        <>
        <div className='result__pagination'>
          <button className={`btn result__pagination-btn ${links.prev === null ? "result__pagination-btn_type_block" : ""}`} type='button' onClick={getPrevPage}>Назад</button>
          <button className={`btn result__pagination-btn ${links.next === null ? "result__pagination-btn_type_block" : ""}`} type='button' onClick={getNextPage}>Далее</button>
        </div>
        <ul className='result__list'>
          {
            result.map((res) => (
              <ResultItem result={res} key={res.id} />
            ))
          }
        </ul>
        </>
      }

      
    </div>
  );
}

export default Result;