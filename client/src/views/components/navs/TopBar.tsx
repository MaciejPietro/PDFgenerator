import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import { LogoutIcon, LoginIcon, SettingsIcon } from "../../../assets/icons";
import { connect } from "react-redux";
import { logOut } from "../../../redux/actions/authActions";

interface IProps {
  logOutConnect: () => void;
  isAuth: Boolean | null;
  username: string;
}

const TopBar = ({ logOutConnect, isAuth, username }: IProps) => {
  return (
    <nav className={`topbar ${isAuth && "topbar--authenticated"}`}>
      <div className="topbar__container">
        {isAuth && (
          <>
            <div>
              <div className="text-sm text-blue-900">Logged in as</div>
              {/* <div className="font-medium">{username}</div> */}
            </div>
            {/* <NavLink to="/settings" className="topbar__container__icon">
              <SettingsIcon />
            </NavLink> */}
          </>
        )}

        <NavLink
          to={isAuth ? "/" : "/login"}
          onClick={() => isAuth && logOutConnect()}
          className="topbar__container__icon"
        >
          {isAuth ? <LogoutIcon /> : <LoginIcon />}
        </NavLink>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: any) => {
  return {
    username: state.authReducer,
    isAuth: state.authReducer.isAuth,
  };
};

const mapDispatchToProps = {
  logOutConnect: logOut,
};
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
