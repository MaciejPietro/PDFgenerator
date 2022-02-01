import CreatorForm from "../components/forms/CreatorForm";
import DocumentPreview from "../components/DocumentPreview";
import { useState, useEffect } from "react";
import { ISaleBeat } from "../../redux/types";
// import Summary from "../components/creator/Summary";

const Creator = () => {
  const [data, setData] = useState<ISaleBeat>();

  function updateData(data: ISaleBeat) {
    // const { beatName, currency, licension, client }: ISaleBeat = data;
    // setData((prevState) => ({
    //   ...prevState,
    //   beatName: beatName || prevState.beatName,
    //   currency: currency || prevState.currency,
    //   licension: licension || prevState.licension,
    //   client: client || prevState.client,
    // }));
  }

  function changeForm(data) {
    setData(data);
    // const val =
    //   type !== "client"
    //     ? value
    //     : clients.find((client) => client._id === value);
    // setData((prevState) => ({
    //   ...prevState,
    //   [type]: val,
    // }));
  }

  return (
    <section>
      <h1>Creator</h1>

      <div className="grid grid-cols-4">
        <div className="col-start-1 col-end-4">
          <DocumentPreview data={data} />
        </div>
        <div className="col-start-4 col-end-5">
          <div className="sticky top-24">
            <CreatorForm submitForm={updateData} changeForm={changeForm} />
            {/* <Summary data={data}></Summary> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creator;
