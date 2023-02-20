// Получаем время
const timeDays = document.getElementsByClassName("timer__time-block__days");
const timeHrs = document.getElementsByClassName("timer__time-block__hrs");
const timeMinutes = document.getElementsByClassName(
  "timer__time-block__minutes"
);
const timeSeconds = document.getElementsByClassName(
  "timer__time-block__seconds"
);
// Получаем pop-up элементы
const popup = document.getElementsByClassName("head__popup-overlay");
const popupTitle = document.getElementsByClassName("head__popup-title");
const popupText = document.getElementsByClassName("head__popup-text");
const subscribeForm = document.getElementById("subscribe__form");
const popupCross = document.getElementById("head__popup-close");
const popupCloseButton = document.getElementById("head__popup__button");

// Расчёт времени для таймера
const timeDifference = (dateFrom, dateTo) => {
  return dateTo - dateFrom;
};

const end_date = {
  full_year: "2023",
  month: "05",
  day: "31",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

let end_date_str = `${end_date.full_year}-${end_date.month}-${end_date.day}T${end_date.hours}:${end_date.minutes}:${end_date.seconds}`;

const timer = setInterval(function () {
  const now = new Date();
  const date = new Date(end_date_str);
  const ms_left = timeDifference(now, date);
  if (ms_left <= 0) {
    clearInterval(timer);
  } else {
    const res = new Date(ms_left);
    const getDays = Math.floor(ms_left / 1000 / 60 / 60 / 24);
    const getHours = res.getUTCHours();
    const getMinutes = res.getUTCMinutes();
    const getSeconds = res.getUTCSeconds();

    timeDays[0].innerText = getDays >= 10 ? getDays : "0" + getDays;
    timeHrs[0].innerHTML = getHours >= 10 ? getHours : "0" + getHours;
    timeMinutes[0].innerHTML = getMinutes >= 10 ? getMinutes : "0" + getMinutes;
    timeSeconds[0].innerHTML = getSeconds >= 10 ? getSeconds : "0" + getSeconds;
  }
}, 1000);

// AJAX
const xhr = new XMLHttpRequest();
const resURL = "____";

subscribeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const formData = new FormData();
  formData.append("email", email);
  xhr.onreadystatechange = function () {
    // (this.readyState = 4 && this.status == 200)
    if (true) {
      popupTitle[0].innerHTML = "Success!";
      popupText[0].innerHTML =
        "You have successfully subscribed to the email newsletter";
    } else {
      popupTitle[0].innerHTML = "Error!";
      popupText[0].innerHTML = "Something went wrong";
    }
    popup[0].style.visibility = "visible";
  };
  xhr.open("POST", resURL);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(formData);
});

const closePopup = () => {
  popup[0].style.visibility = "hidden";
};

popupCross.addEventListener("click", closePopup);
popupCloseButton.addEventListener("click", closePopup);
