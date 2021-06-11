import IRoute from "../interfaces/route";
import Home from "../views/pages/Home";
import Settings from "../views/pages/Settings";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Home Page",
    component: Home,
    exact: true,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    exact: true,
  },
];

export default routes;
