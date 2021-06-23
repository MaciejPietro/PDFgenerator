import { useState } from "react";
import ArtistDetailsForm from "../forms/ArtistDetailsForm";
import {
  updateArtistDetailsStore,
  // setArtistDetails,
  IArtistDetails,
} from "../../../redux/actions/userActions";
import { IArtistDetailsData } from "../../../interfaces/user";
import { connect } from "react-redux";

interface IProps {
  updateArtistDetailsStoreConnect: () => Promise<any>;
  artistDetails: IArtistDetailsData;
}

import axios from "axios";
import { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
const ArtistDetails = ({
  updateArtistDetailsStoreConnect,
  artistDetails,
}: IProps) => {
  const [details, setDetails] = useState<IArtistDetailsData>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    if (artistDetails.stageName) return setDetails(artistDetails);
    updateArtistDetailsStoreConnect().then((data) => setDetails(data));
  };

  const submitForm = (data: any) => {
    const username = window.localStorage.getItem("username");
    axios.patch("/api/update-user", { data, username }).then((res) => {
      {
        setMessage(res.data ? "Updated succesfully" : "Something went wrong");

        if (res.data) {
          updateArtistDetailsStoreConnect().then((data) => setDetails(data));
        }
      }
    });
  };

  return (
    <>
      <div>
        <h2>Your details</h2>
        <h3>Here are your artistic details</h3>
      </div>

      <div>{message}</div>
      <ArtistDetailsForm submitForm={submitForm} details={details} />
    </>
  );
};

const mapDispatchToProps = {
  updateArtistDetailsStoreConnect: updateArtistDetailsStore,
};

const mapStateToProps = (state: any) => ({
  artistDetails: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetails);
