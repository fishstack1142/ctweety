import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Redirect } from "react-router";

const CHECK_LOGGED_IN = gql`
  query GetUsers {
    me {
      id
      name
      email
    }
  }
`;

interface Props {
  children?: React.ReactNode;
}

export default function IsAuthenticated({ children }: Props) {
  const { loading, error, data } = useQuery(CHECK_LOGGED_IN);
  if (loading) return <p>loading...</p>;
  if (error) return <p>error:=]]{error.message}</p>;
  if (!data.me) {
    return <Redirect to={{ pathname: "/landing" }} />;
  }

  return <div> {data.me.email} [][]{children}</div>;
  //   return children;
}
