function saveArray(array) {
    localStorage.setItem('arr', JSON.stringify(array));
}

export default saveArray;