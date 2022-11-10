import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { replaceWithBold } from "../utils";

const KeywordsList = ({
  items: keywords,
  currentIndex,
  originalInputValue,
  isLoading,
  removeData,
}) => {
  const isEmptyData = keywords === null || keywords.length === 0; //리팩필
  const isSameWithCurrentIndex = (idx) => idx === currentIndex;
  const ul = useRef();

  useEffect(() => {
    if (!keywords) return;
    ul.current.childNodes.forEach((node) => {
      node.innerHTML = replaceWithBold(originalInputValue, node.innerHTML);
    });
  }, [keywords, ul, originalInputValue]);

  useEffect(() => {
    return () => {
      removeData();
    };
  }, []);

  return (
    <Ul ref={ul}>
      {isLoading && <div>불러오는 중..</div>}
      {!isLoading &&
        keywords?.map(({ sickNm }, listIndex) => (
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
