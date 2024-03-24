(async () =>{
    const response = await fetch(`${BASE_ENDPOINT}/products/slider/frames`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();
    swiperTemplate(responseData, "js-frames-slider","Nye Rammer");
})();

