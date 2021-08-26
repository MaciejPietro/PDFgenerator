import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IUserLoginData } from "../../../redux/types";

import Input from "../../partials/Input";
import SubmitButton from "../../partials/SubmitButton";

const schema = yup.object().shape({
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

const LoginForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLoginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IUserLoginData) => {
    props.submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
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
          name="password"
          type="password"
          placeholder="***********"
        />
      </fieldset>

      <SubmitButton text="Sign In" />

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
