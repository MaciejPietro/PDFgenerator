import { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import history from "../history";
import { ICurrentUser } from "../../redux/types";

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
  useEffect(() => {
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
            <div className="container">
              <Component {...otherProps} />
            </div>
          </>
        )}
      />
      {/* <footer>Logged In Footer</footer> */}
    </>
  );
};

const mapStateToProps = (state: ICurrentUser) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(LoggedInRoute);
