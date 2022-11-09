import { SearchInput } from "./SearchInput";
import SearchList from "./SearchList";
import * as S from "./style";

const SearchForm = () => {
  return (
    <S.SearchFormContainer>
      <S.SearchFormTitle>
        국내 모든 임상시험 검색하고 온라인으로 참여하기
      </S.SearchFormTitle>
      <SearchInput />
      {/* 입력 중인 상태 : 검색 중 화면 */}
      {/* 입력 완료 상태 : 검색 결과 화면 */}
      <SearchList />
    </S.SearchFormContainer>
  );
};

export default SearchForm;
