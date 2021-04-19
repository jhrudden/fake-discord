import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";
import Bye from "./containers/bye";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Header from "./header";
import { useCurrentUserQuery } from "./hooks/graphql/graphql";
import { User } from "./types/user";

type ProtectedRouteProps = {
  user: User | null;
} & RouteProps;

// TODO: add some sort of check that user is authoricated
const ProtectedRoute = ({ user, ...routeProps }: ProtectedRouteProps) => {
  if (user) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={"/login"} />;
  }
};

const Routes: React.FC = () => {
  const { data, loading } = useCurrentUserQuery();
  let user: any = null;
  if (loading) return <div>loading...</div>;
  if (data && data.currentUser) {
    user = data.currentUser;
  }
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/login" exact component={Login} />
          <ProtectedRoute user={user} exact path="/" component={Home} />
          <ProtectedRoute user={user} exact path="/bye" component={Bye} />
          <Route path="/register" exact component={Register} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
