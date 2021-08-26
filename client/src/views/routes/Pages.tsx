import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import About from "../components/About";
import Dashboard from "../pages/Dashboard";
import Templates from "../pages/Templates";
import Clients from "../pages/Clients";

import Settings from "../pages/Settings";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Landing from "../pages/Landing";

import LogOut from "../components/LogOut";
import NotFound from "../components/NotFound";
import Terms from "../components/Terms";

import LoggedInRoute from "../routes/LoggedInRoute";
import LoggedOutRoute from "../routes/LoggedOutRoute";

const Pages = () => {
  return (
    <Switch>
      <LoggedOutRoute path="/" exact={true} component={Landing} />
      <LoggedOutRoute path="/about" exact={true} component={About} />
      <LoggedOutRoute path="/log-in" exact={true} component={LogIn} />
      <LoggedOutRoute path="/register" exact={true} component={Register} />

      <LoggedInRoute path="/log-out" exact={true} component={LogOut} />
      <LoggedInRoute path="/dashboard" exact={true} component={Dashboard} />
      <LoggedInRoute path="/templates" exact={true} component={Templates} />
      <LoggedInRoute path="/clients" exact={true} component={Clients} />

      <LoggedInRoute
        path={["/settings", "/settings/account"]}
        component={Settings}
      />

      <Route path="/terms" exact={true} component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Pages;
