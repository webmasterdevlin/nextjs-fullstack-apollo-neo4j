import "src/styles/globals.css";
import React from "react";
import App from "next/app";

import { CssBaseline, ThemeProvider } from "@material-ui/core";

import NavigationBar from "src/components/NavigationBar";
import theme from "src/styles/theme";

import { ApolloClient, ApolloProvider, gql } from "@apollo/client";
import { cache } from "../cache";

const client = new ApolloClient({
  cache: cache,
  uri: "http://localhost:3000/api/graphql",
  resolvers: {},
});

client
  .query({
    query: gql`
      query GET_HEROES {
        heroes {
          id
          knownAs
          house
        }
      }
    `,
  })
  .then((res) => console.log(JSON.stringify(res, null, 2)));

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
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <NavigationBar />
            <Component {...pageProps} />
          </CssBaseline>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default MyApp;
