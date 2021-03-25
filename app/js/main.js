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
    appsStruct.structure.forEach(({ catName, catImage, catAlias } = items) => {
      mainHex += `<li class="hex"><div class="hexIn"><a class="hexLink" href="#" data-cat="${catName}"><div class="hexImageWrapper">${catImage}</div><h2 class="hexTitle">${catAlias}</h2></a></div></li>`
    });

    hexGrid.insertAdjacentHTML('beforeend', mainHex);
    const hexLink = hexGrid.querySelectorAll('.hexLink');
    const modal = document.querySelector('.modal');
    const modalInfo = document.querySelector('.modal-info');
    modalInfo.insertAdjacentHTML('beforeend', '<ul class="modal-info-list"></ul>');
    const modalInfoList = modalInfo.querySelector('.modal-info-list');
    const modalInfoClose = document.querySelector('.modal-info-close');


    for (let i = 0, length = hexLink.length; i < length; i++) {
      hexLink[i].addEventListener('click', (e) => {
        appsStruct.structure.forEach(({ catName, catApps } = items) => {
          if (catName === e.currentTarget.getAttribute('data-cat')) {
            let infoContent = '';
            modalInfoList.innerHTML='';
            catApps.forEach(({ appName, appLink } = item) => {
              modal.classList.add('modal-active');
              infoContent += `<li class="modal-info-list-item"><a class="modal-info-link" href="${appLink}">${appName}</a></li>`;
            });
            modalInfoList.insertAdjacentHTML('afterbegin', infoContent);
          };
        });
      });
    };
    modalInfoClose.addEventListener('click', (e) => {
      modal.classList.remove('modal-active');
    });
  };

  const $ = x => document.querySelector(x);
  const headNav = $('.head-nav');
  const burgerMenu = $('.burger-menu');
  const burgerMenuTop = $('.burger-menu-top');
  const burgerMenuCenter = $('.burger-menu-center');
  const burgerMenuBottom = $('.burger-menu-bottom');
  burgerMenu.addEventListener('click', burgerMenuToggle); // == Переключение бургер-меню по клику ==
  function burgerMenuToggle(e) {
    headNav.classList.toggle('head-nav-active');
    burgerMenuTop.classList.toggle('burger-menu-top-active');
    burgerMenuCenter.classList.toggle('burger-menu-center-active');
    burgerMenuBottom.classList.toggle('burger-menu-bottom-active');
  };

});