let navButtons = ['#nav-main-button','#nav-createPatient-button'];

$(document).ready(function () {

	setInterval(GetCurrentDateTime, 1000);

	$('#nav-main-button').on('click', function () {
		$('#article-createPatient-block').css('display', 'none');
		$('#article-main-block').css('display', 'block');
		SelectButton('#nav-main-button');
	});

	$('#nav-createPatient-button').on('click', function () {
		$('#article-main-block').css('display', 'none');
		$('#article-createPatient-block').css('display', 'block');
		SelectButton('#nav-createPatient-button');
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