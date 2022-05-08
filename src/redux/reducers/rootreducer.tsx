import { combineReducers } from "redux";

import userDetails from "./authReducers";
import balanceReducer from "./balanceReducer";

const rootReducers = combineReducers({ userDetails, currentBalance: balanceReducer });

export type RootState = ReturnType<typeof rootReducers>
export default rootReducers;
