import { useEffect } from "react";

interface IProps {
  data: any;
}

const Summary: React.FC<IProps> = ({ data }) => {
  useEffect(() => {
    console.log("data", data);
  });
  return (
    <div className="relative">
      <div></div>
    </div>
  );
};

export default Summary;
