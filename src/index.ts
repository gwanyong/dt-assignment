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

//결과값 출력
function updateDisplay() {
  const display = document.querySelector('.result');
  display.textContent = calculator.displayValue;
}

updateDisplay();

//숫자 입력
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

//소수점 입력
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

//연산자 입력
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

//연산자에 따른 계산
const performCalculation: {
  [operator: string]: (firstOperand: number, secondOperand: number) => number;
} = {
  '÷': (firstOperand, secondOperand) => firstOperand / secondOperand,

  x: (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (secondOperand) => secondOperand,
};

//초기화
function clearButtonClick() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// 숫자 버튼 클릭 시 이벤트 리스너
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach((button) =>
  button.addEventListener('click', () => {
    inputDigit(button.textContent);
    updateDisplay();
  }),
);

// 소수점 버튼 클릭 시 이벤트 리스너
const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
  inputDecimal(decimalButton.textContent);
  updateDisplay();
});

// 부호 변경 버튼 클릭 시 이벤트 리스너
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

// 부호 변경 버튼 클릭 시 이벤트 리스너
const toggleButton = document.querySelector('#plus-minus');
toggleButton.addEventListener('click', () => {
  calculator.displayValue = toggleSign();
  updateDisplay();
});

// 퍼센트 버튼 클릭 시 이벤트 리스너
const percentageButton = document.querySelector('#percentage');
percentageButton.addEventListener('click', (text) => {
  calculator.displayValue = String(parseInt(calculator.displayValue) / 100);
  updateDisplay();
});

// 연산자 버튼 클릭 시 이벤트 리스너 ( +, -, x, ÷, =)
const operatorButtons = document.querySelectorAll('.orange-button');
operatorButtons.forEach((button) =>
  button.addEventListener('click', () => {
    handleOperator(button.textContent);
    updateDisplay();
  }),
);

// 연산자 버튼 클릭 시 이벤트 리스너 ( c, +/-, %)
const grayButtons = document.querySelectorAll('.gray-button');
grayButtons.forEach((button) =>
  button.addEventListener('click', () => {
    handleOperator(button.textContent);
    updateDisplay();
  }),
);

// 초기화 버튼 클릭 시 이벤트 리스너
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => {
  clearButtonClick();
  updateDisplay();
});
