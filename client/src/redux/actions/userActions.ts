import { ThunkDispatch as Dispatch } from "redux-thunk";
import * as constants from "../constants";
import axios from "axios";

export interface IArtistDetailsAction {
  type: constants.ARTISTDETAILS;
  data: any;
}

export interface IAccountDetailsAction {
  type: constants.ACCOUNTDETAILS;
  data: any;
}

export function setArtistDetails(data: any): IArtistDetailsAction {
  return {
    type: constants.ARTISTDETAILS,
    data: data,
  };
}

export function setAccountDetails(data: any): IAccountDetailsAction {
  return {
    type: constants.ACCOUNTDETAILS,
    data: data,
  };
}

export function updateUserDetailsStore() {
  return (dispatch: Dispatch<IArtistDetailsAction, {}, any>) => {
    const name = window.localStorage.getItem("username");
    return axios.get(`/api/user/${name}`).then((res) => {
      if (res.data) {
        dispatch(setArtistDetails(res.data));
        return res.data;
      } else {
        return "No such artist";
      }
    });
  };
}

export function updateArtistDetailsStore() {
  return (dispatch: Dispatch<IArtistDetailsAction, {}, any>) => {
    const name = window.localStorage.getItem("username");
    return axios.get(`/api/user/${name}`).then((res) => {
      if (res.data) {
        dispatch(setArtistDetails(res.data.artistDetails));
        return res.data.artistDetails;
      } else {
        return "No such artist";
      }
    });
  };
}

export function updateAccountDetailsStore() {
  return (dispatch: Dispatch<IAccountDetailsAction, {}, any>) => {
    const name = window.localStorage.getItem("username");
    return axios.get(`/api/user/${name}`).then((res) => {
      if (res.data) {
        const data = {
          username: res.data.username,
          password: res.data.password,
          email: res.data.email,
        };
        dispatch(setAccountDetails(data));
        return data;
      } else {
        return "No such artist";
      }
    });
  };
}
