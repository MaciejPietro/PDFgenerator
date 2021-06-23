import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { IUserLoginData, IUserRegisterData } from "../../interfaces/user";

interface IProps {
  errors: DeepMap<any, FieldError>;
  register: UseFormRegister<any>;
  name:
    | "username"
    | "password"
    | "email"
    | "name"
    | "surname"
    | "stageName"
    | "country"
    | "localization";
  type: "text" | "password" | "email";
  placeholder: string;
  value?: string;
}

function Input({ errors, register, name, type, placeholder, value }: IProps) {
  const preparedName = (name: string) => {
    const capitalized = name[0].toUpperCase() + name.slice(1);
    const removedDash = capitalized.replace("_", " ");

    return removedDash;
  };

  return (
    <label className="block text-grey-darker text-sm font-bold mb-2">
      {preparedName(name)}
      <input
        {...register(name)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        placeholder={placeholder}
        type={type}
        defaultValue={value || ""}
      />
      <p>{errors[name]?.message}</p>
    </label>
  );
}

export default Input;
