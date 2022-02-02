import { useEffect } from "react";
import { ISaleBeat, IPersonalDetailsData } from "../../../redux/types";

interface IProps {
  data: any;
  personal: any;
  date: {
    day: string;
    month: string;
    year: number;
    dayName: string;
    monthName: string;
  };
}

const Lease = ({ data, personal, date }: IProps) => {
  useEffect(() => {
    // console.log("data", data);
    // console.log("personal", personal);
    // console.log("date", date);
  });

  // const render = (text) => (text ? text : "_");

  const html = "";
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default Lease;
