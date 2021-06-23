import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/authActions";
import RegisterForm from "../components/forms/RegisterFrom";
import { IUserRegisterData } from "../../interfaces/user";

interface IProps {
  registerConnect: (payload: any) => any;
}

function Register({ registerConnect }: IProps) {
  const [alert, setAlert] = useState("");

  function submitForm(data: IUserRegisterData) {
    const res = registerConnect(data);
    res.then((res: any) => setAlert(res));
  }

  return (
    <>
      <div>{alert}</div>
      <RegisterForm submitForm={submitForm} />
      <Link to="/register">Log In</Link>
    </>
  );
}

const mapDispatchToProps = {
  registerConnect: register,
};

export default connect(null, mapDispatchToProps)(Register);
