var __r_elem;
var all_loaded;

async function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/* Loop through a collection of all HTML elements: */
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
	  elmnt = z[i];
	  /*search for elements with a certain atrribute:*/
	  file = elmnt.getAttribute("include-html");
	  if (file) {
		 /* Make an HTTP request using the attribute value as the file name: */
		 xhttp = new XMLHttpRequest();
		 xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
			  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
			  if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
			  /* Remove the attribute, and call this function once more: */
			  elmnt.removeAttribute("include-html");
			  includeHTML();
			}
		 } 
		 xhttp.open("GET", file, true);
		 xhttp.send();
		 /* Exit the function: */
		 return;
	  }
	}
 }


function getUserCode () {
	 return document.getElementById("yourcode").value;
}

function clearMessages () {
	if (!__r_elem) {
		__r_elem = document.getElementById("results"); }
	
	__r_elem.innerHTML="";
}

function goodIf (t, m) {
	if (!__r_elem) {
		__r_elem = document.getElementById("results"); }

	if (t === false) return;

	let div = document.createElement('div');
	div.className = "good";
	div.innerHTML = m;
	__r_elem .appendChild (div);
}

function badIf (t, m) {
	if (!__r_elem) {
		__r_elem = document.getElementById("results"); }

	if (t === false) return;
	let div = document.createElement('div');
	div.className = "bad";
	div.innerHTML = m;
	__r_elem .appendChild (div);
}

function test (code, assertion) {
	;
	let r;
	if (assertion) r = eval (code + ";\n" + assertion);
	else r = eval (code);
	console.log(r);
	return r;
}

function setCode (str) {
	document.getElementById("yourcode").value = str;
}

function waitForAllIncluded(thendo){
	if(document.getElementById("yourcode") !== null){
		 thendo();
	}
	else{
		 setTimeout(function() { waitForAllIncluded (thendo) }, 250);
	}
}