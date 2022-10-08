export function renderForecast(data, name) {
    const forecastDetailsTempalte = document.getElementById("forecast-details");
    
    
    let weatherArray = data.list;

    document.querySelector(".left-forecast__forecast").innerHTML = "";

    weatherArray.forEach(item => {
        
        let box = forecastDetailsTempalte.content.cloneNode(true);
        box.querySelector(".forecast-details__top-date").innerText = item.dt_txt.slice(0,10);
        box.querySelector(".forecast-details__top-time").innerText = item.dt_txt.slice(11,16);
        box.getElementById("block_temp").innerText = Math.round(item.main.temp) + " °";
        box.getElementById("block_feels_temp").innerText = Math.round(Number(item.main.feels_like)) + " °";
        box.querySelector(".forecast-details__bottom-right-text").innerText = item.weather[0].main;
        // box.querySelector(".").innerText
        

        let icon = document.createElement('img');
        icon.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

        box.querySelector(".forecast-details__bottom-right-icon").append(icon);
        
        document.querySelector(".left-forecast__forecast").append(box);
    });
    

    
    document.querySelector(".forecast__town").innerText = `${name}, ${data.city.country} `;
}