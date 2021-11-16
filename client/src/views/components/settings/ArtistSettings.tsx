import { useEffect, useState } from "react";
import ArtistSettingsForm from "../forms/ArtistSettingsForm";
import { useArtist } from "../../hooks/index";

import { setArtist } from "../../../redux/actions/accountActions";
import { IArtistDetailsData } from "../../../redux/types";
import { connect } from "react-redux";
import Signature from "../Signature";

interface IProps {
  setArtistConnect: () => Promise<any>;
}

import axios from "axios";

const ArtistSettings = ({ setArtistConnect }: IProps) => {
  const [message, setMessage] = useState<string>();
  const [artist, setArtist] = useArtist();

  const submitForm = (data: IArtistDetailsData) => {
    const userID = JSON.parse(window.localStorage.getItem("userID"));
    axios.patch(`/api/update-user/${userID}`, { data }).then((res) => {
      {
        setMessage(res.data ? "Updated succesfully" : "Something went wrong");
        if (res.data) setArtistConnect().then(({ data }) => setArtist(data));
      }
    });
  };

  return (
    <>
      <div>
        <ArtistSettingsForm submitForm={submitForm} details={artist} />
        <div>{message}</div>
      </div>
      <Signature />
    </>
  );
};

const mapDispatchToProps = {
  setArtistConnect: setArtist,
};

export default connect(null, mapDispatchToProps)(ArtistSettings);
