import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

interface IProps {
  exact?: boolean;
  isAuth: boolean | null;
  path: string | string[];
  component: React.ComponentType<any>;
}

const LoggedInRoute = ({ component: Component, isAuth }: IProps) => {
  if (isAuth == null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Route
        render={(otherProps) =>
          !isAuth ? <Redirect to="/login" /> : <Component {...otherProps} />
        }
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(mapStateToProps)(LoggedInRoute);
