import React, { FC } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import { MatchContextProvider } from "../context/MatchContext";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>BlackJack - Next.js</title>
      </Head>
      <Header />
      <MatchContextProvider>
        <Component {...pageProps} />
      </MatchContextProvider>
    </>
  );
};

export default MyApp;
