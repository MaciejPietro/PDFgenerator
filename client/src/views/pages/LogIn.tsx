import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IUserLoginData } from "../../redux/types";
import { useHistory } from "react-router";

import LoginForm from "../components/forms/LoginForm";

import { logIn } from "../../redux/actions/authActions";

interface IProps {
  logInConnect: (payload: IUserLoginData) => Promise<any>;
}

const LogIn = ({ logInConnect }: IProps) => {
  const [alert, setAlert] = useState("");
  const history = useHistory();

  function submitForm(data: IUserLoginData) {
    logInConnect(data).then((res: any) => {
      const success = !res;

      if (success) {
        history.push("/dashboard");
      } else {
        setAlert(res);
      }
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
