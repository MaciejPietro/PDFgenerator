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

    return axios.post(`/api/client/${userID}`, payload).then(
      (res) => {
        if (res.data) {
          return dispatch(addClientAction(res.data));
        }
      },
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  };
}

export function setClients() {
  return (dispatch: Dispatch<ISetClientsAction, {}, any>) => {
    const userID = JSON.parse(window.localStorage.getItem("userID"));

    return axios
      .get(`/api/clients/${userID}`)
      .then(({ data }: { data: IClientData[] }) => {
        console.log(data);
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
        console.log("delate Client action data - client id", data);
        return dispatch(setClientsAction(data));
      });
  };
}

export function editClient(payload: IClientData) {
  return (dispatch: Dispatch<any, {}, any>) => {
    const userID = JSON.parse(window.localStorage.getItem("userID"));
    return axios.patch(`/api/client/${userID}`, payload).then(({ data }) => {
      console.log("editClient action: ", data);
      return data && dispatch(editClientAction(data));
    });
  };
}
