import React, { useEffect } from "react";
import IPage from "../interfaces/page";

const HomePage: React.FunctionComponent<IPage> = (props) => {
  useEffect(() => {
    console.log(`UseEffect from page: ${props.name}`);
  }, []);

  return <p>This is the HOME page!</p>;
};

export default HomePage;
