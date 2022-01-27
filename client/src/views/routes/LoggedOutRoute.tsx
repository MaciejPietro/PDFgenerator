import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import history from "../history";
import { ICurrentUser } from "../../redux/types";

interface IProps {
  exact?: boolean;
  isAuth: boolean | null;
  path: string;
  component: React.ComponentType<any>;
}

const LoggedOutRoute = ({
  component: Component,
  isAuth,
  ...otherProps
}: IProps) => {
  // useEffect(() => {
  //   if (isAuth === true) {
  //     history.push("/dashboard");
  //   }
  // });

  return (
    <>
      <Route render={(otherProps) => <Component {...otherProps} />} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(mapStateToProps)(LoggedOutRoute);
