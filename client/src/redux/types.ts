// import { IArtistDetailsData } from "../interfaces/user";

export interface ICurrentUser {
  userID: string | null;
  // isAuthenticated: boolean | null;
  // uuid: string | null;
}

export interface IUser {
  username: string | null;
}

export interface IUserRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface IUserLoginData {
  username: string;
  password: string;
}

export interface IArtistDetailsData {
  name: string | null;
  surname: string | null;
  stageName: string | null;
  email: string | null;
  country: string | null;
  localization: string | null;
}

export interface IAccountStore {
  account: IUserRegisterData;
  artist: IArtistDetailsData;
}

export interface IClientData {
  _id: string | null;
  name: string | null;
  realname: string | null;
  country: string | null;
  email: string | null;
  profession?: string | null;
  rate?: number | null;
  image?: any;
  imageKey?: string | null;
}

export interface ISaleBeat {
  beatName: string | null;
  currency: string | null;
  licension: string | null;
  client: IClientData | null;
}
