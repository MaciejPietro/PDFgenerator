import { NavLink, Switch, Route, Router, Redirect } from "react-router-dom";

const Templates = () => {
  return (
    <section>
      <h1>Templates</h1>

      <div className="grid grid-cols-3 mt-8 gap-4">
        <div className="flex flex-col justify-between border border-blue-500 p-6">
          <div>
            <h2>Lease</h2>
            <p className="font-light mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu
              cursus ante. Ut vestibulum, sapien dapibus scelerisque aliquam,
              est tortor porttitor lacus, quis semper sapien magna ut enim.
              Fusce pellentesque elit augue, eu finibus neque congue eu.
            </p>
          </div>
          <NavLink to="/creator/lease" className="mt-6">
            Fill and Send
          </NavLink>
        </div>

        <div className="flex flex-col border justify-between border-blue-500 p-6">
          <div>
            <h2>Exclusive</h2>
            <p className="font-light mt-4">
              Curabitur luctus, nisl a facilisis sagittis, lorem felis consequat
              elit, ut pretium urna tortor in neque.
            </p>
          </div>
          <NavLink to="/creator/exclusive" className="mt-6">
            Fill and Send
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Templates;
