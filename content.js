// content.js — slim environment banner at the top of the page.
// Visibility follows the global "bannerEnabled" setting, toggled from the toolbar icon.

(() => {
    const env = globalThis.EnvNotifier.detectEnv(window.location.hostname);
    if (!env || window.top !== window) return;

    const region = globalThis.EnvNotifier.regionName(env.region);
    const isProd = env.key === 'prod';

    // Shadow DOM so page CSS can't restyle (or hide) the banner.
    const host = document.createElement('env-notifier-banner');
    const shadow = host.attachShadow({ mode: 'closed' });
    shadow.innerHTML = `
        <style>
            :host { all: initial; }
            .pill {
                position: fixed; top: 0; left: 50%; transform: translateX(-50%);
                z-index: 2147483647; pointer-events: none;
                display: flex; align-items: center; gap: 6px;
                padding: 4px 18px; border-radius: 0 0 8px 8px;
                background: color-mix(in srgb, ${env.color} var(--alpha, 55%), transparent);
                color: ${env.fg}; opacity: var(--text-opacity, 0.85);
                text-shadow: 0 0 3px ${env.fg === '#fff' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)'};
                font: 700 14px/20px system-ui, -apple-system, 'Segoe UI', sans-serif;
                letter-spacing: 0.06em; white-space: nowrap;
            }
            .region { font-weight: 400; opacity: 0.85; }
            .host { display: none; letter-spacing: 0.02em; }
            .show-host .host { display: inline; }
            .frame {
                position: fixed; inset: 0; z-index: 2147483646; pointer-events: none;
                box-shadow: inset 0 0 0 3px ${env.color};
            }
        </style>
        ${isProd ? '<div class="frame"></div>' : ''}
        <div class="pill">
            <span>${isProd ? '⚠ ' : ''}${env.label}</span>
            ${region ? `<span class="region">· ${region}</span>` : ''}
            <span class="region host">· ${window.location.hostname}</span>
        </div>
    `;

    const setVisible = (enabled) => {
        host.style.display = enabled === false ? 'none' : '';
    };

    // Opacity slider (10–100): sets the background's solidity; the text fades
    // less than the background so it stays readable at low settings.
    const setOpacity = (pct) => {
        host.style.setProperty('--alpha', `${pct}%`);
        host.style.setProperty('--text-opacity', String(0.6 + 0.4 * (pct / 100)));
    };

    const pill = shadow.querySelector('.pill');
    const setShowHost = (show) => pill.classList.toggle('show-host', !!show);

    setVisible(true);
    document.documentElement.appendChild(host);

    chrome.storage.local.get({ bannerEnabled: true, bannerOpacity: 55, bannerShowHost: false }, (s) => {
        setVisible(s.bannerEnabled);
        setOpacity(s.bannerOpacity);
        setShowHost(s.bannerShowHost);
    });
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'local') return;
        if (changes.bannerEnabled) setVisible(changes.bannerEnabled.newValue);
        if (changes.bannerOpacity) setOpacity(changes.bannerOpacity.newValue);
        if (changes.bannerShowHost) setShowHost(changes.bannerShowHost.newValue);
    });
})();
