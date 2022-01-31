import { IClientData } from "../../../redux/types";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../partials/Input";
import Stars from "../../partials/Stars";
import InputImage from "../../partials/InputImage";
import * as yup from "yup";

import SubmitButton from "../../partials/SubmitButton";

const schema = yup.object().shape({
  // id: yup.string().required(),
  // name: yup
  //   .string()
  //   .min(2, "This field is too short")
  //   .max(30, "This field is too long")
  //   .required("This field is required"),
  // email: yup
  //   .string()
  //   .email()
  //   .min(3, "This field is too short")
  //   .max(30, "This field is too long"),
  // profession: yup
  //   .string()
  //   .min(3, "This field is too short")
  //   .max(30, "This field is too long"),
  // rate: yup.mixed(),
});

interface IProps {
  client: IClientData;
  popup: any;
  edit: any;
  stopEditing: () => void;
}

const ClientPopup: React.FC<IProps> = ({
  client,
  popup,
  stopEditing,
  edit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (fData: IClientData) => {
    const data = new FormData();

    for (const key in fData) {
      data.append(
        key,
        key === "image" ? fData[key][0] || fData.imageKey : fData[key],
      );
    }

    edit(data);
  };

  useEffect(() => {
    reset();
  }, [client]);

  return (
    <div
      ref={popup}
      className="fixed w-full h-full top-0 left-0 justify-center items-center bg-black bg-opacity-80 hidden py-24 z-50"
    >
      <div className="w-full h-full flex flex-col max-w-3xl p-16 bg-white">
        {client && (
          <form
            className="max-h-full overflow-y-auto"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <fieldset>
              <Input
                register={register}
                errors={errors}
                name="_id"
                type="hidden"
                value={client._id}
              />
              <Input
                register={register}
                errors={errors}
                name="imageKey"
                type="hidden"
                value={client.imageKey}
              />

              <InputImage
                register={register}
                errors={errors}
                name="image"
                placeholder="Image"
                image={client.image}
              />

              <Input
                register={register}
                errors={errors}
                name="name"
                type="text"
                placeholder="Name"
                value={client.name}
              />

              <Input
                register={register}
                errors={errors}
                name="realname"
                type="text"
                placeholder="Real name"
                value={client.realname}
              />

              <Input
                register={register}
                errors={errors}
                name="country"
                type="text"
                placeholder="Country"
                value={client.country}
              />

              <Input
                register={register}
                errors={errors}
                name="email"
                type="email"
                placeholder="Email"
                value={client.email}
              />

              <Input
                register={register}
                errors={errors}
                name="profession"
                type="text"
                placeholder="Profession"
                value={client.profession}
              />

              <Stars
                register={register}
                errors={errors}
                name="rate"
                rate={client.rate}
              />
            </fieldset>

            <SubmitButton text="Save" />
          </form>
        )}

        <button
          onClick={stopEditing}
          className="text-indigo-600 hover:text-indigo-900 p-4"
        >
          Stop Editing
        </button>
      </div>
    </div>
  );
};

export default ClientPopup;
