const modalOverlayElem = document.createElement('div');
const jsProductModalDivElem = document.createElement('div');
const jsProductModalFigureElem = document.createElement('form');
const jsProductModalImageElem = document.createElement('img');
const jsProductModalFigcaptionElem = document.createElement('figcaption');
const jsProductModalSectionElem = document.createElement('section');

modalOverlayElem.className = "c-modal is-hidden";
jsProductModalDivElem.className = "c-product c-product--modal js-product-modal";
jsProductModalFigureElem.className = "c-product__figure";
jsProductModalImageElem.className = "c-product__image c-product__image--modal";
jsProductModalFigcaptionElem.className = "c-product__figcaption";
jsProductModalSectionElem.className = "c-product__content";

bodyElem.appendChild(modalOverlayElem);
modalOverlayElem.appendChild(jsProductModalDivElem);
jsProductModalDivElem.appendChild(jsProductModalFigureElem);
jsProductModalFigureElem.appendChild(jsProductModalImageElem);
jsProductModalFigureElem.appendChild(jsProductModalFigcaptionElem);
jsProductModalDivElem.appendChild(jsProductModalSectionElem);

modalOverlayElem.addEventListener("click",(e)=>{
    if(e.target.classList.contains("c-modal")){
        modalOverlayElem.classList.add("is-hidden");
    }
})

function addModalEvent(product){
    if(window.matchMedia("(min-width: 457px)").matches){
        modalOverlayElem.classList.remove("is-hidden");
        let productSrc = product.querySelector(".c-product__image").src;
        let productTitle = product.querySelector(".c-product__figcaption").textContent;
        jsProductModalImageElem.src = productSrc;
        jsProductModalFigcaptionElem.textContent = productTitle;
    }
}