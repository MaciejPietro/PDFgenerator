import { useState, useRef } from "react";
import Input from "../../partials/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IFormInputs {
  username: string;
  email: number;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .min(3, "This field is too short")
    .max(30, "This field is too long")
    .required("This field is required"),
  username: yup
    .string()
    .min(2, "This field is too short")
    .max(30, "This field is too long")
    .required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(6, "This field is too short")
    .matches(/^(?=.*[A-Za-z])(?=\D*\d)\S{6,}$/, "Must Contain Number"),
});

function Register(props: any) {
  // const repeatedPassword: React.MutableRefObject<any> = useRef();
  // const [userInfo, setUserInfo] = useState({
  //   username: "",
  //   password: "",
  //   email: "",
  // });

  // const checkPasswords = () =>
  //   userInfo.password === repeatedPassword.current.value;

  // const handleSubmit = (ev) => {
  //   ev.preventDefault();
  //   console.log(userInfo.username);
  //   // props.submitForm(userInfo);
  //   // console.log("register submit", checkPasswords());
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => {
    props.submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label>
          Username
          <input {...register("username")} />
          <p>{errors.username?.message}</p>
        </label>

        <label>
          Email
          <input {...register("email")} />
          <p>{errors.username?.message}</p>
        </label>

        <label>
          Password
          <input {...register("password")} />
          <p>{errors.password?.message}</p>
        </label>
        {/* <Input lable="Username" /> */}

        {/* <Input
          name="username"
          type="text"
          placeholder="Username"
          setUsername={(e: any) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
        /> */}

        {/* <label className="block text-grey-darker text-sm font-bold mb-2">
          Password
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            ref={repeatedPassword}
            type="text"
            placeholder="******************"
          />
        </label>

        <label className="block text-grey-darker text-sm font-bold mb-2">
          Repeat password
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="repeat-password"
            type="text"
            placeholder="******************"
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </label> */}
      </fieldset>

      <button
        className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
        type="submit"
      >
        Register
      </button>
      <a
        className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
        href="#"
      >
        Forgot Password?
      </a>
    </form>
  );
}

export default Register;
