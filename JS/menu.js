
/*Scroll с меню на блок на страниценужный*/ 

const anchors = document.querySelectorAll('a[href*="#"]');
for( let anchor of anchors) {
	anchor.addEventListener("click", function(e){
		e.preventDefault();
		const blockID = anchor.getAttribute('href')
		document.querySelector('' + blockID).scrollIntoView({
			behavior: "smooth",
			block: "start",
		})
	})
}


/*мобилка меню------------------------*/ 
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i); 
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

/* если мобилка добовляем клас _tough , если комп то класс _pc*/
if (isMobile.any()) {
  document.body.classList.add("_touch"); /*класс мобилки*/

  let menuArrows =
    document.querySelectorAll( 
      ".arrow-button"                      
    ); /* все стрелочки собираем в переменную*/

  if (menuArrows.length > 0) {    /*проверка есть ли такие в массиве если есть запускаем цикл for   чтоб пробежаться по ним*/
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {        /* на каждую стрелку навешиваем событие click*/ 
			menuArrow.parentElement.classList.toggle( "_active" ); /*родителю добавляем класс active если его нет и наоборот */
      });
    }
  }
} else {
  document.body.classList.add("_pc"); /*класс пк*/
}

/* Прокрутка /плавная навигация по сайту/ к нужному разделу  классу data-goto=".page_section_2 или _1"*/
const menuLinks = document.querySelectorAll(".menu-link[data-goto]"); // выбирает только .menu-link[data-goto

if (menuLinks.length > 0) {
  //проверка
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick); // ищем их
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top +     pageYOffset -
        document.querySelector("header").offsetHeight;
      /* чтоб меню закрывалось при переходе на страницу*/
      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
        menuBody.classList.remove("_active");
      }

      /*--плавная прокрутка---*/
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

/**----Burger menu--- */
const iconMenu = document.querySelector(".menu-icon");
const menuBody = document.querySelector(".menu-body");
const Body = document.querySelector("body");
const HeaderMobil = document.querySelector("header");
const IconMenuHeader = document.querySelector(".icon-menu-header");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle(
      "_lock"
    ); /**запрещает скролить страницу при открытом мерю */
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    Body.classList.toggle("_active");
    HeaderMobil.classList.toggle("_active");
    IconMenuHeader.classList.toggle("_active");
  });
}


/* ACCORDION----все открываются-с анимацией- #accordion2---#accordion1-----*/
class ItcAccordion {
  constructor(target, config) {
    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    const defaultConfig = {
      alwaysOpen: true,
      duration: 350
    };
    this._config = Object.assign(defaultConfig, config);
    this.addEventListener();
  }
  addEventListener() {
    this._el.addEventListener('click', (e) => {
      const elHeader = e.target.closest('.accordion__header');
      if (!elHeader) {
        return;
      }
      if (!this._config.alwaysOpen) {
        const elOpenItem = this._el.querySelector('.accordion__item_show');
        if (elOpenItem) {
          elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
        }
      }
      this.toggle(elHeader.parentElement);
    });
  }
  show(el) {
    const elBody = el.querySelector('.accordion__body');
    if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
      return;
    }
    elBody.style.display = 'block';
    const height = elBody.offsetHeight;
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.add('collapsing');
    el.classList.add('accordion__item_slidedown');
    elBody.offsetHeight;
    elBody.style.height = `${height}px`;
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      el.classList.remove('accordion__item_slidedown');
      elBody.classList.add('collapse');
      el.classList.add('accordion__item_show');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  hide(el) {
    const elBody = el.querySelector('.accordion__body');
    if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
      return;
    }
    elBody.style.height = `${elBody.offsetHeight}px`;
    elBody.offsetHeight;
    elBody.style.display = 'block';
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.remove('collapse');
    el.classList.remove('accordion__item_show');
    elBody.classList.add('collapsing');
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      elBody.classList.add('collapse');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  toggle(el) {
    el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
  }
}
