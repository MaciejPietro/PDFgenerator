import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Router } from "react-router-dom";
import "../assets/scss/app-base.scss";
import "../assets/scss/app-utilities.scss";
import "../assets/scss/app-components.scss";

import history from "./history";
import TopBar from "./components/navs/TopBar";
import LeftBar from "./components/navs/LeftBar";

import Pages from "./routes/Pages";
import { authentication } from "../redux/actions/authActions";
import { createContext } from "react";
// import { ICurrentUser } from "../redux/types";
const Context = createContext("Default Value");
export { Context };

interface IProps {
  authenticationConnect: () => Promise<any>;
  isAuth: boolean | null;
}

const App = ({ authenticationConnect, isAuth }: IProps) => {
  useEffect(() => {
    authenticationConnect();
  }, []);

  return (
    <div>
      {/* <Context.Provider value={auth}> */}
      <Router history={history}>
        <TopBar />
        <div className="main">
          <LeftBar isAuth={isAuth} />
          <div className="pt-16 pl-16 bg-blue-200">
            <Route component={Pages} />
          </div>
        </div>
      </Router>
      {/* </Context.Provider> */}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isAuth: state.authReducer.isAuth,
  username: state.authReducer.username,
});

const mapDispatchToProps = {
  authenticationConnect: authentication,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
