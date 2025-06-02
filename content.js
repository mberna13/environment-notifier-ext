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
    'courses.catalystedu.com': {
        backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red, 70% opacity
        message: 'WARNING: You are on PRODUCTION (courses.catalystedu.com)'
    },
    'courses.catalyst-edu.ca': {
        backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red, 70% opacity
        message: 'WARNING: You are on PRODUCTION (courses.catalyst-edu.ca)'
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
    'qa.catalystedu.com': {
        backgroundColor: 'rgba(0, 0, 255, 0.7)', // Blue, 70% opacity
        message: 'You are on QA (qa.catalystedu.com)'
    },
    'qa.catalyst-edu.ca': {
        backgroundColor: 'rgba(0, 0, 255, 0.7)', // Blue, 70% opacity
        message: 'You are on QA (qa.catalyst-edu.ca)'
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
    'dev.catalystedu.com': {
        backgroundColor: 'rgba(128, 0, 128, 0.7)', // Purple, 70% opacity
        message: 'You are on DEV (dev.catalystedu.com)'
    },
    'dev.catalyst-edu.ca': {
        backgroundColor: 'rgba(128, 0, 128, 0.7)', // Purple, 70% opacity
        message: 'You are on DEV (dev.catalyst-edu.ca)'
    },

    // ---- Staging ----
    'staging.labflow.com': {
        backgroundColor: 'rgba(0, 128, 0, 0.7)', // Green, 70% opacity
        message: 'You are on STAGING (staging.labflow.com)'
    },
    'staging.labflow.ca': {
        backgroundColor: 'rgba(0, 128, 0, 0.7)', // Green, 70% opacity
        message: 'You are on STAGING (staging.labflow.ca)'
    },
    'staging.catalystedu.com': {
        backgroundColor: 'rgba(0, 128, 0, 0.7)', // Green, 70% opacity
        message: 'You are on STAGING (staging.catalystedu.com)'
    },
    'staging.catalyst-edu.ca': {
        backgroundColor: 'rgba(0, 128, 0, 0.7)', // Green, 70% opacity
        message: 'You are on STAGING (staging.catalyst-edu.ca)'
    },

    // ---- UAT ----
    'uat.labflow.com': {
        backgroundColor: 'rgba(14,230,207,0.7)', // Light Green, 70% opacity
        message: 'You are on UAT (uat.labflow.com)'
    },
    'uat.labflow.ca': {
        backgroundColor: 'rgba(14,230,207,0.7)', // Light Green, 70% opacity
        message: 'You are on UAT (uat.labflow.ca)'
    },
    'uat.catalystedu.com': {
        backgroundColor: 'rgba(14,230,207,0.7)', // Light Green, 70% opacity
        message: 'You are on UAT (uat.catalystedu.com)'
    },
    'uat.catalyst-edu.ca': {
        backgroundColor: 'rgba(14,230,207,0.7)', // Light Green, 70% opacity
        message: 'You are on UAT (uat.catalyst-edu.ca)'
    },

    // ---- Argon ----
    'argon.labflow.com': {
        backgroundColor: 'rgba(252,102,7,0.7)', // Orange, 70% opacity
        message: 'You are on ARGON (argon.labflow.com)'
    },
    'argon.catalystedu.com': {
        backgroundColor: 'rgba(252,102,7,0.7)', // Orange, 70% opacity
        message: 'You are on ARGON (argon.catalystedu.com)'
    },

    // ---- Volt ----
    'volt.catalystedu.com': {
        backgroundColor: 'rgba(255, 215, 0, 0.7)', // Gold, 70% opacity
        message: 'You are on VOLT (volt.catalystedu.com)'
    },
    'volt.catalyst-edu.ca': {
        backgroundColor: 'rgba(255, 215, 0, 0.7)', // Gold, 70% opacity
        message: 'You are on VOLT (volt.catalyst-edu.ca)'
    },

    // ---- Ideas ----
    'ideas.catalystedu.com': {
        backgroundColor: 'rgba(75, 0, 130, 0.7)', // Indigo, 70% opacity
        message: 'You are on IDEAS (ideas.catalystedu.com)'
    }
};

// Shared banner style
const bannerBaseStyle = {
    position: 'fixed',
    top: '0px',
    left: '50%',
    transform: 'translateX(-50%)',

    // Let it scale to 80% of the screen width but not exceed 600px
    width: '80%',
    maxWidth: '600px',

    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: '999999',
    padding: '10px 20px',
    fontFamily: 'sans-serif',
    borderRadius: '6px'
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