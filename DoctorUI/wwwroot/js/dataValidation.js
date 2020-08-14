function TryValidate(id) {

	let caseValue = SetCaseValueAndLength(id).caseValue;
	let minLength = SetCaseValueAndLength(id).minLength;
	let maxLength = SetCaseValueAndLength(id).maxLength;

	switch (caseValue) {
		case 'names': return ValidateNames(id, minLength, maxLength);
		case 'dates': return ValidateDates(id);
		case 'phones': return ValidatePhones(id, minLength, maxLength);
		case 'address': return ValidateAddress(id, minLength, maxLength);
		case 'work': return ValidateWork(id, minLength, maxLength);
		case 'insurancePolicy': return ValidateInsurancePolicy(id, minLength, maxLength);
		case 'retirementInsurance': return ValidateRetirementInsurance(id, minLength, maxLength);
		case 'default': return false;
	}
}

function SetCaseValueAndLength(id) {
	let data = {
		caseValue: 'default',
		minLength: 0,
		maxLength: 0
	};

	if (id === '#newPatientFirstName' || id === '#newPatientLastName' || id === '#newPatientMiddleName') {
		data.caseValue = 'names';
		data.minLength = 2;
		data.maxLength = 50;
	}
	if (id === '#newPatientBirthday') {
		data.caseValue = 'dates';
		data.minLength = 2;
		data.maxLength = 50;
	}
	if (id === '#newPatientPhoneBase' || id === '#newPatientPhoneAdd') {
		data.caseValue = 'phones';
		data.minLength = 5;
		data.maxLength = 20;
	}
	if (id === '#newPatientAddressOfficial' || id === '#newPatientAddressCurrent') {
		data.caseValue = 'address';
		data.minLength = 10;
		data.maxLength = 200;
	}
	if (id === '#newPatientWork') {
		data.caseValue = 'work';
		data.minLength = 3;
		data.maxLength = 200;
	}
	if (id === '#newPatientInsurancePolicy') {
		data.caseValue = 'insurancePolicy';
		data.minLength = 10;
		data.maxLength = 15;
	}
	if (id === '#newPatientRetirementInsurance') {
		data.caseValue = 'retirementInsurance';
		data.minLength = 12;
		data.maxLength = 15;
	}

	return data;
}

function ValidateNames(id, minLength, maxLength) {
	let name = $(id).val();
	name = name.trim();
	$(id).val(name);
	let value = $(id).attr('placeholder');

	if (name === '') {
		ShowInvalidInput(id, `${value} не может быть пустой строкой`);
		return false;
	}

	if (name.length < minLength || name.length > maxLength) {
		ShowInvalidInput(id, `${value} не может быть короче 2 и длиннее 50 символов`);
		return false;
	}

	if (!CheckValueForNumbers(name)) {
		ShowInvalidInput(id, `${value} не может содержать цифр`);
		return false;
	}

	ShowValidInput(id);
	return true;
}

function ValidateDates(id) {

	let date = $(id).val();
	if (date === '') {
		ShowInvalidInput(id, 'Не выбрана дата рождения пациента');
		return false;
	}

	let birthday = new Date(date);
	birthday.setHours(0);
	let today = new Date();

	if (birthday > today) {
		ShowInvalidInput(id, 'Выбранная дата не может быть установлена');
		return false;
	}

	ShowValidInput(id);
	return true;
}

function ValidatePhones(id, minLength, maxLength) {
	let phone = $(id).val();
	phone = phone.trim();
	$(id).val(phone);

	if (phone !== '') {
		if (phone.length >= minLength && phone.length <= maxLength) {
			if (CheckPhoneNumber(phone)) {
				ShowValidInput(id);
				return true;
			}
			else {
				ShowInvalidInput(id, "Некорректный номер телефона");
				return false;
			}
		}
		else {
			ShowInvalidInput(id, `Номер телефона не может содержать меньше ${minLength} и больше ${maxLength} цифр`);
			return false;
		}
	}
	else {
		if ($(id).prop('id') == 'newPatientPhoneBase') {
			ShowInvalidInput(id, 'Не указан основной номер телефона');
			return false;
		}
		else {
			ShowValidInput(id);
			return true;
		}
	}
}

