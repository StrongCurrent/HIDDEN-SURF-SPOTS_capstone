import { createGlobalStyle } from "styled-components";
import { Roboto_Flex } from "next/font/google";

const roboto = Roboto_Flex({
  subsets: ["latin", "latin-ext"],
});

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: ${roboto.style.fontFamily}, Arial, sans-serif;
  }

  h2 {
    font-size: 1.1rem;
    font-weight: 500;
    text-transform: uppercase;
    margin: 20px 0px 20px 0px;
  }

  button {
    font-family: var(--font-roboto), Arial, sans-serif !important;
}
`;