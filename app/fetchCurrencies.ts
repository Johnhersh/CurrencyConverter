const currencyURL = "https://api.exchangeratesapi.io/latest?base=";

export async function getCurrenciesFromApi(referenceCurrencyName: string): Promise<any> {
  if (referenceCurrencyName == "BTC") {
  } else {
    return getCurrencyFromApi(referenceCurrencyName);
  }
}

async function getCurrencyFromApi(referenceCurrencyName: string) {
  if (referenceCurrencyName == "BTC") {
  } else {
    try {
      let response = await fetch(currencyURL + referenceCurrencyName, {
        method: "GET",
      });
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  }
}
