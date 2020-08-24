let navButtons = ['#nav-main-button', '#nav-patientsList-button', '#nav-createPatient-button'];
let articlesId = ['#article-main-block', '#article-patientsList-block', '#article-createPatient-block'];

let currentPageInTable = 0;
let patientsCount = GetPatientsCount();

$(document).ready(function () {

	setInterval(GetCurrentDateTime, 1000);

	$('#nav-main-button').on('click', function () {
		SelectButton('#nav-main-button');
		SelectArticle('#article-main-block');
	});

	$('#nav-patientsList-button').on('click', function () {
		SelectButton('#nav-patientsList-button');
		SelectArticle('#article-patientsList-block');
		GetPatientsList(currentPageInTable);
	});

	$('#nav-createPatient-button').on('click', function () {
		SelectButton('#nav-createPatient-button');
		SelectArticle('#article-createPatient-block');
	});

	$('img').on('mouseover', function () {
		$(this).attr('src', "/images/arrow_right_hover.png");
	}).on('mouseout', function () {
		$(this).attr('src', "/images/arrow_right.png");
	});

	$('#patientList-forward').on('click', function () {
		if (currentPageInTable < Math.round(patientsCount / 15)) { 
			++currentPageInTable;
			GetPatientsList(currentPageInTable);
		}
	});

	$('#patientList-back').on('click', function () {
		if (currentPageInTable - 1 > -1) {
			--currentPageInTable;
			GetPatientsList(currentPageInTable);
		}
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

function GetPatientsList(page) {
	$.ajax({
		url: 'https://localhost:44324/api/patient/loadPatientsList?page=' + page,
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

	if (patientsCount > 15) {
		$('#table-paginator').css('display', 'grid');
		$('.table-paginator-pages').text(`Страница ${currentPageInTable + 1} из ${Math.ceil(patientsCount / 15)}`);
	}
	else {
		$('#table-paginator').css('display', 'none');
	}

	$('#tbody-patientsList').children().remove();

	let tbody = document.querySelector('#tbody-patientsList');

	for (let patient of patients) {
		let tr = document.createElement('tr');

		CreateCell(patient.LastName, tr);
		CreateCell(patient.FirstName, tr);
		CreateCell(patient.MiddleName, tr);
		CreateCell(MapToDate(patient.Birthday), tr);
		tr.setAttribute('id', patient.PatientId);

		tbody.append(tr);
	}
}

function CreateCell(value, tr) {
	let td = document.createElement('td');
	td.innerText = `${value}`;
	tr.append(td);
}

function MapToDate(patientBirthday) {
	let dateOfBirthday = '';
	let date = new Date(patientBirthday);
	dateOfBirthday += date.getDate() + ' ' + MapToMonth(date.getMonth()) + ' ' + date.getFullYear();
	return dateOfBirthday;
}

function GetPatientsCount() {
	$.ajax({
		url: 'https://localhost:44324/api/patient/counter',
		method: 'GET',
		success: function (response) {
			patientsCount = response;
		},
		error: function () {
			console.log("error!");
		}
	});
}