import React, { useState } from "react";
import Exclusive from "./documents/Exclusive";

import { ISaleBeat, IPersonalDetailsData } from "../../redux/types";
import useSettings from "../hooks/useSettings";

interface IProps {
  data: ISaleBeat;
}

function DocumentPreview({ data }: IProps) {
  const [personal] = useSettings();

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

  return <Exclusive data={data} personal={personal} date={date} />;
}

export default DocumentPreview;
