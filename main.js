// buttons for tabs
const btnsNow = document.querySelectorAll(".toggle-btn__now");
const btnsDetails = document.querySelectorAll(".toggle-btn__details");
const btnsForecast = document.querySelectorAll(".toggle-btn__forecast");
//select tabs
const tabNow = document.querySelector(".left-now");
const tabDetails = document.querySelector(".left-details");
const tabForecast = document.querySelector(".left-forecast");

//set listeners to toggle between tabs
btnsNow.forEach((item) => {item.addEventListener("click", () => {
    tabNow.classList.remove("left-hidden");
    tabForecast.classList.add("left-hidden");
    tabDetails.classList.add("left-hidden");
    })
});

btnsDetails.forEach((item) => {item.addEventListener("click", () => {
    tabNow.classList.add("left-hidden");
    tabForecast.classList.add("left-hidden");
    tabDetails.classList.remove("left-hidden");
    })
});

btnsForecast.forEach((item) => {item.addEventListener("click", () => {
    tabNow.classList.add("left-hidden");
    tabForecast.classList.remove("left-hidden");
    tabDetails.classList.add("left-hidden");
    })
});