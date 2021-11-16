import { useEffect, useState } from "react";
import { setArtist as setArtistData } from "../../redux/actions/accountActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { IArtistDetailsData } from "../../redux/types";

export default function useArtist() {
  const [artist, setArtist] = useState<IArtistDetailsData | {}>();
  const artistData = useSelector(
    (state: RootState) => state.accountReducer.artist,
  );
  const dispatch = useDispatch<typeof this.store.dispatch>();

  useEffect(() => {
    let cancel = false;

    if (!artistData.name) {
      dispatch(setArtistData()).then(({ data }) => {
        if (cancel) return;
        setArtist(data);
      });
    } else {
      setArtist(artistData);
    }

    return () => {
      cancel = true;
    };
  }, []);

  return [artist, setArtist] as const;
}
