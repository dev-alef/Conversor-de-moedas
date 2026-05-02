const convertButton = document.querySelector(".convert-button");
const currencySelectFrom = document.querySelector(".select"); // select 'de'
const currencySelectTo = document.querySelector(".currency-select"); // select 'para'
const inputCurrency = document.querySelector(".input-currency");

const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyValueConverted = document.querySelector(".currency-value");
const currencyNameTo = document.getElementById("currency-name");
const currencyImageTo = document.querySelector(".currency-img");

const currencyImageFrom = document.querySelector(".currency-img-from");
const currencyNameFrom = document.querySelector(".currency-from-name");

// Taxas em relação ao BRL (1 BRL = x moeda)
const taxas = {
  brl: 1,
  dolar: 4.96,
  euro: 5.81,
  libra: 6.73,
  bitcoin: 388244
};

// Funções auxiliares para moeda e locale
function getCurrencyCode(moeda) {
  switch (moeda) {
    case "dolar": return "USD";
    case "euro": return "EUR";
    case "libra": return "GBP";
    case "bitcoin": return "BTC";
    case "brl":
    default: return "BRL";
  }
}

function getLocale(moeda) {
  switch (moeda) {
    case "dolar": return "en-US";
    case "euro": return "de-DE";
    case "libra": return "en-GB";
    case "bitcoin": return "en-US";
    case "brl":
    default: return "pt-BR";
  }
}

function updateCurrencyInfo(moeda, target = "to") {
  const currencyNameMap = {
    dolar: "Dólar americano",
    euro: "Euro",
    libra: "Libra esterlina",
    bitcoin: "Bitcoin",
    brl: "Real brasileiro"
  };

  const currencyImageMap = {
    dolar: "./assets/dolar.png",
    euro: "./assets/euro.png",
    libra: "./assets/libra.png",
    bitcoin: "./assets/bitcoin.png",
    brl: "./assets/real.png"
  };

   if (target === "to") {
    currencyNameTo.textContent = currencyNameMap[moeda];
    currencyImageTo.src = currencyImageMap[moeda];
  } else if (target === "from") {
    currencyNameFrom.textContent = currencyNameMap[moeda];
    currencyImageFrom.src = currencyImageMap[moeda];
  }

}



function convertValues() {
  const valor = Number(inputCurrency.value.replace(",", "."));
  if (isNaN(valor) || valor <= 0) {
    alert("Por favor, insira um valor válido maior que zero.");
    return;
  }

  const moedaOrigem = currencySelectFrom.value.toLowerCase();
  const moedaDestino = currencySelectTo.value.toLowerCase();

  const valorEmBRL = valor * taxas[moedaOrigem];
  const valorConvertido = valorEmBRL / taxas[moedaDestino];

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: getCurrencyCode(moedaOrigem)
  }).format(valor);

  if (moedaDestino === "bitcoin") {
    currencyValueConverted.textContent = `${valorConvertido.toFixed(6)} BTC`;
  } else {
    currencyValueConverted.innerHTML = new Intl.NumberFormat(getLocale(moedaDestino), {
      style: "currency",
      currency: getCurrencyCode(moedaDestino)
    }).format(valorConvertido);
  }

  updateCurrencyInfo(moedaDestino);
}

// Atualiza moeda destino e converte quando muda 'para'
currencySelectTo.addEventListener("change", () => {
  updateCurrencyInfo(currencySelectTo.value.toLowerCase());
  convertValues();
});

// Converte quando muda moeda origem
currencySelectFrom.addEventListener("change", () => {
  updateCurrencyInfo(currencySelectFrom.value.toLowerCase(), "from"); // atualiza moeda origem
  convertValues();
});

// Converte ao clicar no botão
convertButton.addEventListener("click", convertValues);

// --- Passo extra: converter ao apertar Enter no input ---
inputCurrency.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    convertValues();
  }
});

// Inicializa a moeda destino e converte na carga da página
window.addEventListener("load", () => {
  updateCurrencyInfo(currencySelectTo.value.toLowerCase(), "to");
  updateCurrencyInfo(currencySelectFrom.value.toLowerCase(), "from");
  convertValues();
});