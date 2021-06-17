import { useState, useEffect } from "react";
const LoginForm = (props: any) => {
  const [passes, setPasses] = useState({ name: "user", password: "ziolo" });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    props.submitForm(passes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <label className="block text-grey-darker text-sm font-bold mb-2">
          Username
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setPasses({ ...passes, name: e.target.value })}
          />
        </label>

        <label className="block text-grey-darker text-sm font-bold mb-2">
          Password
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => setPasses({ ...passes, password: e.target.value })}
          />
        </label>
      </fieldset>

      <button
        className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
        type="submit"
      >
        Sign In
      </button>
      <a
        className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
        href="#"
      >
        Forgot Password?
      </a>
    </form>
  );
};

export default LoginForm;
