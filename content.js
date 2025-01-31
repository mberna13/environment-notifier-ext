// content.js

// Color & message for each environment on both .com and .ca.
const environmentSettings = {
    // ---- Production ----
    'labflow.com': {
        backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red, 70% opacity
        message: 'WARNING: You are on PRODUCTION (labflow.com)'
    },
    'labflow.ca': {
        backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red, 70% opacity
        message: 'WARNING: You are on PRODUCTION (labflow.ca)'
    },

    // ---- QA ----
    'qa.labflow.com': {
        backgroundColor: 'rgba(0, 0, 255, 0.7)', // Blue, 70% opacity
        message: 'You are on QA (qa.labflow.com)'
    },
    'qa.labflow.ca': {
        backgroundColor: 'rgba(0, 0, 255, 0.7)', // Blue, 70% opacity
        message: 'You are on QA (qa.labflow.ca)'
    },

    // ---- Dev ----
    'dev.labflow.com': {
        backgroundColor: 'rgba(128, 0, 128, 0.7)', // Purple, 70% opacity
        message: 'You are on DEV (dev.labflow.com)'
    },
    'dev.labflow.ca': {
        backgroundColor: 'rgba(128, 0, 128, 0.7)', // Purple, 70% opacity
        message: 'You are on DEV (dev.labflow.ca)'
    },

    // ---- Staging ----
    'staging.labflow.com': {
        backgroundColor: 'rgba(0, 128, 0, 0.7)', // Green, 70% opacity
        message: 'You are on STAGING (staging.labflow.com)'
    },
    'staging.labflow.ca': {
        backgroundColor: 'rgba(0, 128, 0, 0.7)', // Green, 70% opacity
        message: 'You are on STAGING (staging.labflow.ca)'
    }
};

// Shared banner style
const bannerBaseStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: '999999',   // ensure it appears on top
    padding: '10px 0',
    fontFamily: 'sans-serif'
};

// Grab the current hostname
const hostname = window.location.hostname;

// If the hostname is one we recognize, create a banner
const envConfig = environmentSettings[hostname];
if (envConfig) {
    const banner = document.createElement('div');
    banner.textContent = envConfig.message;

    // Apply the base style
    Object.keys(bannerBaseStyle).forEach((key) => {
        banner.style[key] = bannerBaseStyle[key];
    });

    // Apply environment-specific background color
    banner.style.backgroundColor = envConfig.backgroundColor;

    // Append banner to the top of the page
    document.body.appendChild(banner);
}
