import { HiOutlineSearch } from "react-icons/hi";
import { MdCancel } from "react-icons/md";

import * as S from "./style";

export const SearchInput = () => {
  return (
    <S.SearchInputBlock>
      <S.SearchInput placeholder="질환명을 입력해 주세요." />
      <S.SearchIconLeft>
        <HiOutlineSearch size="2rem" color="#a6afb7" />
      </S.SearchIconLeft>
      <S.SearchIconCancel>
        <MdCancel size="2rem" color="#a6afb7" />
      </S.SearchIconCancel>
      <S.SearchIconRight>
        <HiOutlineSearch size="2rem" color="white" />
      </S.SearchIconRight>
    </S.SearchInputBlock>
  );
};
