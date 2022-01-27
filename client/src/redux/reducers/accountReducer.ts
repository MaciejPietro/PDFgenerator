import {
  IPersonalDetailsAction,
  ISetAccountAction,
  ISetSignatureAction,
  ISetCurrenciesAction,
  ISetLicensionsAction,
} from "../actions/accountActions";
import {
  PERSONALDETAILS,
  ACCOUNTDETAILS,
  SIGNATURE,
  CURRENCIES,
  LICENSIONS,
} from "../constants";
import { IAccountStore } from "../types";

export default function accountReducer(
  state: IAccountStore = {
    signature: null,
    signatureKey: null,
    currencies: null,
    licensions: null,
    account: {
      username: null,
      password: null,
      email: null,
    },
    personal: {
      name: null,
      surname: null,
      stageName: null,
      email: null,
      country: null,
      localization: null,
    },
  },
  action:
    | IPersonalDetailsAction
    | ISetAccountAction
    | ISetSignatureAction
    | ISetCurrenciesAction
    | ISetLicensionsAction,
): IAccountStore {
  switch (action.type) {
    case PERSONALDETAILS:
      return {
        ...state,
        personal: {
          name: action.data?.name,
          surname: action.data?.surname,
          stageName: action.data?.stageName,
          email: action.data?.email,
          country: action.data?.country,
          localization: action.data?.localization,
        },
      };
    case ACCOUNTDETAILS:
      return {
        ...state,
        account: {
          username: action.data.username,
          password: action.data.password,
          email: action.data.email,
        },
      };
    case SIGNATURE:
      return {
        ...state,
        signature: action.data.img,
        signatureKey: action.data.key,
      };
    case CURRENCIES:
      return {
        ...state,
        currencies: action.data,
      };
    case LICENSIONS:
      return {
        ...state,
        licensions: action.data,
      };
  }
  return state;
}
