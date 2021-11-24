import { useEffect, useState } from "react";
import PersonalSettingsForm from "../forms/PersonalSettingsForm";
import { useSettings } from "../../hooks/index";

import { setPersonal } from "../../../redux/actions/accountActions";
import { IPersonalDetailsData } from "../../../redux/types";
import { connect } from "react-redux";
import Signature from "../Signature";

interface IProps {
  setPersonalConnect: () => Promise<any>;
}

import axios from "axios";

const PersonalSettings = ({ setPersonalConnect }: IProps) => {
  const [message, setMessage] = useState<string>();
  const [Personal, setPersonal] = useSettings();

  const submitForm = (data: IPersonalDetailsData) => {
    const userID = window.localStorage.getItem("userID");
    axios.patch(`/api/update-user/${userID}`, { data }).then((res) => {
      {
        setMessage(res.data ? "Updated succesfully" : "Something went wrong");
        if (res.data)
          setPersonalConnect().then(({ data }) => setPersonal(data));
      }
    });
  };

  return (
    <>
      <div>
        <PersonalSettingsForm submitForm={submitForm} details={Personal} />
        <div>{message}</div>
      </div>
      <Signature />
    </>
  );
};

const mapDispatchToProps = {
  setPersonalConnect: setPersonal,
};

export default connect(null, mapDispatchToProps)(PersonalSettings);
