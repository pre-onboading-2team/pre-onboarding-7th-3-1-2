import { HiOutlineSearch } from "react-icons/hi";

import { divideByKeyword } from "../utils";
import * as S from "./style";

interface SearchItemProps {
  value: string;
  keyword: string;
}

export const SearchItem = ({ value, keyword }: SearchItemProps) => {
  const [prefix, subfix] = divideByKeyword(value, keyword);

  return (
    <S.SearchItemBlock>
      <S.SearchItemIcon>
        <HiOutlineSearch size="1.8rem" color="#a6afb7" />
      </S.SearchItemIcon>
      <S.SearchItemText>{prefix}</S.SearchItemText>
      <S.SearchItemMatched>{keyword}</S.SearchItemMatched>
      <S.SearchItemText>{subfix}</S.SearchItemText>
    </S.SearchItemBlock>
  );
};
