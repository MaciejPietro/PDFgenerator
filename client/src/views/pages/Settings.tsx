import AccountSettings from "../components/settings/AccountSettings";
import ArtistSettings from "../components/settings/ArtistSettings";

import { NavLink, Switch, Route } from "react-router-dom";

const Settings = () => {
  const linkStyle =
    "text-blue-600 font-medium bg-gray-200 w-full block p-4 border-gray-500 hover:bg-gray-200 transition-colors";

  return (
    <section>
      <div className="container">
        <h1 className="mb-8">Settings</h1>
        <div className="flex items-start gap-16">
          <div className="w-60 rounded border border-gray-500 bg-white flex-shrink-0">
            <NavLink to="/settings" className={linkStyle}>
              Artist details
            </NavLink>
            <NavLink to="/settings/account" className={linkStyle}>
              Account details
            </NavLink>
          </div>

          <Switch>
            <Route
              path="/settings"
              exact={true}
              component={() => {
                return <ArtistSettings></ArtistSettings>;
              }}
            />
            <Route
              path="/settings/account"
              exact={true}
              component={() => {
                return <AccountSettings></AccountSettings>;
              }}
            />
          </Switch>
        </div>
      </div>
    </section>
  );
};

export default Settings;
