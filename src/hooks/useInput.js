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
