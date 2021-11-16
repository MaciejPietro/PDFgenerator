import LeftBarLink from "./LeftBarLink";
import LeftBarRollupIcon from "./LeftBarRollupIcon";

import {
  SettingsIcon,
  LandingIcon,
  TemplatesIcon,
  ClockIcon,
  ClientsIcon,
} from "../../../assets/icons";

interface IProps {
  isAuthenticated: boolean | null;
}

const LeftBar = ({ isAuthenticated }: IProps) => {
  return (
    <nav className="leftbar">
      <ul className="mt-16 px-2 text-gray-900">
        {isAuthenticated ? (
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
