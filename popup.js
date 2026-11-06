// popup.js — banner on/off, hostname, and opacity. Changes apply live to every open tab.
const { detectEnv, regionName } = globalThis.EnvNotifier;

const $ = (id) => document.getElementById(id);
const enabledEl = $('enabled');
const showHostEl = $('showHost');
const opacityEl = $('opacity');

// The banner options grey out while the banner is off.
const setOptionsEnabled = (on) => {
    document.querySelectorAll('.options').forEach((el) => el.classList.toggle('disabled', !on));
};

chrome.storage.local.get({ bannerEnabled: true, bannerOpacity: 55, bannerShowHost: false }, (s) => {
    enabledEl.checked = s.bannerEnabled;
    showHostEl.checked = s.bannerShowHost;
    opacityEl.value = s.bannerOpacity;
    $('opacityVal').textContent = `${s.bannerOpacity}%`;
    setOptionsEnabled(s.bannerEnabled);
});

enabledEl.addEventListener('change', () => {
    chrome.storage.local.set({ bannerEnabled: enabledEl.checked });
    setOptionsEnabled(enabledEl.checked);
});

showHostEl.addEventListener('change', () => {
    chrome.storage.local.set({ bannerShowHost: showHostEl.checked });
});

opacityEl.addEventListener('input', () => {
    const v = Number(opacityEl.value);
    $('opacityVal').textContent = `${v}%`;
    chrome.storage.local.set({ bannerOpacity: v });
});

// Header: which environment the current tab is on.
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    let hostname = '';
    try { hostname = new URL(tab.url).hostname; } catch { /* chrome:// etc. */ }
    const env = detectEnv(hostname);
    const el = $('env');
    if (env) {
        const region = regionName(env.region);
        el.innerHTML = `<span class="chip"></span><span class="host"></span>`;
        const chip = el.querySelector('.chip');
        chip.textContent = env.label + (region ? ` · ${region}` : '');
        chip.style.background = env.color;
        chip.style.color = env.fg;
        el.querySelector('.host').textContent = hostname;
    } else {
        el.innerHTML = '<span class="host">Not a Catalyst environment</span>';
    }
});
