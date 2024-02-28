(async () =>{
    const response = await fetch(`https://ak-galleri-backend.onrender.com/products/slider/frames`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();
    swiperTemplate(responseData, "js-frames-slider","Nye Rammer");
})();

