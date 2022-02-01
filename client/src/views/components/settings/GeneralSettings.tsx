// import { useState } from "react";
import CurrencySettingsForm from "../forms/CurrencySettingsForm";
import LicensionsSettingsForm from "../forms/LicensionsSettingsForm";
import { useCurrencies, useLicensions } from "../../hooks/index";

import {
  editCurrencies,
  editLicension,
  deleteLicension,
} from "../../../redux/actions/accountActions";
import { ILicension } from "../../../redux/types";
import { connect } from "react-redux";
import { useEffect } from "react";

interface IProps {
  editCurrenciesConnect: (data: string[]) => Promise<any>;
  editLicensionConnect: (data: ILicension) => Promise<any>;
  deleteLicensionConnect: (data: string) => Promise<any>;
}

const GeneralSettings = ({
  editCurrenciesConnect,
  editLicensionConnect,
  deleteLicensionConnect,
}: IProps) => {
  const [currencies, setCurrencies] = useCurrencies();
  const [licensions, setLicensions] = useLicensions();

  const capitalize = (s) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const editCurrencies = (data) => {
    console.log(data);
    // editCurrenciesConnect(data);
  };

  const editLicension = (data) => {
    editLicensionConnect(data).then(({ data }) => {
      data && setLicensions(data);
    });
  };

  const deleteLicension = (data) => {
    deleteLicensionConnect(data).then(({ data }) => {
      data && setLicensions(data);
    });
  };

  const addCurrency = ({ name, shortcode }) => {
    const currency = `${shortcode.toUpperCase()}-${capitalize(name)}`;
    setCurrencies((prev) => [...prev, currency]);
    editCurrenciesConnect([...currencies, currency]);
  };

  return (
    <div>
      <div>
        <h2 className="font-bold text-lg">Currencies</h2>
        <h3>Add or select currencies you use to sell your beats</h3>
        <CurrencySettingsForm
          submitForm={editCurrencies}
          currencies={currencies}
          setCurrencies={setCurrencies}
          addCurrency={addCurrency}
        />
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-lg">Licensions</h2>
        <h3>Define licensions you use to sell your beats</h3>
        <LicensionsSettingsForm
          licensions={licensions}
          currencies={currencies}
          editLicension={editLicension}
          deleteLicension={deleteLicension}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  editCurrenciesConnect: editCurrencies,
  editLicensionConnect: editLicension,
  deleteLicensionConnect: deleteLicension,
};

const mapStateToProps = (state: any) => ({
  // accountStore: state.accountReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
