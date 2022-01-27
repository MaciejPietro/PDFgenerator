import React, { useState, useEffect } from "react";
import SignatureForm from "./forms/SignatureForm";
import { setSignature } from "../../redux/actions/accountActions";
import { connect } from "react-redux";
import { useSignature } from "../hooks/index";

interface IProps {
  setSignatureConnect: (string) => Promise<any>;
  accountStore: any;
}

const Signature = ({ setSignatureConnect, accountStore }: IProps) => {
  const [signature, setSignature] = useSignature();

  const updateSignature = (data) => {
    setSignatureConnect(data).then(({ data }) => {
      data && setSignature(data);
    });
  };

  useEffect(() => {
    console.log("signature ", signature);
  }, [signature]);

  return (
    <div className="w-1/3">
      <div>
        <h3>Your Signature</h3>

        {signature ? (
          <img src={"data:image/jpeg;base64," + signature} />
        ) : signature === undefined ? (
          <div>Loading...</div>
        ) : (
          ""
        )}
      </div>
      <div>
        <SignatureForm updateSignature={updateSignature} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  accountStore: state.accountReducer,
});

const mapDispatchToProps = {
  setSignatureConnect: setSignature,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signature);
