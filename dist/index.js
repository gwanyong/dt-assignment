var calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};
function updateDisplay() {
    var display = document.querySelector('.result');
    display.textContent = calculator.displayValue;
}
updateDisplay();
function inputDigit(digit) {
    var displayValue = calculator.displayValue, waitingForSecondOperand = calculator.waitingForSecondOperand;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }
    else {
        calculator.displayValue =
            displayValue === '0' ? digit : displayValue + digit;
    }
}
function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}
function handleOperator(nextOperator) {
    var firstOperand = calculator.firstOperand, displayValue = calculator.displayValue, operator = calculator.operator;
    var inputValue = parseFloat(displayValue);
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    }
    else if (operator) {
        var currentValue = firstOperand || 0;
        var result = performCalculation[operator](currentValue, inputValue);
        calculator.displayValue = "" + parseFloat(result.toFixed(7));
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}
var performCalculation = {
    '÷': function (firstOperand, secondOperand) { return firstOperand / secondOperand; },
    x: function (firstOperand, secondOperand) { return firstOperand * secondOperand; },
    '+': function (firstOperand, secondOperand) { return firstOperand + secondOperand; },
    '-': function (firstOperand, secondOperand) { return firstOperand - secondOperand; },
    '=': function (firstOperand, secondOperand) { return secondOperand; },
    '%': function (firstOperand, secondOperand) { return secondOperand / 100; },
};
function clearButtonClick() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}
var numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(function (button) {
    return button.addEventListener('click', function () {
        inputDigit(button.textContent);
        updateDisplay();
    });
});
var decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', function () {
    inputDecimal(decimalButton.textContent);
    updateDisplay();
});
function toggleSign() {
    var result = calculator.displayValue;
    var newValue;
    if (result !== '0') {
        newValue = parseFloat(result) * -1;
    }
    else {
        newValue = parseFloat(formula.slice(0, -1)) * -1;
    }
    return newValue;
}
var toggleButton = document.querySelector('#plus-minus');
toggleButton.addEventListener('click', function () {
    calculator.displayValue = toggleSign();
    updateDisplay();
});
var percentageButton = document.querySelector('#percentage');
percentageButton.addEventListener('click', function (text) {
    calculator.displayValue = parseInt(calculator.displayValue) / 100;
    // handleOperator(button.textContent);
    updateDisplay();
});
var operatorButtons = document.querySelectorAll('.orange-button');
operatorButtons.forEach(function (button) {
    return button.addEventListener('click', function () {
        handleOperator(button.textContent);
        updateDisplay();
    });
});
var grayButtons = document.querySelectorAll('.gray-button');
grayButtons.forEach(function (button) {
    return button.addEventListener('click', function () {
        display.textContent = calculator.displayValue;
        handleOperator(button.textContent);
        updateDisplay();
    });
});
var clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function () {
    clearButtonClick();
    updateDisplay();
});
