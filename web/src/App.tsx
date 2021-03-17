import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Users from "./components/Users";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./components/Landing";
import { setContext } from "apollo-link-context";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IsAuthenticated from "./components/IsAuthenticated";

const httpLink: ApolloLink = new HttpLink({ uri: "http://localhost:4000" });
const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "http://localhost:4000",
//   // uri: "https://48p1r2roz4.sse.codesandbox.io",
//   cache: new InMemoryCache(),
// });

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
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
          <IsAuthenticated>
            <Route exact path="/users">
              <Users />
            </Route>
          </IsAuthenticated>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
