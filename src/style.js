/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-parens */
import styled from 'styled-components';

const SearchContainer = styled.div`
  width: 100%;
  height: 50rem;
  background-color: #cae9ff;
  position: relative;
  border: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    line-height: 3rem;
    padding-bottom: 3rem;
  }

  span {
  }

  button {
    position: absolute;
    left: 70rem;
    top: 30rem;
    background-color: blue;
    width: 3rem;
    height: 3rem;
    border-radius: 100px;
  }
`;

const Search = styled.input`
  width: 35rem;
  height: 5rem;
  border-radius: 100px;
  border: 0;
  padding-left: 3rem;
  font-size: 1rem;
  font-weight: bold;
  outline: none;
`;

const AutoSearchContainer = styled.div`
  z-index: 3;
  height: auto;
  width: 35rem;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  position: absolute;
  top: 32.5rem;
`;

const AutoSearchWrap = styled.ul``;

const AutoSearchData = styled.li`
padding: 10px 8px;
width: 100%
font-size: 14px;
z-index: 4;
letter-spacing: 2px;
list-style:none;
&:hover {
  background-color: #eaeaea;
  cursor: pointer;
}

a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
}
span {
  padding-left: 10px;
}
background-color: ${props => props.selected && '#eaeaea'};
position: relative;
`;

const S = {
  SearchContainer,
  Search,
  AutoSearchContainer,
  AutoSearchWrap,
  AutoSearchData,
};

export default S;
