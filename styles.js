import { createGlobalStyle } from "styled-components";
import { Roboto_Flex, Poppins } from "next/font/google";

const roboto = Roboto_Flex({
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "latin",
    "latin-ext",
    "vietnamese",
  ],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    font-family: ${roboto.style.fontFamily}, ${poppins.style.fontFamily}, Arial, sans-serif;
  }

  h2 {
    font-size: 1.1rem;
    font-weight: 500;
    text-transform: uppercase;
    margin: 20px 0px 20px 0px;
  }
`;
