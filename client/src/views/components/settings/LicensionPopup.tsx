import { ILicension } from "../../../redux/types";

import { useForm, useFieldArray } from "react-hook-form";
import { useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../partials/Input";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import SubmitButton from "../../partials/SubmitButton";

const schema = yup.object().shape({
  _id: yup.string(),
  name: yup
    .string()
    .min(2, "This field is too short")
    .max(120, "This field is too long")
    .required("This field is required"),
  details: yup
    .array()
    .min(1, "Must have at least one detail")
    .max(32, "That is too many details"),
  prices: yup
    .array()
    .min(1, "Must have at least one currency")
    .max(32, "That is too many currencies"),
});

interface IProps {
  currencies: string[];
  licension?: ILicension;
  editLicension: (data: ILicension) => void;
  deleteLicension?: any;
}

type FormValues = {
  details: {
    note: string;
  }[];
  prices: string[];
};

const LicensionPopup: React.FC<IProps> = ({
  licension,
  currencies,
  editLicension,
  deleteLicension,
}) => {
  const prepareDetails = () => licension?.details?.map((el) => ({ note: el }));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    defaultValues: {
      details: prepareDetails(),
    },
  });

  const { fields, insert, remove } = useFieldArray({
    control,
    name: "details",
  });

  const popup = useRef<HTMLDivElement>(null);

  const stopEditing = () => {
    popup.current.classList.add("hidden");
    reset({
      details: prepareDetails(),
    });
  };

  const startEditing = () => {
    popup.current.classList.remove("hidden");
  };

  const onSubmit = (fData: ILicension) => {
    const obj = {};

    for (const key in currencies) {
      obj[currencies[key]] = fData.prices[key];
    }

    fData.prices = obj;
    fData.details = fData.details.map((el) => Object.values(el)).flat();

    editLicension(fData);
  };

  return (
    <>
      <button
        className="font-bold text-blue-900 text-xs"
        onClick={startEditing}
      >
        {licension ? "EDIT" : "ADD"}
      </button>

      {licension && (
        <button
          className="font-bold text-red-600 text-xs"
          onClick={() => deleteLicension(licension?._id)}
        >
          REMOVE
        </button>
      )}

      <div
        ref={popup}
        className="fixed w-full h-full top-0 left-0 justify-center items-center bg-black bg-opacity-80 flex hidden py-24 z-50"
      >
        <div className="w-full h-full flex flex-col max-w-3xl p-16 bg-white">
          <form
            className="max-h-full overflow-y-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset>
              <Input
                register={register}
                errors={errors}
                name="_id"
                type="hidden"
                value={licension?._id}
              />
              <h3 className="font-bold">Name</h3>
              <Input
                register={register}
                errors={errors}
                name="name"
                type="text"
                value={licension?.name}
              />

              <h3 className="font-bold mt-8">Details</h3>
              <ul>
                {fields.map((field, index) => (
                  <li key={field.id}>
                    <input
                      {...register(`details.${index}.note`)}
                      type="text"
                      name={`details.${index}.note`}
                      defaultValue={field.note}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="font-bold text-3xl text-red-600"
                    >
                      -
                    </button>
                  </li>
                ))}

                <button
                  type="button"
                  onClick={() => insert(fields.length + 1, {})}
                  className="font-bold text-xl"
                >
                  +
                </button>
              </ul>

              <h3 className="mt-8">Prices</h3>
              <ul className="grid grid-cols-3">
                {currencies?.map((currency, i) => {
                  return (
                    <li className="pl-2 text-sm" key={i}>
                      {currency} <span>:</span>
                      <Input
                        register={() => register(`prices.${i}`)}
                        errors={errors}
                        name={`price-${i}`}
                        type="text"
                        inputKey={i}
                        value={licension?.prices && licension.prices[currency]}
                      />
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <SubmitButton text="Save" />
          </form>

          <button
            onClick={stopEditing}
            className="text-indigo-600 hover:text-indigo-900 p-4"
          >
            Stop Editing
          </button>
        </div>
      </div>
    </>
  );
};

export default LicensionPopup;
