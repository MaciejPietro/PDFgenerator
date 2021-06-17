import { IAuthenticate, IUnauthenticate } from "../actions/authActions";
import { AUTHENTICATE, UNAUTHENTICATE } from "../constants";
import { ICurrent } from "../types";
export default function authReducer(
  state: ICurrent = {
    uuid: null,
    isAuthenticated: false,
    username: null,
  },
  action: IAuthenticate | IUnauthenticate,
): ICurrent {
  switch (action.type) {
    case AUTHENTICATE:
      console.log("boco", action.username);
      return {
        ...state,
        username: action.username,
        uuid: "placeholder-uuid",
        isAuthenticated: true,
      };
    case UNAUTHENTICATE:
      return { uuid: null, isAuthenticated: false, username: null };
  }
  return state;
}
