(async () => {
    let cFormDelete = document.querySelector('.js-form-delete');
    let cFormDelete__inputMongoId = cFormDelete.querySelector('.js-input-mongoId');
    let cFormDelete__serverResponse = cFormDelete.querySelector(".js-server-response");

    cFormDelete.addEventListener('submit', async (e)=>{
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/products/delete/${cFormDelete__inputMongoId.value}`,{
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            if(response.status !== 200){
                if(responseData.error){
                    cFormDelete__serverResponse.textContent = responseData.error;
                }
                else{
                    cFormDelete__serverResponse.textContent = "En uventet fejl opstod.";
                }
            }
            else{
                cFormDelete__serverResponse.textContent = "Produkt slettet.";
            }

        } catch (error) {
            cFormDelete__serverResponse.textContent = "En uventet fejl opstod.";
        }
    })
})();