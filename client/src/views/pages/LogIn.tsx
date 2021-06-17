import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import LoginForm from "../components/forms/LoginForm";

import { logIn } from "../../redux/actions/authActions";

interface IProps {
  logInConnect: (payload: any) => any;
}

const LogIn = ({ logInConnect }: IProps) => {
  const [alert, setAlert] = useState("");

  function submitForm(data) {
    logInConnect(data).then((res) => {
      setAlert(res);
    });
  }

  return (
    <>
      <p>Login page</p>
      <div>{alert}</div>
      <LoginForm submitForm={submitForm} />
      <Link to="/register">Register</Link>
    </>
  );
};

const mapDispatchToProps = {
  logInConnect: logIn,
};

export default connect(null, mapDispatchToProps)(LogIn);
