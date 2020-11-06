const datePickerElement = document.querySelector(".date-picker");
const selectedDateElement = document.querySelector(
  ".date-picker .selected-date"
);
const datesElement = document.querySelector(".date-picker .dates");
const mthElement = document.querySelector(".date-picker .month .mth");
const nextMthElement = document.querySelector(".date-picker .month .next-mth");
const prevMthElement = document.querySelector(".date-picker .month .prev-mth");
const daysElement = document.querySelector(".date-picker .dates .days");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

const dateNew = new Date();
dateNew.setDate(1);
const daysIndexes = [6, 0, 1, 2, 3, 4, 5, 0];
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

mthElement.textContent = months[month] + " " + year;

selectedDateElement.textContent = formatDate(date);
selectedDateElement.dataset.value = selectedDate;

// Event listeners
datePickerElement.addEventListener("click", toggleDatePickerHandler);
nextMthElement.addEventListener("click", goToNextMonthHandler);
prevMthElement.addEventListener("click", goToPrevMonthHandler);

populateDates();

// Function

dayNames.forEach((day) => {
  const weekNamesWrapper = document.querySelector(
    ".date-picker .dates .week-days"
  );
  const dayNameElement = document.createElement("div");
  dayNameElement.classList.add("week-day");
  dayNameElement.textContent = day;
  weekNamesWrapper.appendChild(dayNameElement);
});

function toggleDatePickerHandler(e) {
  if (!checkEventPathForClass(e.path, "dates")) {
    datesElement.classList.toggle("active");
  }
}

function goToNextMonthHandler(e) {
  dateNew.setMonth(dateNew.getMonth() + 1);
  month++;
  if (month > 11) {
    year++;
    month = 0;
  }
  mthElement.textContent = months[month] + " " + year;
  populateDates();
}

function goToPrevMonthHandler(e) {
  dateNew.setMonth(dateNew.getMonth() - 1);
  month--;
  if (month < 0) {
    year--;
    month = 11;
  }
  mthElement.textContent = months[month] + " " + year;
  populateDates();
}

function populateDates(e) {
  const lastDate = new Date(
    dateNew.getFullYear(),
    dateNew.getMonth() + 1,
    0
  ).getDate();
  const prevMonthLastDay = new Date(
    dateNew.getFullYear(),
    dateNew.getMonth(),
    0
  ).getDate();
  const firstDayIndex = dateNew.getDay();

  const lastDayIndex = new Date(
    dateNew.getFullYear(),
    dateNew.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex;

  daysElement.innerHTML = "";

  for (let x = daysIndexes[firstDayIndex]; x > 0; x--) {
    const prevDayElement = document.createElement("div");
    prevDayElement.classList.add("day");
    prevDayElement.classList.add("prev-date");
    prevDayElement.textContent = prevMonthLastDay - x + 1;
    daysElement.appendChild(prevDayElement);
  }
  for (let i = 1; i <= lastDate; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i;
    if (selectedDay == i && selectedYear == year && selectedMonth == month) {
      dayElement.classList.add("selected");
    }

    dayElement.addEventListener("click", () => {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + i);
      selectedDay = i;
      selectedMonth = month;
      selectedYear = year;
      selectedDateElement.textContent = formatDate(selectedDate);
      selectedDateElement.dataset.value = selectedDate;

      populateDates();
    });
    daysElement.appendChild(dayElement);
  }
  if (nextDays > 0) {
    for (let j = 1; j <= nextDays; j++) {
      const nextDayElement = document.createElement("div");
      nextDayElement.classList.add("day");
      nextDayElement.classList.add("next-date");
      nextDayElement.textContent = j;
      daysElement.appendChild(nextDayElement);
    }
  } else {
    days += `<div></div>`;
  }
}

// helper
function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}

function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = d.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let year = d.getFullYear();

  return `${day} / ${month} / ${year}`;
}
