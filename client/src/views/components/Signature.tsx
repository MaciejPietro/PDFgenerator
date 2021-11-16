import React, { useState } from "react";
import SignatureCreator from "./SignatureCreator";

const Signature = () => {
  return (
    <div className="w-1/3">
      <div>
        <h3>Your Signature</h3>
      </div>
      <div>
        <SignatureCreator />
      </div>
    </div>
  );
};

export default Signature;
