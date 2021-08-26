import Table from "../components/Table";
import AddClient from "../components/forms/ClientForm";

const Clients = () => {
  return (
    <section className="relative">
      <h1>Clients</h1>
      <AddClient />
      <Table />
    </section>
  );
};

export default Clients;
