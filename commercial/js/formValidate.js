/********f************
    
	Project 3 Javascript
	Name: Tosin Adewumi
	Date: 18th November, 2024
	Description: Form Validation

*********************/

const itemDescription = ["MacBook", "The Razer", "WD My Passport", "Nexus 7", "DD-45 Drums"];
const itemPrice = [1899.99, 79.99, 179.99, 249.99, 119.99];
const itemImage = ["mac.png", "mouse.png", "wdehd.png", "nexus.png", "drums.png"];
let numberOfItemsInCart = 0;
let orderTotal = 0;

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
	// Determine if any items are in the cart
	// When the cart has not items, submission of form is halted
	if (numberOfItemsInCart == 0) {
		// Display an error message contained in a modal dialog element

		const modal = document.querySelector("#cartError");
		modal.showModal();

		const closeModal = document.querySelector(".close-button");

		closeModal.addEventListener("click", () => {
			modal.close();
			document.getElementById("qty1").focus();
		});

		// Form has errors
		return true;
	}

	//	Complete the validations below

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

	//Validating that card type is checked
	let card = ["visa","amex","mastercard"];

	let cardChecked = false;

	for(let i=0; i < card.length && !cardChecked; i++){
		if(document.getElementById(card[i]).checked){
			cardChecked = true;
		}
	}
	if(!cardChecked){
		document.getElementById("cardtype_error").style.display = "block";

		//Raise the error flag
		errorFlag = true;
	}

	//Validating name on card
	let nameOnCard = document.getElementById("cardname");
    if (!nameOnCard.value.trim()) {
        document.getElementById("cardname_error").style.display = "block";
        if (!errorFlag) {
            cardname.focus();
            cardname.select();
        }
        errorFlag = true;
    }

     //populate year dropdown dynamically
    const currentYear = new Date().getFullYear();
	const yearDropdown = document.getElementById("year");

	for (let i = 0; i <= 10; i++) {
	    const yearOption = document.createElement("option");
	    yearOption.value = currentYear + i;
	    yearOption.textContent = currentYear + i;
	    yearDropdown.appendChild(yearOption);
	}

	//validate month and year
	const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;

    // Check if month is selected
    if (month === "- Month -") {
        document.getElementById("month_error").style.display = "block";
        if (!errorFlag) {
            document.getElementById("month").focus();
        }
        errorFlag = true;
    } 

    // Check if year is selected
    if (!year) {
        document.getElementById("month_error").style.display = "block";
        if (!errorFlag) {
            document.getElementById("year").focus();
        }
        errorFlag = true;
    } 

    // Validate expiry date
    if (month !== "- Month -" && year) {
        const currentDate = new Date();
        const expiryDate = new Date(year, month - 1); // Month is 0-indexed in JS

        if (expiryDate < currentDate) {
            document.getElementById("expiry_error").style.display = "block";
            if (!errorFlag) {
                document.getElementById("month").focus();
            }
            errorFlag = true;
        } 
    }

    // Validate Credit Card Number
const creditCardNumber = document.getElementById("cardnumber").value.trim();

