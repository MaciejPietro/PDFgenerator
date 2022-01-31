import React, { useState, useEffect } from "react";
import SignatureForm from "./forms/SignatureForm";
import { setSignature } from "../../redux/actions/accountActions";
import { connect } from "react-redux";
import { useSignature } from "../hooks/index";

interface IProps {
  setSignatureConnect: (string) => Promise<any>;
  signatureKey: string;
}

const Signature = ({ setSignatureConnect, signatureKey }: IProps) => {
  const [signature, setSignature] = useSignature();

  const updateSignature = (data) => {
    setSignatureConnect(data).then(({ data }) => {
      data && setSignature(data);
    });
  };

  useEffect(() => {}, [signature]);

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
        <SignatureForm
          updateSignature={updateSignature}
          signatureKey={signatureKey}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  signatureKey: state.accountReducer.signatureKey,
});

const mapDispatchToProps = {
  setSignatureConnect: setSignature,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signature);
