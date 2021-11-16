import React, { useState } from "react";
import SignaturePad from "react-signature-canvas";

const SignatureCreator = () => {
  const [signatures, setSignatures] = useState([]);
  const [selectedSignature, setSelectedSignature] = useState();

  let sigPad = {};
  const clear = (sigPad) => {
    sigPad.clear();
  };
  const add = (sigPad) => {
    setSignatures((prevState) => [
      ...prevState,
      sigPad.getTrimmedCanvas().toDataURL("image/png"),
    ]);
  };

  const update = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <div>
        <div>
          <SignaturePad
            canvasProps={{
              className: "h-64 w-full bg-white border border-blue-800",
            }}
            ref={(ref) => {
              sigPad = ref;
            }}
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="border border-blue-300 bg-gray-200 px-6 py-2"
            onClick={() => clear(sigPad)}
          >
            Clear
          </button>
          <button
            className="border border-blue-300 bg-gray-200 px-6 py-2"
            onClick={() => add(sigPad)}
          >
            Preview
          </button>
        </div>
      </div>
      <form onSubmit={update} className="mt-8">
        <div className="grid grid-cols-3 gap-4">
          {signatures.map((signature, key) => (
            <div key={key}>
              <input
                name={`signature-${key}`}
                id={`signature-${key}`}
                type="radio"
                checked={selectedSignature === signature}
                onChange={() => setSelectedSignature(signature)}
              />
              <label htmlFor={`signature-${key}`}>
                <img
                  className="border border-gray-900 p-4 bg-white"
                  src={signature}
                />
              </label>
            </div>
          ))}
        </div>
        {signatures.length > 0 && (
          <button
            type="submit"
            className="border border-blue-300 bg-gray-200 px-6 py-2 mt-4"
          >
            Update
          </button>
        )}
      </form>
    </>
  );
};

export default SignatureCreator;
