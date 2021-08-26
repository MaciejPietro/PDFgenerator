import Breadcrumbs from "../components/Breadcrumbs";

// import ArtistDetails from "../components/settings/UserDetails";
import UserDetails from "../components/settings/UserDetails";

import { NavLink, Switch, Route, Redirect } from "react-router-dom";

const Settings = (props: any) => {
  const linkStyle =
    "text-blue-600 font-medium bg-gray-200 w-full block p-4 border-gray-500 hover:bg-gray-200 transition-colors";

  return (
    <section>
      <div className="container">
        <Breadcrumbs />
        <h1 className="mb-8">Settings</h1>
        <div className="flex items-start">
          <div className="w-60 rounded border border-gray-500 bg-white mr-8 flex-shrink-0">
            <NavLink to="/settings" className={linkStyle}>
              Artist details
            </NavLink>
            <NavLink to="/settings/account" className={linkStyle}>
              Account details
            </NavLink>
          </div>

          <div className="border-2 border-red-600">
            <Switch>
              <Route
                path="/settings"
                exact={true}
                component={() => {
                  return (
                    <UserDetails type="artist">
                      <div>
                        <h2>Artist details</h2>
                        <h3>Here are your artistic details</h3>
                      </div>
                    </UserDetails>
                  );
                }}
              />
              <Route
                path="/settings/account"
                component={() => {
                  return (
                    <UserDetails type="account">
                      <div>
                        <h2>Your details</h2>
                        <h3>Here are your account details</h3>
                      </div>
                    </UserDetails>
                  );
                }}
              ></Route>
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
