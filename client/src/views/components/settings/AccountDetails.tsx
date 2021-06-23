import { useState } from "react";
import AccountDetailsForm from "../forms/AccountDetailsForm";
import {
  updateAccountDetailsStore,
  // setArtistDetails,
  IArtistDetails,
} from "../../../redux/actions/userActions";
import { IArtistDetailsData } from "../../../interfaces/user";
import { connect } from "react-redux";

interface IProps {
  updateAccountDetailsStoreConnect: () => Promise<any>;
  artistDetails: IArtistDetailsData;
}

import axios from "axios";
import { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
const ArtistDetails = ({
  updateAccountDetailsStoreConnect,
  artistDetails,
}: IProps) => {
  const [details, setDetails] = useState<IArtistDetailsData>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    // if (artistDetails.stageName) return setDetails(artistDetails);
    // updateAccountDetailsStoreConnect().then((data) => setDetails(data));
  };

  const submitForm = (data: any) => {
    // const username = window.localStorage.getItem("username");
    // axios.patch("/api/update-user", { data, username }).then((res) => {
    //   {
    //     setMessage(res.data ? "Updated succesfully" : "Something went wrong");
    //     if (res.data) {
    //       updateAccountDetailsStoreConnect().then((data) => setDetails(data));
    //     }
    //   }
    // });
  };

  return (
    <>
      <div>
        <h2>Acount details</h2>
        <h3>Here are your account details</h3>
      </div>

      {/*  <div>{message}</div> */}
      <AccountDetailsForm submitForm={submitForm} details={details} />
    </>
  );
};

const mapDispatchToProps = {
  updateAccountDetailsStoreConnect: updateAccountDetailsStore,
};

const mapStateToProps = (state: any) => ({
  artistDetails: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetails);
