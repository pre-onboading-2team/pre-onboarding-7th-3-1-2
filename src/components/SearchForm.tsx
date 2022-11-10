import { useDebounce, useInput, useSickAsync } from "../hooks";
import { useKeyArrow } from "../hooks/useKeyArrow";
import { SearchInput, SearchList } from ".";
import * as S from "./style";

export const SearchForm = () => {
  const [value, onChange, reset] = useInput("");
  const debouncedValue = useDebounce(value, 500);
  const [{ loading, data, error }] = useSickAsync(debouncedValue, [
    debouncedValue,
  ]);

  const items = data?.data;
  const [activeIdx, handleKeyArrow] = useKeyArrow(items || []);

  return (
    <S.SearchFormContainer>
      <S.SearchFormTitle>
        국내 모든 임상시험 검색하고 온라인으로 참여하기
      </S.SearchFormTitle>
      <SearchInput
        value={value}
        onChange={onChange}
        reset={reset}
        onKeyDown={handleKeyArrow}
      />
      {value && (
        <S.SearchResultBlock>
          {loading && <S.SearchItemLabel>검색 중 ...</S.SearchItemLabel>}
          {error && <S.SearchItemError>에러가 발생했습니다</S.SearchItemError>}
          {items && (
            <SearchList
              value={debouncedValue}
              items={items}
              activeIdx={activeIdx}
            />
          )}
        </S.SearchResultBlock>
      )}
    </S.SearchFormContainer>
  );
};
