import { useState } from "react";
import AccountSettingsForm from "../forms/AccountSettingsForm";

import { setAccount } from "../../../redux/actions/accountActions";
import { IUserRegisterData, IAccountStore } from "../../../redux/types";
import { connect } from "react-redux";

interface IProps {
  setAccountConnect: () => Promise<any>;
  accountStore: IAccountStore;
}

import axios from "axios";
import { useEffect } from "react";

const AccountSettings = ({ setAccountConnect, accountStore }: IProps) => {
  const [details, setDetails] = useState<IUserRegisterData>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    let cancel = false;
    if (accountStore.account.email) {
      setDetails(accountStore.account);
    } else {
      setAccountConnect().then(({ data }) => {
        if (cancel) return;
        setDetails(data);
      });
    }
    return () => {
      cancel = true;
    };
  }, []);

  const submitForm = (data: any) => {
    const userID = window.localStorage.getItem("userID");

    axios.patch(`/api/settings/personal/${userID}`, { data }).then((res) => {
      {
        setMessage(res.data ? "Updated succesfully" : "Something went wrong");
        if (res.data) {
          setAccountConnect().then(({ data }) => {
            setDetails(data);
          });
        }
      }
    });
  };

  return (
    <div>
      <h2>Account Deatails</h2>
      <h3>Here are your account details</h3>
      <div>{message}</div>
      <AccountSettingsForm submitForm={submitForm} details={details} />
    </div>
  );
};

const mapDispatchToProps = {
  setAccountConnect: setAccount,
};

const mapStateToProps = (state: any) => ({
  accountStore: state.accountReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
