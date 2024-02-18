(async () => {
    try {
        const accessStatus = await fetch('https://ak-galleri-backend.onrender.com/auth/user/validate/',{
            method: 'GET',
            credentials: 'include',
        });
        accessStatus.status !== 200 ? window.location.replace('/home') : null;
    } catch (error) {
        window.location.replace('/home');
    }
})();