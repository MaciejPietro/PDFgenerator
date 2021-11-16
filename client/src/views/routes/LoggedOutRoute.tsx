import { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import history from "../history";
import { ICurrentUser } from "../../redux/types";

interface IProps {
  exact?: boolean;
  isAuthenticated: boolean | null;
  path: string;
  component: React.ComponentType<any>;
}

const LoggedOutRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}: IProps) => {
  useEffect(() => {
    if (isAuthenticated === true) {
      history.push("/dashboard");
    }
  });

  return (
    <>
      <Route
        render={(otherProps) => (
          <>
            <Component {...otherProps} />
          </>
        )}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: !!state.authReducer.userID,
});

export default connect(mapStateToProps)(LoggedOutRoute);
