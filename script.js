const form = document.querySelector("#form")

const billInput = document.querySelector("#bill")
const tipInput = document.querySelector("#tip")
const numberOfPeopleInput = document.querySelector("#number-of-people")
const resetButton = document.querySelector("#reset")

const inputElements = document.querySelectorAll(".input")
const tipButtons = document.querySelectorAll(".button--select-tip")

const outputTipAmount = document.querySelector("#tip-amount")
const outputTotal = document.querySelector("#total")

const userInputs = new Map([
	["bill", 0],
	["tip", 0],
	["number-of-people", 0],
])

const displayResults = (input, value) => {
	resetButtonWakeUp()

	if (!isError(value) || input.value === "") {
		// Deletes the error message if the input is correct or empty
		userInputs.set(input.id, value)
		showSuccess(input)
		computeResults(userInputs)
	} else {
		//provides the error message
		showError(input, isError(value))
	}
}

const computeResults = map => {
	const billValue = map.get("bill")
	const tipValue = map.get("tip")
	const numberOfPeopleValue = map.get("number-of-people")

	const formatResults = number => `$${number.toFixed(2)}`.slice(0, 7)

	if (numberOfPeopleValue) {
		outputTipAmount.textContent = formatResults((billValue * tipValue) / numberOfPeopleValue)
		outputTotal.textContent = formatResults(billValue / numberOfPeopleValue)
	} else {
		outputTipAmount.textContent = formatResults(0)
		outputTotal.textContent = formatResults(0)
	}
}

// Sets the reset button to active if needed

const resetButtonWakeUp = () => {
	if (!isEmpty()) {
		resetButton.dataset.active = true
	} else {
		resetButton.dataset.active = false
	} // Ugly but it works
}

const isEmpty = () => {
	if (
		userInputs.get("bill") ||
		userInputs.get("tip") ||
		userInputs.get("number-of-people") ||
		billInput.value ||
		tipInput.value ||
		numberOfPeopleInput.value
	) {
		return false
	} else {
		return true
	}
}

const reset = () => {
	resetButton.dataset.active = false
	inputElements.forEach(el => (el.value = ""))

	for (const key of userInputs.keys()) {
		userInputs.set(key, 0)
	}

	const previousSelected = document.querySelector(".button--selected")
	if (!previousSelected) return
	previousSelected.classList.remove("button--selected")
}

const showError = (input, message) => {
	// Get the form-field element
	const formField = input.parentElement
	// add the error class
	input.classList.add("input--error")

	// Show the error message
	const error = formField.querySelector(".form__error")
	error.textContent = message
}

const showSuccess = input => {
	// get the form-field element
	const formField = input.parentElement

	// remove the error class
	input.classList.remove("input--error")

	// hide the error message
	const error = formField.querySelector(".form__error")
	error.textContent = ""
}

const isError = value => {
	let errorMessage = ""

	if (isNaN(value)) {
		errorMessage = "Must be a number"
	}

	if (value === 0 || value === -0) {
		errorMessage = "Can't be zero"
	} else if (Number(value) < 0) {
		errorMessage = "Can't be negative"
	}

	return errorMessage
}

/* Clear all forms when the page is reloaded */

document.addEventListener("DOMContentLoaded", reset)

/* Binding controls to their functions */

resetButton.addEventListener("click", reset)

form.addEventListener("submit", e => e.preventDefault())

billInput.addEventListener("input", e => {
	displayResults(e.target, Number(e.target.value))
})

numberOfPeopleInput.addEventListener("input", e => {
	displayResults(e.target, Number(e.target.value))
})

tipInput.addEventListener("input", e => {
	displayResults(e.target, Number(e.target.value) / 100)
})

tipButtons.forEach(button => {
	button.addEventListener("click", e => {
		// Reset the previous choice
		const previousSelected = document.querySelector(".button--selected")
		if (previousSelected) {
			previousSelected.classList.remove("button--selected")
		}

		e.target.classList.add("button--selected")
		userInputs.set("tip", Number(e.target.value))
		computeResults(userInputs)

		resetButtonWakeUp()
	})
})
