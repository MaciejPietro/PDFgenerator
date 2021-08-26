// import { IArtistDetailsData } from "../interfaces/user";

export interface ICurrentUser {
  username: string | null;
  isAuthenticated: boolean | null;
  uuid: string | null;
}

export interface IUser {
  username: string | null;
}

// export type IArtist = IArtistDetailsData;

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

export interface IUserStoreState {
  account: IUserRegisterData;
  artist: IArtistDetailsData;
}

export interface IClientData {
  // image_id: number | null;
  name: string | null;
  email: string | null;
  profession: string | null;
  sold_sum_in_pln: number | null;
  rate_to_five: number | null;
}
