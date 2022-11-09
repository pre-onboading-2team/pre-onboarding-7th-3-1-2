import SearchItem from "./SearchItem";
import * as S from "./style";

const SearchList = () => {
  return (
    <S.SearchListBlock>
      {/* 입력 중인 상태 : 검색 중 화면 */}
      <S.SearchItemText>검색 중 ...</S.SearchItemText>
      {/* 입력 완료 상태 : 검색 결과 화면 */}
      <SearchItem />
      <S.SearchItemText>추천 검색어</S.SearchItemText>
      <SearchItem />
      <SearchItem />
    </S.SearchListBlock>
  );
};

export default SearchList;
