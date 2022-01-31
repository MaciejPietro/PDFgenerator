import React, { useState, useEffect, useRef } from "react";
import { setSignature } from "../../../redux/actions/accountActions";
import { connect } from "react-redux";
import SignaturePad from "react-signature-canvas";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  image: yup.string(),
});

interface IProps {
  updateSignature: (string) => void;
  signatureKey: string;
}

const SignatureForm = ({ updateSignature, signatureKey }: IProps) => {
  const [signatures, setSignatures] = useState<string[]>([]);
  let sigPad = {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const clear = (sigPad) => {
    sigPad.clear();
  };

  const add = (sigPad) => {
    if (sigPad.isEmpty()) return;
    setSignatures((prevState) => [
      ...prevState,
      sigPad.getTrimmedCanvas().toDataURL("image/png"),
    ]);
  };

  const onSubmit = (fData) => {
    fetch(fData["signature"])
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "Signature", { type: "image/png" });
        const data = new FormData();
        data.append("image", file);
        data.append("prevSigKey", signatureKey);

        setSignatures([]);
        updateSignature(data);
      });
  };

  useEffect(() => {}, [signatures]);

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="mt-8"
      >
        <div className="grid grid-cols-3 gap-4">
          {signatures.map((signature, key) => (
            <div key={key}>
              <input
                {...register("signature")}
                name="signature"
                id={`signature-${key}`}
                value={signature}
                type="radio"
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
            onClick={() => clear(sigPad)}
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

export default SignatureForm;
