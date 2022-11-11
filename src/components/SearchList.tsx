import { SickData } from "../types";
import { SearchItem } from "./SearchItem";
import * as S from "./style";

interface SearchListProps {
  value: string;
  items: Array<SickData>;
  activeIdx: number;
}

export const SearchList = ({ value, items, activeIdx }: SearchListProps) => {
  return (
    <>
      <SearchItem value={value} keyword={value} />
      <S.SearchItemLabel>추천 검색어</S.SearchItemLabel>
      {items.map(({ sickCd, sickNm }, idx) => (
        <SearchItem
          key={sickCd}
          value={sickNm}
          keyword={value}
          isActive={activeIdx === idx}
        />
      ))}
    </>
  );
};
