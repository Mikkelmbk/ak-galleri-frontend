(async () => {
    let cForm = document.querySelector('.c-form');
    cForm.addEventListener('submit', async (e)=>{
        e.preventDefault();

        let cForm__inputUsername = cForm.querySelector('#username');
        let cForm__inputPassword = cForm.querySelector('#password');
        let cForm__serverResponse = cForm.querySelector(".c-form__server-response");

        try {
            const response = await fetch('http://localhost:3000/auth/user/login/',{
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
            if(response.status !== 200){
                if(responseData.error){
                    cForm__serverResponse.textContent = responseData.error;
                }
                else{
                    cForm__serverResponse.textContent = "An unexpected error occurred.";
                }
            }
            else{
                cForm__serverResponse.textContent = "";
                window.location.replace('/admin');
            }

        } catch (error) {
            let redirectIn = 2;
            console.log(`An error has occurred. Redirecting to Home page in ${redirectIn} seconds.`, error);
            setTimeout(()=>{
                window.location.replace('/home');
            },redirectIn * 1000);
        }
    })

})();