import { ThunkDispatch as Dispatch } from "redux-thunk";
import * as constants from "../constants";
import axios from "axios";

export interface IPersonalDetailsAction {
  type: constants.PERSONALDETAILS;
  data: any;
}

export interface ISetAccountAction {
  type: constants.ACCOUNTDETAILS;
  data: any;
}

export function setPersonalAction(data: any): IPersonalDetailsAction {
  return {
    type: constants.PERSONALDETAILS,
    data: data,
  };
}

export function setAccountAction(data: any): ISetAccountAction {
  return {
    type: constants.ACCOUNTDETAILS,
    data: data,
  };
}

// export function updateStorePersonalDetails() {
//   return (dispatch: Dispatch<IPersonalDetailsAction, {}, any>) => {
//     const name = window.localStorage.getItem("username");
//     return axios.get(`/api/user/${name}`).then((res) => {
//       dispatch(setPersonalDetails(res.data.PersonalDetails));
//       return res.data.PersonalDetails;
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

export function setPersonal() {
  return (dispatch: Dispatch<ISetAccountAction, {}, any>) => {
    const userID = JSON.parse(window.localStorage.getItem("userID"));
    return axios.get(`/api/user/${userID}`).then(({ data }) => {
      const { personalDetails } = data;
      return dispatch(setPersonalAction(personalDetails));
    });
  };
}
