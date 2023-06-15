var clockDisplay = document.getElementById('clock-display');
var am_pm_text_display = document.getElementById("am-pm-text");
var dateDisplay = document.querySelector(".date");



function updateTime(){
let date = new Date();
let hours = formateTime(date.getHours());
let minutes = formateTime(date.getMinutes());
let seconds = formateTime(date.getSeconds());
dateDisplay.innerHTML =`${date}`

//for am and pm
if(hours >= 12){
    am_pm_text_display.innerHTML = "PM";
}else{
    am_pm_text_display.innerHTML = "AM";
}


var twelve = document.getElementById('twelve');
if(twelveHour==true){
    twelve.innerText = '12';
    if(hours > 12){
    hours = hours-12;
    clockDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
    }
    else if(hours == 0){
    hours = 12;
    clockDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
    }else{
    clockDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
    }
}else{
    twelve.innerText = '24';
    clockDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
}
}
//here we use setInterval to update the clock every second
setInterval(updateTime, 1000);

//function for applying 0 before single digit
function formateTime(time) {
    if (time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
}

// for time formate of 12 hours and 24 hours
 
let twelveHour = true;

let mode = document.getElementById("mode");

mode.addEventListener("click", function(){
    twelveHour = !twelveHour;
});