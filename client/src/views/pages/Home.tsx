import React, { useEffect } from "react";
import IPage from "../../interfaces/page";

import Paper from "../components/Paper";
import Tree from "../components/Tree";

const Home: React.FunctionComponent<IPage> = (props) => {
  // useEffect(() => {
  //   console.log(`UseEffect from page: ${props.name}`);
  // }, []);

  return (
    <div className="container">
      <div className="home flex items-center h-screen justify-around">
        <Paper />
        <Tree />
      </div>
    </div>
  );
};

export default Home;
