if(window.location.pathname === '/' || window.location.pathname === '/index.html'){
    window.location.replace('/home');
}

let productTileId = new URLSearchParams(window.location.search).get('admin');
if(window.location.pathname.includes('/admin')){
    productTileId = 'enabled';
}

const bodyElem = document.querySelector("body");
const swiperAnchorElem = document.querySelector(".js-swiper-anchor");

// swiperTemplate handles building the HTML structure required prior to slider initialization.
function swiperTemplate(photos, jsSliderName, heading){
    const cSwiper = document.createElement("div");
    const cSwiper__heading = document.createElement('h1');
    const cSwiper__wrapper = document.createElement("div");
    const cSwiper__pagination = document.createElement('div');

    cSwiper.className = `c-swiper ${jsSliderName}`;
    cSwiper__heading.className = 'c-swiper__heading';
    cSwiper__wrapper.className = "c-swiper__wrapper swiper-wrapper";
    cSwiper__pagination.className = 'swiper-pagination c-swiper__pagination';

    cSwiper__heading.textContent = heading;

    swiperAnchorElem.appendChild(cSwiper);
    cSwiper.appendChild(cSwiper__heading);
    cSwiper.appendChild(cSwiper__wrapper);
    cSwiper.appendChild(cSwiper__pagination);

    photos.forEach((photo) => {
      const cSwiper__slide = document.createElement("div");
      const cProduct = document.createElement("div");
      const cProduct__figure = document.createElement("figure");
      const cProduct__image = document.createElement("img");
      const cProduct__figcaption = document.createElement("figcaption");

      cSwiper__slide.className = "c-swiper__slide swiper-slide";
      cProduct.className = "c-product js-product";
      cProduct__figure.className = "c-product__figure";
      cProduct__image.className = "c-product__image";
      cProduct__figcaption.className = "c-product__figcaption";

      cProduct__image.src = photo.url;
      cProduct__figcaption.textContent = photo.title;

      cSwiper__wrapper.appendChild(cSwiper__slide);
      cSwiper__slide.appendChild(cProduct);
      cProduct.appendChild(cProduct__figure);
      cProduct__figure.appendChild(cProduct__image);
      cProduct__figure.appendChild(cProduct__figcaption);

    });
}
// swiperInit handles initializing the slider after the HTML structure has been built.
function swiperInit(jsSliderName){
  const swiper = new Swiper(`.${jsSliderName}`, {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      457: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      667: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      962: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1237: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1511: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1770: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
    },
    pagination: {
      el: ".swiper-pagination.c-swiper__pagination",
      type: "bullets",
      clickable: true,
    },
  });

  document.querySelectorAll(`.${jsSliderName} .js-product`).forEach((item)=>{
    item.addEventListener("click",()=>{
      addModalEvent(item);
    })
  });
}