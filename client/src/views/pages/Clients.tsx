import Table from "../components/Table";
import AddClient from "../components/forms/ClientForm";

import { connect } from "react-redux";
import {
  addClient,
  deleteClient,
  editClient,
} from "../../redux/actions/clientActions";
import { IClientData } from "../../redux/types";
import React, { useEffect } from "react";
import { useClients } from "../hooks/index";

interface IProps {
  addClientConnect: (payload: any) => any;
  deleteClientConnect: (payload: any) => any;
  editClientConnect: (payload: any) => any;
}

const successAddMsg = "Client added succesfully";
const failedAddMsg = "Something went wrong while adding client";
const successDeleteMsg = "Client deleter succesfully";
const failedDeleteMsg = "Something went wrong while deleting client";

function Clients({
  addClientConnect,
  deleteClientConnect,
  editClientConnect,
}: IProps) {
  const [message, setMessage] = React.useState<string>();
  const [clients, setClients] = useClients();

  const addClient = (data: IClientData) => {
    addClientConnect(data).then(({ data }) => {
      setMessage(data ? successAddMsg : failedAddMsg);
      console.log("komponent data", data);
      data && setClients(data);
    });
  };
  const editClient = (data: IClientData) => {
    console.log({ data });
    editClientConnect(data).then((res) => {
      console.log("Client edit component res", res);
      //  setMessage(data ? successDeleteMsg : failedDeleteMsg);
      //  data && setClients(data);
    });
  };
  const deleteClient = (clientID: string) => {
    deleteClientConnect(clientID).then(({ data }) => {
      setMessage(data ? successDeleteMsg : failedDeleteMsg);
      data && setClients(data);
    });
  };

  return (
    <section className="relative">
      <h1>Clients</h1>
      <AddClient submitForm={addClient} />
      <div>{message}</div>
      <Table
        items={clients}
        deleteRecord={deleteClient}
        editRecord={editClient}
      />
    </section>
  );
}

const mapDispatchToProps = {
  addClientConnect: addClient,
  deleteClientConnect: deleteClient,
  editClientConnect: editClient,
};

export default connect(null, mapDispatchToProps)(Clients);
