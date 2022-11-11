import { useEffect, useState } from "react";
import styled from "styled-components";

import getKeywords from "./api/getKeywords";
import KeywordsList from "./components/KeywordsList";
import { DEBOUNCE_TIME } from "./constants";
import { useArrowKey, useAsync, useDebounce, useInput } from "./hooks";

function App() {
  const [savedInputValue, setSavedInputValue] = useState("");
  const [
    inputValue,
    handleInputChange,
    setInputValue,
    isChangedByTyping,
    setIsChangedByTyping,
  ] = useInput("");
  const {
    data: keywords,
    asyncFn: fetchData,
    isLoading,
    removeData,
  } = useAsync(() => getKeywords(debouncedInputValue));
  const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_TIME);
  const [currentKeywordIndex, setCurrentKeywordIndex, handleArrow] =
    useArrowKey(keywords);

  useEffect(() => {
    if (!inputValue || !isChangedByTyping) {
      return;
    }
    setSavedInputValue(inputValue);
    setCurrentKeywordIndex(-1);
    fetchData();
  }, [debouncedInputValue]);

  useEffect(() => {
    if (currentKeywordIndex === -1) {
      setInputValue(savedInputValue);
      return;
    }
    setInputValue(keywords[currentKeywordIndex]?.sickNm);
    setIsChangedByTyping(false);
  }, [currentKeywordIndex]);

  return (
    <Container className="App">
      <h1>국내 모든 임상시험 검색하고 온라인으로 참여하기</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleArrow}
      />
      <button>검색</button>
      {inputValue && (
        <KeywordsList
          items={keywords}
          currentIndex={currentKeywordIndex}
          savedInputValue={savedInputValue}
          isLoading={isLoading}
          removeData={removeData}
        />
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;
