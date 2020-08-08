$(document).ready(function () {

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
		Sex: $('input[name="patientSex"]:checked').val(),
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

function CreateNewPatient(patient) {
	if (patient.Birthday == '') {
		patient.Birthday = new Date("2000-01-01").toLocaleDateString();
	}
	console.log(patient.Birthday);
	if (patient !== null) {
		$.ajax({
			url: 'https://localhost:44349/api/patient/create',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(patient),
			success: function () {
				alert("Попало куда нужно!");
			},
			error: function () {
				alert("Ошибочка вышла!");
			}
		});
	}
}