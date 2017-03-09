var x = 0;
var y = 0;
var angle = 0;
var xcenter = 405;
var ycenter = 405;
var minuteDotClicked;
var targetHour;
var targetMinute;
var currentHour;
var currentMinute;



function bigMinuteDot(dot){
	dot.style.width = "38px";
	dot.style.height = "38px";
	dot.style.margin = "-19px";
	minuteDotClicked = true;
}

function bigHourDot(dot) {
	dot.style.width = "38px";
	dot.style.height = "38px";
	dot.style.margin = "-19px";
	minuteDotClicked = false;
}

function normalDot(dot) {
	dot.style.width = "30px";
	dot.style.height = "30px";
	dot.style.margin = "-15px";
}



function allowDrop(ev) {
	event.preventDefault();
    getMousePosition(ev);
	if (minuteDotClicked){
		redrawMinute();
	}
	else if (!minuteDotClicked){
		redrawHour();
	}
}

function getCurrentHourMinPos(){
	if (minuteDotClicked) {
		currentMinute = angle / 6;
	}
	else {
		currentHour = Math.floor(angle / 30);
		if (currentHour == 0){
			currentHour = 12;
		}
	}


	if ( currentHour == targetHour && currentMinute == targetMinute){
		showYayMessage();
	}

}

function getMousePosition(ev){
	x = event.clientX;
	y = event.clientY;

	x -= xcenter;
	y -= ycenter;
	var distFromCenter = Math.sqrt(x*x + y*y);
	y /= distFromCenter;
	x /= distFromCenter;
	if ( x > 0 ){
		angle = Math.asin(y);
		angle = angle * 360 / ( 2 * Math.PI);
	}
	else {
		angle = -Math.asin(y);
		angle = angle * 360 / ( 2 * Math.PI) + 180;
	}
	angle = angle + 90;
	angle = Math.round(angle / 6) * 6;
	updateXandY();

}

function setMinute(minutes){
	if (minutes >= 0 && minutes < 60){
		angle = minutes * 6;
		updateXandY();
		redrawMinute();
	}
	else {
		alert("invalid time");
	}
}

function setHour(hours) {
	if ( hours >= 0 && hours <= 12 ){
		angle = Math.round(hours) * 30;
		updateXandY();
		redrawHour();
	}
	else {
		alert("invalid time");
	}
}

function setTime(){
	var time = document.getElementById("textInput").value.toString();
	var hour = -1;
	var minute = -1;
	var colonPos = time.search(':');
	if (colonPos != -1){
		hour = Math.round( parseFloat( time.slice(0, colonPos)));
		minute = Math.round( parseFloat( time.slice(colonPos + 1, time.length )));
	}
	setMinute(minute);
	setHour(hour);
}


function addOneMinute() {
	angle += 6;
	updateXandY();
	redrawMinute();
}


function updateXandY(){
	var angleInRadians = 2 * Math.PI * (angle ) / 360;
	x = xcenter - 390 * Math.cos(angleInRadians);
	y = ycenter + 5 + 390 * Math.sin(angleInRadians);
}

function redrawMinute(){
	document.getElementById("minuteDot").style.top = x + "px";
	document.getElementById("minuteDot").style.left = y + "px";
	document.getElementById("minuteHand").style.transform = "rotate(" + angle + "deg)";
}

function redrawHour(){
	document.getElementById("hourDot").style.top = x.toString() + "px";
	document.getElementById("hourDot").style.left = y.toString() + "px";
	document.getElementById("hourHand").style.transform = "rotate(" + angle + "deg)";
}

function generateRandomTime(){
	var hour = targetHour = Math.floor(Math.random() * 12) + 1;
	var minute = targetMinute = Math.floor(Math.random() * 60);
	if(minute < 10){
		minute = "0" + minute;
	}
	document.getElementById("randomTimeHeader").innerHTML = 
		"Objective: Move the hands to set the time to: " + hour + ":" + minute;
}

function showYayMessage(){
	document.getElementById("yaymessage").style.visibility = "visible";
	setTimeout(hideYayMessage, 900);
}

function hideYayMessage(){
	document.getElementById("yaymessage").style.visibility = "hidden";
	generateRandomTime();
}




























//comment