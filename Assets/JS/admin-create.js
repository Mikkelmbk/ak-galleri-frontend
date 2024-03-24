(async () => {
    let cFormCreate = document.querySelector('.js-form-create');
    let cFormCreate__inputFigcaption = cFormCreate.querySelector('.js-input-figcaption');
    let cFormCreate__inputDescription = cFormCreate.querySelector('.js-input-description');
    let cFormCreate__inputHeight = cFormCreate.querySelector('.js-input-height');
    let cFormCreate__inputWidth = cFormCreate.querySelector('.js-input-width');
    let cFormCreate__inputCategory = cFormCreate.querySelector('.js-input-category');
    let cFormCreate__inputKeywords = cFormCreate.querySelector('.js-input-keywords');
    let cFormCreate__inputImgUrl = cFormCreate.querySelector('.js-input-imgUrl');
    let cFormCreate__serverResponse = cFormCreate.querySelector(".js-server-response");
    let cFormCreate__createButton = cFormCreate.querySelector(".js-button-create");

    cFormCreate.addEventListener('submit', async (e) => {
        e.preventDefault();


        cFormCreate__serverResponse.textContent = "Arbejder på at oprette produkt. Venter på svar fra serveren.";
        cFormCreate__createButton.classList.add('c-form__button--disabled');
        cFormCreate__createButton.disabled = true;

        const formData = new FormData();

        formData.append("figcaption", cFormCreate__inputFigcaption.value);
        formData.append("description", cFormCreate__inputDescription.value);
        formData.append("height", cFormCreate__inputHeight.value);
        formData.append("width", cFormCreate__inputWidth.value);
        formData.append("category", cFormCreate__inputCategory.value);
        formData.append("categoryId", cFormCreate__inputCategory.value.toLowerCase());
        formData.append("keywords", cFormCreate__inputKeywords.value.toLowerCase());


        try {
            const response = await fetch(`${BASE_ENDPOINT}/products/validate/`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            const responseData = await response.json();
            if (response.status !== 200) {
                if (responseData.error) {
                    cFormCreate__serverResponse.textContent = responseData.error;
                }
                else {
                    cFormCreate__serverResponse.textContent = "En uventet fejl opstod ved validering af produkt data.";
                }

                cFormCreate__createButton.classList.remove('c-form__button--disabled');
                cFormCreate__createButton.disabled = false;

            }
            else {
                formData.append("imgUrl", cFormCreate__inputImgUrl.files[0]); // validation fetch response succeeded, which means all of the product information are allowed to pass. Adding imgUrl to the formData and calling the add route to create the product.
                const response = await fetch(`${BASE_ENDPOINT}/products/add/`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                });
                const responseData = await response.json();
                if (response.status !== 201) {
                    if (responseData.error) {
                        cFormCreate__serverResponse.textContent = responseData.error;
                    }
                    else {
                        cFormCreate__serverResponse.textContent = "En uventet fejl opstod ved oprettelse af produktet.";
                    }
                }
                else {
                    cFormCreate__inputFigcaption.value = "";
                    cFormCreate__inputDescription.value = "";
                    cFormCreate__inputHeight.value = "";
                    cFormCreate__inputWidth.value = "";
                    cFormCreate__inputCategory.value = "";
                    cFormCreate__inputKeywords.value = "";
                    cFormCreate__inputImgUrl.value = "";

                    cFormCreate__serverResponse.textContent = `Produkt oprettet med følgende produkt Id: '${responseData.insertedId}'`;
                }

            }

            cFormCreate__createButton.classList.remove('c-form__button--disabled');
            cFormCreate__createButton.disabled = false;

        } catch (error) {
            cFormCreate__serverResponse.textContent = "En uventet fejl opstod. Billede filen var muligvis for stor.";
            cFormCreate__createButton.classList.remove('c-form__button--disabled');
            cFormCreate__createButton.disabled = false;
        }
    });

})();