import React from "react";
import { gql, useQuery } from "@apollo/client";

const USERS_QUERY = gql`
  query GetUsers {
    users {
        id
        name
        email
      }
  }
`;

interface User {
    name: string
    email: string
}

export default function Users() {
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <p>loading...</p>;
  if(error) return <p>error:{error.message}</p>

  console.log('data', data)
  console.log(process.env.REACT_APP_URL_ADDRESS)

  return <div>
      {data.users.map((user: User) => (<p>{user.name} : {user.email}</p>))}
      test
  </div>;
}
