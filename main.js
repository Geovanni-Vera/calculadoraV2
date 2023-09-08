// Variables para mantener el estado de la calculadora
let currentInput = '';
let currentResult = null;
let operator = '';

// Función para actualizar el contenido del display
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = currentInput;
}

// Función para agregar caracteres al input actual
function appendToDisplay(value) {
    if (typeof value === 'string') { // suggestion 1
        if (value !== null && value !== '') { // suggestion 2
            const maxLength = 100; // suggestion 3
            if (currentInput.length < maxLength) {
                currentInput += value;
                if (value !== '') { // suggestion 4
                    updateDisplay();
                }
                return true; // suggestion 5
            }
        }
    } else {
        console.error('Invalid value. Only strings are allowed.');
    }
}

// Función para borrar el contenido del display
function clearDisplay() {
    currentInput = '';
    currentResult = null;
    operator = '';
    updateDisplay();
}

// Función para realizar el cálculo y mostrar el resultado
function calculateResult() {
    if (operator === '') return;

    const num1 = parseFloat(currentResult);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            currentResult = num1 + num2;
            break;
        case '-':
            currentResult = num1 - num2;
            break;
        case '*':
            currentResult = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                currentInput = 'Error';
                updateDisplay();
                return;
            }
            currentResult = num1 / num2;
            break;
        default:
            break;
    }

    currentInput = currentResult.toString();
    operator = '';
    updateDisplay();
}

// Event listeners para los botones de la calculadora
document.addEventListener('DOMContentLoaded', function () {
    updateDisplay();

    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const buttonText = button.textContent;

            if (/\d|\./.test(buttonText)) {
                if (currentInput === 'Error') {
                    currentInput = '';
                }
                if (operator === '=') {
                    currentResult = null;
                    operator = '';
                    currentInput = '';
                }
                appendToDisplay(buttonText);
            } else if (['+', '-', '*', '/'].includes(buttonText)) {
                if (currentInput !== '') {
                    if (currentResult === null) {
                        currentResult = currentInput;
                    } else {
                        calculateResult();
                    }
                    operator = buttonText;
                    currentInput = '';
                    updateDisplay();
                }
            } else if (buttonText === '=') {
                calculateResult();
                operator = '=';
            } else if (buttonText === 'C') {
                clearDisplay();
                operator = '';
            }
        });
        // Evita que los eventos de clic se dupliquen
        button.removeEventListener('click', function () {});
    });
});

