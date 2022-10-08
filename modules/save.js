export function saveArray(array) {
    localStorage.setItem('arr', JSON.stringify(array));
}

export function saveCurrentTownToLS(lon, lat, name) {
    let town = {
        lon,
        lat,
        name,
    }

    localStorage.setItem('town', JSON.stringify(town));
}
