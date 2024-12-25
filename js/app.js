let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.querySelector("#result");

// Populate dropdowns with currency options
currencies.forEach((currency) => {
    const fromOption = document.createElement("option");
    fromOption.value = currency;
    fromOption.text = currency;
    fromDropDown.add(fromOption);

    const toOption = document.createElement("option");
    toOption.value = currency;
    toOption.text = currency;
    toDropDown.add(toOption);
});

fromDropDown.value = "USD";
toDropDown.value = "INR";

const convertCurrency = () => {
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    if (!amount) {
        result.innerHTML = "Please enter an amount!";
        result.style.color = "red";
        return;
    }

    fetch(api)
        .then((response) => response.json())
        .then((data) => {
            const fromRate = data.conversion_rates[fromCurrency];
            const toRate = data.conversion_rates[toCurrency];
            const convertedAmount = ((amount / fromRate) * toRate).toFixed(2);
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            result.style.color = "#333";
        })
        .catch(() => {
            result.innerHTML = "Error fetching conversion rates!";
            result.style.color = "red";
        });
};

document
    .querySelector("#convert-button")
    .addEventListener("click", convertCurrency);
