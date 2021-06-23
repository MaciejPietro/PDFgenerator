import * as React from "react";
import { connect } from "react-redux";
import {
  LogoutIcon,
  LoginIcon,
  SettingsIcon,
  LandingIcon,
  TemplatesIcon,
  ClockIcon,
  ClientsIcon,
} from "../../assets/icons";

import { NavLink } from "react-router-dom";
import SidebarLink from "../partials/SidebarLink";
import SidebarSlideIcon from "../partials/SidebarSlideIcon";

import { logOut } from "../../redux/actions/authActions";

interface IProps {
  logOutConnect: () => void;
}

interface IProps {
  isAuthenticated: boolean | null;
  uuid: string | null;
  username: string | null;
  logOutConnect: () => void;
}

const Nav = ({ isAuthenticated, uuid, username, logOutConnect }: IProps) => {
  const loginLink = isAuthenticated ? "/" : "/log-in";
  const logLink = (
    <NavLink
      to={loginLink}
      onClick={() => (isAuthenticated ? logOutConnect() : "")}
      className="w-10 h-10 border border-gray-700 rounded flex justify-center items-center 
      text-black-default transition-colors hover:bg-gray-300 cursor-pointer"
    >
      {isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
    </NavLink>
  );

  const topbarLinks = isAuthenticated ? (
    <>
      <div>
        <div className="text-sm text-blue-900">Logged in as</div>
        <div className="font-medium">{username}</div>
      </div>
      <NavLink
        to="/settings"
        className="w-10 h-10 border border-gray-700 rounded flex justify-center items-center 
        text-black-default transition-colors hover:bg-gray-300 cursor-pointer mr-2 ml-6"
      >
        <SettingsIcon />
      </NavLink>
    </>
  ) : (
    ""
  );

  const sidebarLinks = isAuthenticated ? (
    <>
      <SidebarLink name="dashboard">
        <LandingIcon />
      </SidebarLink>
      <SidebarLink name="templates">
        <TemplatesIcon />
      </SidebarLink>
      <SidebarLink name="clients">
        <ClientsIcon />
      </SidebarLink>
      <SidebarLink name="transactions">
        <ClockIcon />
      </SidebarLink>
      <SidebarLink name="settings">
        <SettingsIcon />
      </SidebarLink>
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
      <nav className="flex items-center bg-white h-16 border-b-2 border-gray-500 sticky top-0">
        <div className="ml-auto p-3 flex items-center">
          {topbarLinks}
          {logLink}
        </div>
      </nav>

      <nav className="sidebar">
        <ul className="mt-16 px-2 text-gray-900">{sidebarLinks}</ul>
        <SidebarSlideIcon />
      </nav>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    uuid: state.uuid,
    isAuthenticated: state.authReducer.isAuthenticated,
    username: state.authReducer.username,
  };
};

const mapDispatchToProps = {
  logOutConnect: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
