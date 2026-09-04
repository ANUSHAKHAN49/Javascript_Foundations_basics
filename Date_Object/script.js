// ==========================================
// 1. DIGITAL CLOCK & ALARM
// ==========================================
const clockDisplay = document.querySelector('#clockDisplay');
const alarmHoursInput = document.querySelector('#alarmHours');
const alarmMinutesInput = document.querySelector('#alarmMinutes');
const setAlarmBtn = document.querySelector('#setAlarmBtn');
const alarmStatus = document.querySelector('#alarmStatus');

let targetHour = null;
let targetMin = null;

function updateClock() {
  const now = new Date();
  const hrs = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();

  const displayHrs = hrs < 10 ? '0' + hrs : hrs;
  const displayMins = mins < 10 ? '0' + mins : mins;
  const displaySecs = secs < 10 ? '0' + secs : secs;

  clockDisplay.innerText = `${displayHrs}:${displayMins}:${displaySecs}`;

  if (targetHour !== null && targetMin !== null) {
    if (hrs === targetHour && mins === targetMin) {
      alarmStatus.innerText = "🚨 Alarm is Ranging!";
    }
  }
}

setAlarmBtn.addEventListener('click', function() {
  targetHour = parseInt(alarmHoursInput.value);
  targetMin = parseInt(alarmMinutesInput.value);

  if (!isNaN(targetHour) && !isNaN(targetMin)) {
    alarmStatus.innerText = `Alarm set for ${targetHour}:${targetMin}`;
  } else {
    alarmStatus.innerText = "Please enter valid hours and minutes.";
  }
});

setInterval(updateClock, 1000);

// ==========================================
// 2. EVENTS DATE CALCULATOR
// ==========================================
const eventDateInput = document.querySelector('#eventDateInput');
const checkCountdownBtn = document.querySelector('#checkCountdownBtn');
const checkPastBtn = document.querySelector('#checkPastBtn');
const eventResult = document.querySelector('#eventResult');

checkCountdownBtn.addEventListener('click', function() {
  if (!eventDateInput.value) return;

  const targetDate = new Date(eventDateInput.value);
  const currentDate = new Date();
  const diffInMs = targetDate - currentDate;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMs >= 0) {
    eventResult.innerText = `Your event is in just ${diffInDays} day(s)!`;
  } else {
    eventResult.innerText = "This date is in the past. Click 'Check Time Passed'.";
  }
});

checkPastBtn.addEventListener('click', function() {
  if (!eventDateInput.value) return;

  const targetDate = new Date(eventDateInput.value);
  const currentDate = new Date();
  const diffInMs = currentDate - targetDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMs >= 0) {
    eventResult.innerText = `Your event passed ${diffInDays} day(s) ago!`;
  } else {
    eventResult.innerText = "This date is in the future. Click 'Check Count Down'.";
  }
});

// ==========================================
// 3. TYPING SPEED MEASURER
// ==========================================
const typeInput = document.querySelector('#typeInput');
const checkSpeedBtn = document.querySelector('#checkSpeedBtn');
const speedResult = document.querySelector('#speedResult');

let startTime = null;

typeInput.addEventListener('keypress', function() {
  if (!startTime) {
    startTime = Date.now();
  }
});

checkSpeedBtn.addEventListener('click', function() {
  if (!startTime) {
    speedResult.innerText = "Please start typing first!";
    return;
  }

  const endTime = Date.now();
  const timeTakenSeconds = ((endTime - startTime) / 1000).toFixed(2);

  speedResult.innerText = `You finished typing in ${timeTakenSeconds} seconds!`;
  startTime = null;
});
