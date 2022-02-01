import { useForm } from "react-hook-form";
// import { useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../partials/Input";
import * as yup from "yup";

import SubmitButton from "../partials/SubmitButton";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "This field is too short")
    .max(120, "This field is too long")
    .required("This field is required"),
  shortcode: yup
    .string()
    .min(2, "This field is too short")
    .max(4, "This field is too long")
    .required("This field is required"),
});

interface IProps {
  addCurrency: any;
}

type FormValues = {
  name: string;
  shortcode: string;
};

const CustomCurrency: React.FC<IProps> = ({ addCurrency }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  return (
    <form onSubmit={handleSubmit(addCurrency)}>
      <fieldset>
        <Input
          register={register}
          errors={errors}
          name="shortcode"
          type="text"
          placeholder="Shortcode"
        />
        <Input
          register={register}
          errors={errors}
          name="name"
          type="text"
          placeholder="Full name"
        />
      </fieldset>

      <SubmitButton text="Add" />
    </form>
  );
};

export default CustomCurrency;
