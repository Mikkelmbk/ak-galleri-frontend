function buildProducts(products) {
    let productAnchorElement = document.querySelector(".js-product-anchor");
    products.forEach(product => {
        const cProduct = document.createElement("div");
        const cProduct__figure = document.createElement("figure");
        const cProduct__image = document.createElement("img");
        const cProduct__figcaption = document.createElement("figcaption");
        const cProduct__section = document.createElement("section");
        const cProduct__description = document.createElement('p');
        const cProduct__dimensionContainer = document.createElement('div');
        const cProduct__dimensionHeight = document.createElement('p');
        const cProduct__dimensionWidth = document.createElement('p');

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

        productAnchorElement.appendChild(cProduct);
        cProduct.appendChild(cProduct__figure);
        cProduct__figure.appendChild(cProduct__image);
        cProduct__figure.appendChild(cProduct__figcaption);
        cProduct.appendChild(cProduct__section);
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

        if (typeof addModalEvent !== "undefined") {
            cProduct.addEventListener("click", () => {
                addModalEvent(cProduct);
            });
        }
    });
}


