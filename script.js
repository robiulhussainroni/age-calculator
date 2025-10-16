"use strict";

const birthYearEl = document.getElementById("birth-year");
const birthMonthEl = document.getElementById("birth-month");
const birthDayEl = document.getElementById("birth-day");
const calculateBtn = document.getElementById("btn");
const resultEl = document.getElementById("age-show");
const modalEl = document.getElementById("modal");
const resultModalEl = document.getElementById("age-show-modal");
const againBtn = document.getElementById("again");
const formEl = document.querySelector(".age-form");

calculateBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const birthYear = Number(birthYearEl.value);
  const birthMonth = Number(birthMonthEl.value);
  const birthDay = Number(birthDayEl.value);

  if (
    birthYear <= 0 ||
    birthMonth <= 0 ||
    birthDay <= 0 ||
    birthMonth > 12 ||
    birthDay > 31
  ) {
    resultEl.innerHTML = "Please enter valid values.";
    return;
  }

  if (birthMonth === 2) {
    const leapYear =
      (birthYear % 4 === 0 && birthYear % 100 !== 0) || birthYear % 400 === 0;
    if (leapYear && birthDay > 29) {
      resultEl.innerHTML = "February doesn't have more than 29 days.";
      return;
    } else if (!leapYear && birthDay > 28) {
      resultEl.innerHTML =
        "February doesn't have more than 28 days (Except Leap Year : 29 days).";
      return;
    }
  }
  if (
    (birthMonth === 4 ||
      birthMonth === 6 ||
      birthMonth === 9 ||
      birthMonth === 11) &&
    birthDay > 30
  ) {
    resultEl.innerHTML = "This month doesn't have more than 30 days.";
  } else if (
    (birthMonth === 1 ||
      birthMonth === 3 ||
      birthMonth === 5 ||
      birthMonth === 7 ||
      birthMonth === 8 ||
      birthMonth === 10 ||
      birthMonth === 12) &&
    birthDay > 31
  ) {
    resultEl.innerHTML = "This month doesn't have more than 31 days.";
  } else {
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDay = today.getDate();

    let ageYear = currentYear - birthYear;
    let ageMonth = currentMonth - birthMonth;
    let ageDay = currentDay - birthDay;

    if (ageDay < 0) {
      ageMonth--;
      ageDay += new Date(currentYear, currentMonth - 1, 0).getDate();
    }

    if (ageMonth < 0) {
      ageYear--;
      ageMonth += 12;
    }

    const yearMessage = ageYear === 1 ? "Year" : "Years";
    const monthMessage = ageMonth === 1 ? "Month" : "Months";
    const dayMessage = ageDay === 1 ? "Day" : "Days";
    modalEl.classList.remove("hidden");
    resultModalEl.innerHTML = `${ageYear} ${yearMessage}, ${ageMonth} ${monthMessage}, ${ageDay} ${dayMessage}`;
    resultModalEl.style.color = "#2fa127ff";
    formEl.style.display = "none";
  }
});

againBtn.addEventListener("click", function (e) {
  e.preventDefault();
  modalEl.classList.add("hidden");
  birthYearEl.value = "";
  birthMonthEl.value = "";
  birthDayEl.value = "";
  resultEl.innerHTML = "Your age is : ";
  formEl.style.display = "block";
});
