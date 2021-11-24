import { useEffect, useState } from "react";

import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";

interface IProps {
  errors: DeepMap<any, FieldError>;
  register: UseFormRegister<any>;
  name: string;
  placeholder?: string;
  image?: string;
}

function InputImage({ errors, register, name, placeholder, image }: IProps) {
  const [file, setFile] = useState("");

  // useEffect(() => {
  // }, [file]);

  const fileSelected = (event) => {
    if (event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFile(file);
    }
  };

  return (
    <div>
      <label className="block text-grey-darker text-sm font-bold mb-2">
        {placeholder}
        <input
          {...register(name)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          placeholder={placeholder}
          onChange={fileSelected}
          name={name}
          type="file"
          accept="image/*"
        />
        <p>{errors[name]?.message}</p>
      </label>

      {file ? (
        <img src={file} alt="image" width="200" height="320" />
      ) : (
        image && (
          <img
            className="h-64 w-full object-contain"
            src={"data:image/jpeg;base64," + image}
          />
        )
      )}
    </div>
  );
}

export default InputImage;
