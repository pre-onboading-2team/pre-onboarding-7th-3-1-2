# Week 3-1. 검색창 & 검색어 추천 기능 구현

<br />

1. [팀 소개 👫](#1-팀-소개-)
2. [프로젝트 소개 🚀](#2-프로젝트-소개-)
3. [기술 스택 🛠](#3-기술-스택-)
4. [구현 기능 📍](#4-구현-기능-)
5. [프로젝트 구조 🗂](#5-프로젝트-구조-)
6. [Best Practice 선정과정👩‍👦‍👦](#6-best-practice-선정과정)
7. [프로젝트 설치 및 실행 ✨](#7-프로젝트-설치-및-실행-)  

<br />



## 1. 팀 소개 👫

- [이빛나 (팀장)](https://github.com/bitnaleeeee)
- [모상빈](https://github.com/Topbin2)
- [김진석](https://github.com/genuine-seok)
- [박우빈](https://github.com/Debonchocola)
- [이의연](https://github.com/strongpond)
- [조성호](https://github.com/CSH111)
- [전대원](https://github.com/eodnjs467)

<br />

## 2. 프로젝트 소개 🚀

- 개요 : 원티드 프론트엔드 프리온보딩 7기 2팀 과제 3-1 중 Best Practice
- 주제 : 검색창 & 검색어 추천 기능 구현
- 기간 : 2022.11.8 ~ 2022.11.11

<br />


## 3. 기술 스택 🛠

- Typescript
- React
- Axios
- Styled-Components

<br />

## 4. 구현 기능 📍

- 구현사항
  - 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
    - 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
    - 검색어가 없을 시 “검색어 없음” 표출
  - API 호출 최적화
    - API 호출별로 로컬 캐싱 구현 (미구현)
    - 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
    - 키보드만으로 추천 검색어들로 이동 가능하도록 구현

<br />

## 5. 프로젝트 구조 🗂

```bash
src
 ┣ api // 비동기 통신 관련 로직 관리
 ┣ components // 공용 컴포넌트
 ┣ constant // 상수 변수 관리
 ┣ data // 더미 데이터 관리
 ┣ hooks // 커스텀 훅 관리
 ┣ pages // 페이지 컴포넌트
 ┣ style // 글로벌 스타일 관리
 ┣ types // 공용 타입 관리
 ┗ utils // 공용 유틸 함수 관리
```

<br/>


## 6. Best Practice 선정과정👩‍👦‍👦

### Debounce 커스텀 훅

```tsx
// src/hooks/useDebounce.ts

import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

// src/components/SearchForm.ts

export const SearchForm = () => {
  const [value, onChange, reset] = useInput("");
  const debouncedValue = useDebounce(value, 500);
  const [{ loading, data, error }] = useSickAsync(debouncedValue, [
    debouncedValue,
  ]);

  // ...

```

- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이기 위해 Debounce 함수 적용
- 커스텀 훅으로 분리 (useDebounce)
- 사용자 입력값을 Debounce된 값으로 api 요청(useSickAsync)

<br>

### Flux 패턴을 적용한 비동기 통신 커스텀 훅 활용

```tsx

// src/hooks/useSickAsync.ts

import { AxiosError, AxiosResponse } from "axios";
import { DependencyList, useEffect, useReducer } from "react";

import { httpClient } from "../api/api";
import { SickServiceImp } from "../api/SickService";

export type AsyncData = AxiosResponse<any, any> | null;
export type AsyncError = AxiosError | Error | null | boolean;

export type RequestState = {
  loading: boolean;
  data: AsyncData;
  error: AsyncError;
};

export type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; data: AsyncData }
  | { type: "ERROR"; error: AsyncError };

type Cache = Record<string, AsyncData>;

const cache: Cache = {};

function asyncReducer(state: RequestState, action: Action): RequestState {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

const initialState: RequestState = {
  loading: false,
  data: null,
  error: false,
};

const sickService = new SickServiceImp(httpClient);

export const useSickAsync = (
  value: string,
  deps: DependencyList
): [RequestState, () => Promise<void>] => {
  const [state, dispatch] = useReducer(asyncReducer, initialState);
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await sickService.getSickList({ q: value });
      dispatch({ type: "SUCCESS", data });
    } catch (e: any) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return [state, fetchData];
};



// src/components/SearchForm.ts

export const SearchForm = () => {
  const [value, onChange, reset] = useInput("");
  const debouncedValue = useDebounce(value, 500);
  const [{ loading, data, error }] = useSickAsync(debouncedValue, [
    debouncedValue,
  ]);

  const items = data?.data;
  const [activeIdx, handleKeyArrow] = useKeyArrow(items || []);

  return (
    <S.SearchFormContainer>
      <S.SearchFormTitle>
        국내 모든 임상시험 검색하고 온라인으로 참여하기
      </S.SearchFormTitle>
      <SearchInput
        value={value}
        onChange={onChange}
        reset={reset}
        onKeyDown={handleKeyArrow}
      />
      {value && (
        <S.SearchResultBlock>
          {loading && <S.SearchItemLabel>검색 중 ...</S.SearchItemLabel>}
          {error && <S.SearchItemError>에러가 발생했습니다</S.SearchItemError>}
          {items && (
            <SearchList
              value={debouncedValue}
              items={items}
              activeIdx={activeIdx}
            />
          )}
        </S.SearchResultBlock>
      )}
    </S.SearchFormContainer>
  );
};

// 

```

- Flux 패턴을 적용해 비동기 통신 상태 관리(loading,error,success)를 커스텀 훅으로 분리

<br>

### 일치하는 텍스트 볼드 처리

```tsx

// src/utils

export const divideByKeyword = (target: string, keyword: string) => {
  const preIdx = target.indexOf(keyword);
  const postIdx = preIdx + keyword.length;
  const prefix = target.slice(0, preIdx);
  const postfix = target.slice(postIdx);

  return [prefix, postfix];
};


// src/components/SearchItem.tsx

interface SearchItemProps {
  value: string;
  keyword: string;
  isActive?: boolean;
}

export const SearchItem = ({
  value,
  keyword,
  isActive = false,
}: SearchItemProps) => {
  const [prefix, postfix] = divideByKeyword(value, keyword);

  return (
    <S.SearchItemBlock isActive={isActive}>
      <S.SearchItemIcon>
        <HiOutlineSearch size="1.8rem" color="#a6afb7" />
      </S.SearchItemIcon>
      <S.SearchItemText>{prefix}</S.SearchItemText>
      <S.SearchItemMatched>{keyword}</S.SearchItemMatched>
      <S.SearchItemText>{postfix}</S.SearchItemText>
    </S.SearchItemBlock>
  );
};

```

- 검색어(`keyword`)를 기준으로 전체 텍스트(`target`) string을 분리하는 유틸 함수 구현

<br>


## 7. 프로젝트 설치 및 실행 ✨

<br/>

1. Git Clone

```plaintext
$ git clone https://github.com/pre-onboading-2team/pre-onboarding-7th-3-1-2.git
```

2. 프로젝트 패키지 설치

```plaintext
$ npm install
```

3. 프로젝트 실행

```plaintext
$ npm start
```










