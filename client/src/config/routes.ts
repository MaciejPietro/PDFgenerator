import IRoute from "../interfaces/route";
import HomePage from "../pages/home";
import Settings from "../pages/settings";

const routes: IRoute[] = [
  {
    path: "/",
    name: "Home Page",
    component: HomePage,
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
