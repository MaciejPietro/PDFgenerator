import React, { useState } from "react";
import Exclusive from "./documents/Exclusive";

import { ISaleBeat, IPersonalDetailsData } from "../../redux/types";

interface IProps {
  data: ISaleBeat;
  personal: IPersonalDetailsData;
}

function DocumentPreview({ data, personal }: IProps) {
  return <Exclusive data={data} personal={personal} />;
}

export default DocumentPreview;