// Check if the field is empty
if (creditCardNumber === "") {
    document.getElementById("cardnumber_error").style.display = "block";
    if (!errorFlag) {
        document.getElementById("cardnumber").focus();
        document.getElementById("cardnumber").select();
    }
    errorFlag = true;
} else if (!/^\d{10}$/.test(creditCardNumber)) {
    // Check if the input is not exactly 10 digits
    document.getElementById("invalidcard_error").style.display = "block";
    if (!errorFlag) {
        document.getElementById("cardnumber").focus();
        document.getElementById("cardnumber").select();
    }
    errorFlag = true;
} else {
    // Perform modulus check if the input is valid
    const checkingFactors = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    let sum = 0;

    for (let i = 0; i < 9; i++) {
        sum += checkingFactors[i] * parseInt(creditCardNumber[i], 10);
    }

    const remainder = sum % 11;
    const checkDigit = (11 - remainder) % 10; // Ensure the check digit is within 0-9

    if (checkDigit !== parseInt(creditCardNumber[9], 10)) {
        document.getElementById("invalidcard_error").style.display = "block";
        if (!errorFlag) {
            document.getElementById("cardnumber").focus();
            document.getElementById("cardnumber").select();
        }
        errorFlag = true;
    }
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
function addItemToCart(itemNumber) {
	// Get the value of the quantity field for the add button that was clicked 
	let quantityValue = trim(document.getElementById("qty" + itemNumber).value);

	// Determine if the quantity value is valid
	if (!isNaN(quantityValue) && quantityValue != "" && quantityValue != null && quantityValue != 0 && !document.getElementById("cartItem" + itemNumber)) {
		// Hide the parent of the quantity field being evaluated
		document.getElementById("qty" + itemNumber).parentNode.style.visibility = "hidden";

		// Determine if there are no items in the car
		if (numberOfItemsInCart == 0) {
			// Hide the no items in cart list item 
			document.getElementById("noItems").style.display = "none";
		}

		// Create the image for the cart item
		let cartItemImage = document.createElement("img");
		cartItemImage.src = "images/" + itemImage[itemNumber - 1];
		cartItemImage.alt = itemDescription[itemNumber - 1];

		// Create the span element containing the item description
		let cartItemDescription = document.createElement("span");
		cartItemDescription.innerHTML = itemDescription[itemNumber - 1];

		// Create the span element containing the quanitity to order
		let cartItemQuanity = document.createElement("span");
		cartItemQuanity.innerHTML = quantityValue;

		// Calculate the subtotal of the item ordered
		let itemTotal = quantityValue * itemPrice[itemNumber - 1];

		// Create the span element containing the subtotal of the item ordered
		let cartItemTotal = document.createElement("span");
		cartItemTotal.innerHTML = formatCurrency(itemTotal);

		// Create the remove button for the cart item
		let cartItemRemoveButton = document.createElement("button");
		cartItemRemoveButton.setAttribute("id", "removeItem" + itemNumber);
		cartItemRemoveButton.setAttribute("type", "button");
		cartItemRemoveButton.innerHTML = "Remove";
		cartItemRemoveButton.addEventListener("click",
			// Annonymous function for the click event of a cart item remove button
			function () {
				// Removes the buttons grandparent (li) from the cart list
				this.parentNode.parentNode.removeChild(this.parentNode);

				// Deteremine the quantity field id for the item being removed from the cart by
				// getting the number at the end of the remove button's id
				let itemQuantityFieldId = "qty" + this.id.charAt(this.id.length - 1);

				// Get a reference to quanitity field of the item being removed form the cart
				let itemQuantityField = document.getElementById(itemQuantityFieldId);

				// Set the visibility of the quantity field's parent (div) to visible
				itemQuantityField.parentNode.style.visibility = "visible";

				// Initialize the quantity field value
				itemQuantityField.value = "";

				// Decrement the number of items in the cart
				numberOfItemsInCart--;

				// Decrement the order total
				orderTotal -= itemTotal;

				// Update the total purchase in the cart
				document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);

				// Determine if there are no items in the car
				if (numberOfItemsInCart == 0) {
					// Show the no items in cart list item 
					document.getElementById("noItems").style.display = "block";
				}
			},
			false
		);

		// Create a div used to clear the floats
		let cartClearDiv = document.createElement("div");
		cartClearDiv.setAttribute("class", "clear");

		// Create the paragraph which contains the cart item summary elements
		let cartItemParagraph = document.createElement("p");
		cartItemParagraph.appendChild(cartItemImage);
		cartItemParagraph.appendChild(cartItemDescription);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Quantity: "));
		cartItemParagraph.appendChild(cartItemQuanity);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Total: "));
		cartItemParagraph.appendChild(cartItemTotal);

		// Create the cart list item and add the elements within it
		let cartItem = document.createElement("li");
		cartItem.setAttribute("id", "cartItem" + itemNumber);
		cartItem.appendChild(cartItemParagraph);
		cartItem.appendChild(cartItemRemoveButton);
		cartItem.appendChild(cartClearDiv);

		// Add the cart list item to the top of the list
		let cart = document.getElementById("cart");
		cart.insertBefore(cartItem, cart.childNodes[0]);

		// Increment the number of items in the cart
		numberOfItemsInCart++;

		// Increment the total purchase amount
		orderTotal += itemTotal;

		// Update the total puchase amount in the cart
		document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);
	}
}

/*
 * Hides all of the error elements.
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
	//	Populate the year select with up to date values
	let year = document.getElementById("year");
	let currentDate = new Date();
	for (let i = 0; i < 7; i++) {
		let newYearOption = document.createElement("option");
		newYearOption.value = currentDate.getFullYear() + i;
		newYearOption.innerHTML = currentDate.getFullYear() + i;
		year.appendChild(newYearOption);
	}
	hideErrors();
	// Add event listener for the form submit
	document.getElementById("orderform").addEventListener("submit", validate);
	
	//Create event listeners for the reset event
	document.getElementById("orderform").addEventListener("reset", resetForm);

	//Event listeners to call addItemToCart()
	document.getElementById("addMac").addEventListener("click", 
		function(){
			addItemToCart("1");
		});

	document.getElementById("addMouse").addEventListener("click", 
		function(){
			addItemToCart("2");
		});

	document.getElementById("addWD").addEventListener("click", 
		function(){
			addItemToCart("3");
		});

	document.getElementById("addNexus").addEventListener("click", 
		function(){
			addItemToCart("4");
		});

	document.getElementById("addDrums").addEventListener("click", 
		function(){
			addItemToCart("5");
		});
}



// Add document load event listener
document.addEventListener("DOMContentLoaded", load);









