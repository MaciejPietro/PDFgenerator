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
      // const { id, name, email, profession, rate, realname, country, image } =
      //   action.data;
      console.log("ADDCLIENT - reducer - action.data", action.data);
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
      console.log("EDITCLIENT reducer action.data", action.data);
      return state;
    // const { _id, name, email, profession, rate, realname, country, image } =
    //   action.data;

    // return [
    //   ...state,
    //   {
    //     _id,
    //     name,
    //     email,
    //     realname,
    //     profession,
    //     rate,
    //     country,
    //     image,
    //   },
    // ];
    case DELETECLIENT:
      const index = state.map((item) => item._id).indexOf(action.data);
      console.log(state);
      const newArr = [...state.slice(0, index), ...state.slice(index + 1)];
      console.log(newArr);
      return newArr;
    case SETCLIENTS:
      return [...action.data];
  }
  return state;
}
