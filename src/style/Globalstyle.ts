import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
    box-sizing: border-box;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    margin: 0;
    padding: 0;
}
html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background:#cae9ff;
    font-size: 10px;
    #root {
      width: 100%;
      height: 100%;
    }
  }
  ol, ul, li {
    list-style: none;
    margin: none;
  }
  a {
    text-decoration: none;
    &:link,
    &:visited {
      color: inherit;
    }
  }
  button {
    cursor: pointer;
  }
`;
