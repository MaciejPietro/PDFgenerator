import { useEffect, useState, useRef, createRef, Key } from "react";
import { useLicensions, useCurrencies } from "../../hooks/index";
import LicensionPopup from "../settings/LicensionPopup";
import { ILicension } from "../../../redux/types";

interface IProps {
  currencies: string[];
  // submitForm: (data: string[]) => void;
  deleteLicension: any;
  editLicension: (data: ILicension) => void;
  licensions: ILicension[];
}

function LicensionsSettingsForm({
  deleteLicension,
  editLicension,
  currencies,
  licensions,
}: IProps) {
  const lics = licensions && licensions.map(() => createRef<HTMLLIElement>());

  function rollAccordion(i: number) {
    const el = lics[i].current as HTMLLIElement;
    el.classList.toggle("h-6");
  }

  return (
    <div className="mt-4">
      <ul>
        {licensions &&
          licensions.map(({ _id, name, details, prices }, i) => {
            return (
              <li className="h-6 overflow-hidden" key={_id} ref={lics[i]}>
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
                    <LicensionPopup
                      editLicension={editLicension}
                      deleteLicension={deleteLicension}
                      licension={licensions[i]}
                      currencies={currencies}
                    />
                  </div>
                </div>
                <ul>
                  {details &&
                    details.map((detail, i) => {
                      return (
                        <li className="pl-2 text-sm" key={i}>
                          {detail}
                        </li>
                      );
                    })}
                </ul>
                <ul>
                  {currencies &&
                    currencies.map((currency, i: Key) => {
                      return (
                        <li className="pl-2 text-sm" key={i}>
                          {currency} <span>:</span>
                          {prices ? prices[currency] : ""}
                        </li>
                      );
                    })}
                </ul>
              </li>
            );
          })}
      </ul>

      <div>
        <h3 className="font-bold mt-10">Add Licension</h3>
        <LicensionPopup currencies={currencies} editLicension={editLicension} />
      </div>
    </div>
  );
}

export default LicensionsSettingsForm;
