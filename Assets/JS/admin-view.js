(async () => {
    let cFormView = document.querySelector('.js-form-view');
    let cFormView__inputMongoId = cFormView.querySelector('.js-input-mongoId');
    let cFormView__serverResponse = cFormView.querySelector('.js-server-response');
    let cProduct = document.querySelector('.js-product-anchor');
    let cFormView__viewButton = cFormView.querySelector(".js-button-view");

    cFormView.addEventListener('submit', async (e) => {
        e.preventDefault();

        cFormView__serverResponse.textContent = "Arbejder på at vise produkt. Venter på svar fra serveren.";
        cFormView__viewButton.classList.add('c-form__button--disabled');
        cFormView__viewButton.disabled = true;

        try {
            const response = await fetch(`${BASE_ENDPOINT}/products/product/${cFormView__inputMongoId.value}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            if (response.status !== 200) {
                if (responseData.error) {
                    cFormView__serverResponse.textContent = responseData.error;
                }
                else {
                    cFormView__serverResponse.textContent = "En uventet fejl opstod.";
                }
            }
            else {
                if (cProduct) {
                    cProduct.textContent = "";
                }
                buildProducts([responseData]);
                cFormView__serverResponse.textContent = "";
            }
            cFormView__viewButton.classList.remove('c-form__button--disabled');
            cFormView__viewButton.disabled = false;

        } catch (error) {
            cFormView__serverResponse.textContent = "En uventet fejl opstod.";
            cFormView__viewButton.classList.remove('c-form__button--disabled');
            cFormView__viewButton.disabled = false;
        }
    });
})();

// fetch("https://jsonplaceholder.typicode.com/photos")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     const photos = data.slice(80, 81);
//     buildProducts(photos);
//   })
//   .catch((err)=>{
//     document.querySelector(".js-server-response").textContent = err;
//   })