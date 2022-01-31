import * as React from "react";
import TopBar from "./navs/TopBar";

import { connect } from "react-redux";
import { logOut } from "../../redux/actions/authActions";

interface IProps {
  username: string;
  isAuth: boolean | null;
  logOutConnect: () => void;
}

const Nav = ({ isAuth, username, logOutConnect }: IProps) => {
  return (
    <>
      <TopBar />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    username: state.authReducer.username,
    isAuth: state.authReducer.isAuth,
  };
};

const mapDispatchToProps = {
  logOutConnect: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
