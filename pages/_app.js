import Head from "next/head";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import fetcher from "../utils/fetcher";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Head>
          <title>HIDDEN SURF SPOTS</title>
        </Head>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SWRConfig>
    </>
  );
}