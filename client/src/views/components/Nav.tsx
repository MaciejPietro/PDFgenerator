import * as React from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
// import { ICurrent } from "../types";

interface IProps {
  isAuthenticated: boolean | null;
  uuid: string | null;
  username: string | null;
}

const Nav = ({ isAuthenticated, uuid, username }: IProps) => {
  const suffix = isAuthenticated ? "out" : "in";
  const logInOut = (
    <li>
      <NavLink to={"/log-" + suffix}>Log {suffix}</NavLink>
    </li>
  );

  const loggedLinks = isAuthenticated ? (
    <>
      <li className="flex flex-col">
        <span>Logged in as</span>
        <span>{username}</span>
      </li>
      <li className="mx-4">
        {/* <NavLink to="/settings">Settings</NavLink> */}
      </li>
    </>
  ) : (
    ""
  );

  const mainLinks = isAuthenticated ? (
    <>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/templates">Templates</NavLink>
      </li>
      <li>
        <NavLink to="/settings">Settings</NavLink>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to="/">Landing</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </>
  );

  return (
    <>
      <nav className="nav">
        {/* <p className="hidden">
          Auth state:{" "}
          {isAuthenticated ? `Logged in user: ${uuid}` : "Logged out"}
        </p> */}

        <ul className="ml-auto inline-flex">
          {loggedLinks}
          {logInOut}
        </ul>
      </nav>
      <nav className="nav">
        <ul>
          {mainLinks}
          <li>
            <NavLink to="/terms">Terms</NavLink>
          </li>
          <li>
            <NavLink to="/broken-link">Broken link</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    // TODO make ICurrent easilu accessible from any app level
    // const mapStateToProps = (state: ICurrent) => ({

    uuid: state.uuid,
    isAuthenticated: state.authReducer.isAuthenticated,
    username: state.authReducer.username,
  };
};

export default connect(mapStateToProps)(Nav);
