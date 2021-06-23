import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../partials/Input";
import SubmitButton from "../../partials/SubmitButton";

import * as yup from "yup";

import { IUserRegisterData } from "../../../interfaces/user";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegisterData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IUserRegisterData) => {
    props.submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <Input
          register={register}
          errors={errors}
          name="username"
          type="text"
          placeholder="Username"
        />

        <Input
          register={register}
          errors={errors}
          name="email"
          type="email"
          placeholder="Email"
        />

        <Input
          register={register}
          errors={errors}
          name="password"
          type="password"
          placeholder="***********"
        />
      </fieldset>

      <SubmitButton text="Register" />

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
