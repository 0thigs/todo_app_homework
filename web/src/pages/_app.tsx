import "../styles/globals.css";
import type { AppProps } from "next/app";

function TaskApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default TaskApp;
