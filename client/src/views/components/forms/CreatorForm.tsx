import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../partials/Input";
import Select from "../../partials/Select";
import SubmitButton from "../../partials/SubmitButton";
import { ISaleBeat } from "../../../redux/types";
import { useCurrencies, useLicensions, useClients } from "../../hooks";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

import Clue from "../Clue";

// const schema = yup.object().shape({
//   beatName: yup.string(),
//   price: yup.number(),
//   currency: yup.string(),
// });

const CreatorForm = ({ submitForm, changeForm, preview }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISaleBeat>({
    // resolver: yupResolver<yup.AnyObjectSchema>(),
  });

  const [customPrice, isCustomPrice] = useState<boolean>(false);

  const [data, setData] = useState({
    beat: null,
    currency: null,
    licension: null,
    client: null,
    price: null,
  });

  const [licensions] = useLicensions();
  const [currencies] = useCurrencies();
  const [clients] = useClients();

  const restorePrice = () => {
    const lic = licensions.find((el) => el._id == data.licension)?.prices;

    setData((prevState) => ({
      ...prevState,
      price: data.currency !== "-" ? lic[data.currency] : 0,
    }));
  };

  const onSubmit = (data) => {
    console.log("submituje");
    submitForm(data);
  };

  const updateSingle = (type, value) => {
    setData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const modifyPrice = (type, value) => {
    if (type == "licension" && !customPrice && data.currency) {
      updateSingle(
        "price",
        licensions.find((el) => el._id == value).prices[data.currency],
      );
    }

    if (type == "currency" && !customPrice && data.licension)
      updateSingle("price", data.licension.prices[value]);
  };

  const change = (type, value) => {
    updateSingle(type, value);
    modifyPrice(type, value);
  };

  useEffect(() => {
    changeForm(data);
  }, [data]);

  return (
    <>
      <div>Beat Informations</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <Input
            register={register}
            errors={errors}
            name="beat"
            type="text"
            placeholder="Beat"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              change("beat", e.target.value);
            }}
          />
          <div className="flex">
            <Select
              register={register}
              errors={errors}
              name="licension"
              placeholder="Licension"
              value="-"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                change("licension", e.target.value);
              }}
            >
              <option value="-" disabled>
                -
              </option>
              {licensions &&
                licensions.map((lic) => (
                  <option key={lic._id} value={lic._id}>
                    {lic.name}
                  </option>
                ))}
            </Select>
            <Clue>
              To add more licensions go to
              <NavLink to="/settings" className="underline">
                {" "}
                settings
              </NavLink>
            </Clue>
          </div>
          <div className="flex">
            <Select
              register={register}
              errors={errors}
              name="currency"
              placeholder="Currency"
              value="-"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                change("currency", e.target.value);
              }}
            >
              <option value="-" disabled>
                -
              </option>
              {currencies &&
                currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency?.split("-")[1]}
                  </option>
                ))}
            </Select>
            <Clue>
              To add more currencies go to
              <NavLink to="/settings" className="underline">
                {" "}
                settings
              </NavLink>
            </Clue>
          </div>
          <div className="flex">
            <Select
              register={register}
              errors={errors}
              name="client"
              placeholder="Client"
              value="-"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                change("client", e.target.value);
              }}
            >
              <option value="-" disabled>
                -
              </option>
              {clients.map((el) => (
                <option key={el._id} value={el._id}>
                  {el.name}
                </option>
              ))}
            </Select>
            <Clue>
              To add clients go to
              <NavLink to="/clients" className="underline">
                {" "}
                clients
              </NavLink>
            </Clue>
          </div>
          <div>
            <span className="font-bold">Price</span>: {data.price}{" "}
            {data.currency?.split("-")[0]}
          </div>

          <div className="border rounded-md border-black p-2">
            <div className="flex gap-8">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="price-checkbox"
                  id="price-checkbox"
                  onChange={({ target }) => {
                    if (!target.checked) {
                      restorePrice();
                      isCustomPrice(false);
                    } else {
                      isCustomPrice(true);
                    }
                  }}
                />
                <label htmlFor="price-checkbox">Custom price</label>
              </div>
            </div>

            <div className={`${!customPrice ? "hidden" : ""}`}>
              <Input
                register={register}
                errors={errors}
                name="price"
                type="text"
                onChange={({ target }) => {
                  change("price", target.value);
                }}
              />
            </div>
          </div>
        </fieldset>

        <button onClick={preview} type="button">
          Preview{" "}
        </button>
        <SubmitButton text="Download" />
      </form>
    </>
  );
};

export default CreatorForm;
