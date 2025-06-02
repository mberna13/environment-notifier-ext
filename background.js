// Helper function to set badge and icon
const updateBadgeAndIcon = (tabId, url) => {
    const hostname = new URL(url).hostname;

    let badgeText = '';
    let badgeColor = '';
    let iconPath = 'icons/default.png'; // Default icon

    // Determine environment and corresponding badge/icon
    if (hostname === 'labflow.com' || hostname === 'labflow.ca' || hostname === 'courses.catalystedu.com' || hostname === 'courses.catalyst-edu.ca') {
        badgeText = 'PROD';
        badgeColor = 'rgb(255,0,0)';
        iconPath = 'icons/prod.png'; // Icon for production environment
    } else if (hostname.startsWith('qa.labflow.com') || hostname.startsWith('qa.labflow.ca') || hostname.startsWith('qa.catalystedu.com') || hostname.startsWith('qa.catalyst-edu.ca')) {
        badgeText = 'QA';
        badgeColor = 'rgb(0,0,255)';
        iconPath = 'icons/qa.png'; // Icon for QA environment
    } else if (hostname.startsWith('dev.labflow.com') || hostname.startsWith('dev.labflow.ca') || hostname.startsWith('dev.catalystedu.com') || hostname.startsWith('dev.catalyst-edu.ca')) {
        badgeText = 'DEV';
        badgeColor = 'rgb(128,0,128)';
        iconPath = 'icons/dev.png'; // Icon for development environment
    } else if (hostname.startsWith('staging.labflow.com') || hostname.startsWith('staging.labflow.ca') || hostname.startsWith('staging.catalystedu.com') || hostname.startsWith('staging.catalyst-edu.ca')) {
        badgeText = 'STG';
        badgeColor = 'rgb(0,128,0)';
        iconPath = 'icons/stg.png'; // Icon for staging environment
    } else if (hostname.startsWith('uat.labflow.com') || hostname.startsWith('uat.labflow.ca') || hostname.startsWith('uat.catalystedu.com') || hostname.startsWith('uat.catalyst-edu.ca')) {
        badgeText = 'UAT';
        badgeColor = 'rgb(214,255,117)';
        iconPath = 'icons/uat.png'; // Icon for UAT environment
    } else if (hostname.startsWith('argon.labflow.com') || hostname.startsWith('argon.catalystedu.com')) {
        badgeText = 'ARGON';
        badgeColor = 'rgb(252,102,7)';
        iconPath = 'icons/argon.png'; // Icon for Argon environment
    } else if (hostname.startsWith('volt.catalystedu.com') || hostname.startsWith('volt.catalyst-edu.ca')) {
        badgeText = 'VOLT';
        badgeColor = 'rgb(255,215,0)';
        iconPath = 'icons/volt.png'; // Icon for Volt environment
    } else if (hostname.startsWith('ideas.catalystedu.com')) {
        badgeText = 'IDEAS';
        badgeColor = 'rgb(75,0,130)';
        iconPath = 'icons/ideas.png'; // Icon for Ideas environment
    }

    // Update badge text and color
    chrome.action.setBadgeText({ text: badgeText, tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: badgeColor, tabId: tabId });

    // Update the icon
    chrome.action.setIcon({ path: iconPath, tabId: tabId });
};

// Listen for tab URL updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        updateBadgeAndIcon(tabId, changeInfo.url);
    }
});

// Listen for tab activation (switching between tabs)
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url) {
            updateBadgeAndIcon(activeInfo.tabId, tab.url);
        }
    });
});

// Set badge and icon on extension load (for currently active tab)
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url) {
        updateBadgeAndIcon(tabs[0].id, tabs[0].url);
    }
});