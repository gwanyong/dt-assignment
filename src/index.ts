interface Calculator {
  displayValue: string;
  firstOperand: number | null;
  waitingForSecondOperand: boolean;
  operator: string | null;
}

const calculator: Calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  const display = document.querySelector('.result');
  display.textContent = calculator.displayValue;
}

updateDisplay();

function inputDigit(digit: string) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot: string) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.';
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator: string) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

const performCalculation: {
  [operator: string]: (firstOperand: number, secondOperand: number) => number;
} = {
  '÷': (firstOperand, secondOperand) => firstOperand / secondOperand,

  x: (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (secondOperand) => secondOperand,
};

function clearButtonClick() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach((button) =>
  button.addEventListener('click', () => {
    inputDigit(button.textContent);
    updateDisplay();
  }),
);

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
  inputDecimal(decimalButton.textContent);
  updateDisplay();
});

function toggleSign() {
  const result = calculator.displayValue;
  let newValue;
  if (result !== '0') {
    newValue = parseFloat(result) * -1;
  } else {
    console.log(typeof result);
    newValue = '0';
  }

  return String(newValue);
}

const toggleButton = document.querySelector('#plus-minus');
toggleButton.addEventListener('click', () => {
  calculator.displayValue = toggleSign();
  updateDisplay();
});

const percentageButton = document.querySelector('#percentage');
percentageButton.addEventListener('click', (text) => {
  calculator.displayValue = String(parseInt(calculator.displayValue) / 100);
  updateDisplay();
});

const operatorButtons = document.querySelectorAll('.orange-button');
operatorButtons.forEach((button) =>
  button.addEventListener('click', () => {
    handleOperator(button.textContent);
    updateDisplay();
  }),
);

const grayButtons = document.querySelectorAll('.gray-button');
grayButtons.forEach((button) =>
  button.addEventListener('click', () => {
    handleOperator(button.textContent);
    updateDisplay();
  }),
);

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
  clearButtonClick();
  updateDisplay();
});
