import { Redirect, Route, RouteProps } from "react-router";
import { accessTokenVar } from "../../util/accessToken";

type ProtectedRouteProps = {} & RouteProps;

// TODO: add some sort of check that user is authoricated
export const ProtectedRoute = ({ ...routeProps }: ProtectedRouteProps) => {
  const authToken = accessTokenVar();
  if (authToken) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={"/login"} />;
  }
};
