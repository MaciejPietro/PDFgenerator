import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../partials/Input";
import Select from "../../partials/Select";
import SubmitButton from "../../partials/SubmitButton";
import { ISaleBeat } from "../../../redux/types";

const schema = yup.object().shape({
  beatName: yup.string(),
  price: yup.number(),
  currency: yup.string(),
});

const CreatorForm = ({ submitForm, changeForm, clients }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISaleBeat>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ISaleBeat) => {
    // submitForm(data);
  };

  return (
    <>
      <div>Beat Informations</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <Input
            register={register}
            errors={errors}
            name="beatName"
            type="text"
            placeholder="Beat Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              changeForm("beatName", e.target.value);
            }}
          />
          <Select
            register={register}
            errors={errors}
            name="licension"
            placeholder="Licension"
            value="basic"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              changeForm("licension", e.target.value);
            }}
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="exclusive">Exclusive</option>
          </Select>
          <Select
            register={register}
            errors={errors}
            name="currency"
            placeholder="Currency"
            value="usd"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              changeForm("currency", e.target.value);
            }}
          >
            <option value="usd">US Dollar</option>
            <option value="pln">PL Zloty</option>
            <option value="euro">EU Euro</option>
            <option value="crypto">Crypto</option>
          </Select>
          <Select
            register={register}
            errors={errors}
            name="client"
            placeholder="Client"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              changeForm("client", e.target.value);
            }}
          >
            {clients.map((el) => (
              <option key={el._id} value={el._id}>
                {el.name}
              </option>
            ))}
          </Select>
        </fieldset>

        <SubmitButton text="Next" />
      </form>
    </>
  );
};

export default CreatorForm;
