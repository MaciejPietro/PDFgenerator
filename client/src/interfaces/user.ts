// export interface ICurrent {
//   isAuthenticated: boolean | null;
//   uuid: string | null;
// }

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
