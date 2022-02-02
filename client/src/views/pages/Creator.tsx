import CreatorForm from "../components/forms/CreatorForm";
import Document from "../components/Document";
import DocumentPreview from "../components/DocumentPreview";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ISaleBeat } from "../../redux/types";
import { useClients, useLicensions, useSettings, useSignature } from "../hooks";
import axios from "axios";
import { saveAs } from "file-saver";

// import Summary from "../components/creator/Summary";

interface IProps {
  match: {
    params: {
      type: string;
    };
  };
}

const Creator: React.FC<IProps> = ({ match }) => {
  const [data, setData] = useState<ISaleBeat>();
  const [clients] = useClients();
  const [licensions] = useLicensions();
  const [personal] = useSettings();
  const [signature] = useSignature();

  const [docPrev, setDocPrev] = useState<string | null>();

  const { type } = match.params;
  const prepareData = (data: any) => {
    const client = clients.find((client) => client._id === data.client);
    const licension = licensions.find((lic) => lic._id === data.licension);

    if (client) {
      const { country, name, realname } = client;
      data.client = { country, name, realname };
    }

    if (licension) data.licension = licension;

    return data;
  };

  function submitForm(data: ISaleBeat) {
    axios
      .post("/api/documents/pdf", data)
      .then(() => axios.get("/api/documents/pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });
  }

  function changeForm(data) {
    setData(prepareData(data));
  }

  function preview() {
    axios("/api/documents/preview", {
      method: "POST",
      responseType: "blob",
      data: {
        data: prepareData(data),
        personal: personal,
        signature,
      },
    }).then((res) => {
      const blob = new Blob([res.data], { type: "application/pdf" });
      const urlCreator = window.URL || window.webkitURL;
      setDocPrev(urlCreator.createObjectURL(blob));
    });
  }

  const closePreview = () => {
    setDocPrev(null);
  };

  return (
    <section>
      <h1>Creator</h1>
      <DocumentPreview url={docPrev} closePreview={closePreview} />

      <div className="flex justify-center gap-8">
        <div>
          <Document data={data} type={type} />
        </div>
        <div className="text-left">
          <div className="sticky top-24">
            <CreatorForm
              submitForm={submitForm}
              changeForm={changeForm}
              preview={preview}
            />
            {/* <Summary data={data}></Summary> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creator;
