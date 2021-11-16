import * as React from "react";
import TopBar from "./navs/TopBar";
import LeftBar from "./navs/LeftBar";

import { connect } from "react-redux";
import { logOut } from "../../redux/actions/authActions";

interface IProps {
  logOutConnect: () => void;
}

interface IProps {
  isAuthenticated: boolean | null;
  username: string | null;
  logOutConnect: () => void;
}

const Nav = ({ isAuthenticated, username, logOutConnect }: IProps) => {
  return (
    <>
      <TopBar
        isAuthenticated={isAuthenticated}
        username={username}
        logOutConnect={logOutConnect}
      />
      <LeftBar isAuthenticated={isAuthenticated} />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userID: state.authReducer.userID,
  };
};

const mapDispatchToProps = {
  logOutConnect: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
