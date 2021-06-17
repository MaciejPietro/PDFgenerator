import { ThunkDispatch as Dispatch } from "redux-thunk";
import * as constants from "../constants";

export interface ICheckUser {
  type: constants.CHECKUSER;
}

export type UserAction = ICheckUser;

function setUserName(): ICheckUser {
  return {
    type: constants.CHECKUSER,
  };
}

export function checkUser() {
  return (dispatch: Dispatch<UserAction, {}, any>) => {
    const auth = window.localStorage.getItem("authenticated");
    const formattedAuth = typeof auth === "string" ? JSON.parse(auth) : null;

    if (formattedAuth) {
      dispatch(setUserName());
    }
  };
}
