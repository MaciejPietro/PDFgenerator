import { useState } from "react";
import ArtistDetailsForm from "../forms/ArtistDetailsForm";
import AccountDetailsForm from "../forms/AccountDetailsForm";

import {
  updateAccountDetailsStore,
  updateArtistDetailsStore,
} from "../../../redux/actions/userActions";
import {
  IArtistDetailsData,
  IUserRegisterData,
  IUserStoreState,
} from "../../../redux/types";
import { connect } from "react-redux";

interface IProps {
  updateAccountDetailsStoreConnect: () => Promise<any>;
  updateArtistDetailsStoreConnect: () => Promise<any>;
  userStore: IUserStoreState;
  children: any;
  type: any;
}

import axios from "axios";
import { useEffect } from "react";

const UserDetails = ({
  updateAccountDetailsStoreConnect,
  updateArtistDetailsStoreConnect,
  userStore,
  children,
  type,
}: IProps) => {
  const [details, setDetails] = useState<
    IUserRegisterData | IArtistDetailsData
  >();
  const [message, setMessage] = useState<string>();
  const storeAction =
    type === "account"
      ? updateAccountDetailsStoreConnect
      : updateArtistDetailsStoreConnect;

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    if (userStore[type].email) return setDetails(userStore[type]);
    storeAction().then((data) => {
      setDetails(data);
    });
  };

  const submitForm = (data: any) => {
    const username = window.localStorage.getItem("username");
    console.log("user", data);
    axios.patch("/api/update-user", { data, username }).then((res) => {
      {
        setMessage(res.data ? "Updated succesfully" : "Something went wrong");
        if (res.data) {
          storeAction().then((data) => setDetails(data));
        }
      }
    });
  };

  return (
    <>
      {children}
      <div>{message}</div>
      {type === "account" ? (
        <AccountDetailsForm submitForm={submitForm} details={details} />
      ) : (
        <ArtistDetailsForm submitForm={submitForm} details={details} />
      )}
    </>
  );
};

const mapDispatchToProps = {
  updateAccountDetailsStoreConnect: updateAccountDetailsStore,
  updateArtistDetailsStoreConnect: updateArtistDetailsStore,
};

const mapStateToProps = (state: any) => ({
  userStore: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
