/********f************
    
	Project 3 Javascript
	Name: Tosin Adewumi
	Date: 18th November, 2024
	Description: Form Validation

*********************/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear order?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("qty1").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	let errorFlag = false;

	let requiredFields = ["fullname","address","city","postal","email"];
	for(let i=0; i < requiredFields.length; i++){
		let textField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(textField)){
			document.getElementById(requiredFields[i] + "_error").style.display = "block";

			if(!errorFlag){
				textField.focus();
				textField.select();
			}
		// Raise the error flag
			errorFlag = true;
		}
	}

	let regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] [0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$/);
	let postalCodeValue = document.getElementById("postal").value;

	if(!regex.test(postalCodeValue)){
		document.getElementById("postalformat_error").style.display = "block";

		if(!errorFlag){
			document.getElementById("postal").focus();
			document.getElementById("postal").select();
		}
		// Raise the error flag
		errorFlag = true;
	}
	
	let regex2 = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
	let emailValue = document.getElementById("email").value;

	if(!regex2.test(emailValue)){
		document.getElementById("emailformat_error").style.display = "block";

		if(!errorFlag){
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		// Raise the error flag
		errorFlag = true;
	}
	return errorFlag;
}

function formFieldHasInput(fieldElement){
	//check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == ""){
		//Invalid entry
		return false;
	}
	//Valid entry
	return true;
}

/*
 * Adds an item to the cart and hides the quantity and add button for the product being ordered.
 *
 * param itemNumber The number used in the id of the quantity, item and remove button elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load() {
	hideErrors();
	// Add event listener for the form submit
	document.getElementById("orderform").addEventListener("submit", validate);
	
	//Create event listeners for the reset event
	document.getElementById("orderform").addEventListener("reset", resetForm);
}
// Add document load event listener
document.addEventListener("DOMContentLoaded", load);








