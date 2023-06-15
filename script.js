var clockDisplay = document.getElementById('clock-display');
var am_pm_text_display = document.getElementById("am-pm-text");
var dateDisplay = document.querySelector(".date");

const audio = new Audio('/music.mp3');

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

// for alarm array
for(let i = 0; i < AlarmArray.length; i++){
    if(hours == AlarmArray[i].hour && minutes == AlarmArray[i].minute && seconds == AlarmArray[i].second && amPm == AlarmArray[i].amPm){
        console.log(alarmTime)
        window.alert("alarm is ringing")
        audio.play();
        
        setTimeout(function(){
            audio.pause();
            console.log("alarm is stoped")
        }
        , 5000);
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
    if(hour.value <9 || minute.value < 9 || second.value < 9){
        warningNoty('Please add 0 before single digit');
        hour.value = '';
        minute.value = '';
        second.value = '';
        return;
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
    if(AlarmArray.push(alarmTime)){
        successNoty("Alarm is set");
    }
    addAlarmList(alarmTime);
    hour.value = '';
    minute.value = '';
    second.value = '';
    am_pm_checkbox.classList.remove('active');
    updateTime(alarmTime);
    
}


var ul = document.querySelector('#alarm-list');
function addAlarmList(alarmTime){

    const Li = document.createElement('div');
    Li.classList.add('list-box');
    Li.innerHTML = `
    <span class = 'alarm-hour'>${alarmTime.hour}</span>
    <span class = 'li-column'>:</span>
    <span class = 'alarm-minute'>${alarmTime.minute}</span>
    <span class = 'li-column'>:</span>
    <span class = 'alarm-second'>${alarmTime.second}</span>
    <span class = 'alarm-am-pm'>${alarmTime.amPm}</span>
    <span class ='alarm-delete' ${alarmTime.id}>
        <i class="fa-solid fa-trash" id = "delete" data-id="${alarmTime.id}"></i>
    </span>`;
    ul.appendChild(Li);
  }

  // render alarm list
  function renderAlarmList(){
    console.log("render")
    // localStorage.setItem('LocalStorage', JSON.stringify(AlarmArray));
    ul.innerHTML = '';
    for(let element of AlarmArray){
      addAlarmList(element);
    }
  }


//  clear all alarm
  function clearAlarm(){
    ul.innerHTML = '';
    AlarmArray = [];
  }

// delete alarm
    function deleteItem(id){
        let newAlarmArray = AlarmArray.filter(function(alarm){
        if(alarm.id != id){
            return alarm;
        }
    });
    AlarmArray = newAlarmArray;
    renderAlarmList();
    }


  function deleteAlarm(e){
   if(e.target.id == 'delete'){
    let id = e.target.dataset.id;
    console.log(id)
    deleteItem(id)
   }
  }

document.addEventListener('click', deleteAlarm);


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
