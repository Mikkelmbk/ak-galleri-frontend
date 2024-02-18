(async () => {
    let cFormView = document.querySelector('.js-form-view');
    let cFormView__inputMongoId = cFormView.querySelector('.js-input-mongoId');
    let cFormView__serverResponse = cFormView.querySelector('.js-server-response');
    let cProduct = document.querySelector('.js-product-anchor');
    
    cFormView.addEventListener('submit', async (e)=>{
        e.preventDefault();


        try {
            const response = await fetch(`https://ak-galleri-backend.onrender.com/products/product/${cFormView__inputMongoId.value}`,{
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            if(response.status !== 200){
                if(responseData.error){
                    cFormView__serverResponse.textContent = responseData.error;
                }
                else{
                    cFormView__serverResponse.textContent = "En uventet fejl opstod.";
                }
            }
            else{
                if(cProduct){
                    cProduct.textContent = "";
                }
                buildProducts([responseData]);
                cFormView__serverResponse.textContent = "";
            }

        } catch (error) {
            cFormView__serverResponse.textContent = "En uventet fejl opstod.";
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