export function renderForecast(data, name) {
    const forecastDetailsTempalte = document.getElementById("forecast-details");
    
    
    let weatherArray = data.list;

    // weatherArray.forEach(item => {
    //     let box = forecastDetailsTempalte.content.cloneNode(true);
    //     box.querySelector(".forecast-details__top-date").innerText = item.dt_txt.substr(10);
    //     box.querySelector(".forecast-details__top-time").innerText = item.dt_txt.substr(12,16);
    //     box.getElementById("block_temp").innerText = Math.round(item.main.temp);
    //     box.getElementById("block_feels_temp").innerText = Math.round(item.main.feels_like);
    //     box.querySelector(".forecast-details__bottom-right-text").innerText = item.weather[0].main;
    //     // box.querySelector(".").innerText
    // });
    

    console.log(data.list);
    document.querySelector(".forecast__town").innerText = `${name}, ${data.city.country} `;
}