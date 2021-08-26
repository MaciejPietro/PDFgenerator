import {
  IArtistDetailsAction,
  IAccountDetailsAction,
} from "../actions/userActions";
import { ARTISTDETAILS, ACCOUNTDETAILS } from "../constants";
import { IUserStoreState } from "../../interfaces/user";

export default function userReducer(
  state: IUserStoreState = {
    account: {
      username: null,
      password: null,
      email: null,
    },
    artist: {
      name: null,
      surname: null,
      stageName: null,
      email: null,
      country: null,
      localization: null,
    },
  },
  action: IArtistDetailsAction | IAccountDetailsAction,
): IUserStoreState {
  switch (action.type) {
    case ARTISTDETAILS:
      return {
        ...state,
        artist: {
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
