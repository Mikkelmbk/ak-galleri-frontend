(async () => {
    let cForm = document.querySelector('.js-form');
    cForm.addEventListener('submit', async (e)=>{
        e.preventDefault();

        let cForm__inputMongoId = cForm.querySelector('.js-input-mongoId');
        let cForm__serverResponse = cForm.querySelector(".js-server-response");

        try {
            const response = await fetch(`http://localhost:3000/products/delete/${cForm__inputMongoId.value}`,{
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            if(response.status !== 201){
                if(responseData.error){
                    cForm__serverResponse.textContent = responseData.error;
                }
                else{
                    cForm__serverResponse.textContent = "En uventet fejl opstod.";
                }
            }
            else{
                cForm__serverResponse.textContent = "Produkt slettet.";
                // window.location.replace('/login');
            }

        } catch (error) {
            window.location.replace('/home');
        }
    })
})();