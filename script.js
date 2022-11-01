const form = document.querySelector(".inputs")

/* Controls */

const billInput = document.querySelector(".input--bill")
const customTipInput = document.querySelector(".input--custom-tip")
const numberOfPeopleInput = document.querySelector(".input--number-of-people")

const selectTipRadioButtons = document.querySelectorAll(".select-tip__radio")
const selectTipLabels = document.querySelectorAll(".button--select-tip")

const resetButton = document.querySelector(".button--reset")

/* Error message boxes */

const billError = document.querySelector("#billError")
const tipError = document.querySelector("#tipError")
const numberOfPeopleError = document.querySelector("#numberOfPeopleError")

/* User data */

let bill = 0
let tip = 0
let numberOfPeople = 0

/* Output fields */

const outputTipAmount = document.querySelector("#result-tip-amount")
const outputTotal = document.querySelector("#result-total")

/* User input validation */

// Validation function

const checkForError = value => {
	// Returns an error message or false if no error has been found

	let errorMessage = ""
	if (value === "") {
		return false
	}
	const valueToFloat = parseFloat(value)

	if (isNaN(valueToFloat)) {
		errorMessage = "Please enter a number"
	} else if (valueToFloat === 0) {
		errorMessage = "Can't be zero"
	} else if (valueToFloat < 0) {
		errorMessage = "Can't be negative"
	} else {
		return false
	}

	return errorMessage
}

// Display the result of input validation

const showSuccess = (input, errorMessageBox) => {
	input.classList.remove("input--error")

	const formField = input.parentElement
	// Target the corresponding error p
	errorMessageBox.textContent = ""
}

const showError = (input, message, errorMessageBox) => {
	input.classList.add("input--error")

	const formField = input.parentElement
	errorMessageBox.textContent = message
}

// Event listener for an input field

const processUserInput = (input, errorMessageBox) => {
	const userInput = input.value
	const error = checkForError(userInput)

	if (error) {
		showError(input, error, errorMessageBox)
		return 0
	} else {
		showSuccess(input, errorMessageBox)
		// return 0 when nothing is entered
		return userInput === "" ? 0 : parseFloat(userInput)
	}
}

/* Actual calculation */

const calculateTip = (bill, tip, numberOfPeople) => {
	let tipPerPerson = 0
	let totalPerPerson = 0

	// Prevent nonsense when number of people is not entered

	if (numberOfPeople !== 0) {
		tipTotal = (bill * tip) / 100
		total = bill + tipTotal

		tipPerPerson = tipTotal / numberOfPeople
		totalPerPerson = total / numberOfPeople
	}

	return [tipPerPerson.toFixed(2), totalPerPerson.toFixed(2)]
}

/* Adding event listeners to controls */

billInput.addEventListener("input", e => (bill = processUserInput(e.target, billError)))
customTipInput.addEventListener("input", e => (tip = processUserInput(e.target, tipError)))
numberOfPeopleInput.addEventListener("input", e => (numberOfPeople = processUserInput(e.target, numberOfPeopleError)))

selectTipButtons.forEach(button => {
	button.addEventListener("click", e => {
		tip = parseFloat(e.target.value)
	})
})

/* Display the result of calculations */

form.addEventListener("input", () => {
	outputTipAmount.textContent = `$${calculateTip(bill, tip, numberOfPeople)[0]}`
	outputTotal.textContent = `$${calculateTip(bill, tip, numberOfPeople)[1]}`

	// Toggle reset button
	if (!billInput.value && !customTipInput.value && !numberOfPeopleInput.value && !tip) {
		resetButton.classList.add("button--inactive")
	} else {
		resetButton.classList.remove("button--inactive")
	}
})

/* Reset */
