import Table from "../components/Table";
import AddClient from "../components/forms/ClientForm";
import EditPopup from "../components/EditPopup";

import { connect } from "react-redux";
import {
  addClient,
  deleteClient,
  editClient,
} from "../../redux/actions/clientActions";
import { IClientData } from "../../redux/types";
import React, { useEffect, useState, useRef } from "react";
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
  const [editedClient, setEditedClient] = useState<IClientData>();
  const popup = useRef<HTMLDivElement>(null);

  const addClient = (data: IClientData) => {
    addClientConnect(data).then(({ data }) => {
      setMessage(data ? successAddMsg : failedAddMsg);
      console.log("add", data);
      data && setClients(data);
    });
  };
  const editClient = (data: IClientData) => {
    editClientConnect(data).then(({ data }) => {
      console.log("elo", data);
      data && setClients(data);
    });
  };
  const deleteClient = (clientID: string) => {
    deleteClientConnect(clientID).then(({ data }) => {
      setMessage(data ? successDeleteMsg : failedDeleteMsg);
      data && setClients(data);
    });
  };

  const stopEditing = () => {
    popup.current.classList.add("hidden");
    setEditedClient(null);
  };

  return (
    <section className="relative">
      <h1>Clients</h1>
      <AddClient submitForm={addClient} />
      <div>{message}</div>
      <Table
        items={clients}
        deleteRecord={deleteClient}
        setEditedClient={setEditedClient}
        popup={popup}
      />
      <EditPopup
        popup={popup}
        client={editedClient}
        stopEditing={stopEditing}
        edit={editClient}
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
