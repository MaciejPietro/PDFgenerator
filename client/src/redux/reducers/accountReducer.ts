import {
  IPersonalDetailsAction,
  ISetAccountAction,
} from "../actions/accountActions";
import { PERSONALDETAILS, ACCOUNTDETAILS } from "../constants";
import { IAccountStore } from "../types";

export default function acountReducer(
  state: IAccountStore = {
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
  action: IPersonalDetailsAction | ISetAccountAction,
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
  }
  return state;
}
