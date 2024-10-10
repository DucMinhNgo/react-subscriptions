import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

// const wsLink = new GraphQLWsLink(createClient({
//   url: 'ws://localhost:3005/graphql',
// }));

const wsLink = new WebSocketLink(
  new SubscriptionClient("ws://localhost:3005/graphql", {
    // connectionParams: {
    //   authToken: user.authToken
    // }
  })
);

const token = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoidGluQGdtYWlsLmNvbSIsInBpY3R1cmUiOiIiLCJlbWFpbCI6InRpbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImF1dGhfdGltZSI6MTcyODUzMTc4NSwidXNlcl9pZCI6IndONDlBNUZPcWNVS0NJQ0x1ekhnNk5tWTJBekgiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRpbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9LCJpYXQiOjE3Mjg1MzE3ODUsImV4cCI6MTcyODUzNTM4NSwiYXVkIjoic29xdXJhLWJldGEtZGV2ZWxvcG1lbnQiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29xdXJhLWJldGEtZGV2ZWxvcG1lbnQiLCJzdWIiOiJ3TjQ5QTVGT3FjVUtDSUNMdXpIZzZObVkyQXpIIn0.";

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "multipart"
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  // wsLink,
  // httpLink,
  uploadLink,
);
const client = new ApolloClient({
  // uri: 'http://localhost:3005/graphql',
  link: uploadLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
