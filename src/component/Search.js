import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './Search.scss';

const Search = () => {

  const [set, setOn] = useState(false)

  const changeInputState = (e) => {
    if (e.target.className === 'searchBar') {
      setOn(true)
    } else {
      setOn(false)
    }
  }
  return(<div className="mainWrap" onClick={changeInputState}>
    <div className="mainCenter" >
      <h2 className="title">국내 모든 임상시험 검색하고 <br></br>온라인으로 참여하기</h2>
        <div className="searchWrap">
          <div className={set ? "searchInner on" : "searchInner" }>
            <input className="searchBar" placeholder="질환명을 입력해 주세요." />
            <FontAwesomeIcon icon= { faSearch } className="search"/>
          </div>
        </div>
        <div className={set ? "filterWrap on" : "filterWrap"}>
        <div className="filter">
          최근 검색어
          </div>
          <div className="filter under">
          추천 검색어로 검색해보세요
          </div>
          </div>

    </div>
  </div>)
}

export default Search;