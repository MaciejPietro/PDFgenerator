import * as React from "react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";

interface IProps {
  errors: DeepMap<any, FieldError>;
  register: UseFormRegister<any>;
  name: string;
  rate?: number;
}

function Stars({ register, name, errors, rate }: IProps) {
  return (
    <div className="stars">
      {[0, 1, 2, 3, 4].map((value) => {
        return (
          <React.Fragment key={value}>
            <input
              {...register(name)}
              type="radio"
              id={`star-${value}${rate || "-edit"}`}
              name="rate"
              value={5 - value}
              defaultChecked={value == rate - 1}
            />
            <label htmlFor={`star-${value}${rate || "-edit"}`} title="text">
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
