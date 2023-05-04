//variable definitions
let submitButton = document.getElementById("submitButton");
let fname = document.getElementById("fname");
let mname = document.getElementById("mname");
let lname = document.getElementById("lname");
let SSN = document.getElementById("SSN");
let address1 = document.getElementById("address1");
let address2 = document.getElementById("address2");
let city = document.getElementById("city");
let state = document.getElementById("state");
let zip = document.getElementById("zip");
let DOB = document.getElementById("DOB");
let hireDate = document.getElementById("hireDate");
let currPosition = document.getElementById("currPosition");
let department = document.getElementById("department");
let homePhone = document.getElementById("homePhone");
let workPhone = document.getElementById("workPhone");
let mobilePhone = document.getElementById("mobilePhone");
let forum = document.getElementById("registration");
let employees = JSON.parse(localStorage.getItem("EmployeeList")) || [];


document.getElementById("submitButton").addEventListener("click", validate);
window.addEventListener("load", addData(employees));


/******************************************************************************************
Issue with validation function is that if an earlier if statement was hit even after 
it is fixed the error message will continue to show that one if there is an error somewhere else
For example, the user misinputs SSN and Zip code. The function first hits the SSN validation and gives
the proper response. However, once this is resolved the program will still return the SSN
messages even though the issue is now the Zip code leaving the user not knowing what the issue is.
My current fix I don't think is the best. The fix is at every else if statement I set the validity statement
of the fields before to blank so the only validity message is the one it hits.
******************************************************************************************/
function validate(ev) {
	ev.preventDefault();
	
	//SSN Validation
	if (SSN.validity.valueMissing){
		SSN.setCustomValidity("Please enter your social security number");
		forum.reportValidity();
	} else if (SSN.validity.patternMismatch){
		SSN.setCustomValidity("Please enter a valid social security number");
		forum.reportValidity();
		
	//Zip validation
	} else if(zip.validity.valueMissing){
		SSN.setCustomValidity("");
		zip.setCustomValidity("Please enter your zip code");
		forum.reportValidity();
	} else if (zip.validity.patternMismatch){
		SSN.setCustomValidity("");
		zip.setCustomValidity("Please enter a valid zip code");
		forum.reportValidity();
		
	//DOB validation
	} else if(DOB.validity.valueMissing){
		SSN.setCustomValidity("");
		zip.setCustomValidity("");
		DOB.setCustomValidity("Please enter a valid date");
		forum.reportValidity();
		
	//Phone numbers validation
	} else if (homePhone.validity.patternMismatch){
		SSN.setCustomValidity("");
		zip.setCustomValidity("");
		DOB.setCustomValidity("");
		homePhone.setCustomValidity("Please enter a valid phone number");
		forum.reportValidity();
	} else if (workPhone.validity.patternMismatch){
		SSN.setCustomValidity("");
		zip.setCustomValidity("");
		DOB.setCustomValidity("");
		homePhone.setCustomValidity("");
		workPhone.setCustomValidity("Please enter a valid phone number");
		forum.reportValidity();
	} else if (workPhone.validity.valueMissing){
		SSN.setCustomValidity("");
		zip.setCustomValidity("");
		DOB.setCustomValidity("");
		homePhone.setCustomValidity("");
		workPhone.setCustomValidity("Please enter your work phone number");
		forum.reportValidity();
	} else if (mobilePhone.validity.patternMismatch){
		SSN.setCustomValidity("");
		zip.setCustomValidity("");
		DOB.setCustomValidity("");
		homePhone.setCustomValidity("");
		workPhone.setCustomValidity("");
		mobilePhone.setCustomValidity("Please enter a valid phone number");
		forum.reportValidity();
		
	//checks that all required fields have input
	} else if (fname.validity.valueMissing || lname.validity.valueMissing || address1.validity.valueMissing || city.validity.valueMissing || state.validity.valueMissing || hireDate.validity.valueMissing || currPosition.validity.valueMissing || department.validity.valueMissing || email.validity.valueMissing){
		window.alert("Make sure all required fields have been inputed and try again.");
		
	} else {
		SSN.setCustomValidity("");
		zip.setCustomValidity("");
		DOB.setCustomValidity("");
		homePhone.setCustomValidity("");
		workPhone.setCustomValidity("");
		mobilePhone.setCustomValidity("");
		addEmployee();
	}
}

const addEmployee = () => {
	let employee = {
		fname: fname.value,
		mname: mname.value,
		lname: lname.value,
		SSN: SSN.value,
		address1: address1.value,
		address2: address2.value,
		city: city.value,
		state: state.value,
		zip: zip.value,
		DOB: DOB.value,
		hireDate: hireDate.value,
		currPosition: currPosition.value,
		department: department.value,
		homePhone: homePhone.value,
		workPhone: workPhone.value,
		mobilePhone: mobilePhone.value,
		email: email.value,
	}
	employees.push(employee);
	document.querySelector('form').reset();

	console.warn("added", {employees} );
	localStorage.setItem("EmployeeList", JSON.stringify(employees));
	addData(employees);
}

function addData(employees){
	let html = "";
	html += "<thead>";
	html += "<th>" + "Name" + "</th>";
	html += "<th>" + "Position" + "</th>";
	html += "<th>" + "Phone" + "</th>";
	html += "<th>" + "Email" + "</th>";
	html += "</thead>";
	html += "<tbody>";
	for (let i = 0; i < employees.length; i++){
		html += "<tr id = " + i + ">";
		html += "<td>" + employees[i].fname + " " + employees[i].lname + "</td>";
		html += "<td>" + employees[i].currPosition + "</td>";
		html += "<td>" + employees[i].workPhone + "</td>";
		html += "<td>" + employees[i].email + "</td>";
		html += "</tr>";
	}
	html += "</tbody>";
	document.getElementById("data").innerHTML = html;
	
	//document.querySelectorAll("tr:not(:first-child)")
	document.querySelectorAll("tr")
	.forEach(e => e.addEventListener("click", displayOverlay))
}

function displayOverlay(e){
	let selectedEmployee = employees[e.target.parentElement.id];
	console.log(selectedEmployee);
	
	let overlay = document.createElement("div");
	overlay.id = "overlay";
	
	let container = document.createElement("article");
	container.id = "container";
	overlay.appendChild(container);
	
	let title = document.createElement("h1");
	title.id = "title";
	title.textContent = selectedEmployee.fname + " " + selectedEmployee.lname + "'s Information";
	container.appendChild(title);
	
	let detailedTable = document.createElement("table");
	detailedTable.id = "detailedTable";
	container.appendChild(detailedTable);
	
	let html = "";
	html += "<tbody>";
	for (const key in selectedEmployee){
		if (`${selectedEmployee[key]}` == ""){
			continue;
		} else {
			html += "<tr id = detailedTableRow>";
			html += "<td id = detailedTableCell>" + `${key}` + " : " + `${selectedEmployee[key]}` + "</td>";
		}
	}
	let close = document.createElement("div");
	close.id = "closeOverlay";
	close.innerHTML = "&times;";
	close.onclick = function() {
		document.body.removeChild(overlay);
	}
	overlay.appendChild(close);
	
	detailedTable.innerHTML = html;
	
	document.body.appendChild(overlay);
}