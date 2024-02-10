(async () => {
    try {
        const accessStatus = await fetch('http://localhost:3000/auth/user/validate/',{
            method: 'GET',
            credentials: 'include',
        });
        console.log(accessStatus);
        accessStatus.status !== 200 ? window.location.replace('/home') : null;
    } catch (error) {
        let redirectIn = 2;
        console.log(`An error has occurred. Redirecting to Home page in ${redirectIn} seconds.`, error);
        setTimeout(()=>{
            window.location.replace('/home');
        },redirectIn * 1000);
    }
})();