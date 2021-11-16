import * as React from "react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";

interface IProps {
  errors: DeepMap<any, FieldError>;
  register: UseFormRegister<any>;
  name: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Stars({ register, name, errors }: IProps) {
  const stars = [""];

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((value) => {
        return (
          <React.Fragment key={value}>
            <input
              {...register(name)}
              type="radio"
              id={`star${value}`}
              name="rate"
              value={value}
            />
            <label htmlFor={`star${value}`} title="text">
              {value} stars
            </label>
          </React.Fragment>
        );
      })}

      <p>{errors[name]?.message}</p>
    </div>
  );
}

export default Stars;
