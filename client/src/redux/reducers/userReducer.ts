import { IArtistDetails } from "../actions/userActions";
import { ARTISTDETAILS } from "../constants";
import { IArtistDetailsData } from "../../interfaces/user";

export default function userReducer(
  state: IArtistDetailsData = {
    name: null,
    surname: null,
    stageName: null,
    email: null,
    country: null,
    localization: null,
  },
  action: IArtistDetails,
): IArtistDetailsData {
  switch (action.type) {
    case ARTISTDETAILS:
      return {
        ...state,
        name: action.data.name,
        surname: action.data.surname,
        stageName: action.data.stageName,
        email: action.data.email,
        country: action.data.country,
        localization: action.data.localization,
      };
  }
  return state;
}
