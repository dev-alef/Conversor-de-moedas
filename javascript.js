

const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select")

function convertValues(){
    const inputCurrencyValue = document.querySelector(".input-currency").value
    // valor em real
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    // outras moedas
    const currencyValueToConverted = document.querySelector(".currency-value")

    const dolarToday = 4.97
    const euroToday = 5.82
    const libraToday = 6.69
    const bitcoinToday = 389.483

   

    if(currencySelect.value == "dolar") {
        // se o select estiver selecionado o valor de dolar, entre aqui
          currencyValueToConverted.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(inputCurrencyValue / dolarToday)

    }
    if(currencySelect.value == "euro") {
        // se o select estiver selecionado o valor de euro, entre aqui
        currencyValueToConverted.innerHTML = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    }).format(inputCurrencyValue / euroToday)
        
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue)


  

    console.log(currencySelect.value)
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-img")

    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar americano"
        currencyImage.src = "./assets/dolar.png"

    }

      if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"
    }

   convertValues()

}

currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)