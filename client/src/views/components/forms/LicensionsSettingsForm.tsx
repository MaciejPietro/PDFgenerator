import { useEffect, useState, useRef, createRef } from "react";
import { useLicensions } from "../../hooks/index";

interface IInput {
  target: {
    value: string;
    checked: Boolean;
  };
}

interface IProps {
  submitForm: (data: string[]) => void;
  editLicension: (_id: string, data: any) => void;
}

function LicensionsSettingsForm({ submitForm, editLicension }: IProps) {
  const [licensions, setLicensions] = useLicensions();
  // const [canUpdate, setCanUpdate] = useState(false);

  const lics = licensions.map(() => createRef());

  function rollAccordion(i: number) {
    const el = lics[i].current as HTMLLIElement;
    el.classList.toggle("h-6");
  }

  const edit = (i) => {
    console.log("edit", i);
  };

  const remove = (_id) => {
    console.log("remove", _id);
  };

  // const changed = ({ target: { value, checked } }: IInput) => {
  //   if (checked) {
  //     setCurrencies((prevState) => [...prevState, value]);
  //   } else {
  //     setCurrencies(currencies.filter((item) => item !== value));
  //   }

  //   setCanUpdate(true);
  // };

  // const remove = (key: string) => {
  //   setCurrencies(currencies.filter((item) => item !== key));

  //   const input = document.getElementById(
  //     "currency-" + key,
  //   ) as HTMLInputElement;

  //   input.checked = false;
  //   setCanUpdate(true);
  // };

  // useEffect(() => {
  //   console.log("reload", licensions);
  // }, [licensions]);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <ul>
        {licensions &&
          licensions.map(({ _id, name, details }, i) => {
            return (
              <li
                className="h-6 overflow-hidden"
                key={_id}
                ref={lics[i] as React.LegacyRef<HTMLLIElement>}
              >
                <div className="flex gap-24">
                  <h3
                    className="cursor-pointer font-bold"
                    onClick={() => rollAccordion(i)}
                  >
                    {name}
                    <span className="inline-block ml-2 font-bold text-xl transform rotate-90">
                      &gt;
                    </span>
                  </h3>

                  <div className="flex gap-2">
                    <button
                      className="font-bold text-blue-900 text-xs"
                      onClick={() => edit(i)}
                    >
                      {" "}
                      EDIT{" "}
                    </button>
                    <button
                      className="font-bold text-red-600 text-xs"
                      onClick={() => remove(_id)}
                    >
                      {" "}
                      REMOVE{" "}
                    </button>
                  </div>
                </div>
                <ul>
                  {details &&
                    details.map((detail, i) => {
                      return (
                        <li className="pl-2 text-sm" key={i}>
                          {details}
                        </li>
                      );
                    })}
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default LicensionsSettingsForm;
