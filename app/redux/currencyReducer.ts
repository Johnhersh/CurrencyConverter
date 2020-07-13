import { currenciesState } from "./store";
import { CurrencyActionTypes } from "./currencyActions";

const INITIAL_STATE: currenciesState = {
  currencies: { USD: 100, GBP: 50 },
};

const currencyReducer = (state = INITIAL_STATE, action: CurrencyActionTypes): currenciesState => {
  switch (action.type) {
    case "UPDATE_CURRENCIES":
      return {
        currencies: action.payload.currencies,
      };
    default:
      return state;
  }
};

export default currencyReducer;
