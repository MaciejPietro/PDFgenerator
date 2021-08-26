import { IAuthenticate, IUnauthenticate } from "../actions/authActions";
import { AUTHENTICATE, UNAUTHENTICATE } from "../constants";
import { ICurrentUser } from "../types";
export default function authReducer(
  state: ICurrentUser = {
    uuid: null,
    isAuthenticated: false,
    username: null,
  },
  action: IAuthenticate | IUnauthenticate,
): ICurrentUser {
  switch (action.type) {
    case AUTHENTICATE:
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
