(async () => {
    const path = window.location.pathname.replace(/\//g,"");
    const response = await fetch(`${BASE_ENDPOINT}/products/grid/${path}?pagination=disabled`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();
    buildProducts(responseData);
})();