let newPatientMale = true;

$(document).ready(function () {

	$('#newPatientMale').on('click', function () {
		newPatientMale = true;
		$('#newPatientMale').css('color', 'black');
		$('#newPatientFemale').css('color', '#dba2f5');
	});

	$('#newPatientFemale').on('click', function () {
		newPatientMale = false;
		$('#newPatientFemale').css('color', 'black');
		$('#newPatientMale').css('color', '#dba2f5');
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
		State: $('#newPatientState').val(),
		PhoneBase: $('#newPatientPhoneBase').val(),
		PhoneAdd: $('#newPatientPhoneAdd').val(),
		Work: $('#newPatientWork').val(),
		InsurancePolicy: $('#newPatientInsurancePolicy').val(),
		RetirementInsurance: $('#newPatientRetirementInsurance').val()
	};
}

function GetNewPatientSex() {
	if (newPatientMale) {
		return 'мужской';
	}
	else {
		return 'женский';
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