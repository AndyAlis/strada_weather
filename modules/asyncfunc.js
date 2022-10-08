import {renderForecast} from './renderffuncs.js';

export function getFiveDaysForecast(lon, lat, name, apikey) {
    let result;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        renderForecast(data, name);})
    .catch((err) => alert(err + ' Ooops! Smth goes wrong! getFiveDaysForecast'));

    
}