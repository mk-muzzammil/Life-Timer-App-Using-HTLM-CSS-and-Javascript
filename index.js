let isDOBOpen = false;
let dateOfBirth;
const settingIcon = document.getElementById("settingIcon");
const settingContent = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialtextContainer");
const afterDOBBtnTxtEl = document.getElementById("AfterDOBButtonClicktextContainer");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.querySelector("#year .yearDiv");
const monthEl = document.querySelector("#Month .MonthDiv");
const dayEl = document.querySelector("#Day .DayDiv");
const hourEl = document.querySelector("#Hours .HoursDiv");
const minuteEl = document.querySelector("#Minutes .MinutesDiv");
const secondEl = document.querySelector("#Seconds .SecondsDiv");

const makeTwoDigitNumber = (number) => {
  return number > 9 ? number : `0${number}`;
};

const toggleDateOfBirthSelector = () => {
  if (isDOBOpen) {
    settingContent.classList.add("hide");
  } else {
    settingContent.classList.remove("hide");
  }
  isDOBOpen = !isDOBOpen;

  console.log("Toggle", isDOBOpen);
};

const updateAge = () => {
  const currentDate = new Date();
  const dateDiff = currentDate - dateOfBirth;
  const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 30)) % 12);
  const day = Math.floor((dateDiff / (1000 * 60 * 60 * 24)) % 30); // Updated to use 30 as days in a month
  const hour = Math.floor((dateDiff / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((dateDiff / (1000 * 60)) % 60);
  const second = Math.floor((dateDiff / 1000) % 60);

  yearEl.innerHTML = makeTwoDigitNumber(year);
  monthEl.innerHTML = makeTwoDigitNumber(month);
  dayEl.innerHTML = makeTwoDigitNumber(day);
  hourEl.innerHTML = makeTwoDigitNumber(hour);
  minuteEl.innerHTML = makeTwoDigitNumber(minute);
  secondEl.innerHTML = makeTwoDigitNumber(second);
};

const setDOBHandler = () => {
  const dateString = dobInputEl.value;
  dateOfBirth = dateString ? new Date(dateString) : null;

  if (dateOfBirth) {
    initialTextEl.classList.add("hide");
    afterDOBBtnTxtEl.classList.remove("hide");
    updateAge(); // Update age immediately
    setInterval(() => updateAge(), 1000); // Update age every second
  } else {
    afterDOBBtnTxtEl.classList.add("hide");
    initialTextEl.classList.remove("hide");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  dobButtonEl.addEventListener("click", setDOBHandler);
  settingIcon.addEventListener("click", toggleDateOfBirthSelector);
});
