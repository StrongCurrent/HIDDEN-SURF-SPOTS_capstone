import Head from "next/head";
import { Roboto_Flex } from "next/font/google";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

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

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: async (...args) => {
            const response = await fetch(...args);
            if (!response.ok) {
              throw new Error(`Request with ${JSON.stringify(args)} failed.`);
            }
            return await response.json();
          },
        }}
      >
        <style jsx global>{`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}</style>
        <GlobalStyle />
        <Head>
          <title>HIDDEN SURF SPOTS</title>
        </Head>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
