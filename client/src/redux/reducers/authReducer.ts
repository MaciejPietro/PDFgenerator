import { IAuthenticate, IUnauthenticate } from "../actions/authActions";
import { AUTHENTICATE, UNAUTHENTICATE } from "../constants";
import { ICurrentUser } from "../types";
export default function authReducer(
  state: any = {
    isAuth: null,
  },
  action: IAuthenticate | IUnauthenticate,
): any {
  switch (action.type) {
    case AUTHENTICATE:
      return { isAuth: true };
    case UNAUTHENTICATE:
      return { isAuth: false };
  }
  return state;
}
