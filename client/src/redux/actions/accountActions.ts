import { ThunkDispatch as Dispatch } from "redux-thunk";
import * as constants from "../constants";
import axios from "axios";
import { ICurrencies, IUserRegisterData, ILicension } from "../types";
import { resolve } from "path/posix";

export interface IPersonalDetailsAction {
  type: constants.PERSONALDETAILS;
  data: any;
}

export interface ISetAccountAction {
  type: constants.ACCOUNTDETAILS;
  data: any;
}

export interface ISetSignatureAction {
  type: constants.SIGNATURE;
  data: any;
}

export interface ISetCurrenciesAction {
  type: constants.CURRENCIES;
  data: string[];
}

export interface ISetLicensionsAction {
  type: constants.LICENSIONS;
  data: ILicension[];
}

export function setPersonalAction(data: any): IPersonalDetailsAction {
  return {
    type: constants.PERSONALDETAILS,
    data,
  };
}

export function setAccountAction(data: IUserRegisterData): ISetAccountAction {
  return {
    type: constants.ACCOUNTDETAILS,
    data,
  };
}

export function setSignatureAction(data: string): ISetSignatureAction {
  return {
    type: constants.SIGNATURE,
    data,
  };
}

export function setCurrenciesAction(data: string[]): ISetCurrenciesAction {
  return {
    type: constants.CURRENCIES,
    data: data,
  };
}

export function setLicensionsAction(data: any): ISetLicensionsAction {
  return {
    type: constants.LICENSIONS,
    data: data,
  };
}

// SIGNATURE
export function setSignature(payload?: FormData) {
  return (dispatch: Dispatch<ISetSignatureAction, {}, any>) => {
    const userID = window.localStorage.getItem("userID");
    return axios[payload ? "patch" : "get"](
      `/api/signature/${userID}`,
      payload,
    ).then(({ data }) => {
      console.log("elo", data);
      return dispatch(setSignatureAction(data));
    });
  };
}

// ACCOUNT
export function setAccount() {
  return (dispatch: Dispatch<ISetAccountAction, {}, any>) => {
    const userID = window.localStorage.getItem("userID");
    return axios.get(`/api/account/${userID}`).then(({ data }) => {
      const { username, password, email } = data;
      return dispatch(
        setAccountAction({
          username,
          password,
          email,
        }),
      );
    });
  };
}

// PERSONAL
export function setPersonal() {
  return (dispatch: Dispatch<ISetAccountAction, {}, any>) => {
    const userID = window.localStorage.getItem("userID");
    return axios.get(`/api/user/${userID}`).then(({ data }) => {
      const { personalDetails } = data;
      return dispatch(setPersonalAction(personalDetails));
    });
  };
}

// CURRENCIES
export function setCurrencies() {
  return (dispatch: Dispatch<ISetCurrenciesAction, {}, any>) => {
    const userID = window.localStorage.getItem("userID");
    return axios
      .get<ICurrencies>(`/api/currencies/${userID}`)
      .then(({ data }) => {
        const { currencies } = data;
        return dispatch(setCurrenciesAction(currencies));
      });
  };
}

export function editCurrencies(payload: string[]) {
  return async (dispatch) => {
    const userID = window.localStorage.getItem("userID");
    const { data } = await axios.patch(`/api/currencies/${userID}`, payload);

    return data && dispatch(setCurrenciesAction(data));
  };
}

// LICENSIONS
export function setLicensions() {
  return (dispatch: Dispatch<ISetLicensionsAction, {}, any>) => {
    const userID = window.localStorage.getItem("userID");
    return axios.get<string[]>(`/api/licensions/${userID}`).then(({ data }) => {
      return dispatch(setLicensionsAction(data));
    });
  };
}
