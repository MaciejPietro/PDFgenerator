import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../partials/Input";
import SubmitButton from "../../partials/SubmitButton";

import * as yup from "yup";
import axios from "axios";

import { IUserRegisterData } from "../../../redux/types";

const schema = yup.object().shape({
  username: yup.string(),
  password: yup.string(),
  email: yup.string().email(),
});

function AccountDetailsForm({ details, submitForm }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegisterData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IUserRegisterData) => {
    //TODO make mixin
    Object.keys(data).forEach((key) => {
      if (data[key] != "") {
        return (data[key] = data[key]);
      }
      delete data[key];
    });

    submitForm(data);
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
          value={details?.username}
        />

        <Input
          register={register}
          errors={errors}
          name="password"
          type="text"
          placeholder="Password"
          value={details?.password}
        />

        <Input
          register={register}
          errors={errors}
          name="email"
          type="email"
          placeholder="Email"
          value={details?.email}
        />
      </fieldset>

      <SubmitButton text="Update" />
    </form>
  );
}

export default AccountDetailsForm;
