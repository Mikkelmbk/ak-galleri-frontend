(async () => {
    let cForm = document.querySelector('.js-form');
    cForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let cForm__inputUsername = cForm.querySelector('.js-input-username');
        let cForm__inputPassword = cForm.querySelector('.js-input-password');
        let cForm__serverResponse = cForm.querySelector(".js-server-response");
        let cForm__inputAdminAccountSecret = cForm.querySelector('.js-input-adminAccoutSecret');

        let cForm__registerButton = cForm.querySelector(".js-button-register");

        cForm__serverResponse.textContent = "Arbejder på at oprette bruger. Venter på svar fra serveren.";
        cForm__registerButton.classList.add('c-form__button--disabled');
        cForm__registerButton.disabled = true;

        try {
            const response = await fetch('https://ak-galleri-backend.onrender.com/auth/user/register/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: cForm__inputUsername.value,
                    password: cForm__inputPassword.value,
                    adminAccountSecret: cForm__inputAdminAccountSecret.value
                })
            });
            const responseData = await response.json();
            if (response.status !== 201) {
                if (responseData.error) {
                    cForm__serverResponse.textContent = responseData.error;
                }
                else {
                    cForm__serverResponse.textContent = "En uventet fejl opstod.";
                }
            }
            else {
                cForm__serverResponse.textContent = "Bruger oprettet.";
                // window.location.replace('/login');
            }

            cForm__registerButton.classList.remove('c-form__button--disabled');
            cForm__registerButton.disabled = false;

        } catch (error) {
            window.location.replace('/home');
        }
    });

})();