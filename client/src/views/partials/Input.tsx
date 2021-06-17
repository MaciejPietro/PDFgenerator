import React from "react";

function Input({ setUsername, name, type, placeholder }: any) {
  return (
    <label className="block text-grey-darker text-sm font-bold mb-2">
      {placeholder}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={setUsername}
      />
    </label>
  );
}

export default Input;
