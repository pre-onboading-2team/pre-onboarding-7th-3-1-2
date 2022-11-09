import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [isTyping, setIsTyping] = useState(false);
  const handleChange = (e) => {
    setIsTyping(true);
    setValue(e.target.value);
  };

  return [value, handleChange, setValue, isTyping, setIsTyping];
};

export default useInput;

//디바운싱후 vlaue change 후 change타입 체크(방향키무브인지 타이핑인지) => api 요청
