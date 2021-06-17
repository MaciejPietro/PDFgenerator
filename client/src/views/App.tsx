import * as React from "react";
import { connect } from "react-redux";
import { Route, Router } from "react-router-dom";

import "../assets/scss/app-base.scss";
import "../assets/scss/app-components.scss";
import "../assets/scss/app-utilities.scss";
// import "../assets/scss/App.scss";

import history from "./history";
import Nav from "./components/Nav";
import Pages from "./routes/Pages";
import { checkAuthentication } from "../redux/actions/authActions";
import { checkUser } from "../redux/actions/userActions";

import { ICurrent } from "../redux/types";

interface IProps {
  checkAuthenticationConnect: () => void;
  isAuthenticated: boolean | null;
  checkUserConnect: () => void;
}

const App = ({ checkAuthenticationConnect, checkUserConnect }: IProps) => {
  React.useEffect(() => {
    checkAuthenticationConnect();
    checkUserConnect();
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Nav />
        <div className="main">
          <Route component={Pages} />
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: ICurrent) => ({
  isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = {
  checkAuthenticationConnect: checkAuthentication,
  checkUserConnect: checkUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
