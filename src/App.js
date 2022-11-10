import { useEffect, useState } from "react";
import styled from "styled-components";

import getKeywords from "./api/getKeywords";
import KeywordsList from "./components/KeywordsList";
import { DEBOUNCE_TIME } from "./constants";
import { useArrowKey, useAsync, useDebounce, useInput } from "./hooks";

function App() {
  const [originalInputValue, setOriginalInputValue] = useState("");
  const [inputValue, handleInputChange, setInputValue, isTyping, setIsTyping] =
    useInput("");
  const {
    data: keywords,
    asyncFn: fetchData,
    isLoading,
    removeData,
  } = useAsync(() => getKeywords(debouncedInputValue));
  const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_TIME);
  const [currentKeywordIndex, handleArrow] = useArrowKey(keywords);

  useEffect(() => {
    if (!inputValue || !isTyping) {
      return;
    }
    setOriginalInputValue(inputValue);
    fetchData();
  }, [debouncedInputValue]);

  useEffect(() => {
    if (currentKeywordIndex === -1) {
      setInputValue(originalInputValue);
      return;
    }
    setInputValue(keywords[currentKeywordIndex]?.sickNm);
    setIsTyping(false);
  }, [currentKeywordIndex]);

  return (
    <Container className="App">
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
          originalInputValue={originalInputValue}
          isLoading={isLoading}
          removeData={removeData}
        />
      )}{" "}
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;
