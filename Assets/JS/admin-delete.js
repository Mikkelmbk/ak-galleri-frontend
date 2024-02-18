(async () => {
    let cFormDelete = document.querySelector('.js-form-delete');
    let cFormDelete__inputMongoId = cFormDelete.querySelector('.js-input-mongoId');
    let cFormDelete__serverResponse = cFormDelete.querySelector(".js-server-response");

    let cFormDelete__deleteButton = cFormDelete.querySelector(".js-button-delete");


    cFormDelete.addEventListener('submit', async (e) => {
        e.preventDefault();

        cFormDelete__serverResponse.textContent = "Arbejder på at slette produktet. Venter på svar fra serveren.";
        cFormDelete__deleteButton.classList.add('c-form__button--disabled');
        cFormDelete__deleteButton.disabled = true;

        try {
            const response = await fetch(`https://ak-galleri-backend.onrender.com/products/delete/${cFormDelete__inputMongoId.value}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            if (response.status !== 200) {
                if (responseData.error) {
                    cFormDelete__serverResponse.textContent = responseData.error;
                }
                else {
                    cFormDelete__serverResponse.textContent = "En uventet fejl opstod.";
                }
            }
            else {
                cFormDelete__serverResponse.textContent = "Produkt slettet.";
            }
            cFormDelete__deleteButton.classList.remove('c-form__button--disabled');
            cFormDelete__deleteButton.disabled = false;

        } catch (error) {
            cFormDelete__serverResponse.textContent = "En uventet fejl opstod.";
            cFormDelete__deleteButton.classList.remove('c-form__button--disabled');
            cFormDelete__deleteButton.disabled = false;
        }
    });
})();