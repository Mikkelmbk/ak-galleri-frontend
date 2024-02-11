function buildProducts(photos) {
    let productAnchorElement = document.querySelector(".js-product-anchor");
    photos.forEach(photo => {
        const cProduct = document.createElement("div");
        const cProduct__figure = document.createElement("figure");
        const cProduct__image = document.createElement("img");
        const cProduct__figcaption = document.createElement("figcaption");
        const cProduct__section = document.createElement("section");


        cProduct.className = "c-product js-product";
        cProduct__figure.className = "c-product__figure";
        cProduct__image.className = "c-product__image";
        cProduct__figcaption.className = "c-product__figcaption";
        cProduct__section.className = "c-product__content";


        cProduct__image.src = photo.url;
        cProduct__figcaption.textContent = photo.title;


        productAnchorElement.appendChild(cProduct);
        cProduct.appendChild(cProduct__figure);
        cProduct__figure.appendChild(cProduct__image);
        cProduct__figure.appendChild(cProduct__figcaption);
        cProduct.appendChild(cProduct__section);

        if (typeof addModalEvent !== "undefined") {
            cProduct.addEventListener("click", () => {
                addModalEvent(cProduct);
            });
        }
    });
}


