//https://www.w3schools.com/html/html_charset.asp  characters set table.

//DOM elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

//getting the values by user for password.
generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumbers = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumbers,
    hasSymbols,
    length
  );
});

// copy to clipboard.
clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard!");
});

//generate password function
function generatePassword(lower, upper, number, symbol, length) {
  // *A initail password string on represting password.
  let generatedPassword = "";

  // *Filtring uncheck values.
  const typesCount = lower + upper + number + symbol;

  let typesArr = [{ lower }, { upper }, { symbol }, { number }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  // *looping untill reached the user given length.btn.
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
      console.log(generatedPassword);
    });
  }
  console.log(length);
  generatedPassword = generatedPassword.slice(1, length - 1);
  console.log(generatedPassword);
  let finalPassword = generatedPassword;
  finalPassword = getRandomLower() + finalPassword + getRandomUpper();
  console.log(finalPassword);
  // *Returning final password.
  return finalPassword;
}

// Random Generator functions
//lowercase letter generator function
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//UpperCase letter generator function
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//number generator function
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//symbol generator function
function getRandomSymbol() {
  const symbols = "!@#$%^*(){}=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
  //return String.fromCharCode(Math.floor(Math.random()*13) + 33);
}
//  console.log(getRandomLower(), getRandomNumber(), getRandomUpper(), getRandomSymbol());
