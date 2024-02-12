(async () => {
    let cForm = document.querySelector('.js-form');
    cForm.addEventListener('submit', async (e)=>{
        e.preventDefault();

        let cForm__inputMongoId = cForm.querySelector('.js-input-mongoId');
        let cForm__serverResponse = cForm.querySelector(".js-server-response");

        try {
            const response = await fetch(`http://localhost:3000/products/product/${cForm__inputMongoId.value}`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            if(response.status !== 200){
                if(responseData.error){
                    cForm__serverResponse.textContent = responseData.error;
                }
                else{
                    cForm__serverResponse.textContent = "En uventet fejl opstod.";
                }
            }
            else{
                buildProducts([responseData]);
            }

        } catch (error) {
            window.location.replace('/home');
        }
    })
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