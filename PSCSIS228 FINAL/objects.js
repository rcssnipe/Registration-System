function Employee(fname, mname, lname, SSN, address1, address2, city, state, zip, DOB, hireDate, currPosition, department, homePhone, workPhone, mobilePhone, email) {
	this.fname = fname;
	this.mname = mname;
	this.lname = lname;
	this.SSN = SSN;
	this.address1 = address1;
	this.address2 = address2;
	this.city = city;
	this.state = state;
	this.zip = zip;
	this.DOB = DOB;
	this.hireDate = hireDate;
	this.currPosition = currPosition;
	this.department = department;
	this.homePhone = homePhone;
	this.workPhone = workPhone;
	this.mobilePhone = mobilePhone;
	this.email = email;
}
//SSN validation function
function validateSSN(){
	if (SSN.validity.valueMissing){
		SSN.setCustomValidity("Please enter your social security number");
	} else if (SSN.validity.patternMismatch){
		SSN.setCustomValidity("Please enter a valid social security number");
	} else {
		SSN.setCustomValidity("");
	}
}

//Zip Code validation function
function validateZip(){
	if(zip.validity.valueMissing){
		zip.setCustomValidity("Please enter your zip code");
	} else if (zip.validity.patternMismatch){
		zip.setCustomValidity("Please enter a valid zip code");
	} else {
		zip.setCustomValidity("");
	}
}

//Date of Birth validtaion function
function validateDOB(){
	if(DOB.validity.valueMissing){
		DOB.setCustomValidity("Please enter a valid date");
	} else {
		DOB.setCustomValidity("");
	}
}

//Phone numbers validation
function validatePhone(){
	if (homePhone.validity.patternMismatch){
		homePhone.setCustomValidity("Please enter a valid phone number");
	}else if (workPhone.validity.patternMismatch){
		workPhone.setCustomValidity("Please enter a valid phone number");
	}else if (workPhone.validity.valueMissing){
		workPhone.setCustomValidity("Please enter your work phone number");
	}else if (mobilePhone.validity.patternMismatch){
		mobilePhone.setCustomValidity("Please enter a valid phone number");
	}else {
		homePhone.setCustomValidity("");
		workPhone.setCustomValidity("");
		mobilePhone.setCustomValidity("");
	}
}

//get date of birth date and retrieves the day, month and year and coverts it into a string.
DOB.addEventListener('input', function(){
	let date = new Date(`${DOB.value}T00:00`);
	let month = date.getUTCMonth()+1;
	let day = date.getUTCDate();
	let year = date.getUTCFullYear();
	let fullDate = month + "-" + day + "-" + year;
	console.log(date);
	console.log(fullDate);
})
//get hired date and retrieves the day, month, and year and converts it into a string.
hireDate.addEventListener('input', function(){
	let hdate = new Date(`${hireDate.value}T00:00`);
	let hmonth = hdate.getUTCMonth()+1;
	let hday = hdate.getUTCDate();
	let hyear = hdate.getUTCFullYear();
	let hfullDate = hmonth + "-" + hday + "-" + hyear;
	console.log(hdate);
	console.log(hfullDate);
})