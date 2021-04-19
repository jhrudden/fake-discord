import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./components/Logout";
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from "./hooks/graphql/graphql";

type Props = {};

const Header: React.FC<Props> = () => {
  const [logout] = useLogoutMutation();
  const { data, loading } = useCurrentUserQuery({
    fetchPolicy: "network-only",
  });
  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.currentUser) {
    body = <div>You're logged in as {data.currentUser.email}</div>;
  } else {
    body = <div>You're not logged in</div>;
  }

  return (
    <div>
      <header>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/bye">Bye</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        {data && data.currentUser && <LogoutButton />}
      </header>
      {body}
    </div>
  );
};

export default Header;
