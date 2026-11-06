// background.js — per-tab toolbar badge + icon, and click-to-toggle the banner.
importScripts('envs.js');

const { detectEnv, regionName } = globalThis.EnvNotifier;
const NEUTRAL = '#9e9e9e';

let bannerEnabled = true;
const ready = chrome.storage.local.get({ bannerEnabled: true }).then((v) => {
    bannerEnabled = v.bannerEnabled;
});

// Draw the toolbar icon: a filled rounded square in the env color.
// When the banner is hidden it's drawn hollow with a slash through it.
const drawIcon = (color, enabled) => {
    const imageData = {};
    for (const size of [16, 32]) {
        const c = new OffscreenCanvas(size, size);
        const ctx = c.getContext('2d');
        const pad = size / 8, r = size / 5, w = size - pad * 2;
        ctx.beginPath();
        ctx.roundRect(pad, pad, w, w, r);
        if (enabled) {
            ctx.fillStyle = color;
            ctx.fill();
            // little "banner" bar along the top
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            ctx.fillRect(pad + w * 0.25, pad + w * 0.18, w * 0.5, w * 0.16);
        } else {
            ctx.lineWidth = size / 8;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pad, size - pad);
            ctx.lineTo(size - pad, pad);
            ctx.stroke();
        }
        imageData[size] = ctx.getImageData(0, 0, size, size);
    }
    return imageData;
};

const updateTab = async (tabId, url) => {
    await ready;
    let hostname = '';
    try { hostname = new URL(url).hostname; } catch { /* chrome://, about:blank, etc. */ }
    const env = detectEnv(hostname);

    const state = bannerEnabled ? 'banner on — click for options' : 'banner hidden — click for options';
    const title = env
        ? `${env.label}${env.region ? ' · ' + regionName(env.region) : ''} (${hostname})\n${state}`
        : `Environment Notifier\n${state}`;

    try {
        await chrome.action.setBadgeText({ tabId, text: env ? env.badge : '' });
        if (env) {
            await chrome.action.setBadgeBackgroundColor({ tabId, color: env.color });
            await chrome.action.setBadgeTextColor({ tabId, color: env.fg });
        }
        await chrome.action.setIcon({ tabId, imageData: drawIcon(env ? env.color : NEUTRAL, bannerEnabled) });
        await chrome.action.setTitle({ tabId, title });
    } catch {
        // tab closed mid-update
    }
};

const updateAllTabs = async () => {
    const tabs = await chrome.tabs.query({});
    await Promise.all(tabs.map((t) => updateTab(t.id, t.url)));
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url || changeInfo.status === 'loading') updateTab(tabId, tab.url);
});

// Banner on/off and opacity are set from the popup (popup.html); the badge always stays.
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.bannerEnabled) {
        bannerEnabled = changes.bannerEnabled.newValue;
        updateAllTabs();
    }
});

chrome.runtime.onInstalled.addListener(updateAllTabs);
chrome.runtime.onStartup.addListener(updateAllTabs);
updateAllTabs();
