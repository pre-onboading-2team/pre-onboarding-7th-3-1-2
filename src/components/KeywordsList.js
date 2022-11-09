import { createElement } from "react";
import styled from "styled-components";

const KeywordsList = ({
  items: keyWords,
  currentIndex,
  originalInputValue,
}) => {
  const isSameWithCurrentIndex = (idx) => idx === currentIndex;
  return (
    <Ul>
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
