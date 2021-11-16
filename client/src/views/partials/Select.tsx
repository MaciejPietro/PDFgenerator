import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";

interface IProps {
  errors: DeepMap<any, FieldError>;
  register: UseFormRegister<any>;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: any;
}

function Select({
  errors,
  register,
  name,
  placeholder,
  value,
  onChange,
  children,
}: IProps) {
  return (
    <label className="block text-grey-darker text-sm font-bold mb-2">
      {placeholder}
      <select
        {...register(name)}
        defaultValue={value || ""}
        onChange={onChange}
      >
        {children}
      </select>
      <p>{errors[name]?.message}</p>
    </label>
  );
}

export default Select;
