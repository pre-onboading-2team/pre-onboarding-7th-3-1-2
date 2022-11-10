import { useEffect, useRef } from "react";
import styled from "styled-components";

import { replaceWithBold } from "../utils";

const KeywordsList = ({
  items: keyWords,
  currentIndex,
  originalInputValue,
  isLoading,
}) => {
  const isEmptyData = keyWords?.length === 0;
  const isSameWithCurrentIndex = (idx) => idx === currentIndex;
  const ul = useRef();
  useEffect(() => {
    ul.current.childNodes.forEach((node) => {
      node.innerHTML = replaceWithBold(originalInputValue, node.innerHTML);
    });
  }, [keyWords]);

  return (
    <Ul ref={ul}>
      {isLoading && <div>불러오는 중..</div>}
      {!isLoading &&
        keyWords?.map(({ sickNm }, listIndex) => (
          <Li key={sickNm} isSelected={isSameWithCurrentIndex(listIndex)}>
            {sickNm}
          </Li>
        ))}
      {isEmptyData && !isLoading && <div>결과가 없습니다.</div>}
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
