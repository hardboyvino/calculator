let currentInput = "";
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let result = null;
let newCalculation = false;

function updateDisplay() {
    // Select all the number buttons
    let numberButtons = document.querySelectorAll(".grey-buttons");

    // Select the display div
    let displayDiv = document.querySelector(".calculator-display");

    // For each button, add a click listener
    numberButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            // Get the value of the button that was clicked
            let number = event.target.innerText;

            // Ensure the input is not more than specified amount
            // Decimal is not the first thing or is not duplicated
            if (currentInput.length > 9 || (number === "." && (currentInput === "" || currentInput.includes(".")))) {
                return;
            }

            // Add the number to the currentInput
            currentInput += number;

            // Display currentInput on screen
            displayDiv.innerText = currentInput;
        });
    });
}


function selectOperation() {
    // Select all operators
    let operators = document.querySelectorAll(".normal-size-buttons.orange-buttons");

    // Select the display div
    let displayDiv = document.querySelector(".calculator-display");
    
    // For each operator, add a click listener
    operators.forEach(function(button) {
        button.addEventListener("click", function(event) {
            // Get the value of the operator clicked
            let operator = event.target.innerText;
  
            if (firstNumber == null) {
                firstNumber = Number(currentInput);
                currentOperator = operator;
                currentInput = "";
                displayDiv.innerText = firstNumber;
            } else if (!newCalculation) {
                secondNumber = Number(currentInput);
                result = operation(currentOperator, firstNumber, secondNumber);
                secondNumber = null;
                currentOperator = operator;
                currentInput = "";
                firstNumber = result
                displayDiv.innerText = result;
            } else {
                currentOperator = operator;
                newCalculation = false;
            }
        });

    });
}


function calculateFinalResult() {
    if (firstNumber != null && currentInput != "") {
        secondNumber = Number(currentInput);
        let result = operation(currentOperator, firstNumber, secondNumber);

        if (result === "Error") {
            firstNumber = null;
            currentInput = "";
            document.querySelector(".calculator-display").textContent = "Error";
        } else {
            document.querySelector(".calculator-display").textContent = result;
            firstNumber = result;
            currentInput = "";
        }
        secondNumber = null;
        newCalculation = true;
    } 
}

function roundResult(result) {
    if (Number.isInteger(result)) {
        return result;
    } else {
        return +result.toFixed(5);
    }
}


function operation(operator, firstNumber, secondNumber) {
    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case 'x':
            result = firstNumber * secondNumber;
            break;
        case '÷':
            if (secondNumber != 0) {
                result = firstNumber / secondNumber;
            } else {
                secondNumber = null;
                return "Error";
            }
            break;
        default:
            return "Invalid operator";
    }
    return roundResult(result);
}


function getClearButton () {
    let clearButton = document.querySelector(".clear-button");

    // Select the display div
    let displayDiv = document.querySelector(".calculator-display");

    clearButton.addEventListener("click", () => {
        currentInput = "";
        firstNumber = null;
        secondNumber = null;
        currentOperator = null;
        result = null;
        displayDiv.innerText = currentInput;
    })
}

updateDisplay();
selectOperation();
getClearButton();
document.querySelector(".equal").addEventListener("click", calculateFinalResult);