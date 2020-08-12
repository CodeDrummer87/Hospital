let newPatientMale = true;
let patientIsCitizen = true;

let idArrayForCleanUp = [
	'#newPatientFirstName',
	'#newPatientLastName',
	'#newPatientMiddleName',
	'#newPatientBirthday',
	'#newPatientPhoneBase',
	'#newPatientPhoneAdd',
	'#newPatientAddressOfficial',
	'#newPatientAddressCurrent',
	'#newPatientWork',
	'#newPatientInsurancePolicy',
	'#newPatientRetirementInsurance'
];

let idArrayForResetSelect = [
	'#newPatientMale',
	'#newPatientFemale',
	'#newPatientCity',
	'#newPatientRegion'
];

$(document).ready(function () {

	$('#newPatientBirthday').on('change', function () {
		$('#newPatientBirthday').on('blur', GetAge());
	});

	$('#newPatientPhoneBase').on('blur', function () {
		SetInputForReadonly();
	});

	$('#newPatientAddressOfficial').on('change', function () {
		$('#newPatientAddressOfficial').on('blur', GetAddressValue());
	});

	$('#newPatientMale').on('click', function () {
		newPatientMale = true;
		SelectFirstProperty('#newPatientMale', '#newPatientFemale');
	});

	$('#newPatientFemale').on('click', function () {
		newPatientMale = false;
		SelectFirstProperty('#newPatientFemale', '#newPatientMale');
	});

	$('#newPatientCity').on('click', function () {
		patientIsCitizen = true;
		SelectFirstProperty('#newPatientCity', '#newPatientRegion');
	});

	$('#newPatientRegion').on('click', function () {
		patientIsCitizen = false;
		SelectFirstProperty('#newPatientRegion', '#newPatientCity');
	});

	$('#createNewPatientButton').on('click', function () {
		const patient = GetNewPatientData();
		CreateNewPatient(patient);
	});
});

function GetNewPatientData() {
	return {
		FirstName: $('#newPatientFirstName').val(),
		LastName: $('#newPatientLastName').val(),
		MiddleName: $('#newPatientMiddleName').val(),
		Sex: GetNewPatientSex(),
		Birthday: $('#newPatientBirthday').val(),
		AddressOfficial: $('#newPatientAddressOfficial').val(),
		AddressCurrent: $('#newPatientAddressCurrent').val(),
		State: GetNewPatientRegion(),
		PhoneBase: $('#newPatientPhoneBase').val(),
		PhoneAdd: $('#newPatientPhoneAdd').val(),
		Work: $('#newPatientWork').val(),
		InsurancePolicy: $('#newPatientInsurancePolicy').val(),
		RetirementInsurance: $('#newPatientRetirementInsurance').val()
	};
}

function SelectFirstProperty(firstProp, secondProp) {
	$(firstProp).css('color', 'black');
	$(secondProp).css('color', '#dba2f5');
}

function GetNewPatientSex() {
	if (newPatientMale) {
		return 'мужской';
	}
	else {
		return 'женский';
	}
}

function GetNewPatientRegion() {
	if (patientIsCitizen) {
		return "Город";
	}
	else {
		return "Область";
	}
}

function CreateNewPatient(patient) {
	if (patient.Birthday == '') {
		patient.Birthday = new Date("2000-01-01").toLocaleDateString();
	}

	if (patient !== null) {
		$.ajax({
			url: 'https://localhost:44324/api/patient/create',
			method: 'POST', 
			contentType: 'application/json',
			data: JSON.stringify(patient),
			success: function (response) {
				if (response === "Ok") {
					alert(".:: Карта пациента создана");
					ClearPatientCardForm();
				}
				else {
					console.log(".:: Ошибка");
				}			
			},
			error: function () {
				alert(".:: Ошибка запроса");
			}
		});
	}
}

function GetAge() {
	let birthday = $('#newPatientBirthday').val();

	let now = new Date();
	let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	let dob = new Date(birthday);
	let dobInCurrentYear = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

	let currentAge = today.getFullYear() - dob.getFullYear();
	if (today < dobInCurrentYear) {
		--currentAge;
	}
	if (currentAge > 0) {
		$('#currentAge').text(currentAge);
	}
	else {
		$('#currentAge').text('--');
	}
}

function GetAddressValue() {
	let addressOfficial = $('#newPatientAddressOfficial').val();
	$('#newPatientAddressCurrent').val(addressOfficial);
}

function ResetSelection(prop) {
	$(prop).css('color', '#dba2f5');
}

function SetInputForReadonly() {
	let phoneBase = $('#newPatientPhoneBase').val();
	if (phoneBase !== '') {
		$('#newPatientPhoneAdd').removeAttr('readonly').css('background-color', '#fff');
	}
	else {
		$('#newPatientPhoneAdd').val('').attr('readonly', 'readonly').css('background-color', '#dba2f5');
	}
}

function ClearPatientCardForm() {

	for (let id of idArrayForCleanUp) {
		$(id).val('');
	}

	for (let id of idArrayForResetSelect) {
		ResetSelection(id);
	}

	$('#currentAge').text('--');
	SetInputForReadonly();
}