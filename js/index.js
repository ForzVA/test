const END_DATE = {
  full_year: "2023",
  month: "05",
  day: "31",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const doc = document;
// Получаем время
const timeDays = doc.getElementById("timer-days");
const timeHrs = doc.getElementById("timer-hours");
const timeMinutes = doc.getElementById("timer-minutes");
const timeSeconds = doc.getElementById("timer-seconds");
// Получаем pop-up элементы
const popup = doc.getElementById("popup-overlay");
const popupTitle = doc.getElementById("popup-title");
const popupText = doc.getElementById("popup-text");
const subscribeForm = doc.getElementById("subscribe__form");
const popupCross = doc.getElementById("head__popup-close");
const popupCloseButton = doc.getElementById("head__popup__button");

// Расчёт времени для таймера
const timeDifference = (dateFrom, dateTo) => {
  return dateTo - dateFrom;
};

const end_date_str = `${END_DATE.full_year}-${END_DATE.month}-${END_DATE.day}T${END_DATE.hours}:${END_DATE.minutes}:${END_DATE.seconds}`;

requestAnimationFrame(function timer() {
  const now = new Date();
  const date = new Date(end_date_str);
  const ms_left = timeDifference(now, date);
  if (ms_left <= 0) {
    cancelAnimationFrame(timer);
  } else {
    const res = new Date(ms_left);
    const getDays = Math.floor(ms_left / 1000 / 60 / 60 / 24);
    const getHours = res.getUTCHours();
    const getMinutes = res.getUTCMinutes();
    const getSeconds = res.getUTCSeconds();

    timeDays.innerText = getDays >= 10 ? getDays : "0" + getDays;
    timeHrs.innerHTML = getHours >= 10 ? getHours : "0" + getHours;
    timeMinutes.innerHTML = getMinutes >= 10 ? getMinutes : "0" + getMinutes;
    timeSeconds.innerHTML = getSeconds >= 10 ? getSeconds : "0" + getSeconds;
    requestAnimationFrame(timer);
  }
});

// AJAX
const xhr = new XMLHttpRequest();
const resURL = "____";

subscribeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = document.getElementById("email").value;
  console.log(email);
  xhr.onreadystatechange = function () {
    // (this.readyState = 4 && this.status == 200)
    if (true) {
      popupTitle.innerHTML = "Success!";
      popupText.innerHTML =
        "You have successfully subscribed to the email newsletter";
    } else {
      popupTitle.innerHTML = "Error!";
      popupText.innerHTML = "Something went wrong";
    }
    popup.style.display = "block";
    doc.getElementById("email").value = "";
  };
  xhr.open("POST", resURL);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send({ email });
});

const closePopup = () => {
  popup.style.display = "none";
};

doc.onclick = function (e) {
  if (e.target.className != "head__popup") {
    popup.style.display = "none";
  }
};

popupCross.addEventListener("click", closePopup);
popupCloseButton.addEventListener("click", closePopup);
