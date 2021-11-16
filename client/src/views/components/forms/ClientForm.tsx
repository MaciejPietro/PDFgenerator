import { useForm } from "react-hook-form";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../partials/Input";
import Stars from "../../partials/Stars";
import InputImage from "../../partials/InputImage";

import { v4 as uuidv4 } from "uuid";

import SubmitButton from "../../partials/SubmitButton";

import * as yup from "yup";

import { IClientData } from "../../../redux/types";

const schema = yup.object().shape({
  // id: yup.string().required(),
  name: yup
    .string()
    .min(2, "This field is too short")
    .max(30, "This field is too long")
    .required("This field is required"),
  email: yup
    .string()
    .email()
    .min(3, "This field is too short")
    .max(30, "This field is too long"),
  profession: yup
    .string()
    .min(3, "This field is too short")
    .max(30, "This field is too long"),
  rate: yup.mixed(),
});

function AddClient({ submitForm }) {
  const addClientWrap = useRef<HTMLDivElement>(null);
  const form = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (fData: IClientData) => {
    const data = new FormData();

    for (const key in fData) {
      if (key === "image") {
        data.append(key, fData[key][0]);
      } else {
        data.append(key, fData[key]);
      }
    }
    data.append("_id", uuidv4());

    submitForm(data);
  };

  const toggleForm = () => {
    addClientWrap.current.classList.toggle("clients__add--active");
  };

  return (
    <div className="clients__add" ref={addClientWrap}>
      <button onClick={() => toggleForm()}>Add Client</button>
      <div className="clients__add__form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          ref={form}
        >
          <fieldset>
            <Input
              register={register}
              errors={errors}
              name="name"
              type="text"
              placeholder="Name"
            />

            <Input
              register={register}
              errors={errors}
              name="realname"
              type="text"
              placeholder="Real name"
            />

            <Input
              register={register}
              errors={errors}
              name="country"
              type="text"
              placeholder="Country"
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
              name="profession"
              type="text"
              placeholder="Profession"
            />

            <InputImage
              register={register}
              errors={errors}
              name="image"
              placeholder="Image"
            />

            <Stars register={register} errors={errors} name="rate" />
          </fieldset>

          <SubmitButton text="Add Client" />
        </form>
      </div>
    </div>
  );
}

export default AddClient;
