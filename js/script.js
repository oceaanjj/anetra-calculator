let storedValue = null;
let operator = null;
let currentInput = "0";
let shouldResetInput = false;
let screen = document.getElementById("screen");

function formatValue(value) {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  if (Number.isInteger(value)) {
    return String(value);
  }

  return String(parseFloat(value.toFixed(10)));
}

function renderDisplay(resultPrefix = false) {
  if (resultPrefix) {
    screen.value = "= " + currentInput;
    return;
  }

  if (operator !== null && storedValue !== null) {
    if (shouldResetInput) {
      screen.value = formatValue(storedValue) + operator;
    } else {
      screen.value = formatValue(storedValue) + operator + currentInput;
    }
    return;
  }

  screen.value = currentInput;
}

function compute(leftValue, rightValue, op) {
  if (op === "+") {
    return leftValue + rightValue;
  }

  if (op === "-") {
    return leftValue - rightValue;
  }

  if (op === "\u00D7") {
    return leftValue * rightValue;
  }

  if (op === "\u00F7") {
    if (rightValue === 0) {
      return Number.NaN;
    }
    return leftValue / rightValue;
  }

  if (op === "%") {
    return leftValue / 100;
  }

  if (op === "\u00D710") {
    return leftValue * 10;
  }

  return rightValue;
}

function keypad(number) {
  if (currentInput === "Error" || shouldResetInput) {
    currentInput = number;
    shouldResetInput = false;
  } else if (currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }

  renderDisplay();
}

function decimalPoint() {
  if (currentInput === "Error") {
    currentInput = "0";
  }

  if (shouldResetInput) {
    currentInput = "0.";
    shouldResetInput = false;
    renderDisplay();
    return;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
  }

  renderDisplay();
}

function calcuSign(op) {
  if (currentInput === "Error") {
    return;
  }

  if (op === "\u00D710") {
    currentInput = formatValue(Number(currentInput) * 10);

    if (operator !== null && storedValue !== null) {
      renderDisplay();
    } else {
      screen.value = currentInput;
    }
    return;
  }

  const inputValue = Number(currentInput);

  if (operator !== null && !shouldResetInput) {
    storedValue = compute(storedValue, inputValue, operator);
    currentInput = formatValue(storedValue);

    if (currentInput === "Error") {
      storedValue = null;
      operator = null;
      shouldResetInput = false;
      screen.value = currentInput;
      return;
    }
  } else if (storedValue === null || operator === null) {
    storedValue = inputValue;
  }

  operator = op;
  shouldResetInput = true;
  renderDisplay();
}

function specialSign() {
  if (currentInput === "Error") {
    return;
  }

  if (operator !== null && shouldResetInput) {
    storedValue = compute(storedValue, 0, "%");
    currentInput = formatValue(storedValue);
    operator = null;
    shouldResetInput = true;
    renderDisplay(true);
    return;
  }

  currentInput = formatValue(Number(currentInput) / 100);
  renderDisplay();
}

function calculate() {
  if (currentInput === "Error") {
    return;
  }

  if (operator === null) {
    renderDisplay(true);
    shouldResetInput = true;
    return;
  }

  if (operator === "%") {
    storedValue = compute(storedValue, Number(currentInput), operator);
  } else if (!shouldResetInput) {
    storedValue = compute(storedValue, Number(currentInput), operator);
  }

  currentInput = formatValue(storedValue);

  if (currentInput === "Error") {
    storedValue = null;
    operator = null;
    shouldResetInput = false;
    screen.value = currentInput;
    return;
  }

  operator = null;
  shouldResetInput = true;
  renderDisplay(true);
}

function allClear() {
  storedValue = null;
  operator = null;
  currentInput = "0";
  shouldResetInput = false;
  screen.value = "";
}

function del() {
  if (currentInput === "Error") {
    allClear();
    return;
  }

  if (operator !== null && shouldResetInput) {
    operator = null;
    currentInput = formatValue(storedValue);
    storedValue = null;
    shouldResetInput = false;
    renderDisplay();
    return;
  }

  if (currentInput.length <= 1) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }

  renderDisplay();
}
