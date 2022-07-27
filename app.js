let displayValue = '';
let storedValue;
let operator;

const display = document.querySelector('.currentValue');
const storage = document.querySelector('.storage');
const numButtons = Array.from(document.querySelectorAll('.num-button'));
const clearButtons = Array.from(document.querySelectorAll('.clear-button'));
const opButtons = Array.from(document.querySelectorAll('.op-button'));

numButtons.forEach(button => button.addEventListener('click', updateDisplayValue));
opButtons.forEach(button => button.addEventListener('click', runOperation));
clearButtons.forEach(button => button.addEventListener('click', clear));

function updateDisplayValue(e) {
    if (/\./.test(displayValue) && e.currentTarget.value ==='.') {
        return;
    }
    if (e.currentTarget.value === '.') {
        decimalUsed = true;
    }
    displayValue = `${displayValue}${e.currentTarget.value}`;
    display.textContent = displayValue;
}

function clear(e) {
    if (e.currentTarget.value === 'clear') {
        displayValue = '';
        display.textContent = displayValue;
        storage.textContent = storedValue;
    } else if (e.currentTarget.value === 'clear-all') {
        displayValue = '';
        storedValue = '';
        operator = '';
        storage.textContent = storedValue;
        display.textContent = displayValue;
    }
}

function runOperation(e) {
    if (displayValue === 'ERROR') {
        displayValue = storedValue;
        storedValue = '';
        storage.textContent = storedValue;
        display.textContent = displayValue;
        return;
    } else if (e.currentTarget.value === 'equals') {
        storage.textContent = '';
        solve(operator, storedValue, +displayValue);
        storedValue = '';
    } else {
    operator = e.currentTarget.value;
    storedValue = +displayValue;
    displayValue = '';
    storage.textContent = `${storedValue} ${operator}`;
    display.textContent = displayValue;
    }
}

const add = function (a, b) {
    return a + b;
}

const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b
}

const divide = function (a, b) {
    if (b === 0) {
        displayValue = '';
        return 'ERROR';
    } else return a / b;
}

const solve = function (operation, a, b) {
    switch(operation) {
        case '+':
            displayValue = add(a, b);
            break;
        case '-':
            displayValue = subtract(a, b);
            break;
        case 'x':
            displayValue = multiply(a, b);
            break;
        case '/':
            displayValue = divide(a, b);
            break;
        default:
            break;
    }

    if (displayValue.toString().length > 15) {
        if (/e/.test(displayValue.toString())) {
            display.textContent = displayValue.toPrecision(9);
        } else {
        display.textContent = displayValue.toPrecision(14);
        }
        storage.textContent = '(ANS ROUNDED)';
    } else {
        display.textContent = displayValue;
    }

    operator = '';
}