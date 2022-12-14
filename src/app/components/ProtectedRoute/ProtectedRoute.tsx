import { Redirect, RouteProps } from "react-router";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ProtectedRouteProps extends RouteProps {
  children?: any;
}

export const ProtectedRoute = ({ children, ...rest }: ProtectedRouteProps) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.users.isUserLoggedIn
  );
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isLoggedIn === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
