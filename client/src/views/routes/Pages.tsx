import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import About from "../components/About";
import Dashboard from "../pages/Dashboard";
import Templates from "../pages/Templates";

import Landing from "../components/Landing";
import LogIn from "../components/LogIn";
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
      <LoggedInRoute path="/log-out" exact={true} component={LogOut} />
      <LoggedInRoute path="/dashboard" exact={true} component={Dashboard} />
      <LoggedInRoute path="/templates" exact={true} component={Templates} />

      <Route path="/terms" exact={true} component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Pages;
