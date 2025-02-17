// Wait for the page to fully load
window.addEventListener('load', () => {
    // Simulate the loading screen fade out after 3 seconds
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        document.querySelector('.loading-screen').style.pointerEvents = 'none';
    }, 3000); // Adjust the duration of the loading screen here (in milliseconds)

    // After the fade-out, redirect to home.html
    setTimeout(() => {
        window.location.href = 'home.html'; // Redirect to home.html after loading screen disappears
    }, 3500); // Match the redirect delay to the loading screen fade-out
});
