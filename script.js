const form = document.querySelector(".inputs")

/* Controls */

const billInput = document.querySelector(".input--bill")
const customTipInput = document.querySelector(".input--custom-tip")
const numberOfPeopleInput = document.querySelector(".input--number-of-people")

const selectTipButtons = document.querySelector(".button--select-tip")

const resetButton = document.querySelector(".button--reset")

/* Output fields */

const outputTipAmount = document.querySelector("#result-tip-amount")
const outputTotal = document.querySelector("#result-total")

/* User input validation */

// Validation function

const checkForError = value => {
	// Returns an error message or false if no error has been found

	let errorMessage = ""

	if (value.isNaN()) {
		errorMessage = "Please enter a number"
	} else if (value === 0) {
		errorMessage = "Can't be zero"
	} else if (value < 0) {
		errorMessage = "Can't be negative"
	} else {
		return false
	}

	return errorMessage
}
