import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { IUserLoginData, IUserRegisterData } from "../../redux/types";

interface IProps {
  errors?: DeepMap<any, FieldError>;
  register: UseFormRegister<any>;
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  inputKey?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  errors,
  register,
  name,
  type,
  placeholder,
  value,
  onChange,
  inputKey,
}: IProps) {
  return (
    <label className="block text-grey-darker text-sm font-bold mb-2">
      {placeholder}
      <input
        {...register(name)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        placeholder={placeholder}
        type={type}
        defaultValue={value || ""}
        key={inputKey}
        // min="0"
      />
      <p>{errors && errors[name]?.message}</p>
    </label>
  );
}

export default Input;
