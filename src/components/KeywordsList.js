import { useEffect, useRef } from "react";
import styled from "styled-components";

const KeywordsList = ({
  items: keyWords,
  currentIndex,
  originalInputValue,
}) => {
  const isSameWithCurrentIndex = (idx) => idx === currentIndex;
  const ul = useRef();
  const replaceWithBold = (word, sentence) => {
    return sentence.replace(word, `<b>${originalInputValue}</b>`);
  };
  useEffect(() => {
    if (ul?.current?.innerHTML) {
      ul.current.childNodes.forEach((node) => {
        node.innerHTML = replaceWithBold(originalInputValue, node.innerHTML);
      });
    }
  }, [keyWords]);

  return (
    <Ul ref={ul}>
      {keyWords.map(({ sickNm }, listIndex) => (
        <Li key={sickNm} isSelected={isSameWithCurrentIndex(listIndex)}>
          {sickNm}
        </Li>
      ))}
    </Ul>
  );
};

export default KeywordsList;

const Ul = styled.ul`
  background-color: white;
  min-height: 50px;
  width: 400px;
`;

const Li = styled.li`
  background-color: ${({ isSelected }) => (isSelected ? "#d0e8fd" : "white")};
`;
