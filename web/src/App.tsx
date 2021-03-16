import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import Users from "./components/users";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./components/Landing";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  // uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

// client
//   .query({
//     query: gql`
//       query GetUsers {
//         allUsers {
//           id
//           name
//           email
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Users />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
