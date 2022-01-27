// import { useState } from "react";
import CurrencySettingsForm from "../forms/CurrencySettingsForm";
import LicensionsSettingsForm from "../forms/LicensionsSettingsForm";

import { editCurrencies } from "../../../redux/actions/accountActions";
// import { IUserRegisterData, IAccountStore } from "../../../redux/types";
import { connect } from "react-redux";

interface IProps {
  editCurrenciesConnect: (data: string[]) => Promise<any>;
}

const GeneralSettings = ({ editCurrenciesConnect }: IProps) => {
  const submitCurrencies = (data) => {
    editCurrenciesConnect(data);
  };

  const submitLicensions = (data) => {
    console.log("General Settings data - ", data);
  };

  const editLicension = (_id, data) => {
    console.log("edit, ", _id, data);
  };

  return (
    <div>
      <div>
        <h2 className="font-bold text-lg">Currencies</h2>
        <h3>Select currencies you use to sell your beats</h3>
        <CurrencySettingsForm submitForm={submitCurrencies} />
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-lg">Licensions</h2>
        <h3>Define licensions you use to sell your beats</h3>
        <LicensionsSettingsForm
          submitForm={submitLicensions}
          editLicension={editLicension}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  editCurrenciesConnect: editCurrencies,
};

const mapStateToProps = (state: any) => ({
  // accountStore: state.accountReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
