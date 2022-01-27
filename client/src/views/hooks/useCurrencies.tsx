import { useEffect, useState } from "react";
import { setCurrencies as setCurrenciesData } from "../../redux/actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";

export default function useSettings() {
  const [currencies, setCurrencies] = useState<string[]>();
  const currenciesData = useSelector(
    (state: RootState) => state.accountReducer.currencies,
  );
  const dispatch = useDispatch<typeof this.store.dispatch>();

  useEffect(() => {
    let cancel = false;

    if (!currenciesData) {
      dispatch(setCurrenciesData()).then(({ data }) => {
        if (cancel) return;
        setCurrencies(data);
      });
    } else {
      setCurrencies(currenciesData);
    }

    return () => {
      cancel = true;
    };
  }, []);

  return [currencies, setCurrencies] as const;
}
