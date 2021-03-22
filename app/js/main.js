$(document).ready(function () {
    // Загрузка структуры приложений из файла JSON
    const requestURL = '../json/structure.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();
    request.onload = appsStructure;

    function appsStructure() {
        const hexGrid = document.querySelector("#hexGrid");
        let mainHex = "";

        let appsStruct = JSON.parse(request.response);
        appsStruct.structure.forEach((items) => {
            //console.log (items);
            mainHex += `<li class="hex"><div class="hexIn"><a class="hexLink" href="#"><div class="hexImageWrapper">${items.catImage}</div><h2 class="hexTitle">${items.catAlias}</h2></a></div></li>`
        });
        hexGrid.insertAdjacentHTML ('beforeend', mainHex);
    }
});