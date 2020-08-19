let navButtons = ['#nav-main-button', '#nav-patientsList-button', '#nav-createPatient-button'];
let articlesId = ['#article-main-block', '#article-patientsList-block', '#article-createPatient-block'];

$(document).ready(function () {

	setInterval(GetCurrentDateTime, 1000);

	$('#nav-main-button').on('click', function () {
		SelectButton('#nav-main-button');
		SelectArticle('#article-main-block');
	});

	$('#nav-patientsList-button').on('click', function () {
		SelectButton('#nav-patientsList-button');
		SelectArticle('#article-patientsList-block');
		GetPatientsList();
	});

	$('#nav-createPatient-button').on('click', function () {
		SelectButton('#nav-createPatient-button');
		SelectArticle('#article-createPatient-block');
	});
});

function GetCurrentDateTime() {
	let date = new Date();
	$('#currentDate').text(`${date.getDate()} ${MapToMonth(date.getMonth())} ${date.getFullYear()} г. (${MapToDay(date.getDay())})`);

	let hour = date.getHours();
	let currentHour = hour;
	if (hour < 10) {
		currentHour = '0' + hour;
	}
	let minutes = date.getMinutes();
	let currentMinutes = minutes;
	if (minutes < 10) {
		currentMinutes = '0' + minutes;
	}
	$('#currentTime').text(`${currentHour}:${currentMinutes}`);
}

function MapToMonth(month) {
	switch (month) {
		case 0: return 'января';
		case 1: return 'февраля';
		case 2: return 'марта';
		case 3: return 'апреля';
		case 4: return 'мая';
		case 5: return 'июня';
		case 6: return 'июля';
		case 7: return 'августа';
		case 8: return 'сентября';
		case 9: return 'октября';
		case 10: return 'ноября';
		case 11: return 'декабря';
	}
}

function MapToDay(day) {
	switch (day) {
		case 0: return 'воскресенье';
		case 1: return 'понедельник';
		case 2: return 'вторник';
		case 3: return 'среда';
		case 4: return 'четверг';
		case 5: return 'пятница';
		case 6: return 'суббота';
	}
}

function SelectButton(activeButton) {
	$(activeButton).css('background-color', '#5eb8f9').css('border-color', '#5eb8f9');
	for (let button of navButtons) {
		if (button == activeButton) {
			continue;
		}

		$(button).css('background-color', '#d185f3').css('border-color', '#d185f3');;
	}
}

function SelectArticle(artId) {
	for (let id of articlesId) {
		if (id !== artId) {
			$(id).css('display', 'none');
		}
		else {
			$(artId).css('display', 'block');
		}
	}
}

function GetPatientsList() {
	$.ajax({
		url: 'https://localhost:44324/api/patient/loadPatientsList',
		method: 'GET',
		success: function (response) {
			WriteInTable(response);
		},
		error: function () {
			console.log("Ошибка запроса");
		}
	});
}

function WriteInTable(data) {
	let patients = JSON.parse(data);

	$('#tbody-patientsList').children().remove();

	let tbody = document.querySelector('#tbody-patientsList');

	for (let patient of patients) {
		let tr = document.createElement('tr');
		let td1 = document.createElement('td');
		td1.innerText = `${patient.LastName}`;
		tr.append(td1);

		let td2 = document.createElement('td');
		td2.innerText = `${patient.FirstName}`;
		tr.append(td2);

		let td3 = document.createElement('td');
		td3.innerText = `${patient.MiddleName}`;
		tr.append(td3);

		let td4 = document.createElement('td');
		td4.innerText = MapToDate(patient.Birthday);
		tr.append(td4);

		tbody.append(tr);
	}
}

function MapToDate(patientBirthday) {
	let dateOfBirthday = '';
	let date = new Date(patientBirthday);
	dateOfBirthday += date.getDate() + ' ' + MapToMonth(date.getMonth()) + ' ' + date.getFullYear();
	return dateOfBirthday;
}