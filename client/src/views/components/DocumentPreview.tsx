import React, { useState } from "react";
import Exclusive from "./documents/Exclusive";

import { ISaleBeat, IArtistDetailsData } from "../../redux/types";

interface IProps {
  data: ISaleBeat;
  artist: IArtistDetailsData;
}

function DocumentPreview({ data, artist }: IProps) {
  return <Exclusive data={data} artist={artist} />;
}

export default DocumentPreview;
