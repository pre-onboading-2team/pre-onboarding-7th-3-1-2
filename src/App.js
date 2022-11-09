import { useEffect, useState } from "react";
import styled from "styled-components";
import getKeywords from "./api/getKeywords";
import KeywordsList from "./components/KeywordsList";
import { DEBOUNCE_TIME } from "./constants";
import useInput from "./hooks/useInput";

function App() {
  const [originalInputValue, setOriginalInputValue] = useState("");
  const [inputValue, handleInputChange, setInputValue, isTyping, setIsTyping] =
    useInput("");
  const [keyWords, setKeyWords] = useState([]);
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(-1);

  useEffect(() => {
    if (!inputValue || !isTyping) return;

    const timer = setTimeout(async () => {
      console.log(inputValue, " api 호출");
      setOriginalInputValue(inputValue);
      const res = await getKeywords(inputValue);
      const data = await res.json();
      setKeyWords(data);
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
      case "ArrowDown":
        const isLastItem = currentKeywordIndex === keyWords.length - 1;
        e.preventDefault();
        setIsTyping(false);
        if (isLastItem) return;
        setInputValue(keyWords[currentKeywordIndex + 1]?.sickNm);
        setCurrentKeywordIndex((idx) => idx + 1);
        break;
    }
  };

  return (
    <Container className="App">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleArrowing}
      />
      <button onClick={() => setInputValue("담낭")}>클릭</button>
      {inputValue && (
        <KeywordsList
          items={keyWords}
          currentIndex={currentKeywordIndex}
          originalInputValue={originalInputValue}
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

// 요청받은 [1,2,3]

// index = useState(-1)
// 애로우 키다운 index +  =>  array[index].검색어 => setInputValue(검색어)
//
// <목록아이템  isFocused={index === idx(from mapFn)}>{listItem.검색어}</목록아이템 >
