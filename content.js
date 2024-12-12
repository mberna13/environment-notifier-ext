// content.js
(function() {
    const hostname = window.location.hostname;

    // Check if we are on production
    // Adjust as needed if production could also appear as 'www.labflow.com'
    if (hostname === 'labflow.com') {
        // Create a warning banner
        const banner = document.createElement('div');
        banner.textContent = "WARNING: You are on PRODUCTION (labflow.com)";
        banner.style.position = 'fixed';
        banner.style.top = '0';
        banner.style.left = '0';
        banner.style.width = '100%';
        banner.style.backgroundColor = 'red';
        banner.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'; // Set a semi-transparent red
        banner.style.color = 'white';
        banner.style.fontSize = '20px';
        banner.style.fontWeight = 'bold';
        banner.style.textAlign = 'center';
        banner.style.zIndex = '9999';
        banner.style.padding = '10px 0';
        banner.style.fontFamily = 'sans-serif';

        document.body.appendChild(banner);
    }
})();