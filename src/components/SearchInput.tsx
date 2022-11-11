import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { MdCancel } from "react-icons/md";

import * as S from "./style";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
}

export const SearchInput = ({
  value,
  onChange,
  onKeyDown,
  reset,
}: SearchInputProps) => {
  return (
    <S.SearchInputBlock>
      <S.SearchInput
        placeholder="질환명을 입력해 주세요."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <S.SearchIconLeft>
        <HiOutlineSearch size="2rem" color="#a6afb7" />
      </S.SearchIconLeft>
      <S.SearchIconCancel value={value} onClick={reset}>
        <MdCancel size="2rem" color="#a6afb7" />
      </S.SearchIconCancel>
      <S.SearchIconRight>
        <HiOutlineSearch size="2rem" color="white" />
      </S.SearchIconRight>
    </S.SearchInputBlock>
  );
};
