import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IUserLoginData } from "../../interfaces/user";

import LoginForm from "../components/forms/LoginForm";

import { logIn } from "../../redux/actions/authActions";

interface IProps {
  logInConnect: (payload: IUserLoginData) => Promise<any>;
}

const LogIn = ({ logInConnect }: IProps) => {
  const [alert, setAlert] = useState("");

  function submitForm(data: IUserLoginData) {
    logInConnect(data).then((res: any) => {
      setAlert(res);
    });
  }

  return (
    <>
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
