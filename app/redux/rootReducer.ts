import { combineReducers } from "redux";

import currencyReducer from "./currencyReducer";

export default combineReducers({
  currenciesState: currencyReducer,
});