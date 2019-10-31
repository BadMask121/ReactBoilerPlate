import React, { Component } from 'react'
import ReactDom from 'react-dom'
import {
  BrowserRouter as Router
} from "react-router-dom";
import {
  CookiesProvider,
  Cookies
} from "react-cookie";
import {
  ApolloProvider
} from "react-apollo";
import {
  Provider
} from 'react-redux'

import {
  ApolloClient
} from "apollo-client";
import {
  createHttpLink
} from "apollo-link-http";
import {
  InMemoryCache
} from "apollo-cache-inmemory";
import {
  onError
} from "apollo-link-error";
import {
  ApolloLink
} from "apollo-link";
import {
  setContext
} from "apollo-link-context";

import * as Sentry from "@sentry/browser";


import App from "./app";

import {
  Error401
} from "./components/Error";

import store from './providers/store'

import whyDidYouRender from '@welldone-software/why-did-you-render'

import ErrorBoundary from "./containers/ErrorBoundary/index.js";

const {
  AUTH_TOKEN_FLAG
} = require("./helpers/constant.js");


if (process.env.NODE_ENV !== "production") {
  whyDidYouRender(React)
}

if (process.env.NODE_ENV === "production")
  // sentry for runtime debugging even on production
  Sentry.init({
    dsn: process.env.SENTRY,
  });

//cookies handler
const cookies = new Cookies();

// graphql server error handler with Sentry logger
const errorLink = onError(({
  graphQLErrors,
  networkError,
  operation
}) => {
  if (graphQLErrors) Sentry.captureEvent(graphQLErrors);
  if (networkError) Sentry.captureEvent(networkError);
  if (operation) Sentry.captureEvent(operation);

  Sentry.withScope(scope => {
    scope.setExtras({
      graphQLErrors,
      networkError,
      operation,
    });
  });
});

//authLink
const authLink = setContext((_, {
  headers,
  ...$
}) => {
  return new Promise((resolve, reject) => {
    if (cookies.get(AUTH_TOKEN_FLAG) === null) {
      reject(Error401);
    }

    const context = {
      ...$,
      headers: {
        ...headers,
        Authorisation: `Bearer ${cookies.get(AUTH_TOKEN_FLAG) || ""}`,
      },
    };

    return resolve(context);
  });
});

// http linking to graphql server
const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_SERVER_URL,
});

// client linking to http server
const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDom.render(
  <CookiesProvider>
    <Router>
      <ApolloClient client={client}>
        <App/>
      </ApolloClient>
    </Router>
  </CookiesProvider>  
  , document.getElementById('app'))