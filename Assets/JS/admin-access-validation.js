(async () => {
    try {
        const accessStatus = await fetch('http://localhost:3000/auth/user/validate/',{
            method: 'GET',
            credentials: 'include',
        });
        accessStatus.status !== 200 ? window.location.replace('/home') : null;
    } catch (error) {
        window.location.replace('/home');
    }
})();