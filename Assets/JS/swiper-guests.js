(async () => {
    const response = await fetch(`https://ak-galleri-backend.onrender.com/products/slider/guests`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();
    swiperTemplate(responseData, "js-guests-slider", "Nye Gæster");
})();