function ValidateAddress(id, minLength, maxLength) {
	let address = $(id).val();
	address = address.trim();
	$(id).val(address);

	if (address === '') {
		ShowInvalidInput(id, "Не указан адрес пациента");
		return false;
	}

	if (address.length < minLength || address.length > maxLength) {
		ShowInvalidInput(id, `Адрес не может содержать меньше ${minLength} и больше ${maxLength} символов`);
		return false;
	}

	ShowValidInput(id);
	return true;
}

function ValidateWork(id, minLength, maxLength) {
	let work = $(id).val();
	work = work.trim();
	$(id).val(work);

	if (work === '') {
		ShowInvalidInput(id, "Если пациент не работает, пожалуйста, укажите 'Безработный'");
		return false;
	}

	if (work.length < minLength || work.length > maxLength) {
		ShowInvalidInput(id, `Описание места работы не может содержать меньше ${minLength} и больше ${maxLength} символов`);
		return false;
	}

	ShowValidInput(id);
	return true;
}

function ValidateInsurancePolicy(id, minLength, maxLength) {
	let number = $(id).val();
	number = number.trim();
	$(id).val(number);

	if (number === '') {
		ShowInvalidInput(id, "Не указаны СЕРИЯ и НОМЕР страхового медицинского полиса");
		return false;
	}

	if (number.length < minLength || number.length > maxLength) {
		ShowInvalidInput(id, `Серия и номер полиса не могут содержать меньше ${minLength} и больше ${maxLength} цифр`);
		return false;
	}

	if (!TryValidatePolicy(number)) {
		ShowInvalidInput(id, "Укажите серию и номер страхового медицинского полиса согласно шаблона");
		return false;	
	}			
			
	ShowValidInput(id);
	return true;
}

function ValidateRetirementInsurance(id, minLength, maxLength) {
	let snils = $(id).val();
	snils = snils.trim();
	$(id).val(snils);

	if (snils === '') {
		ShowInvalidInput(id, "Не указан номер пенсионного страхования");
		return false;
	}

	if (snils.length < minLength || snils.length > maxLength) {
		ShowInvalidInput(id, `Номер пенсионного страхования не может содержать меньше ${minLength} и больше ${maxLength} цифр`);
		return false;
	}

	if (!TryValidateInsurance(snils)) {
		ShowInvalidInput(id, "Укажите номер пенсионного страхования согласно шаблона");
		return false;	
	}

	ShowValidInput(id);
	return true;
}

function CheckValueForNumbers(value) {
	for (let char of value) {
		if (!isNaN(char)) {
			return false;
		}
	}
	return true;
}

function ShowInvalidInput(id, message) {
	let parent = $(id).parent();
	$(id).css('border-color', '#d34949').css('box-shadow', '0 0 7px 3px #d34949');
	parent.css('border-color', '#d34949');

	ShowCurrentMessage(message, false);
}

function ShowValidInput(id) {
	let parent = $(id).parent();
	$(id).css('border-color', '#b009f9').css('box-shadow', 'none');
	if (CheckFieldsForValidity(parent)) {
		parent.css('border-color', '#b009f9');
	}
}

function CheckFieldsForValidity(parent) {
	let inputs = parent.children("input");
	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].style.borderColor == 'rgb(211, 73, 73)') {
			return false;
		}
	}

	return true;
}

function CheckPhoneNumber(phone) {
	if (phone.match(/^((8|\+7)[\- ]?)?(\(?\d{3,5}\)?[\- ]?)?[\d\- ]{6,10}$/) !== null) {
		return true;
	}

	return false;
}

function TryValidatePolicy(number) {
	if (number.match(/^\d{2}[ ]\d{2}[ ]\d{7}/) !== null) {
		return true;
	}

	return false;
}

function TryValidateInsurance(snils) {
	if (snils.match(/^\d{3}[\-]\d{3}[\-]\d{3}[ ]\d{2}/) !== null) {
		return true;
	}

	return false;
}

function CheckDataValidity(arrayId) {
	for (let id of arrayId) {
		if (!TryValidate(id)) {
			$(id).focus();
			return false;
		}
	}
	return true;
}