import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

interface Input {
  name: string;
  value: string;
}

function Creator() {
  const [data, setData] = useState({
    name: "",
    receiptId: 0,
    price1: 0,
    price2: 0,
  });

  const handleChange = ({ target }: { target: Input }) => {
    const { name, value }: { name: string; value: string } = target;
    setData({ ...data, [name]: value });
  };

  const createPDF = () => {
    axios
      .post("/api/create-pdf", data)
      .then(() => axios.get("/api/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Receipt ID"
        name="receiptId"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price 1"
        name="price1"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price 2"
        name="price2"
        onChange={handleChange}
      />
      <button onClick={createPDF}>Download PDF</button>
    </div>
  );
}

export default Creator;
