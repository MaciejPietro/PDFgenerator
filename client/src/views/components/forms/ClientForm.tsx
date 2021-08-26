import { useForm } from "react-hook-form";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../partials/Input";
import Stars from "../../partials/Stars";

import SubmitButton from "../../partials/SubmitButton";

import * as yup from "yup";

import { IClientData } from "../../../redux/types";

const schema = yup.object().shape({
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
  sold_sum_in_pln: yup.number(),
  rate: yup.mixed(),
});

function AddClient(props: any) {
  const addClientWrap = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClientData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IClientData) => {
    // props.submitForm(data);
    console.log(data, props);

    // const username = window.localStorage.getItem("username");
    // console.log("user", data);
    // axios.patch("/api/update-user", { data, username }).then((res) => {
    //   {
    //     setMessage(res.data ? "Updated succesfully" : "Something went wrong");
    //     if (res.data) {
    //       storeAction().then((data) => setDetails(data));
    //     }
    //   }
    // });
  };

  const toggleForm = () => {
    addClientWrap.current.classList.toggle("clients__add--active");
    console.log(addClientWrap);
  };

  return (
    <div className="clients__add" ref={addClientWrap}>
      <button onClick={() => toggleForm()}>Add Client</button>
      <div className="clients__add__form">
        <form onSubmit={handleSubmit(onSubmit)}>
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

            <Input
              register={register}
              errors={errors}
              name="sold_sum"
              type="number"
              placeholder="Sold sum"
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
