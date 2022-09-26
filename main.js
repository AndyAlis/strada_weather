openWeatherMapKey = "0ffa5a62469461b23ba6b8586a9aa0c9";
//api call for lon, lat
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//api call for current weather
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api call for 3 -5 days
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// buttons for tabs
const btnsNow = document.querySelectorAll(".toggle-btn__now");
const btnsDetails = document.querySelectorAll(".toggle-btn__details");
const btnsForecast = document.querySelectorAll(".toggle-btn__forecast");
//select tabs
const tabNow = document.querySelector(".left-now");
const tabDetails = document.querySelector(".left-details");
const tabForecast = document.querySelector(".left-forecast");
//select input
const inputSearch = document.getElementById("search_input");
//search results
const searchResults = document.querySelector(".search_results");
//select data on now tab
const currentTempNow = document.getElementById("main-weather__temp");
const currentLogoNow = document.getElementById("main-weather__logo");
const currentTownNow = document.querySelector(".main-weather__town");
//select data on details tab
const currentTownDetails = document.querySelector(".details__town");
const currentTempDetails = document.querySelector(".details_temp");
const currentFeelsDetails = document.querySelector(".details_feels");
const currentWeatherDetails = document.querySelector(".details_weather");
const currentSunriseDetails = document.querySelector(".details_sunrise");
const currentSunsetDetails = document.querySelector(".details_sunset");





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

//search

inputSearch.addEventListener('keyup', () => {
    doSearch();
});


let delayTimer;
async function doSearch() {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function() {
        if((inputSearch.value.trim().length) >= 3) {
            fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputSearch.value}&limit=5&appid=${openWeatherMapKey}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.length > 0) {
                    searchResults.innerHTML = "";
                    data.forEach(item => {
                        let li = document.createElement("li");
                        li.innerText = `${item.name}, ${item.country}, ${item.state}`;
                        li.addEventListener("click", () => {
                            checkWeather(item.lon, item.lat);
                            console.log(item.name);
                        })
                        searchResults.append(li);
                    })
                    searchResults.classList.remove("search_results-hidden");
                }
                        
                else {
                    searchResults.innerHTML = "<li>We could not find this town. Please type again.</li>";
                }
            });  
        }
        else {
            searchResults.classList.add("search_results-hidden");
        }
        
    }, 1000);
}

async function checkWeather(lon, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherMapKey}&units=metric`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        searchResults.classList.add("search_results-hidden");
        render(data);
    });
}

function render(item) {
    currentTempNow.innerText = Math.round(item.main.temp);
    currentTownNow.innerText = item.name;
    currentTownDetails.innerText = item.name;
    currentTempDetails.innerText = Math.round(item.main.temp);
    currentFeelsDetails.innerText = Math.round(item.main.feels_like);
    currentWeatherDetails.innerText = item.weather[0].main;
    currentLogoNow.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

    currentSunriseDetails.innerText = "Доделать!";
    currentSunsetDetails.innerText = "Доелать!";

}


// const currentLogoNow = document.querySelector(".main-weather__logo");




// const currentWeatherDetails = document.querySelector(".details_weather");


