window.onload = () => {

  class GetContent {
    constructor(path, resMethod, resType) {
      this.path = path;
      this.resMethod = resMethod;
      this.resType = resType;
    }
    fetchJSON() {
      const xhr = new XMLHttpRequest();
      xhr.open(this.resMethod, this.path);
      xhr.responseType = this.resType;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          new Categories(xhr.response).renderCategories()
        };
      };
      xhr.send();
    }
  };

  class Categories {
    constructor(xhrRes) {
      this.xhrRes = xhrRes;
    }
    renderCategories() {
      const hexGrid = document.querySelector("#hexGrid");
      let mainHex = '';
      let appsStruct = JSON.parse(this.xhrRes);
      appsStruct.structure.forEach(({ catName, catImage, catAlias }) => {
        mainHex += `<li class="hex"><div class="hexIn"><a class="hexLink" href="#" data-cat="${catName}"><div class="hexImageWrapper">${catImage}</div><h2 class="hexTitle">${catAlias}</h2></a></div></li>`
      });

      hexGrid.insertAdjacentHTML('beforeend', mainHex);
      const hexLink = hexGrid.querySelectorAll('.hexLink');
      const modal = document.querySelector('.modal');
      const modalInfo = document.querySelector('.modal-info');
      const modalInfoClose = document.querySelector('.modal-info-close');

      hexLink.forEach((item) => {
        item.addEventListener('click', (e) => {
          appsStruct.structure.forEach(({ catName, catApps }) => {
            if (catName === e.currentTarget.getAttribute('data-cat')) {
              let infoContent = '';
              catApps.forEach(({ appName, appLink }) => {
                modal.classList.add('modal-active');
                infoContent += `<li class="modal-info-list-item"><a class="modal-info-link" href="${appLink}">${appName}</a></li>`;
              });
              modalInfo.insertAdjacentHTML('afterbegin', `<ul class="modal-info-list">${infoContent}</ul>`);
            };
          });
        });
      });
      modalInfoClose.addEventListener('click', appInfo);
      function appInfo() {
        try {
          modal.classList.remove('modal-active');
          const modalInfoList = modalInfo.querySelector('.modal-info-list');
          modalInfoList.parentNode.removeChild(modalInfoList);
        } catch (e) {
          return
        }

      };

    };
  };

  class Menu {
    constructor(selector = 'body') {
      this.selector = selector;
    }
    menuSelect() {
      const selector = document.querySelector(this.selector);
      const items = selector.querySelectorAll('.head-nav-link');
      items.forEach((item) => {
        item.addEventListener('click', (e) => {
          let aboutsystemContent = '';
          const dataMenu = e.currentTarget.getAttribute('data-menu');
          switch (dataMenu) {
            case 'catalog':
              console.log(dataMenu);
              break;
            case 'reference':
              console.log(dataMenu);
              break;
            case 'aboutsystem':
              aboutsystemContent = '<div class="about-wrapper"><span class="about-tiltle">Единая геоинформационная система Ненецкого автономного округа (ГИС НАО)</span><ul class="about-list"><li class="about-list-item">ГИС НАО – это информационная система, предоставляющая доступ к региональным пространственным данным Ненецкого автономного округа.</li><li class="about-list-item">ГИС НАО позволяет получать оперативную и достоверную информацию о территории Ненецкого автономного округа за счёт объединения всех сведений о территории региона, населении, здравоохранении, образовании, доступности природных ресурсов, инвестиционном потенциале, инфраструктурном развитии и многих других сферах.</li><li class="about-list-item">Тематическая информация, содержащаяся в ГИС НАО, представлена в виде соответствующих приложений.</li><li class="about-list-item">В качестве дополнительных данных в ГИС НАО включены сведения с портала Росреестра,  Федеральной информационной системы территориального планирования (ФГИС ТП) и других отечественных и зарубежных источников открытых пространственных данных.</li><li class="about-list-item">По всем вопросам связанным с работой ГИС НАО, обращайтесь в отдел геоинформационных систем КУ НАО &laquo;Ненецкий информационно-аналитический центр&raquo;</li><li class="about-list-item">E-mail: <a class="aboutLink" href="mailto:gis@adm-nao.ru?subject=Сообщение с портала ГИС НАО" title="Отправить почту">gis@adm-nao.ru</span></a></li><li class="about-list-item">Телефон: <a class="aboutLink" href = "tel:+78185323907" title="Позвонить">2-39-07</a></li></ul></div>';
              break;
          };

          const modal = document.querySelector('.modal');
          const modalInfo = document.querySelector('.modal-info');
          const modalInfoClose = document.querySelector('.modal-info-close');

          modal.classList.add('modal-active');
          modalInfo.insertAdjacentHTML('afterbegin', aboutsystemContent);

          modalInfoClose.addEventListener('click', aboutInfo);
          function aboutInfo() {
            try {
              modal.classList.remove('modal-active');
              const aboutWrapper = modalInfo.querySelector('.about-wrapper');
              aboutWrapper.parentNode.removeChild(aboutWrapper);
            } catch (e) {
              return
            }
          };
        });
      })
    }
  };

  // === Управление для бургер-меню ===
  const $ = x => document.querySelector(x);
  const headNav = $('.head-nav');
  const burgerMenu = $('.burger-menu');
  const burgerMenuTop = $('.burger-menu-top');
  const burgerMenuCenter = $('.burger-menu-center');
  const burgerMenuBottom = $('.burger-menu-bottom');
  burgerMenu.addEventListener('click', burgerMenuToggle);

  function burgerMenuToggle(e) {
    headNav.classList.toggle('head-nav-active');
    burgerMenuTop.classList.toggle('burger-menu-top-active');
    burgerMenuCenter.classList.toggle('burger-menu-center-active');
    burgerMenuBottom.classList.toggle('burger-menu-bottom-active');
  };

  new GetContent('../json/structure.json', 'GET', 'text').fetchJSON();
  new Menu('.head-nav-list').menuSelect();

};