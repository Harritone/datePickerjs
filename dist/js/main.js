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

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mthElement.textContent = months[month] + " " + year;

selectedDateElement.textContent = formatDate(date);
selectedDateElement.dataset.value = selectedDate;

// Event listeners
datePickerElement.addEventListener("click", toggleDatePickerHandler);
nextMthElement.addEventListener("click", goToNextMonthHandler);
prevMthElement.addEventListener("click", goToPrevMonthHandler);

populateDates();

// Function

function toggleDatePickerHandler(e) {
  if (!checkEventPathForClass(e.path, "dates")) {
    datesElement.classList.toggle("active");
  }
}

function goToNextMonthHandler(e) {
  month++;
  if (month > 11) {
    year++;
    month = 0;
  }
  mthElement.textContent = months[month] + " " + year;
  populateDates();
}

function goToPrevMonthHandler(e) {
  month--;
  if (month < 0) {
    year--;
    month = 11;
  }
  mthElement.textContent = months[month] + " " + year;
  populateDates();
}

function populateDates(e) {
  daysElement.innerHTML = "";
  let amountDays = 31;

  if (month == 1) {
    amountDays = 28;
  }
  for (let i = 0; i < amountDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      dayElement.classList.add("selected");
    }

    dayElement.addEventListener("click", () => {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;
      selectedDateElement.textContent = formatDate(selectedDate);
      selectedDateElement.dataset.value = selectedDate;

      populateDates();
    });

    daysElement.appendChild(dayElement);
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
