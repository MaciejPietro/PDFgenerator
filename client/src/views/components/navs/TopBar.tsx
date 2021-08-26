import { NavLink } from "react-router-dom";
import { LogoutIcon, LoginIcon, SettingsIcon } from "../../../assets/icons";

interface IProps {
  isAuthenticated: boolean | null;
  username: string | null;
  logOutConnect: () => void;
}

const TopBar = ({ isAuthenticated, username, logOutConnect }: IProps) => {
  return (
    <nav className={`topbar ${isAuthenticated && "topbar--authenticated"}`}>
      <div className="topbar__container">
        {isAuthenticated && (
          <>
            <div>
              <div className="text-sm text-blue-900">Logged in as</div>
              <div className="font-medium">{username}</div>
            </div>
            <NavLink to="/settings" className="topbar__container__icon">
              <SettingsIcon />
            </NavLink>
          </>
        )}
        <NavLink
          to={isAuthenticated ? "/" : "/log-in"}
          onClick={() => isAuthenticated && logOutConnect()}
          className="topbar__container__icon"
        >
          {isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
        </NavLink>
      </div>
    </nav>
  );
};

export default TopBar;
