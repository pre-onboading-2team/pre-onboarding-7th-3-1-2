import { HiOutlineSearch } from "react-icons/hi";

import * as S from "./style";

interface SearchItemProps {
  value: string;
  keyword: string;
}

export const SearchItem = ({ value, keyword }: SearchItemProps) => {
  // TODO: 일치 테스트 하이라이트 처리
  // const matchedText = value.match(new RegExp(keyword, "gi"));

  return (
    <S.SearchItemBlock>
      <S.SearchItemIcon>
        <HiOutlineSearch size="1.8rem" color="#a6afb7" />
      </S.SearchItemIcon>
      {/* TODO: 일치 텍스트 하이라이트 처리 */}
      {value}
      {/* {matchedText} */}
    </S.SearchItemBlock>
  );
};
