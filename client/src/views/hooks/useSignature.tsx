import { useEffect, useState } from "react";
import { setSignature as setSignatureStore } from "../../redux/actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";

export default function useSignature() {
  const [signature, setSignature] = useState<string>();
  const signatureData = useSelector(
    (state: RootState) => state.accountReducer.signature,
  );
  const dispatch = useDispatch<typeof this.store.dispatch>();

  useEffect(() => {
    let cancel = false;

    if (!signatureData) {
      dispatch(setSignatureStore()).then(({ data }) => {
        if (cancel) return;
        setSignature(data.img);
      });
    } else {
      setSignature(signatureData);
    }

    return () => {
      cancel = true;
    };
  }, []);

  return [signature, setSignature] as const;
}
