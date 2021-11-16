import * as React from "react";
import { connect } from "react-redux";
import { Route, Router } from "react-router-dom";
import "../assets/scss/app-base.scss";
import "../assets/scss/app-utilities.scss";
import "../assets/scss/app-components.scss";

import history from "./history";
import Nav from "./components/Nav";
import Pages from "./routes/Pages";
import { authentication } from "../redux/actions/authActions";

// import { ICurrentUser } from "../redux/types";

interface IProps {
  authenticationConnect: () => void;
  isAuthenticated: boolean | null;
}

const App = ({ authenticationConnect, isAuthenticated }: IProps) => {
  React.useEffect(() => {
    authenticationConnect();
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Nav username={"Leszek"} isAuthenticated={isAuthenticated} />
        <div className="main">
          <Route component={Pages} />
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: !!state.authReducer.userID,
});

const mapDispatchToProps = {
  authenticationConnect: authentication,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
