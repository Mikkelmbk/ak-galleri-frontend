(async () => {
    let cFormUpdate = document.querySelector('.js-form-update');
    let cFormUpdate__inputFigcaption = cFormUpdate.querySelector('.js-input-figcaption');
    let cFormUpdate__inputDescription = cFormUpdate.querySelector('.js-input-description');
    let cFormUpdate__inputHeight = cFormUpdate.querySelector('.js-input-height');
    let cFormUpdate__inputWidth = cFormUpdate.querySelector('.js-input-width');
    let cFormUpdate__inputCategory = cFormUpdate.querySelector('.js-input-category');
    let cFormUpdate__inputKeywords = cFormUpdate.querySelector('.js-input-keywords');
    let cFormUpdate__serverResponse = cFormUpdate.querySelector(".js-server-response");
    let cFormUpdate__mongoIdToUpdate; // mongoId from found product stored here for use in update endpoint. (This is to ensure that the value of the find endpoint input field is not accidentally changed between finding a product and wanting to commit the updates.)
    let cFormUpdate__updateButton = cFormUpdate.querySelector('.js-button-update');

    let cFormFind = document.querySelector('.js-form-find');
    let cFormFind__serverResponse = cFormFind.querySelector('.js-server-response');
    let cFormFind__inputMongoId = cFormFind.querySelector('.js-input-mongoId');
    let cFormFind__findButton = cFormFind.querySelector('.js-button-find');


    cFormUpdate.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!cFormUpdate__mongoIdToUpdate) return cFormUpdate__serverResponse.textContent = "Kunne ikke opdatere. Du skal først vælge et produkt at opdatere, ved og anvende 'Find produkt at opdatere' formen.";

        cFormUpdate__serverResponse.textContent = "Arbejder på at opdatere produkt. Venter på svar fra serveren.";
        cFormUpdate__updateButton.classList.add('c-form__button--disabled');
        cFormUpdate__updateButton.disabled = true;

        const formData = new FormData();

        formData.append("figcaption", cFormUpdate__inputFigcaption.value);
        formData.append("description", cFormUpdate__inputDescription.value);
        formData.append("height", cFormUpdate__inputHeight.value);
        formData.append("width", cFormUpdate__inputWidth.value);
        formData.append("category", cFormUpdate__inputCategory.value);
        formData.append("categoryId", cFormUpdate__inputCategory.value.toLowerCase());
        formData.append("keywords", cFormUpdate__inputKeywords.value.toLowerCase());

        try {
            const response = await fetch(`${BASE_ENDPOINT}/products/update/${cFormUpdate__mongoIdToUpdate}`, {
                method: 'PATCH',
                credentials: 'include',
                body: formData
            });
            const responseData = await response.json();
            if (response.status !== 200) {
                if (responseData.error) {
                    cFormUpdate__serverResponse.textContent = responseData.error;
                }
                else {
                    cFormUpdate__serverResponse.textContent = "En uventet fejl opstod ved validering af produkt data.";
                }
            }
            else {
                cFormUpdate__inputFigcaption.value = "";
                cFormUpdate__inputDescription.value = "";
                cFormUpdate__inputHeight.value = "";
                cFormUpdate__inputWidth.value = "";
                cFormUpdate__inputCategory.value = "";
                cFormUpdate__inputKeywords.value = "";

                cFormUpdate__serverResponse.textContent = "Produkt opdateret.";
                cFormFind__serverResponse.textContent = "";

                cFormUpdate__mongoIdToUpdate = undefined; // Upon successfully updating a product, remove the stored mongoId from the mongoIdToUpdate variable in order to prevent subsequent submits without having first fetched a new product to update.

            }
            cFormUpdate__updateButton.classList.remove('c-form__button--disabled');
            cFormUpdate__updateButton.disabled = false;

        } catch (error) {
            cFormUpdate__serverResponse.textContent = "En uventet fejl opstod.";
            cFormUpdate__updateButton.classList.remove('c-form__button--disabled');
            cFormUpdate__updateButton.disabled = false;
        }
    });


    cFormFind.addEventListener('submit', async (e) => {
        e.preventDefault();

        cFormUpdate__serverResponse.textContent = "";
        cFormFind__serverResponse.textContent = "Arbejder på at hente produkt. Venter på svar fra serveren.";
        cFormFind__findButton.classList.add('c-form__button--disabled');
        cFormFind__findButton.disabled = true;

        try {
            const response = await fetch(`${BASE_ENDPOINT}/products/product/${cFormFind__inputMongoId.value}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            if (response.status !== 200) {
                if (responseData.error) {
                    cFormFind__serverResponse.textContent = responseData.error;
                }
                else {
                    cFormFind__serverResponse.textContent = "En uventet fejl opstod.";
                }
            }
            else {
                cFormUpdate__inputFigcaption.value = responseData?.figcaption;
                cFormUpdate__inputDescription.value = responseData?.description;
                cFormUpdate__inputHeight.value = responseData?.height;
                cFormUpdate__inputWidth.value = responseData?.width;
                cFormUpdate__inputCategory.value = responseData?.category[0];
                cFormUpdate__inputKeywords.value = responseData?.keywords;

                cFormUpdate__mongoIdToUpdate = responseData._id; // set mongoIdToUpdate, to the returned id from the responseData. This ensures that the stored value used for the update form, always utilizes the id of the most recent product that was requested from the find form.

                cFormFind__serverResponse.textContent = "Produkt fundet. Produkt data indsat i 'Opdater et enkelt produkt' formen. Foretag ønskede ændringer, og opdater produkt.";

            }
            cFormFind__findButton.classList.remove('c-form__button--disabled');
            cFormFind__findButton.disabled = false;

        } catch (error) {
            cFormFind__serverResponse.textContent = "En uventet fejl opstod.";
            cFormFind__findButton.classList.remove('c-form__button--disabled');
            cFormFind__findButton.disabled = false;
        }
    });
})();