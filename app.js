let displayValue = '';
let storedValue;
let operator;

const display = document.querySelector('.currentValue');
const storage = document.querySelector('.storage');
const numButtons = Array.from(document.querySelectorAll('.num-button'));
const clearButtons = Array.from(document.querySelectorAll('.clear-button'));
const opButtons = Array.from(document.querySelectorAll('.op-button'));
const negButton = document.querySelector('.neg-button');

numButtons.forEach(button => button.addEventListener('click', updateDisplayValue));
opButtons.forEach(button => button.addEventListener('click', runOperation));
clearButtons.forEach(button => button.addEventListener('click', clear));
negButton.addEventListener('click', negate);

function updateDisplayValue(e) {
    if (/ERROR/.test(displayValue)) {
        displayValue = storedValue;
        storedValue = '';
        storage.textContent = storedValue;
        display.textContent = displayValue;
    }
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

function negate() {
    if (displayValue === 'ERROR') {
        return;
    } else {
    displayValue = +displayValue * (-1);
    display.textContent = displayValue;
    }

}

function runOperation(e) {
    if (/ERROR/.test(displayValue)) {
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

document.addEventListener('keypress', (e) => {
    const keyName = e.key;

    switch(keyName) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if (/ERROR/.test(displayValue)) {
                displayValue = storedValue;
                storedValue = '';
                storage.textContent = storedValue;
                display.textContent = displayValue;
            }
            displayValue = `${displayValue}${keyName}`;
            display.textContent = displayValue;
            break;
        case '.':
            if (/\./.test(displayValue)) {
                break;
            } else {
                displayValue = `${displayValue}${keyName}`;
                display.textContent = displayValue;
            }
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
            if (/ERROR/.test(displayValue)) {
                displayValue = storedValue;
                storedValue = '';
                storage.textContent = storedValue;
                display.textContent = displayValue;
                break;
            }
            if (keyName === '-' && e.ctrlKey) {
                negate();
                break;
            }
            operator = keyName;
            storedValue = +displayValue;
            displayValue = '';
            storage.textContent = `${storedValue} ${operator}`;
            display.textContent = displayValue;
            break;
        case '=':
            if (displayValue === 'ERROR') {
                displayValue = storedValue;
                storedValue = '';
                storage.textContent = storedValue;
                display.textContent = displayValue;
                break;
            }
            storage.textContent = '';
            solve(operator, storedValue, +displayValue);
            storedValue = '';
            break;           
        default:
            break;

    }
})