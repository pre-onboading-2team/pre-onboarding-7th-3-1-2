import styled from "styled-components";

export const SearchFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 70rem;
  height: 30rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
`;

export const SearchFormTitle = styled.section`
  text-align: center;
  width: 36rem;

  font-size: 3.2rem;
  font-weight: 700;
  line-height: 5rem;
  overflow-wrap: break-word;

  margin-bottom: 3rem;
`;

export const SearchInputBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const SearchIconLeft = styled.div`
  position: absolute;
  left: 2rem;
`;

export const SearchIconCancel = styled.p<{ value: string }>`
  display: none;
  position: absolute;
  right: 6rem;
  cursor: pointer;

  ${(props) => props.value && `display:block;`}
`;

export const SearchIconRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 1rem;
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
  background: #017be8;

  cursor: pointer;

  transition: all 0.1s ease-out;

  &:hover {
    transform: scale(115%);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
`;

export const SearchInput = styled.input`
  height: 6rem;
  width: 40rem;
  border-radius: 6rem;
  padding: 3rem 5rem;
  border: none;

  font-size: 1.6rem;

  &::placeholder {
    color: #a6afb7;
    font-weight: 400;
  }

  &:focus::placeholder {
    color: transparent;
  }

  &:focus + div {
    display: none;
  }
`;

export const SearchResultBlock = styled.div`
  width: 40rem;
  border-radius: 1rem;
  background: white;

  padding: 2rem 0;

  margin-top: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

export const SearchItemBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 2rem;
  font-size: 1.4rem;

  &:hover {
    background: #f8f9fa;
    cursor: pointer;
  }

  &:active {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
  }
`;

export const SearchItemLabel = styled.div`
  width: 100%;
  padding: 1rem 2rem;

  font-size: 1.2rem;

  color: #a6afb7;
`;

export const SearchItemText = styled.span``;
export const SearchItemMatched = styled.span`
  font-weight: 700;
`;

export const SearchItemError = styled(SearchItemLabel)`
  font-size: 1.6rem;
  color: red;
`;

export const SearchItemIcon = styled.div`
  margin-right: 1rem;
`;
