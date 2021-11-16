import { useState, useEffect } from "react";
import { IClientData } from "../../redux/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../partials/Input";
import Stars from "../partials/Stars";

import * as yup from "yup";
import { IArtistDetailsData } from "../../redux/types";

interface IProps {
  items: IClientData[];
  deleteRecord: (email: string) => void;
  editRecord: (s: IClientData) => void;
}

const schema = yup.object().shape({
  _id: yup.string(),
  name: yup.string(),
  surname: yup.string(),
  stageName: yup.string(),
  email: yup.string().email(),
  country: yup.string(),
  localization: yup.string(),
  imageKey: yup.string(),
});

const Table: React.FC<IProps> = ({ items, deleteRecord, editRecord }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IArtistDetailsData>({
    resolver: yupResolver(schema),
  });

  const [editedEL, setEditedEL] = useState<HTMLElement>();

  const onSubmit = (data: IClientData) => {
    editRecord(data);
  };

  useEffect(() => {
    console.log(items);
  }, [items]);
  // const update = (index, e) => {
  //   // setEdited;
  //   console.log("update", index, e);
  // };
  const rates = (rate: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i <= rate ? <span key={i}>&#9733;</span> : <span key={i}>&#9734;</span>,
      );
    }

    return stars;
  };

  const startEditing = (index, target) => {
    const client = document.getElementById("client-" + index);
    setEditedEL(client);
    client.classList.add("bg-white");

    const clientInputs = client.querySelectorAll(".client-input");

    clientInputs.forEach((i) => {
      i.classList.remove("hidden");
      i.previousElementSibling.classList.add("hidden");
    });
    const next = target.nextElementSibling;

    next.classList.remove("hidden");
    next.nextElementSibling.classList.remove("hidden");
    target.classList.add("hidden");
  };

  const stopEditing = (target) => {
    editedEL.classList.remove("bg-white");

    const inputs = editedEL.querySelectorAll(".client-input");

    inputs.forEach((el) => {
      el.classList.add("hidden");
      el.previousElementSibling.classList.remove("hidden");
    });

    target.previousElementSibling.classList.remove("hidden");
    target.nextElementSibling.classList.add("hidden");
    target.classList.add("hidden");
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Name
                  </th>

                  <th scope="col" className="px-6 py-3 text-left">
                    Contact
                  </th>

                  <th scope="col" className="px-6 py-3 text-left">
                    Importance
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Details</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items &&
                  items.map(
                    (
                      {
                        _id,
                        name,
                        realname,
                        country,
                        email,
                        profession,
                        rate,
                        image,
                        imageKey,
                      },
                      index,
                    ) => (
                      <tr data-elo={_id} id={`client-${index}`} key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Input
                            register={register}
                            errors={errors}
                            name="_id"
                            type="hidden"
                            value={_id}
                          />
                          <Input
                            register={register}
                            errors={errors}
                            name="image"
                            type="hidden"
                            value={imageKey}
                          />
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img src={"data:image/jpeg;base64," + image} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-black">
                                <span>{name}</span>
                                <div className="client-input hidden">
                                  <Input
                                    register={register}
                                    errors={errors}
                                    name="name"
                                    type="text"
                                    value={name}
                                  />
                                </div>
                              </div>
                              <div className="text-sm text-black">
                                <span>
                                  {realname}, {profession}
                                </span>
                                <div className="client-input hidden">
                                  <Input
                                    register={register}
                                    errors={errors}
                                    name="realname"
                                    type="text"
                                    value={realname}
                                  />

                                  <Input
                                    register={register}
                                    errors={errors}
                                    name="profession"
                                    type="text"
                                    value={profession}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">
                            <span>{country}</span>
                            <div className="client-input hidden">
                              <Input
                                register={register}
                                name="country"
                                type="text"
                                value={country}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-black">
                            <span>{email}</span>
                            <div className="client-input hidden">
                              <Input
                                register={register}
                                errors={errors}
                                name="email"
                                type="email"
                                value={email}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          <span>{rates(rate)}</span>

                          <div className="client-input hidden">
                            <Stars
                              register={register}
                              errors={errors}
                              name="rate"
                              rate={rate}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-6">
                          <button
                            type="button"
                            onClick={({ target }) =>
                              startEditing(index, target)
                            }
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>

                          <button
                            onClick={({ target }) => stopEditing(target)}
                            className="text-indigo-600 hover:text-indigo-900 h-3/6 hidden"
                          >
                            Stop Editing
                          </button>

                          <button
                            type="submit"
                            className="text-indigo-600 hover:text-indigo-900 h-3/6 hidden"
                          >
                            Update
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => deleteRecord(_id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ),
                  )}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Table;
