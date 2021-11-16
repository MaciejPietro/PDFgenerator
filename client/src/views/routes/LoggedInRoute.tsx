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
}

const LoggedInRoute = ({ component: Component, isAuthenticated }: IProps) => {
  // useEffect(() => {
  //   if (isAuthenticated !== false) {
  //     history.push("/log-in");
  //   }
  // });

  return (
    <>
      <Route
        render={(otherProps) => (
          <>
            <div className="container">
              <Component {...otherProps} />
            </div>
          </>
        )}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: !!state.authReducer.userID,
});

export default connect(mapStateToProps)(LoggedInRoute);
