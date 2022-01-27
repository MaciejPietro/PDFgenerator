import { useEffect, useState } from "react";
import { setLicensions as setLicensionsData } from "../../redux/actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { ILicension } from "../../redux/types";

export default function useLicensions() {
  const [licensions, setLicensions] = useState<ILicension[]>([]);
  const licensionsData = useSelector(
    (state: RootState) => state.accountReducer.licensions,
  );
  const dispatch = useDispatch<typeof this.store.dispatch>();

  useEffect(() => {
    let cancel = false;

    if (!licensionsData) {
      dispatch(setLicensionsData()).then(({ data }) => {
        if (cancel) return;
        setLicensions(data);
      });
    } else {
      setLicensions(licensionsData);
    }

    return () => {
      cancel = true;
    };
  }, []);

  return [licensions, setLicensions] as const;
}
