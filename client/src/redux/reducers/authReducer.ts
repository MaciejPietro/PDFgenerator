import { IAuthenticate, IUnauthenticate } from "../actions/authActions";
import { AUTHENTICATE, UNAUTHENTICATE } from "../constants";
import { ICurrentUser } from "../types";
export default function authReducer(
  state: ICurrentUser = {
    userID: null,
  },
  action: IAuthenticate | IUnauthenticate,
): ICurrentUser {
  switch (action.type) {
    case AUTHENTICATE:
      return { userID: action.userID };
    case UNAUTHENTICATE:
      return { userID: null };
  }
  return state;
}
