function TryValidate(id, caseValue, minLength, maxLength) {
	switch (caseValue) {
		case 'names':
			let name = $(id).val();
			name = name.trim();
			$(id).val(name);
			let value = $(id).attr('placeholder');

			if (name !== '') {
				if (CheckValueForNumbers(name)) {
					if (name.length < minLength || name.length > maxLength) {
						ShowInvalidInput(id, `${value} не может быть короче 2 и длиннее 50 символов`);
					}
					else {
						ShowValidInput(id);
					}
				}
				else {
					ShowInvalidInput(id, `${value} не может содержать цифр`);
				}
			}
			else {
				ShowInvalidInput(id, `${value} не может быть пустой строкой`);
			}

			break;

		case 'dates':
			let date = $(id).val();
			if (date != '') {
				let birthday = new Date(date);
				let today = new Date();

				if (birthday <= today) {
					ShowValidInput(id);
				}
				else {
					ShowInvalidInput(id, 'Выбранная дата не может быть установлена');
				}
			}
			else {
				ShowInvalidInput(id, 'Не выбрана дата рождения пациента');
			}

			break;

		case 'phones':
			let phone = $(id).val();
			phone = phone.trim();
			$(id).val(phone);

			if (phone !== '') {
				if (phone.length >= minLength && phone.length <= maxLength) {
					if (CheckPhoneNumber(phone)) {
						ShowValidInput(id);
					}
					else {
						ShowInvalidInput(id, "Некорректный номер телефона");
					}
				}
				else {
					ShowInvalidInput(id, `Номер телефона не может содержать меньше ${minLength} и больше ${maxLength} цифр`);
				}
			}
			else {
				if (id === '#newPatientPhoneBase') {
					ShowInvalidInput(id, 'Не указан основной номер телефона');
				}
				else {
					ShowValidInput(id);
				}
			}

			break;

		case 'address':
			let address = $(id).val();
			address = address.trim();
			$(id).val(address);

			if (address !== '') {
				if (address.length < minLength || address.length > maxLength) {
					ShowInvalidInput(id, `Адрес не может содержать меньше ${minLength} и больше ${maxLength} символов`);
				}
				else {
					ShowValidInput(id);
				}
			}
			else {
				ShowInvalidInput(id, "Не указан адрес пациента");
			}

			break;

		case 'work':
			let work = $(id).val();
			work = work.trim();
			$(id).val(work);

			if (work !== '') {
				if (work.length < minLength || work.length > maxLength) {
					ShowInvalidInput(id, `Описание места работы не может содержать меньше ${minLength} и больше ${maxLength} символов`);
				}
				else {
					ShowValidInput(id);
				}
			}
			else {
				ShowInvalidInput(id, "Если пациент не работает, пожалуйста, укажите 'Безработный'");
			}

			break;

		case 'insurancePolicy':
			let number = $(id).val();
			number = number.trim();
			$(id).val(number);

			if (number !== '') {
				if (number.length >= minLength && number.length <= maxLength) {
					if (TryValidatePolicy(number)) {
						ShowValidInput(id);
					}
					else {
						ShowInvalidInput(id, "Некорректны серия и номер страхового медицинского полиса");
					}
				}
				else {
					ShowInvalidInput(id, `Серия и номер полиса не могут содержать меньше ${minLength} и больше ${maxLength} цифр`);
				}
			}
			else {
				ShowInvalidInput(id, "Не указаны СЕРИЯ и НОМЕР страхового медицинского полиса");
			}

			break;

		case 'retirementInsurance':
			let snils = $(id).val();
			snils = snils.trim();
			$(id).val(snils);

			if (snils !== '') {
				if (snils.length >= minLength && snils.length <= maxLength) {
					if (TryValidateInsurance(snils)) {
						ShowValidInput(id);
					}
					else {
						ShowInvalidInput(id, "Некорректный номер пенсионного страхования");
					}
				}
				else {
					ShowInvalidInput(id, `Номер пенсионного страхования не может содержать меньше ${minLength} и больше ${maxLength} цифр`);
				}
			}
			else {
				ShowInvalidInput(id, "Не указан номер пенсионного страхования");
			}

			break;
	}
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