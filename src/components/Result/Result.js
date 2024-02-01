import React from 'react';
import './Result.css';
import * as api from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.js';
import Pagination from '../Pagination/Pagination.js';
import ResultItem from '../ResultItem/ResultItem.js';

function Result() {

  const [result, setResult] = React.useState([]);
  const [currentResult, setCurrentResult] = React.useState({});

  const [searchText, setSearchText] = React.useState('');

  const [isLoadingResult, setIsLoadingResult] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  function handleChangeSearch(e) {
    setSearchText(e.target.value);
  }

  function getPage(link) {
    setIsLoadingResult(true);
    const token = localStorage.getItem("token");
    api.getPageData({ token: token, link: link })
    .then((res) => {
      setResult(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingResult(false));
  }

  function onSearch() {
    setIsLoadingResult(true);
    const token = localStorage.getItem("token");
    api.searchResultPage({ token: token, searchText: searchText })
    .then((res) => {
      setResult(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingResult(false));
  }

  React.useEffect(() => {
    setIsLoadingPage(true);
    const token = localStorage.getItem("token"); 
    if (token) {
      api.getResult({ token: token })
        .then((res) => {
          setResult(res);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingPage(false);
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
        isLoadingPage
        ?
        <Preloader />
        :
        <>
        <div className='section__header'>
          <Pagination data={result} onChoose={getPage} />
          <input className='search search_margin_left search_border_left' id='result-search' type='text' name='control-search' value={searchText} onChange={handleChangeSearch} placeholder='Введите текст запроса..'></input>
          <button className='search-btn search-btn_border_right' onClick={onSearch}>Поиск</button>
        </div>
        {
          isLoadingResult ?
          <Preloader />
          :
          <ul className='result__list'>
            {
              result.data.map((res) => (
                <ResultItem result={res} key={res.id} />
              ))
            }
          </ul>
          }
        </>
      }

      
    </div>
  );
}

export default Result;