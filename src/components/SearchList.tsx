import { SickData } from "../types";
import { SearchItem } from "./SearchItem";
import * as S from "./style";

interface SearchListProps {
  value: string;
  items: Array<SickData>;
}

const SearchList = ({ value, items }: SearchListProps) => {
  return (
    <>
      {/* 입력한 값 하이라이트 검색어 노출 */}
      <SearchItem value={value} keyword={value} />
      <S.SearchItemText>추천 검색어</S.SearchItemText>
      {items.map(({ sickCd, sickNm }) => (
        <SearchItem key={sickCd} value={sickNm} keyword={value} />
      ))}
    </>
  );
};

export default SearchList;
