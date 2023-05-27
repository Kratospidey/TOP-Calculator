function numberAdd(a, b) {
	return a + b;
}

function numberSubtract(a, b) {
	return a - b;
}

function numberMultiply(a, b) {
	return a * b;
}

function numberDivide(a, b) {
	return a / b;
}

let firstOperand = null;
let secondOperand = null;
let stringExpression = "";
let operator = null;
let periodPressed = false;

function operate(a, b, operator) {
	if (operator == "+") {
		a = +a;
		b = +b;
		return numberAdd(a, b);
	} else if (operator == "-") {
		a = +a;
		b = +b;
		return numberSubtract(a, b);
	} else if (operator == "*") {
		a = +a;
		b = +b;
		return numberMultiply(a, b);
	} else if (operator == "/") {
		a = +a;
		b = +b;
		return numberDivide(a, b);
	}
}

// Step 1: Get references to display elements
const lastOperationDisplay = document.getElementById("cal-lastoperation");
const currentOperationDisplay = document.getElementById("cal-currentoperation");

// Get reference to the parent element of digit buttons
const digitButtonsParent = document.getElementById("cal-columns");

// Attach a single event listener to the parent element
digitButtonsParent.addEventListener("click", (event) => {
	const clickedElement = event.target.closest(".digits");

	// Check if the clicked element is a digit button
	if (clickedElement) {
		// Logic for handling the digit button click
		const digit = clickedElement.textContent;
		if (currentOperationDisplay.innerText == "0") {
			currentOperationDisplay.innerText = digit;
		} else {
			currentOperationDisplay.innerText += digit;
		}
		stringExpression += digit;
		console.log("clicked");
		// ...
	}
});

// Step 3: Implement operation logic
// Example for operator button addition
const buttonAddition = document.getElementById("cal-addition");
buttonAddition.addEventListener("click", () => {
	currentOperationDisplay.innerText = "0";
	decideOperand(stringExpression);
	stringExpression = "";
	evaluate(firstOperand, secondOperand, "+");
	periodPressed = false;
});

const buttonSubtract = document.getElementById("cal-subtract");
buttonSubtract.addEventListener("click", () => {
	currentOperationDisplay.innerText = "0";
	decideOperand(stringExpression);
	stringExpression = "";
	evaluate(firstOperand, secondOperand, "-");
	periodPressed = false;
});
const buttonMultiply = document.getElementById("cal-multiply");
buttonMultiply.addEventListener("click", () => {
	currentOperationDisplay.innerText = "0";
	decideOperand(stringExpression);
	stringExpression = "";
	evaluate(firstOperand, secondOperand, "*");
	periodPressed = false;
});
const buttonDivide = document.getElementById("cal-divide");
buttonDivide.addEventListener("click", () => {
	currentOperationDisplay.innerText = "0";
	decideOperand(stringExpression);
	stringExpression = "";
	evaluate(firstOperand, secondOperand, "/");
	periodPressed = false;
});

const buttonPeriod = document.getElementById("cal-period");
buttonPeriod.addEventListener("click", () => {
	if (!periodPressed) {
		if (stringExpression == "") {
			stringExpression += "0.";
		} else {
			stringExpression += ".";
		}
		currentOperationDisplay.innerText = stringExpression;
		periodPressed = true;
	}
});

// Step 4: Implement clear and delete logic
// Example for clear button
const buttonClear = document.getElementById("cal-clear");
buttonClear.addEventListener("click", clear);

function clear() {
	firstOperand = null;
	secondOperand = null;
	stringExpression = "";
	currentOperationDisplay.innerText = "0";
	lastOperationDisplay.innerText = "";
	operator = null;
	periodPressed = false;
}

// Example for delete button
const buttonDelete = document.getElementById("cal-delete");
buttonDelete.addEventListener("click", () => {
	// Logic for deleting the last character
	currentOperationDisplay.innerText = currentOperationDisplay.innerText.slice(
		0,
		-1
	);
});

const buttonEqual = document.getElementById("cal-equal");
buttonEqual.addEventListener("click", () => {
	decideOperand(stringExpression);
	let fo = firstOperand;
	let so = secondOperand;
	let op = operator;

	if (!isNaN(fo) && !isNaN(so) && op !== null) {
		let result = operate(fo, so, op);
		secondOperand = null;
		stringExpression = "";
		lastOperationDisplay.innerText = `${fo} ${op} ${so} =`;
		currentOperationDisplay.innerText = result;
	} else {
		lastOperationDisplay.innerText = "";
		currentOperationDisplay.innerText = "Error";
	}
});

function decideOperand(val) {
	console.log(val);
	if (firstOperand === null) {
		firstOperand = val;
	} else {
		secondOperand = val;
	}
}

function evaluate(fo, so, op) {
	if (so == null) {
		lastOperationDisplay.innerText = `${fo} ${op}`;
	} else {
		if (operator !== null) {
			firstOperand = operate(firstOperand, so, operator);
			lastOperationDisplay.innerText = `${firstOperand} ${op}`;
		} else {
			firstOperand = operate(fo, so, op);
			lastOperationDisplay.innerText = firstOperand;
		}
	}
	operator = op;
}
