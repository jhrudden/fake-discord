import React from "react";
import { useUsersQuery } from "../services/graphql/graphql";

type Props = {};

const Home: React.FC<Props> = () => {
  const { data } = useUsersQuery();
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Users:</h2>
      {data.users.map((user) => {
        const { id, email } = user;
        return (
          <div key={user.id}>
            <strong>id:</strong> ${id}, <strong>email:</strong> ${email}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
