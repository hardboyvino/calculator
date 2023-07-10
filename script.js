let currentInput = "";
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let olderOperator = null;
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
            console.log(`curentInput in updateDisplay ${currentInput}`);
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
            
            console.log(`firstNumber before if statement ${firstNumber}`);
            console.log(`operator before if statement ${operator}`);
            console.log(`currentInput before if statement ${currentInput}`);
            console.log(`currentOperator before if statement ${currentOperator}`);
            console.log(`olderOperator before if statement ${olderOperator}`);

            if (firstNumber == null) {
                firstNumber = Number(currentInput);
                // olderOperator = currentOperator;
                currentOperator = operator;
                currentInput = "";
                console.log(`firstNumber in if statement ${firstNumber}`);
                console.log(`currentOperator in if statement ${currentOperator}`);
                console.log(currentInput);
                displayDiv.innerText = firstNumber;
            } else if (!newCalculation) {
                console.log(`firstNumber in else else statement ${firstNumber}`);
                secondNumber = Number(currentInput);
                console.log(`secondNumber in else else statement ${secondNumber}`);
                result = operation(currentOperator, firstNumber, secondNumber);
                secondNumber = null;
                // olderOperator = currentOperator;
                currentOperator = operator;
                currentInput = "";
                firstNumber = result
                displayDiv.innerText = result;
                console.log(`firstNumber in else else statement ${firstNumber}`);
                console.log(`secondNumber in else else statement ${secondNumber}`);
                console.log(`operator in else else statement ${currentOperator}`);
                console.log(`result in else else statement ${result}`);
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
        console.log(`operator in equal statement ${currentOperator}`);

        if (result === "Error") {
            console.log(result);
            firstNumber = null;
            currentInput = "";
            // currentOperator = null;
            document.querySelector(".calculator-display").textContent = "Error";
        } else {
            document.querySelector(".calculator-display").textContent = result;
            firstNumber = result;
            currentInput = "";
        }
        secondNumber = null;
        newCalculation = true;
        // currentOperator = null;
    } 
    console.log(`firstNumber in equal statement ${firstNumber}`);
    console.log(`secondNumber in equal statement ${secondNumber}`);
    console.log(`operator in equal statement ${currentOperator}`);
    console.log(`olderOperator in equal statement ${olderOperator}`);
    console.log(`result in equal statement ${result}`);
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
        console.log(`firstNumber in clear button ${firstNumber}`);
        console.log(`secondNumber in clear button ${secondNumber}`);
        console.log(`operator in clear button ${currentOperator}`);
        console.log(`operator in clear button ${currentInput}`);
        console.log(`result in clear button ${result}`);
    })
}

updateDisplay();
selectOperation();
getClearButton();
document.querySelector(".equal").addEventListener("click", calculateFinalResult);