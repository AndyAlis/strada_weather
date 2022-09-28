openWeatherMapKey = "0ffa5a62469461b23ba6b8586a9aa0c9";
const townsList = [{id: "1", name: "Moscow", country: "RU", lon: "1", lat: "1"}, {id: "2", name: "Saint-Petersburg", country: "RU", lon: "2", lat: "2"}]
// openWeatherMapKey = "0ffa5a62469461b23ba6b8586a9a";
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
const searchBtn = document.querySelector(".search_btn");
//select data on now tab
const currentTempNow = document.getElementById("main-weather__temp");
const currentLogoNow = document.querySelector(".main-weather__logo");
const currentTownNow = document.querySelector(".main-weather__town");
const currentSaveTownNow = document.querySelector(".main-weather__save-town");
//select data on details tab
const currentTownDetails = document.querySelector(".details__town");
const currentTempDetails = document.querySelector(".details_temp");
const currentFeelsDetails = document.querySelector(".details_feels");
const currentWeatherDetails = document.querySelector(".details_weather");
const currentSunriseDetails = document.querySelector(".details_sunrise");
const currentSunsetDetails = document.querySelector(".details_sunset");
//select towns list
const townsListUl = document.querySelector(".towns-list");
const townsListTemplate = document.getElementById("templateForTownsList");




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
                // console.log("Сработало!");
                // console.log(data);
                
                if (data.length > 0) {
                    searchResults.innerHTML = "";
                    data.forEach(item => {
                        let li = document.createElement("li");
                        li.innerText = `${item.name}, ${item.country}, ${item.state}`;
                        li.addEventListener("click", () => {
                            checkWeather(item.lon, item.lat, item.name);
                            // console.log(item.name);
                        })
                        searchResults.append(li);
                    })
                    searchResults.classList.remove("search_results-hidden");
                }
                        
                else {
                    searchResults.classList.remove("search_results-hidden");
                    searchResults.innerHTML = "<li>We could not find this town. Please type again.</li>";
                }
            })
            .catch(() => alert('Ooops! Smth goes wrong! First fetch'));  
        }
        else {
            searchResults.classList.add("search_results-hidden");
        }
        
    }, 1000);
}

async function checkWeather(lon, lat, name) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherMapKey}&units=metric`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        searchResults.classList.add("search_results-hidden");
        render(data, name);
    })
    .catch(() => alert('Ooops! Smth goes wrong! Second Fetch'));
}

function render(item, name) {
    currentTempNow.innerText = Math.round(item.main.temp) + " °";
    currentTownNow.innerText = `${name}, ${item.sys.country}`;
    currentTownDetails.innerText = `${name}, ${item.sys.country}`;
    currentTempDetails.innerText = Math.round(item.main.temp) + " °";
    currentFeelsDetails.innerText = Math.round(item.main.feels_like) + " °";
    currentWeatherDetails.innerText = item.weather[0].main;
    currentLogoNow.innerHTML = `<img id="main-weather__logo" src="https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png" alt="">`;
    
    // currentLogoNow.src = ``;

    currentSunriseDetails.innerText = timeFromSec(item.sys.sunrise);
    currentSunsetDetails.innerText = timeFromSec(item.sys.sunset);

    renderTownsList();
}

function timeFromSec(seconds) {
    let date = new Date(seconds * 1000);
    let result = `${date.getHours()}:${date.getMinutes()}`;
    return result;
}

function renderTownsList() {
    let li = townsListTemplate.content.cloneNode(true);
    townList.forEach(town => {
        li.getElementById("templateForTownsList_li").innerText = `${town.name}, ${town.country.toUpperCase()}`;

        // закончил тут, думать не могу
    })
};


renderTownsList();