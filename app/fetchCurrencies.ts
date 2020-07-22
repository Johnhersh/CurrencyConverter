import { currenciesDataState } from "./redux/types";

const currencyURL = "https://api.exchangeratesapi.io/latest?base=";
const cryptoCurrencyURL = "https://api.coingecko.com/api/v3/simple/price?ids=";

const cryptoCurrencyNames: { [name: string]: string } = {
  BTC: "bitcoin",
  ETH: "ethereum",
};

// Returning a promise here because I don't want to actually dispatch the new rates until I have all the info
export async function getCurrenciesFromApi(
  referenceCurrencyName: string
): Promise<currenciesDataState> {
  let newRates: currenciesDataState = { currencies: {} };

  let url = currencyURL + referenceCurrencyName;
  let currencyRates = await getCurrencyFromAPI(url);
  newRates.currencies = currencyRates.rates;

  url = cryptoCurrencyURL + cryptoCurrencyNames["BTC"] + "&vs_currencies=" + referenceCurrencyName;
  let cryptoRates = await getCurrencyFromAPI(url);

  newRates.currencies = {
    ...newRates.currencies,
    ["BTC"]: cryptoRates.bitcoin[referenceCurrencyName.toLowerCase()], // The cryptocurrency API sends the currencies in lower-case unfortunately
  };

  return newRates;
}

async function getCurrencyFromAPI(URL: string): Promise<any> {
  try {
    let response = await fetch(URL, {
      method: "GET",
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
