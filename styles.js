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
    text-transform: uppercase;
    margin: 40px 0px 20px 0px;
  }
`;
