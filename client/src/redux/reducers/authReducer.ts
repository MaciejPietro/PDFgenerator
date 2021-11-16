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
      console.log("AUTHENTICATE reducer", action.userID);
      return { userID: action.userID };
    // return {
    //   ...state,
    //   // username: action.username,
    //   // uuid: "placeholder-uuid",
    //   // isAuthenticated: true,
    // };
    case UNAUTHENTICATE:
      return { userID: null };
  }
  return state;
}
