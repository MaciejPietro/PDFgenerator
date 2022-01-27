import { ThunkDispatch as Dispatch } from "redux-thunk";
import axios from "axios";
import * as constants from "../constants";

import { IUserRegisterData } from "../../redux/types";

export interface IAuthenticate {
  type: constants.AUTHENTICATE;
}

function authenticate(): IAuthenticate {
  return {
    type: constants.AUTHENTICATE,
  };
}

export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}

function unauthenticate(): IUnauthenticate {
  return {
    type: constants.UNAUTHENTICATE,
  };
}

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export function register(payload: IUserRegisterData) {
  return () => {
    const { username, email, password } = payload;
    const existsName = axios
      .post("/api/findByName", { username: username })
      .then((res) => {
        return res.data;
      });

    const existsEmail = axios
      .post("/api/findByEmail", { email: email })
      .then((res) => {
        return res.data;
      });

    return Promise.all([existsName, existsEmail]).then((val) => {
      const freeUsernameEmail = !val[0] && !val[1];

      const msg = freeUsernameEmail
        ? axios
            .post("/api/register", { name: username, email, password })
            .then((res) => {
              if (res.data) return "Registered succesfully";
            })
            .catch(() => "Something went wrong")
        : val[0]
        ? "User with the username already exists"
        : "Email is already taken";

      return msg;
    });
  };
}
export function logIn(payload: [string, string]) {
  return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    return axios
      .post("/api/login", payload)
      .then(({ data: { user, auth, token } }) => {
        if (auth) {
          window.localStorage.setItem("userID", user._id);
          window.localStorage.setItem("token", token);
          dispatch(authenticate(user._id));
          return false;
        } else {
          return "Username or password are incorrect";
        }
      });
  };
}

export function logOut() {
  return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("token");
    dispatch(unauthenticate());
  };
}

export function authentication() {
  return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    const userID = window.localStorage.getItem("userID");
    const token = window.localStorage.getItem("token");

    return axios
      .get("/api/auth", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        if (res.data.auth) {
          dispatch(authenticate());
        } else {
          window.localStorage.removeItem("userID");
          window.localStorage.removeItem("token");
          logOut();
          dispatch(unauthenticate());
        }
      });
  };
}
