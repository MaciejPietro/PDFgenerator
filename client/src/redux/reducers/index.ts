import { combineReducers } from "redux";

import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
import clientReducer from "./clientReducer";

const rootReducer = combineReducers({
  authReducer,
  accountReducer,
  clientReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
