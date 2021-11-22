import { useEffect, useState } from "react";
import { setClients as setClientsData } from "../../redux/actions/clientActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { IClientData } from "../../redux/types";

export default function useClients() {
  const [clients, setClients] = useState<IClientData[]>([]);
  const clientData = useSelector((state: RootState) => state.clientReducer);
  const dispatch = useDispatch<typeof this.store.dispatch>();

  useEffect(() => {
    let cancel = false;

    if (!clientData[0]._id) {
      dispatch(setClientsData()).then(({ data }) => {
        if (cancel) return;

        setClients(data);
      });
    } else {
      setClients(clientData);
    }

    return () => {
      cancel = true;
    };
  }, []);

  return [clients, setClients] as const;
}
