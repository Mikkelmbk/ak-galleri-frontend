if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '/home/index.html') {
    window.location.replace('/home');
}

let productTileId = new URLSearchParams(window.location.search).get('admin');
if (window.location.pathname.includes('/admin')) {
    productTileId = 'enabled';
}

const bodyElem = document.querySelector("body");
const swiperAnchorElem = document.querySelector(".js-swiper-anchor");
const BASE_ENDPOINT = "https://ak-galleri-backend.onrender.com";

// swiperTemplate handles building the HTML structure required prior to slider initialization.
function swiperTemplate(products, jsSliderName, heading) {
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

    products.forEach((product) => {
        const cSwiper__slide = document.createElement("div");
        const cProduct = document.createElement("div");
        const cProduct__figure = document.createElement("figure");
        const cProduct__image = document.createElement("img");
        const cProduct__figcaption = document.createElement("figcaption");
        const cProduct__section = document.createElement("section");
        const cProduct__description = document.createElement('p');
        const cProduct__dimensionContainer = document.createElement('div');
        const cProduct__dimensionHeight = document.createElement('p');
        const cProduct__dimensionWidth = document.createElement('p');

        cSwiper__slide.className = "c-swiper__slide swiper-slide";
        cProduct.className = "c-product js-product";
        cProduct__figure.className = "c-product__figure";
        cProduct__image.className = "c-product__image";
        cProduct__figcaption.className = "c-product__figcaption";
        cProduct__section.className = "c-product__content";
        cProduct__description.className = "c-product__description";
        cProduct__dimensionContainer.className = "c-product__dimension-container";
        cProduct__dimensionHeight.className = "c-product__dimension-height";
        cProduct__dimensionWidth.className = "c-product__dimension-width";

        cProduct__image.src = product.url || product.imgUrl;
        cProduct__figcaption.textContent = product.title || product.figcaption;
        cProduct__description.textContent = product.description ?? '';
        cProduct__dimensionHeight.textContent = product.height ? `Højde: ${product.height}` : '';
        cProduct__dimensionWidth.textContent = product.width ? `Bredde: ${product.width}` : '';

        cSwiper__wrapper.appendChild(cSwiper__slide);
        cSwiper__slide.appendChild(cProduct);
        cProduct.appendChild(cProduct__figure);
        cProduct.appendChild(cProduct__section);
        cProduct__figure.appendChild(cProduct__image);
        cProduct__figure.appendChild(cProduct__figcaption);
        cProduct__section.appendChild(cProduct__description);
        cProduct__section.appendChild(cProduct__dimensionContainer);
        cProduct__dimensionContainer.appendChild(cProduct__dimensionHeight);
        cProduct__dimensionContainer.appendChild(cProduct__dimensionWidth);

        // productTileId conditional rendering
        if (productTileId == 'enabled' && product._id) {
            const cProduct__productTileId = document.createElement("p");

            cProduct__productTileId.className = "c-product__product-tile-id";

            cProduct__productTileId.textContent = `Produkt id: ${product._id}`;

            cProduct__section.appendChild(cProduct__productTileId);
        }

    });

    swiperInit(jsSliderName);

}
// swiperInit handles initializing the slider after the HTML structure has been built.
function swiperInit(jsSliderName) {
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

    document.querySelectorAll(`.${jsSliderName} .js-product`).forEach((item) => {
        item.addEventListener("click", () => {
            addModalEvent(item);
        });
    });
}