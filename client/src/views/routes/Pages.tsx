import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Templates from "../pages/Templates";
import Clients from "../pages/Clients";
import Settings from "../pages/Settings";
import Creator from "../pages/Creator";

import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Landing from "../pages/Landing";

import LogOut from "../components/LogOut";
import NotFound from "../components/NotFound";

import LoggedInRoute from "../routes/LoggedInRoute";
import LoggedOutRoute from "../routes/LoggedOutRoute";

const Pages = () => {
  return (
    <Switch>
      <LoggedOutRoute path="/" exact={true} component={Landing} />
      <LoggedOutRoute path="/login" exact={true} component={LogIn} />
      <LoggedOutRoute path="/register" exact={true} component={Register} />
      <LoggedInRoute path="/log-out" exact={true} component={LogOut} />
      <LoggedInRoute path="/dashboard" exact={true} component={Dashboard} />
      <LoggedInRoute path="/templates" exact={true} component={Templates} />
      <LoggedInRoute path="/clients" exact={true} component={Clients} />

      <LoggedInRoute
        path={["/settings", "/settings/account", "/settings/general"]}
        component={Settings}
      />

      <LoggedInRoute path={["/creator"]} component={Creator} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default Pages;
