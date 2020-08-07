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
		AddressCurrent: $('#newPatientAddressCurrent').val(),
		AddressOfficial: $('#newPatientAddressOfficial').val(),
		State: $('#newPatientState').val(),
		Phone: $('#newPatientPhone').val(),
		Work: $('#newPatientWork').val(),
		InsurancePolicy: $('#newPatientInsurancePolicy').val(),
		RetirementInsurance: $('#newPatientRetirementInsurance').val()
	};
}

function CreateNewPatient(patient) {
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