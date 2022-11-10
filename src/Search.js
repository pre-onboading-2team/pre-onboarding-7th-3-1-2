/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable space-infix-ops */
/* eslint-disable no-alert */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-undef */
/* eslint-disable arrow-parens */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, useCallback } from 'react';
import { BiSearch } from 'react-icons/bi';
import S from './style';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [cursor, setCursor] = useState(-1);
  const [isMovingMouse, setIsMovingMouse] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [selected, setSelected] = useState('');
  const [keyItems, setKeyItems] = useState([]);

  const onChangeData = e => {
    setKeyword(e.currentTarget.value);
    setSelected(e.currentTarget.value);
  };

  const fetchData = () => {
    return fetch('http://localhost:4000/sick')
      .then(res => res.json())
      .then(data => {
        if (data) {
          localStorage.setItem('api', JSON.stringify(data));
        }
        console.info('calling api');
      });
  };

  useEffect(() => {
    fetchData();
    const DeleteCache = setTimeout(() => {
      localStorage.removeItem('api');
    }, 20000);
  }, []);

  const updateData = async () => {
    const searchData = JSON.parse(localStorage.getItem('api'));
    const filteredSearchData = searchData.filter(
      list => list.sickNm.startsWith(keyword) === true
    );
    setKeyItems(filteredSearchData);
    setIsShowing(true);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  const keyboardNavigation = useCallback(
    e => {
      if (e.key === 'ArrowDown') {
        isShowing &&
          setCursor(prev => (prev < keyItems.length - 1 ? prev + 1 : prev));
        setSelected(keyItems[cursor + 1].sickNm);
      }
      if (e.key === 'ArrowUp') {
        isShowing && setCursor(prev => (prev > 0 ? prev - 1 : 0));
        setSelected(keyItems[cursor - 1].sickNm);
      }
      if (e.key === 'Escape') {
        setCursor(-1);
      }
      if (e.key === 'Enter') {
        setSelected(keyItems[cursor].sickNm);
        window.location.href = `/?q=${selected}`;
      }
    },
    [keyItems, isShowing, setCursor, setIsShowing, cursor]
  );

  const mousedown = index => {
    setIsMovingMouse(true);
    setCursor(index);
  };

  useEffect(() => {
    window.addEventListener('keydown', keyboardNavigation);
    return () => {
      window.removeEventListener('keydown', keyboardNavigation);
    };
  }, [keyboardNavigation]);

  return (
    <S.SearchContainer>
      <p>
        국내 모든 임상시험 검색하고 <br />
        온라인으로 참여하기
      </p>
      <div>
        <S.Search
          placeholder="질환명을 입력해 주세요."
          value={selected ? selected : keyword}
          onChange={onChangeData}
        />
        {keyItems.length > 0 && keyword && (
          <S.AutoSearchContainer>
            <S.AutoSearchWrap>
              {keyItems.map((search, index) => (
                <S.AutoSearchData
                  key={search.sickNm}
                  selected={cursor === index}
                  onMouseMove={() => mousedown(index)}
                >
                  <a href={`/?q=${selected}`}>
                    <BiSearch size="20" color="grey" />
                    {search.sickNm.split(keyword)[0]}
                    <span style={{ fontWeight: 'bold' }}>{keyword}</span>
                    {search.sickNm.split(keyword)[1]}
                  </a>
                </S.AutoSearchData>
              ))}
            </S.AutoSearchWrap>
          </S.AutoSearchContainer>
        )}
        <button type="submit">
          <BiSearch size="25" color="white" />
        </button>
      </div>
    </S.SearchContainer>
  );
};

export default Search;
