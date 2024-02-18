(async () => {
    let cForm = document.querySelector('.js-form');
    cForm.addEventListener('submit', async (e) => {
        e.preventDefault();


        let cForm__inputUsername = cForm.querySelector('.js-input-username');
        let cForm__inputPassword = cForm.querySelector('.js-input-password');
        let cForm__serverResponse = cForm.querySelector(".js-server-response");
        let cForm__loginButton = cForm.querySelector(".js-button-login");

        cForm__serverResponse.textContent = "Arbejder på at logge ind. Venter på svar fra serveren.";
        cForm__loginButton.classList.add('c-form__button--disabled');
        cForm__loginButton.disabled = true;


        try {
            const response = await fetch('https://ak-galleri-backend.onrender.com/auth/user/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: cForm__inputUsername.value,
                    password: cForm__inputPassword.value,
                })
            });
            const responseData = await response.json();
            if (response.status !== 200) {
                if (responseData.error) {
                    cForm__serverResponse.textContent = responseData.error;
                }
                else {
                    cForm__serverResponse.textContent = "En uventet fejl opstod.";
                }
            }
            else {
                cForm__serverResponse.textContent = "";
                window.location.replace('/admin/');
            }
            cForm__loginButton.classList.remove('c-form__button--disabled');
            cForm__loginButton.disabled = false;
        } catch (error) {
            let redirectIn = 2;
            console.log(`An error has occurred. Redirecting to Home page in ${redirectIn} seconds.`, error);
            setTimeout(() => {
                window.location.replace('/home');
            }, redirectIn * 1000);
        }
    });

})();