(async () => {
    let cForm = document.querySelector('.js-form-update');
    cForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let cForm__serverResponse = cForm.querySelector(".js-server-response");

        const formData = new FormData();
        let cForm__inputFigcaption = cForm.querySelector('.js-input-figcaption');
        let cForm__inputDescription = cForm.querySelector('.js-input-description');
        let cForm__inputHeight = cForm.querySelector('.js-input-height');
        let cForm__inputWidth = cForm.querySelector('.js-input-width');
        let cForm__inputCategory = cForm.querySelector('.js-input-category');
        let cForm__inputKeywords = cForm.querySelector('.js-input-keywords');

        formData.append("figcaption", cForm__inputFigcaption.value);
        formData.append("description", cForm__inputDescription.value);
        formData.append("height", cForm__inputHeight.value);
        formData.append("width", cForm__inputWidth.value);
        formData.append("category", cForm__inputCategory.value);
        formData.append("categoryId", cForm__inputCategory.value.toLowerCase());
        formData.append("keywords", cForm__inputKeywords.value.toLowerCase());

        try {
            const response = await fetch(`http://localhost:3000/products/update/${cForm__inputMongoId.value}`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            const responseData = await response.json();
            if (response.status !== 200) {
                if (responseData.error) {
                    cForm__serverResponse.textContent = responseData.error;
                }
                else {
                    cForm__serverResponse.textContent = "En uventet fejl opstod ved validering af produkt data.";
                }
            }
            else {
                cForm__inputFigcaption.value = "";
                cForm__inputDescription.value = "";
                cForm__inputHeight.value = "";
                cForm__inputWidth.value = "";
                cForm__inputCategory.value = "";
                cForm__inputKeywords.value = "";
                cForm__inputImgUrl.value = "";

                cForm__serverResponse.textContent = "Produkt opdateret.";
            }

        } catch (error) {
            cForm__serverResponse.textContent = "En uventet fejl opstod. Billede filen var muligvis for stor.";
            // window.location.replace('/home');
        }
    });

})();