import { Redirect, Route, RouteProps } from "react-router";
import { User } from "../../types/user";

type ProtectedRouteProps = {
  user: User | null;
} & RouteProps;

// TODO: add some sort of check that user is authoricated
export const ProtectedRoute = ({
  user,
  ...routeProps
}: ProtectedRouteProps) => {
  if (user) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={"/login"} />;
  }
};
