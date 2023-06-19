var clockDisplay = document.getElementById('clock-display');
var am_pm_text_display = document.getElementById("am-pm-text");
var dateDisplay = document.querySelector(".date");

const audio = new Audio('/music.mp3');
var stopText = document.querySelector(".stop-text");
var stopSnooze = document.getElementById('stop-alarm');

// for changin am pm
var am_pm_checkbox = document.getElementById('am-pm-checkbox');
var amPm = 'AM'
am_pm_checkbox.addEventListener('click', function(){
    am_pm_checkbox.classList.toggle('active');
    if(am_pm_checkbox.classList.contains('active')){
        amPm = 'PM';
        am_pm_checkbox.innerHTML = 'PM';
        console.log(amPm);
    }else{
        amPm = 'AM';
        am_pm_checkbox.innerHTML = 'AM';
        console.log(amPm);
    }
});
var hour = document.getElementById('hour');
var minute = document.getElementById('minute');
var second = document.getElementById('second');


audio.loop = true;
let AlarmArray = [];

// let retrieveAlarm = JSON.parse(localStorage.getItem('LocalStorage'));

// if (retrieveAlarm !== null) {
//     AlarmArray = [...retrieveAlarm];
//     renderAlarmList();
// }


//  local storage

var alarmTime = {
    hour: null,
    minute: null,
    second: null,  
    id: Date.now(),
    amPm,
  }


function updateTime(alarmTime){
let date = new Date();
let hours = formateTime(date.getHours());
let minutes = formateTime(date.getMinutes());
let seconds = formateTime(date.getSeconds());
dateDisplay.innerHTML =`${date}`
clockDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;

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
    clockDisplay.innerHTML = `0${hours}:${minutes}:${seconds}`;
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

// for alarm array
for(let i = 0; i < AlarmArray.length; i++){
    if(hours == AlarmArray[i].hour && minutes == AlarmArray[i].minute && seconds == AlarmArray[i].second && amPm == AlarmArray[i].amPm){
        console.log(alarmTime)
        audio.play();
        stopText.style.display = 'block';
        stopSnooze.style.display = 'block';
        successNoty("Alarm is ringing");
        setTimeout(function(){
            stopAlarm(); 
        }
        , 1000000);     
    }
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


// for set alarm function

function setAlarm(){
    if(hour.value == '' || minute.value == '' || second.value == ''){
        warningNoty("Please fill all fields");
        hour.value = '';
        minute.value = '';
        second.value = '';
        return;
    }
    if(hour.value > 24 || minute.value > 59 || second.value > 59){
        warningNoty('@hr(0-24), min(0-59), sec (0, 59)');
        hour.value = '';
        minute.value = '';
        second.value = '';
        return;
    }
    if(hour.value < 0 || minute.value < 0 || second.value < 0){
        warningNoty('@hr(0-24), min(0-59), sec (0, 59)');
        hour.value = '';
        minute.value = '';
        second.value = '';
        return;
    }
    if(hour.value < 10 && hour.value.length < 2){
        hour.value = '0' + hour.value;
    }
    if(minute.value < 10 && minute.value.length < 2){
        minute.value = '0' + minute.value;
    }
    if(second.value < 10 && second.value.length < 2){
        second.value = '0' + second.value;
    }
   
    alarmTime = {
        hour: hour.value,
        minute: minute.value,
        second: second.value,
        amPm,
        id: Date.now()
    }
    console.log(alarmTime)
    AlarmArray.push(alarmTime);
    successNoty("Alarm is set");
    renderAlarmList();  
    hour.value = '';
    minute.value = '';
    second.value = '';
    am_pm_checkbox.classList.remove('active');    
}

// for stop alarm
function stopAlarm(){
  audio.pause();
  audio.currentTime = 0;
  stopText.style.display = 'none';
  stopSnooze.style.display = 'none';
  successNoty("Alarm is stopped");
}


var ul = document.querySelector('#alarm-list');
function addAlarmList(alarmTime){
    const li = document.createElement('list');
    li.classList.add('list-box');
    li.innerHTML = `
    <span class = 'alarm-hour'>${alarmTime.hour}</span>
    <span class = 'li-column'>:</span>
    <span class = 'alarm-minute'>${alarmTime.minute}</span>
    <span class = 'li-column'>:</span>
    <span class = 'alarm-second'>${alarmTime.second}</span>
    <span class = 'alarm-am-pm'>${alarmTime.amPm}</span>
    <span class ='alarm-delete' ${alarmTime.id}>
        <i class="fa-solid fa-trash" id = "delete" data-id="${alarmTime.id}")></i>
    </span>`;
    ul.append(li);
  }
//  clear all alarm
  function clearAlarm(){
    ul.innerHTML = '';
    AlarmArray = [];
  }

// delete alarm
function deleteItem(deleteId){
  console.log('delete')
  let newAlarmArray = AlarmArray.filter(function(alarm){
    return alarm.id !== Number(deleteId);
  });
  AlarmArray = newAlarmArray;
  renderAlarmList();
  successNoty("Alarm is deleted");
    
  }
  
document.addEventListener('click', function(e){
    if(e.target.id == 'delete'){
      let deleteId = e.target.dataset.id;
      deleteItem(deleteId);
    }
  });

    // render alarm list
    function renderAlarmList(){
      console.log("render")
      localStorage.setItem('LocalStorage', JSON.stringify(AlarmArray));
      ul.innerHTML = '';
      for(let element of AlarmArray){
        addAlarmList(element);
      }
    }

// izitoast
function successNoty(msg) {
    iziToast.success({
      title: msg,
      position: "topRight",
      timeout: 1200,
    });
  }
  
  function warningNoty(msg) {
    iziToast.warning({
      title: msg,
      position: "topRight",
      timeout: 2000,
    });
  }
