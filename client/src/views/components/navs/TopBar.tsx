import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

import { LogoutIcon, LoginIcon, SettingsIcon } from "../../../assets/icons";
import { connect } from "react-redux";
import { logOut } from "../../../redux/actions/authActions";

import { Logo } from "../../../assets/icons";

interface IProps {
  logOutConnect: () => void;
  isAuth: Boolean | null;
  username: string | null;
}

const menu = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "#about",
    name: "About",
  },
  {
    path: "#pricing",
    name: "Pricing",
  },
  {
    path: "/contact",
    name: "Contact",
  },
];

const TopBar = ({ logOutConnect, isAuth, username }: IProps) => {
  const nav = useRef<HTMLElement>(null);

  const handleScroll = () => {
    nav.current.classList[window.scrollY > 0 ? "add" : "remove"]("shrinked");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll());

    return window.removeEventListener("scroll", () => handleScroll());
  }, []);

  return (
    <nav
      className={`topbar ${isAuth == true && "topbar--authenticated"}`}
      ref={nav}
    >
      <div className="container">
        {isAuth ? (
          <>
            {username && (
              <div>
                <div className="text-sm text-blue-900">Logged in as</div>
                <div className="font-medium">{username}</div>
              </div>
            )}
            <button onClick={logOutConnect}>Log Out</button>
            {/* <NavLink to="/settings" className="topbar__container__icon">
              <SettingsIcon />
            </NavLink> */}
          </>
        ) : (
          <>
            <ul>
              <li>
                <a href="/">
                  <Logo />
                </a>
              </li>
              {menu.map((el, i) => {
                return (
                  <li key={i}>
                    <a href={el.path} key={el.name}>
                      {el.name}
                    </a>
                  </li>
                );
              })}
            </ul>

            <ul>
              <li>
                <NavLink to="/login">Log In</NavLink>
              </li>
              <li>
                <button className="btn">Start for free &gt;</button>
              </li>
            </ul>
          </>
        )}
      </div>
      {/* <NavLink
          to={isAuth ? "/" : "/login"}
          onClick={() => isAuth && logOutConnect()}
          className="topbar__container__icon"
        >
          {isAuth ? <LogoutIcon /> : <LoginIcon />}
        </NavLink> */}
    </nav>
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
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
