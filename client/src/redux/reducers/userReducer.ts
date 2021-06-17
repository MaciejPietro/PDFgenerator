import { ICheckUser } from "../actions/userActions";
import { CHECKUSER } from "../constants";
import { IUser } from "../types";

export default function userReducer(
  state: IUser = {
    username: null,
  },
  action: ICheckUser,
): IUser {
  switch (action.type) {
    case CHECKUSER:
      console.log("boolce");
      return {
        ...state,
        username: "placeholder-uuid",
      };
  }
  return state;
}
