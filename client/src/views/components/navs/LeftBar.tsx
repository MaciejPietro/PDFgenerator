import LeftBarLink from "./LeftBarLink";
import { useContext, useEffect } from "react";

import LeftBarRollupIcon from "./LeftBarRollupIcon";
import { Context } from "../../App";

import {
  SettingsIcon,
  LandingIcon,
  TemplatesIcon,
  ClockIcon,
  ClientsIcon,
} from "../../../assets/icons";

interface IProps {
  isAuth: Boolean | null;
}

const LeftBar = ({ isAuth }: IProps) => {
  return (
    <nav className={`leftbar ${!isAuth && "hidden"}`}>
      <ul className="mt-16 px-2 text-gray-900">
        {isAuth ? (
          <>
            <LeftBarLink name="/dashboard">
              <LandingIcon />
            </LeftBarLink>
            <LeftBarLink name="/templates">
              <TemplatesIcon />
            </LeftBarLink>
            <LeftBarLink name="/clients">
              <ClientsIcon />
            </LeftBarLink>
            <LeftBarLink name="/transactions">
              <ClockIcon />
            </LeftBarLink>
            <LeftBarLink name="/settings">
              <SettingsIcon />
            </LeftBarLink>
          </>
        ) : (
          <>
            <LeftBarLink name="/">
              <LandingIcon />
            </LeftBarLink>
          </>
        )}
      </ul>
      <LeftBarRollupIcon />
    </nav>
  );
};

export default LeftBar;
