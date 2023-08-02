let isDobOpen = true;

let dateOfBirth;

const setingContainerEle = document.querySelector(".DobInputContainer");

const settingIconEle = document.querySelector(".settingIcon");

const dobButtonEle = document.querySelector("#dobButton");

const dobinputEle = document.querySelector("#dobInput");
const initialTextContainer = document.querySelector("#initialtextContainer");

const finalTextContainer = document.querySelector(
  "#AfterDOBButtonClicktextContainer"
);

// ===================Updating of values Selctors====
const YearEle = document.querySelector(".yearDiv");
const MonthEle = document.querySelector(".MonthDiv");
const DayEle = document.querySelector(".DayDiv");
const HoursEle = document.querySelector(".HoursDiv");
const MinutesEle = document.querySelector(".MinutesDiv");
const SecondsEle = document.querySelector(".SecondsDiv");

const toggleSettingContent = () => {
  if (!isDobOpen) {
    setingContainerEle.classList.add("hide");
  } else {
    setingContainerEle.classList.remove("hide");
  }
  isDobOpen = !isDobOpen;

  console.log(isDobOpen);
};


const makeTwoGidigits=(number)=>{
  return number>9 ? number : `0${number}`;

}
const updateAgeFunction = () => {
  const todaydate = new Date();

  const ageDiff = todaydate - dateOfBirth;

  const year = Math.floor(ageDiff / (1000 * 365 * 24 * 60 * 60));
  const month = Math.floor((ageDiff / (1000 * 30 * 24 * 60 * 60)) % 12);
  const day = Math.floor((ageDiff / (1000 * 24 * 60 * 60)) % 30);
  const hours = Math.floor((ageDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ageDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((ageDiff / 1000) % 60);

  YearEle.innerHTML = makeTwoGidigits(year);
  MonthEle.innerHTML =makeTwoGidigits( month);
  DayEle.innerHTML = makeTwoGidigits(day);
  HoursEle.innerHTML = makeTwoGidigits(hours);
  MinutesEle.innerHTML =makeTwoGidigits( minutes);
  SecondsEle.innerHTML = makeTwoGidigits(seconds);
};
const localStorageGetter=()=>{
  const year=localStorage.getItem("year");
  const month=localStorage.getItem("month");
  const date=localStorage.getItem("date");

  if(year && month && date){
    dateOfBirth=new Date(year,month,date);
  }
  updateAgeFunction();
  
}

const contentToggler=()=>{
  
  if (dateOfBirth) {

    initialTextContainer.classList.add("hide");
    finalTextContainer.classList.remove("hide");
    setInterval(updateAgeFunction, 1000);
  } 
  else {
    initialTextContainer.classList.remove("hide");
    finalTextContainer.classList.add("hide");
  }

}

const toggleMainTextContainerHandler = () => {

  let dateString = dobinputEle.value;
  

  dateOfBirth = dateString ? new Date(dateString) : null;
  
  
  

  if (dateOfBirth) {
    localStorage.setItem("year",dateOfBirth.getFullYear());
    localStorage.setItem("month",dateOfBirth.getMonth());
    localStorage.setItem("date",dateOfBirth.getDate());
    
  }
  setInterval(updateAgeFunction, 1000);
  contentToggler();


};

localStorageGetter();
contentToggler(); //bcz we want when we live server this project we see our local storage date running on our screen
settingIconEle.addEventListener("click", toggleSettingContent);
dobButtonEle.addEventListener("click", toggleMainTextContainerHandler);

