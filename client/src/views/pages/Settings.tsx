import AccountSettings from "../components/settings/AccountSettings";
import PersonalSettings from "../components/settings/PersonalSettings";
import GeneralSettings from "../components/settings/GeneralSettings";

import Signature from "../components/Signature";

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
              General Settings
            </NavLink>
            <NavLink to="/settings/personal" className={linkStyle}>
              Personal details
            </NavLink>
            <NavLink to="/settings/account" className={linkStyle}>
              Account details
            </NavLink>
          </div>

          <Route
            path="/settings"
            exact={true}
            component={() => {
              return <GeneralSettings></GeneralSettings>;
            }}
          />

          <Switch>
            <Route
              path="/settings/personal"
              exact={true}
              component={() => {
                return (
                  <>
                    <PersonalSettings></PersonalSettings>
                    <Signature></Signature>;
                  </>
                );
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
