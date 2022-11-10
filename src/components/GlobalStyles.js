import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset};

* {
  box-sizing: border-box;
}

b {
  font-weight: bold;
}

body {
  background-color:#d0e8fd;
}


`;

export default GlobalStyles;
