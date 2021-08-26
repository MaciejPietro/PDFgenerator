import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../partials/Input";
import SubmitButton from "../../partials/SubmitButton";

import * as yup from "yup";
import axios from "axios";

import { IArtistDetailsData } from "../../../interfaces/user";

const schema = yup.object().shape({
  name: yup.string(),
  surname: yup.string(),
  stageName: yup.string(),
  email: yup.string().email(),
  country: yup.string(),
  localization: yup.string(),
});

function ArtistDetailsForm({ details, submitForm }: any) {
  // useEffect(() => {

  // }, [details]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IArtistDetailsData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IArtistDetailsData) => {
    Object.keys(data).forEach((key) => {
      if (data[key] != "") {
        data[`artistDetails.${key}`] = data[key];
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
          name="name"
          type="text"
          placeholder="Name"
          value={details?.name}
        />

        <Input
          register={register}
          errors={errors}
          name="surname"
          type="text"
          placeholder="Surname"
          value={details?.surname}
        />

        <Input
          register={register}
          errors={errors}
          name="stageName"
          type="text"
          placeholder="Stage name"
          value={details?.stageName}
        />

        <Input
          register={register}
          errors={errors}
          name="email"
          type="email"
          placeholder="Email"
          value={details?.email}
        />

        <Input
          register={register}
          errors={errors}
          name="country"
          type="text"
          placeholder="Country"
          value={details?.country}
        />

        <Input
          register={register}
          errors={errors}
          name="localization"
          type="text"
          placeholder="Localization"
          value={details?.localization}
        />
      </fieldset>

      <SubmitButton text="Update" />
    </form>
  );
}

export default ArtistDetailsForm;
