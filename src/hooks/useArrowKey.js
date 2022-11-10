import { useState } from "react";

const useArrowKey = (keywords) => {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(-1);
  const handleArrowing = (e) => {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        const isFirstItem = currentKeywordIndex === -1;
        if (isFirstItem) {
          setCurrentKeywordIndex(keywords.length - 1);
          return;
        }
        setCurrentKeywordIndex((idx) => idx - 1);
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        const isLastItem = currentKeywordIndex === keywords.length - 1;
        if (isLastItem) {
          setCurrentKeywordIndex(-1);
          return;
        }
        setCurrentKeywordIndex((idx) => idx + 1);
        break;
      }
    }
  };
  return [currentKeywordIndex, handleArrowing];
};

export default useArrowKey;
