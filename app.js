let displayValue = '';
let storedValue;
let operator;
const display = document.querySelector('.display');
const numButtons = Array.from(document.querySelectorAll('.num-button'));
const clearButtons = Array.from(document.querySelectorAll('.clear-button'));
const opButtons = Array.from(document.querySelectorAll('.op-button'));

numButtons.forEach(button => button.addEventListener('click', updateDisplayValue));
opButtons.forEach(button => button.addEventListener('click', runOperation));
clearButtons.forEach(button => button.addEventListener('click', clear));

function updateDisplayValue(e) {
    displayValue = `${displayValue}${e.currentTarget.value}`;
    display.textContent = displayValue;
}

function clear(e) {
    if (e.currentTarget.value === 'clear') {
        displayValue = '';
        display.textContent = displayValue;
    } else if (e.currentTarget.value === 'clear-all') {
        displayValue = '';
        storedValue = '';
        operator = '';
        display.textContent = displayValue;
    }
}

function runOperation(e) {
    if (displayValue === 'ERROR') {
        displayValue = storedValue;
        sotredValue = '';
        display.textContent = displayValue;
        return;
    } else if (e.currentTarget.value === 'equals') {
        solve(operator, storedValue, +displayValue);
    } else {
    operator = e.currentTarget.value;
    storedValue = +displayValue;
    displayValue = '';
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
        case 'add':
            displayValue = add(a, b);
            operator = '';
            display.textContent = displayValue;
            break;
        case 'subtract':
            displayValue = subtract(a, b);
            operator = '';
            display.textContent = displayValue;
            break;
        case 'multiply':
            displayValue = multiply(a, b);
            operator = '';
            display.textContent = displayValue;
            break;
        case 'divide':
            displayValue = divide(a, b);
            operator = '';
            display.textContent = displayValue;
            break;
        default:
            break;
    }
}