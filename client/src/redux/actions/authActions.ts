import { ThunkDispatch as Dispatch } from "redux-thunk";
import axios from "axios";
import * as constants from "../constants";

import { UserRegisterData } from "../../interfaces/types";

export interface IAuthenticate {
  type: constants.AUTHENTICATE;
  username: string;
}

function authenticate(username: string): IAuthenticate {
  return {
    type: constants.AUTHENTICATE,
    username: username,
  };
}

export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}

interface IPasses {
  name: String;
  password: String;
}

function unauthenticate(): IUnauthenticate {
  return {
    type: constants.UNAUTHENTICATE,
  };
}

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export function register(payload: UserRegisterData) {
  return () => {
    const { username, email, password } = payload;
    const existsName = axios
      .post("/api/findByName", { name: username })
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
export function logIn(payload: any) {
  return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    const { name, password } = payload;
    return axios
      .post("/api/auth", { name: name, password: password })
      .then((res) => {
        if (res.data) {
          dispatch(authenticate(name));
          window.localStorage.setItem("authenticated", "true");
          window.localStorage.setItem("username", name);

          return false;
        } else {
          return "Username or password are incorrect";
        }
      });
  };
}

export function logOut() {
  return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    console.log("sss");
    window.localStorage.setItem("authenticated", "false");
    window.localStorage.setItem("username", "false");

    dispatch(unauthenticate());
  };
}

export function checkAuthentication() {
  return (dispatch: Dispatch<AuthenticationAction, {}, any>) => {
    const auth = window.localStorage.getItem("authenticated");
    const formattedAuth = typeof auth === "string" ? JSON.parse(auth) : null;

    if (formattedAuth) {
      const username = window.localStorage.getItem("username");
      dispatch(authenticate(username));
    } else {
      dispatch(unauthenticate());
    }
  };
}
