class DatePicker {
  constructor(container) {
    this.container = container;
    this.selectedDateElement = container.querySelector(".selected-date");
    this.mthElement = container.querySelector(".month .mth");
    this.datesElement = container.querySelector(".dates");
    this.nextMthElement = container.querySelector(".month .next-mth");
    this.prevMthElement = container.querySelector(".month .prev-mth");
    this.daysElement = container.querySelector(".dates .days");

    this.months = [
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
    this.daysIndexes = [6, 0, 1, 2, 3, 4, 5, 0];
    this.dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    this.date = new Date();
    this.day = this.date.getDate();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    this.selectedDate = this.date;
    this.selectedDay = this.day;
    this.selectedYear = this.year;

    this.startDate = new Date();
    this.startDate.setDate(1);

    this.mthElement.textContent = this.months[this.month] + " " + this.year;
    this.selectedDateElement.textContent = Helper.formatDate(this.date);
    this.selectedDateElement.dataset.value = this.selectedDate;
    this.weekNamesWrapper = this.container.querySelector(".dates .week-days");
  }

  init() {
    this.populateDates();

    // Event listeners
    this.connectConteiner();
    this.connectNextMonth();
    this.connectPrevMonth();

    // populate week day names
    this.populateWeekDayNames();
  }

  populateWeekDayNames() {
    this.dayNames.forEach((day) => {
      const dayNameElement = document.createElement("div");
      dayNameElement.classList.add("week-day");
      dayNameElement.textContent = day;
      this.weekNamesWrapper.appendChild(dayNameElement);
    });
  }

  connectConteiner() {
    this.container.addEventListener(
      "click",
      this.toggleContainerHandler.bind(this)
    );
  }

  connectNextMonth() {
    this.nextMthElement.addEventListener(
      "click",
      this.goToNextMonthHandler.bind(this)
    );
  }

  connectPrevMonth() {
    this.prevMthElement.addEventListener(
      "click",
      this.goToPrevMonthHandler.bind(this)
    );
  }

  toggleContainerHandler(e) {
    if (!Helper.checkEventPath(e.path, "dates")) {
      this.datesElement.classList.toggle("active");
    }
  }

  goToNextMonthHandler(e) {
    this.startDate.setMonth(this.startDate.getMonth() + 1);
    this.month++;
    if (this.month > 11) {
      this.year++;
      this.month = 0;
    }
    this.mthElement.textContent = this.months[this.month] + " " + this.year;
    this.populateDates();
  }
  goToPrevMonthHandler(e) {
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.month--;
    if (this.month < 0) {
      this.year--;
      this.month = 11;
    }
    this.mthElement.textContent = this.months[this.month] + " " + this.year;
    this.populateDates();
  }

  populateDates(e) {
    const lastDate = new Date(
      this.startDate.getFullYear(),
      this.startDate.getMonth() + 1,
      0
    ).getDate();

    const prevMonthLastDay = new Date(
      this.startDate.getFullYear(),
      this.startDate.getMonth(),
      0
    ).getDate();
    const firstDayIndex = this.startDate.getDay();

    const lastDayIndex = new Date(
      this.startDate.getFullYear(),
      this.startDate.getMonth() + 1,
      0
    ).getDay();

    const nextDays = 7 - lastDayIndex;

    this.daysElement.innerHTML = "";

    for (let x = this.daysIndexes[firstDayIndex]; x > 0; x--) {
      const prevDayElement = document.createElement("div");
      prevDayElement.classList.add("day");
      prevDayElement.classList.add("prev-date");
      prevDayElement.textContent = prevMonthLastDay - x + 1;
      this.daysElement.appendChild(prevDayElement);
    }

    for (let i = 1; i <= lastDate; i++) {
      const dayElement = document.createElement("dv");
      dayElement.classList.add("day");
      dayElement.textContent = i;
      if (
        this.selectedDay === i &&
        this.selectedYear === this.year &&
        this.selectedMonth === this.month
      ) {
        dayElement.classList.add("selected");
      }

      dayElement.addEventListener("click", () => {
        this.selectedDate = new Date(
          this.year + "-" + (this.month + 1) + "-" + i
        );
        this.selectedDay = i;
        this.selectedMonth = this.month;
        this.selectedYear = this.year;
        this.selectedDateElement.textContent = Helper.formatDate(
          this.selectedDate
        );

        this.populateDates();
      });

      this.daysElement.appendChild(dayElement);
    }

    if (nextDays > 0) {
      for (let j = 1; j <= nextDays; j++) {
        const nextDayElement = document.createElement("div");
        nextDayElement.classList.add("day");
        nextDayElement.classList.add("next-date");
        nextDayElement.textContent = j;
        this.daysElement.appendChild(nextDayElement);
      }
    } else {
      nextDayElement = document.createElement("div");
    }
  }
}

class Helper {
  static checkEventPath(path, selector) {
    for (let i = 0; i < path.length; i++) {
      if (path[i].classList && path[i].classList.contains(selector)) {
        return true;
      }
    }
    return false;
  }

  static formatDate(d) {
    let day = d.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    const year = d.getFullYear();
    return `${day} / ${month} / ${year}`;
  }
}

const container = document.querySelector(".date-picker");
const datePicker = new DatePicker(container);
datePicker.init();
