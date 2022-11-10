import { useEffect, useState } from "react";
import styled from "styled-components";

import getKeywords from "./api/getKeywords";
import KeywordsList from "./components/KeywordsList";
import { DEBOUNCE_TIME } from "./constants";
import useAsync from "./hooks/useAsync";
import useInput from "./hooks/useInput";

function App() {
  const [originalInputValue, setOriginalInputValue] = useState("");
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(-1);
  const [inputValue, handleInputChange, setInputValue, isTyping, setIsTyping] =
    useInput("");
  const {
    data: keyWords,
    fetchData,
    isLoading,
  } = useAsync(() => getKeywords(inputValue));
  useEffect(() => {
    if (!inputValue || !isTyping) return;

    const timer = setTimeout(async () => {
      console.log(inputValue, " api 호출");
      setOriginalInputValue(inputValue);
      fetchData();
    }, DEBOUNCE_TIME);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleArrowing = (e) => {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        setIsTyping(false);
        if (currentKeywordIndex === 0) {
          setCurrentKeywordIndex(-1);
          setInputValue(originalInputValue);
          return;
        }
        if (currentKeywordIndex > 0) {
          setCurrentKeywordIndex((idx) => idx - 1);
          setInputValue(keyWords[currentKeywordIndex - 1]?.sickNm);
        }
        break;
      }
      case "ArrowDown": {
        const isLastItem = currentKeywordIndex === keyWords.length - 1;
        e.preventDefault();
        setIsTyping(false);
        if (isLastItem) return;
        setInputValue(keyWords[currentKeywordIndex + 1]?.sickNm);
        setCurrentKeywordIndex((idx) => idx + 1);
        break;
      }
    }
  };
  // 인덱스 순환 구현해보기
  return (
    <Container className="App">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleArrowing}
      />
      <button>검색</button>
      {inputValue && (
        <KeywordsList
          items={keyWords}
          currentIndex={currentKeywordIndex}
          originalInputValue={originalInputValue}
          isLoading={isLoading}
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
