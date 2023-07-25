import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }

  h2 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0px 0px 10px 0px;
  }
`;
