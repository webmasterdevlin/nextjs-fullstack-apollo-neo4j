import "src/styles/globals.css";
import React from "react";
import App from "next/app";
import RootStore from "src/store/rootStore";
import { CssBaseline, ThemeProvider } from "@material-ui/core";

import NavigationBar from "src/components/NavigationBar";
import theme from "src/styles/theme";

type Props = {
  Component: React.Component;
};
/*
 * Use _app.js to extend react applications in Next.js.
 * Note: Per the Next.js docs, using _app.js disables the ability to perform automatic static optimization,
 * causing every page in your app to be server-side rendered.
 * */
class MyApp extends App<Props> {
  render() {
    let { Component, pageProps } = this.props;

    return (
      <RootStore>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <NavigationBar />
            <Component {...pageProps} />
          </CssBaseline>
        </ThemeProvider>
      </RootStore>
    );
  }
}

export default MyApp;
