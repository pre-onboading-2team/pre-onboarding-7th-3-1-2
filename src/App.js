import { useEffect, useState } from "react";
import fetchWithKeyword from "./api/fetchWithKeyword";
import { DEBOUNCE_TIME } from "./constants";
import useInput from "./hooks/useInput";

function App() {
  const [inputValue, handleInputChange, setInputValue, isTyping, setIsTyping] =
    useInput("");
  const [keyWords, setKeyWords] = useState([]);

  useEffect(() => {
    if (!inputValue || !isTyping) return;

    const timer = setTimeout(async () => {
      console.log(inputValue, " api 호출");
      const res = await fetchWithKeyword(inputValue);
      const data = await res.json();
      setKeyWords(data);
      console.log(data);
    }, DEBOUNCE_TIME);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleArrowing = () => {
    setIsTyping(false);
    setInputValue("추천검색어 by arrowing");
  };

  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleArrowing}>키보드로 밸류 바꾸기</button>
      {keyWords.map(({ sickNm }) => (
        <div key={sickNm}>{sickNm}</div>
      ))}
    </div>
  );
}

export default App;

// 요청받은 [1,2,3]

// index = useState(-1)
// 애로우 키다운 index +  =>  array[index].검색어 => setInputValue(검색어)
//
// <목록아이템  isFocused={index === idx(from mapFn)}>{listItem.검색어}</목록아이템 >
