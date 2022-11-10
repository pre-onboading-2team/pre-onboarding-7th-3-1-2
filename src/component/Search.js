import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './Search.scss';

let inputStr = '';

const Search = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([{ sickNm: '' }]);
  const [set, setOn] = useState(false);
  const changeValue = (e) => {

    inputStr = e.target.value;
    setValue(e.target.value);
    if (e.target.value.length) {
      runServer(e.target.value);
    } else {
      setData([{ sickNm: '' }]);
    }
  }

  const runServer = (parms) => {
    fetch(`http://localhost:4000/sick?q=${parms}`, {
      method: 'GET',
      header: { 'Content-Type': `application/json` },
    })
      .then(response => {
        return response.json();
      })
      .then(result => {
        // setData(result);

        if (result.length) {

          // 검색어 하이라이트 처리 함수
          setBoldStr(result)

        } else {
          setData([{ sickNm: '' }]);
        }
      });

  }

  const setBoldStr = (result) => {

    // 검색 결과가 없으면 로직 실행 안함
    // if (!result.length) {
    //   return;
    // }

    let arr = [];
    for (let i = 0;i < 5;i++) {

      let mystring = result[i].sickNm;
      let find = inputStr;
      let regex = new RegExp(find, "gi");
      let highlight = mystring.replace(regex, "<span class='highlight'>" + find + "</span>");

      arr.push({
        sickCd: result[i].sickCd,
        sickNm: highlight
      });
    }

    console.log(arr);
    setData(arr);
  }

  const enterInput = (e) => {
    if (e.keyCode === 13) {
      runServer(e.target.value);
    }
  }

  const changeClass = (e) => {
    if (e.target.className === 'searchBar') {
      setOn(true)
    } else {
      setOn(false)
    }
  }

  return (<div className="mainWrap" onClick={changeClass}>
    <div className="mainCenter" >
      <h2 className="title">국내 모든 임상시험 검색하고 <br></br>온라인으로 참여하기</h2>
      <div className="searchWrap">
        <div className={set ? "searchInner on" : "searchInner"}>
          <input className="searchBar" placeholder="질환명을 입력해 주세요." onChange={changeValue} onKeyDown={enterInput} />
          <FontAwesomeIcon icon={faSearch} className="search" />
        </div>
      </div>
      <div className="listWrap">

        <div className={value.length ? 'searchTxt on' : 'searchTxt'}>
          <FontAwesomeIcon icon={faSearch} className="search" />
          <span className="text">{value}</span>
        </div>

        <div className="recommend">
          <div className="subTit">추천 검색어</div>
          <div className={data[0].sickNm ? 'searchData on' : 'searchData'}>
            {data.map((item, idx) => {
              if (idx < 5) {
                return (<div className="item" key={idx} dangerouslySetInnerHTML={{ __html: item.sickNm }}></div>);
              }
            })}
          </div>

          <div className={value ? 'dummyData' : 'dummyData on'}>
            {recommendList.map((item, idx) => {
              return (<div className="item" key={idx}>
                {item}
              </div>);
            })}
          </div>
        </div>
      </div>
    </div>
  </div>)
}

const recommendList = [
  'B형간염',
  '비만',
  '관절염',
  '우울증',
  '식도염'
]
export default Search;