import CreatorForm from "../components/forms/CreatorForm";
import DocumentPreview from "../components/DocumentPreview";
import { useState, useEffect } from "react";
import { ISaleBeat, IArtistDetailsData } from "../../redux/types";
import { useClients, useArtist } from "../hooks/index";

const Creator = () => {
  const [clients] = useClients();
  const [info, setInfo] = useState<ISaleBeat>({
    beatName: "Beat",
    currency: "usd",
    licension: "exclusive",
    client: null,
  });

  const artist = useArtist();

  useEffect(() => {}, [clients, artist]);

  function updateInfo(data: ISaleBeat) {
    const { beatName, currency, licension, client }: ISaleBeat = data;

    setInfo((prevState) => ({
      ...prevState,
      beatName: beatName || prevState.beatName,
      currency: currency || prevState.currency,
      licension: licension || prevState.licension,
      client: client || prevState.client,
    }));
  }

  function updateSingle(type, value) {
    const val =
      type !== "client" ? value : clients.find((client) => client.id === value);

    setInfo((prevState) => ({
      ...prevState,
      [type]: val,
    }));
  }

  return (
    <section>
      <h1>Creator</h1>

      <div className="grid grid-cols-4">
        <div className="col-start-1 col-end-4">
          <DocumentPreview data={info} artist={artist} />
        </div>
        <div className="col-start-4 col-end-5">
          <div className="sticky top-24">
            <CreatorForm
              submitForm={updateInfo}
              changeForm={updateSingle}
              clients={clients}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creator;
