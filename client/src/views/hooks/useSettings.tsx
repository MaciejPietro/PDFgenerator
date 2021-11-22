import { useEffect, useState } from "react";
import { setPersonal as setPersonalData } from "../../redux/actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { IPersonalDetailsData } from "../../redux/types";

export default function useSettings() {
  const [personal, setPersonal] = useState<IPersonalDetailsData | {}>();
  const personalData = useSelector(
    (state: RootState) => state.accountReducer.personal,
  );
  const dispatch = useDispatch<typeof this.store.dispatch>();

  useEffect(() => {
    let cancel = false;

    if (!personalData.name) {
      dispatch(setPersonalData()).then(({ data }) => {
        if (cancel) return;
        setPersonal(data);
      });
    } else {
      setPersonal(personalData);
    }

    return () => {
      cancel = true;
    };
  }, []);

  return [personal, setPersonal] as const;
}
