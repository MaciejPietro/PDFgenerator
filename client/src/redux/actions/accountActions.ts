import { ThunkDispatch as Dispatch } from "redux-thunk";
import * as constants from "../constants";
import axios from "axios";

export interface IArtistDetailsAction {
  type: constants.ARTISTDETAILS;
  data: any;
}

export interface ISetAccountAction {
  type: constants.ACCOUNTDETAILS;
  data: any;
}

export function setArtistAction(data: any): IArtistDetailsAction {
  return {
    type: constants.ARTISTDETAILS,
    data: data,
  };
}

export function setAccountAction(data: any): ISetAccountAction {
  return {
    type: constants.ACCOUNTDETAILS,
    data: data,
  };
}

// export function updateStoreArtistDetails() {
//   return (dispatch: Dispatch<IArtistDetailsAction, {}, any>) => {
//     const name = window.localStorage.getItem("username");
//     return axios.get(`/api/user/${name}`).then((res) => {
//       dispatch(setArtistDetails(res.data.artistDetails));
//       return res.data.artistDetails;
//     });
//   };
// }

export function setAccount() {
  return (dispatch: Dispatch<ISetAccountAction, {}, any>) => {
    const userID = JSON.parse(window.localStorage.getItem("userID"));
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

export function setArtist() {
  return (dispatch: Dispatch<ISetAccountAction, {}, any>) => {
    const userID = JSON.parse(window.localStorage.getItem("userID"));
    return axios.get(`/api/user/${userID}`).then(({ data }) => {
      const { artistDetails } = data;
      return dispatch(setArtistAction(artistDetails));
    });
  };
}
