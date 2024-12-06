/*******w************
 * 
 * Utility Functions: Mostly string functions to use in other applications.
 *
 * Script: utilityFunctions.js
 * Authors: Alan Simpson
 *          Damien Altenburg
 * Version: 1.0
 * Date Created: 11.4.2012
 * Last Updated: 11.4.2012
 *
 ********************/

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Formats a number value as currency.
 *
 * param num The number value to be formatted.
 * return    The formatted number value.
 */
function formatCurrency(num) {
	num = num.toString().replace(/\$|\,/g, '');
	if (isNaN(num)) 
	{
		num = "0";
	}
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	cents = num % 100;	
	num = Math.floor(num / 100).toString();
	if (cents < 10) 
	{
		cents = "0" + cents;
	}
	for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
	{
		num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
	}
	return (((sign) ? '' : '-') + '$' + num + '.' + cents);
}