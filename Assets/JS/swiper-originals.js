(async () =>{
    const response = await fetch(`https://ak-galleri-backend.onrender.com/products/slider/originals`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();
    swiperTemplate(responseData, "js-originals-slider","Nye Originaler");
})();


