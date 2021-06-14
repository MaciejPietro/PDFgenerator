import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import history from "../history";
import { ICurrent } from "../../interfaces/types";

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
  React.useEffect(() => {
    if (isAuthenticated === true) {
      history.push("/dashboard");
    }
  });

  return (
    <>
      {/* <header>Logged Out Header</header> */}
      <Route
        render={(otherProps) => (
          <>
            <Component {...otherProps} />
          </>
        )}
      />
      {/* <footer>Logged Out Footer</footer> */}
    </>
  );
};

const mapStateToProps = (state: ICurrent) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(LoggedOutRoute);
