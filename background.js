// background.js

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        const url = new URL(changeInfo.url);
        if (url.hostname === 'labflow.com') {
            // Set badge text and color
            chrome.action.setBadgeText({ text: 'PROD', tabId: tabId });
            chrome.action.setBadgeBackgroundColor({ color: 'rgb(255,0,0)', tabId: tabId });
        } else {
            // Clear the badge if not on production
            chrome.action.setBadgeText({ text: '', tabId: tabId });
        }
    }
});