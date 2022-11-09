import React, { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './Search.scss';

const Search = () => {

  const [set, setOn] = useState(false)
  const [data, setData] = useState();

  const changeInputState = (e) => {
    if (e.target.className === 'searchBar') {
      setOn(true)
    } else {
      setOn(false)
    }
  }

const runServer = (params) => {
  fetch(`http://localhost:4000/sick?q=${params}`)
  .then(response => response.json())
  .then(result => {
    setData(result);
  })
};

const textValue = (e) => {
  runServer(e.target.value);
}
  
  return(<div className="mainWrap" onClick={changeInputState}>
    <div className="mainCenter" >
      <h2 className="title">국내 모든 임상시험 검색하고 <br></br>온라인으로 참여하기</h2>
        <div className="searchWrap">
          <div className={set ? "searchInner on" : "searchInner" }>
            <input onChange={textValue} className="searchBar" placeholder="질환명을 입력해 주세요." />
            <FontAwesomeIcon icon= { faSearch } className="search"/>
          </div>
        </div>
        <div className={set ? "filterWrap on" : "filterWrap"}>
        <div className="filter"> 
          최근 검색어
        <FontAwesomeIcon icon= { faSearch } className="filterSearch"/>
          </div>
          <div className="filter under">
          추천 검색어로 검색해보세요
          <ul>
            <li>B형간염</li>
            <li>비만</li>
            <li>관절염</li>
            <li>우울증</li>
            <li>식도염</li>
          </ul>
          </div>
          </div>

    </div>
  </div>)
}

export default Search;