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

const mapStateToProps = (state: ICurrentUser) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(LoggedOutRoute);
