import { ThunkDispatch as Dispatch } from "redux-thunk";
import axios from "axios";
import { ADDCLIENT, SETCLIENTS, DELETECLIENT, EDITCLIENT } from "../constants";
import { IClientData } from "../types";

export interface IAddClientAction {
  type: ADDCLIENT;
  data: IClientData;
}

export interface ISetClientsAction {
  type: SETCLIENTS;
  data: IClientData[];
}

export interface IDeleteClientAction {
  type: DELETECLIENT;
  data: string;
}

export interface IEditClientAction {
  type: EDITCLIENT;
  data: string;
}

export function addClientAction(data: any): IAddClientAction {
  return {
    type: ADDCLIENT,
    data: data,
  };
}

export function setClientsAction(clients: any): ISetClientsAction {
  return {
    type: SETCLIENTS,
    data: clients,
  };
}

export function deleteClientAction(clientID: string): IDeleteClientAction {
  return {
    type: DELETECLIENT,
    data: clientID,
  };
}
export function editClientAction(clientID: string): IEditClientAction {
  return {
    type: EDITCLIENT,
    data: clientID,
  };
}

export function addClient(payload: IClientData) {
  return (dispatch: Dispatch<IAddClientAction, {}, any>) => {
    const userID = JSON.parse(window.localStorage.getItem("userID"));

    return axios.post(`/api/client/${userID}`, payload).then((res) => {
      if (res.data) {
        return dispatch(addClientAction(res.data));
      }
    });
  };
}

export function setClients() {
  return (dispatch: Dispatch<ISetClientsAction, {}, any>) => {
    const userID = JSON.parse(window.localStorage.getItem("userID"));

    return axios
      .get(`/api/clients/${userID}`)
      .then(({ data }: { data: IClientData[] }) => {
        return dispatch(setClientsAction(data));
      });
  };
}
export function deleteClient(clientID: string) {
  return (dispatch: Dispatch<any, {}, any>) => {
    const userID = JSON.parse(window.localStorage.getItem("userID"));
    return axios
      .delete(`/api/client/${userID}/${clientID}`)
      .then(({ data }) => {
        return dispatch(setClientsAction(data));
      });
  };
}

export function editClient(payload: FormData) {
  return (dispatch: Dispatch<any, {}, any>) => {
    const userID = JSON.parse(window.localStorage.getItem("userID"));
    console.log(payload.get("_id"));
    return axios
      .patch(`/api/client/${userID}/${payload.get("_id")}`, payload)
      .then(({ data }) => {
        return data && dispatch(editClientAction(data));
      });
  };
}
