import React, { useEffect } from "react";
import IPage from "../interfaces/page";

const Settings: React.FunctionComponent<IPage> = (props) => {
  useEffect(() => {
    console.log(`UseEffect from page: ${props.name}`);
  }, []);

  return <p>This is the Settings page!</p>;
};

export default Settings;
