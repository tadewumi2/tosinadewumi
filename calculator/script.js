/********f************

	Do not alter this comment block. 
	Only fill out the information below.
	
	Competency 15
	Name: Tosin Adewumi
	Date: 9th November, 2024
	Description: Writing of a Function to Calculate the total pay

********************/

document.addEventListener("DOMContentLoaded", load);

function load() {
	let calcButton = document.getElementById('calcButton');

	calcButton.addEventListener('click', calc);
	clearFields();

}

function calc() {
	let name = document.getElementById('fullName').value;
	let hours = document.getElementById('hoursWorked').value;
	let rate = document.getElementById('hourlyRate').value;

	if (name == "" || hours == "" || rate == "") {
		clearFields();
		return;
	}

	let pay = calcPay(hours, rate);
	let taxes = getTax(pay);
	let net = pay - taxes;

	printRow(name, pay, taxes, net);
	clearFields();
}

function clearFields() {
	document.getElementById('fullName').value = "";
	document.getElementById('hoursWorked').value = "";
	document.getElementById('hourlyRate').value = "";
	document.getElementById('fullName').focus();

}


/*
	calcPay function
	receives hours and hourly rate values
	returns the calculated pay
*/
function calcPay(hours, rate) {
	
	//convert hours and rate to numbers to avoid string concatenation issues
	hours = parseFloat(hours);
	rate = parseFloat(rate);
	let totalPay =""
	//calculate pay with overtime consideration
	if (hours < 40 || hours == 40){
		totalPay = hours * rate;
	}
	else {
		let regularHours = 40;
	    let overtimeHours = hours - regularHours;
	    totalPay = (regularHours * rate) + (overtimeHours * rate * 1.5);
	}
	return totalPay;
} 

/*
	getTax function
	receives gross pay
	returns relative tax rate
*/
function getTax(funcGross) {
	let funcTax = 0;
	if (funcGross < 250) {
		funcTax = funcGross * .25;
	}
	else {
		if (funcGross < 500) {
			funcTax = funcGross * .3;
		}
		else {
			if (funcGross <= 750) {
				funcTax = funcGross * .4;
			}
			else {
				funcTax = funcGross * .5;
			}
		}
	}
	return funcTax;
}

/* 
	printRow function
	receives name, gross, taxes, and net pay
	formats currency
	prints a row in the table
*/
function printRow(name, gross, taxes, net) {
	//	Set values to 2 decimal places here
	gross = gross.toFixed(2);
    taxes = taxes.toFixed(2);
    net = net.toFixed(2);

	let tbody = document.getElementsByTagName("tbody")[0];
	let tr = document.createElement("tr");
	let td = document.createElement("td");
	let td1 = document.createElement("td");
	let td2 = document.createElement("td");
	let td3 = document.createElement("td");

	td.innerHTML = name;
	td1.innerHTML = `$${gross}`;
	td2.innerHTML = `$${taxes}`;
	td3.innerHTML = `$${net}`;

	tr.appendChild(td);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);

	tbody.appendChild(tr);
}

