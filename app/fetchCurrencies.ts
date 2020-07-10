const currencyURL = "https://api.exchangeratesapi.io/latest?";

export async function getCurrencyFromApi() {
  try {
    let response = await fetch(currencyURL + "base=USD", {
      method: "GET",
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
