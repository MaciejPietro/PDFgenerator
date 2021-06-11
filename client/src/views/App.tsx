import * as React from "react";
import routes from "../config/routes";
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from "react-router-dom";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";

// import Creator from "./Creator";
// import Header from "./Header";

const App: React.FunctionComponent<{}> = () => {
  return (
    <div>
      {/* <Header /> */}

      <BrowserRouter>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => (
                  <route.component
                    name={route.name}
                    {...props}
                    {...route.props}
                  />
                )}
              />
            );
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

declare let module: Record<string, unknown>;

export default hot(module)(App);
