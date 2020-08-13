﻿let newPatientMale = true;
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

	$('#newPatientFirstName').on('change', function () {
		$(this).on('blur', function () {
			TryValidate(this, 'names', 2, 50);
		});
	});

	$('#newPatientLastName').on('change', function () {
		$(this).on('blur', function () {
			TryValidate(this, 'names', 2, 50);
		});
	});

	$('#newPatientMiddleName').on('change', function () {
		$(this).on('blur', function () {
			TryValidate(this, 'names', 2, 50);
		});
	});

	$('#newPatientBirthday').on('focus', function () {
		$(this).on('blur', function () {
			TryValidate(this, 'dates', 0, 0);
		});
	});

	$('#newPatientPhoneBase').on('focus', function () {
		$(this).on('blur', function () {
			TryValidate(this, 'phones', 5, 20);
		});
	});

	$('#newPatientPhoneAdd').on('focus', function () {
		if ($('#newPatientPhoneAdd').prop('readonly') == false) {
			$(this).on('blur', function () {
				TryValidate(this, 'phones', 5, 20);
			});
		}
	});

	$('#newPatientAddressOfficial').on('focus', function () {
		$(this).on('blur', function () {
			TryValidate(this, 'address', 10, 200);
		});
	});

	$('#newPatientAddressCurrent').on('focus', function () {
		$(this).on('blur', function () {
			TryValidate(this, 'address', 10, 200);
		});
	});

	$('#newPatientWork').on('focus', function () {
		$(this).on('blur', function () {
			TryValidate(this, 'work', 3, 200);
		});
	});

	$('#newPatientInsurancePolicy').on('focus', function () {
		$(this).on('blur', function () {
			TryValidate(this, 'insurancePolicy', 10, 15);
		});
	});

	$('#newPatientRetirementInsurance').on('focus', function () {
		$(this).on('blur', function () {
			TryValidate(this, 'retirementInsurance', 12, 15);
		});
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
		Locality: GetNewPatientRegion(),
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

	if (patient !== null) {
		$.ajax({
			url: 'https://localhost:44324/api/patient/create',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(patient),
			success: function (response) {
				if (response === "Ok") {
					ShowCurrentMessage('Карта пациента создана', true);
					ClearPatientCardForm();
				}
				else {
					ShowCurrentMessage('Данные пациента не валидны', false);
				}			
			},
			error: function () {
				ShowCurrentMessage('Ошибка выполнения запроса. Обратитесь к администратору', false);
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

function ShowCurrentMessage(message, success) {
	if (success) {
		$('#currentMessage').css('color', '#3ace0c').text(message);
	}
	else {
		$('#currentMessage').css('color', '#f83535').text(message);
	}

	setTimeout(ClearCurrentMessage, 3500);
}

function ClearCurrentMessage() {
	$('#currentMessage').html('&nbsp;');
}