import React, { useState } from "react";
import Exclusive from "./documents/Exclusive";
import Lease from "./documents/Lease";

import { ISaleBeat, IPersonalDetailsData } from "../../redux/types";
import useSettings from "../hooks/useSettings";
import { useSignature } from "../hooks";

interface IProps {
  data: ISaleBeat;
  type: string;
}

const Map = {
  exclusive: Exclusive,
  lease: Lease,
};

function Document({ data, type }: IProps) {
  const [personal] = useSettings();
  const [signature] = useSignature();

  const Component = Map[type];

  const dateObj = new Date();

  const treatSingleNum = (val: number) =>
    (val + "").length == 1 ? "0" + val : val + "";

  const date = {
    month: treatSingleNum(dateObj.getUTCMonth() + 1),
    day: treatSingleNum(dateObj.getUTCDate()),
    year: dateObj.getUTCFullYear(),
    monthName: dateObj.toLocaleString("en-us", { month: "long" }),
    dayName: dateObj.toLocaleString("en-us", { weekday: "long" }),
  };

  return (
    <div className="max-w-4xl bg-white shadow-xl">
      <Component
        data={data}
        personal={personal}
        date={date}
        signature={signature}
      />
    </div>
  );
}

export default Document;
