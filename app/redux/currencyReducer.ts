import { currenciesState } from "./store";
import { CurrencyActionTypes } from "./currencyActions";

const INITIAL_STATE: currenciesState = {
  currencies: [
    { currency: "USD", value: 100 },
    { currency: "GBP", value: 50 },
  ],
};

const currencyReducer = (state = INITIAL_STATE, action: CurrencyActionTypes): currenciesState => {
  switch (action.type) {
    case "UPDATE_CURRENCIES":
      return {
        currencies: [...state.currencies, ...action.payload.currencies],
      };
    default:
      return state;
  }
};

export default currencyReducer;
