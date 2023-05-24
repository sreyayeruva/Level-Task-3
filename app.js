const inputTempSelect = document.getElementById("inputTempSelect");
const tempInput = document.getElementById("tempInput");
const targetTempSelect = document.getElementById("targetTempSelect");

const submitBtn = document.getElementById("submit");
const resultP = document.querySelector(".result");

let initialTemp = inputTempSelect.value;
let initialTempValue = tempInput.value;
let targetTemp = targetTempSelect.value;

window.addEventListener("load", displayResults);

inputTempSelect.addEventListener("input", () => {
  initialTemp = inputTempSelect.value;
  displayResults();
});

tempInput.addEventListener("input", (e) => {
  e.preventDefault();
  initialTempValue = parseInt(tempInput.value);
  displayResults();
});

targetTempSelect.addEventListener("input", (e) => {
  e.preventDefault();
  targetTemp = targetTempSelect.value;
  displayResults();
});

// add new formulas here
// keys for initialTemp, subkeys for targetTemp
const convertTable = {
  F: {
    C: () => ((initialTempValue - 32) * 5) / 9,
    K: () => ((initialTempValue - 32) * 5) / 9 + 273.15,
  },

  C: {
    F: () => (initialTempValue * 9) / 5 + 32,
    K: () => initialTempValue + 273.15,
  },

  K: {
    C: () => initialTempValue - 273.15,
    F: () => ((initialTempValue - 273.15) * 9) / 5 + 32,
  },
};

function convert() {
  if (initialTemp === targetTemp) {
    return "Huh?";
  }

  if (!initialTempValue) {
    initialTempValue = 0;
  }

  for (const key in convertTable) {
    if (key === initialTemp) {
      // search inside the key for convert function
      for (const subKey in convertTable[key]) {
        if (subKey === targetTemp) {
          return convertTable[key][subKey]().toFixed(2);
        }
      }
    }
  }
}

function displayResults() {
  resultP.innerText = convert();
}
