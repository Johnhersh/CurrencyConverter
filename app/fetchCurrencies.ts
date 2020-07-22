const currencyURL = "https://api.exchangeratesapi.io/latest?base=";

export async function getCurrencyFromApi(referenceCurrencyName: string) {
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
