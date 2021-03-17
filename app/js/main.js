$(document).ready(function () {
    // Загрузка структуры приложений из файла JSON
    const requestURL = '../json/structure.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();
    request.onload = appsStructure;

    function appsStructure() {
        const main = document.querySelector(".main");
        let mainHex = "";

        let appsStruct = JSON.parse(request.response);
        appsStruct.structure.forEach((items, i) => {
            mainHex += '<div class="main-category-icon"><img src="../img/hex.svg" alt="hex" height="200" width="174"></div>'
        });
        main.insertAdjacentHTML ('beforeend', mainHex);
    }
});