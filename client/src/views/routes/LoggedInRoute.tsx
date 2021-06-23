import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import history from "../history";
import { ICurrent } from "../../interfaces/types";

interface IProps {
  exact?: boolean;
  isAuthenticated: boolean | null;
  path: string | string[];
  component: React.ComponentType<any>;
  children?: any;
}

const LoggedInRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}: IProps) => {
  React.useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/log-in");
    }
  });

  return (
    <>
      {/* <header>Logged In Header</header> */}
      <Route
        render={(otherProps) => (
          <>
            <Component {...otherProps} />
          </>
        )}
      />
      {/* <footer>Logged In Footer</footer> */}
    </>
  );
};

const mapStateToProps = (state: ICurrent) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(LoggedInRoute);
