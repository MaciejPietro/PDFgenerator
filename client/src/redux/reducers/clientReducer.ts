import {
  IAddClientAction,
  ISetClientsAction,
  IDeleteClientAction,
  IEditClientAction,
} from "../actions/clientActions";
import { ADDCLIENT, SETCLIENTS, DELETECLIENT, EDITCLIENT } from "../constants";
import { IClientData } from "../../redux/types";

export default function clientReducer(
  state: IClientData[] = [
    {
      _id: null,
      name: null,
      realname: null,
      email: null,
      profession: null,
      rate: null,
      country: null,
      image: null,
    },
  ],
  action:
    | IAddClientAction
    | ISetClientsAction
    | IDeleteClientAction
    | IEditClientAction,
): IClientData[] {
  switch (action.type) {
    case ADDCLIENT:
      return action.data;
    // return [
    //   ...state,
    //   {
    //     id,
    //     name,
    //     email,
    //     realname,
    //     profession,
    //     rate,
    //     country,
    //     image,
    //   },
    // ];
    case EDITCLIENT:
      return state;

    case DELETECLIENT:
      const index = state.map((item) => item._id).indexOf(action.data);
      const newArr = [...state.slice(0, index), ...state.slice(index + 1)];
      return newArr;
    case SETCLIENTS:
      return [...action.data];
  }
  return state;
}
