import { ThunkDispatch as Dispatch } from "redux-thunk";
import * as constants from "../constants";
import axios from "axios";

export interface IArtistDetails {
  type: constants.ARTISTDETAILS;
  data: any;
}

export function setArtistDetails(data: any): IArtistDetails {
  return {
    type: constants.ARTISTDETAILS,
    data: data,
  };
}

export function updateArtistDetailsStore() {
  return (dispatch: Dispatch<IArtistDetails, {}, any>) => {
    const name = window.localStorage.getItem("username");
    return axios.get(`/api/artist-details/${name}`).then((res) => {
      if (res.data) {
        dispatch(setArtistDetails(res.data));
        return res.data;
      } else {
        return "No such artist";
      }
    });
  };
}

export function updateAccountDetailsStore() {
  // return (dispatch: Dispatch<IArtistDetails, {}, any>) => {
  //   const name = window.localStorage.getItem("username");
  //   return axios.get(`/api/artist-details/${name}`).then((res) => {
  //     if (res.data) {
  //       dispatch(setArtistDetails(res.data));
  //       return res.data;
  //     } else {
  //       return "No such artist";
  //     }
  //   });
  // };
}
