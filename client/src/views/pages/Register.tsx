import { useState } from "react";
// import { string } from "yup/lib/locale";
import { connect } from "react-redux";

import RegisterForm from "../components/forms/RegisterFrom";

import { register } from "../../redux/actions/authActions";

interface UserRegisterData {
  username: string;
  email: string;
  password: string;
}

interface IProps {
  registerConnect: (payload: any) => any;
}

function Register({ registerConnect }: IProps) {
  const [alert, setAlert] = useState("");

  // const [userInfo, setUserInfo] = useState({
  //   username: "",
  //   password: "",
  //   email: "",
  // });

  function submitForm(data: UserRegisterData) {
    const res = registerConnect(data);
    res.then((res) => setAlert(res));
  }

  return (
    <>
      <div>{alert}</div>

      <RegisterForm submitForm={submitForm} />
    </>
  );
}

const mapDispatchToProps = {
  registerConnect: register,
};

export default connect(null, mapDispatchToProps)(Register);
