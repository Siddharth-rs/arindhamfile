import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {/* <Layout> */}
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      {/* </Layout> */}
    </SessionProvider>
  );
}

export default MyApp;
