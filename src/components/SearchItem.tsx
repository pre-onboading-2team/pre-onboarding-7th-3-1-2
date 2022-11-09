import { HiOutlineSearch } from "react-icons/hi";

import * as S from "./style";

const SearchItem = () => {
  return (
    <S.SearchItemBlock>
      <S.SearchItemIcon>
        <HiOutlineSearch size="1.8rem" color="#a6afb7" />
      </S.SearchItemIcon>
      비만
    </S.SearchItemBlock>
  );
};

export default SearchItem;
