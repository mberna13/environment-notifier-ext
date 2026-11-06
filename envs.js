// envs.js — shared by the content script and the background service worker.
// One place to add/change environments.

(() => {
    // label: banner text, badge: toolbar badge text (max 3 chars — Chrome clips longer ones), fg: banner text color
    const ENVS = {
        prod:    { label: 'PRODUCTION', badge: 'PRD', color: '#d32f2f', fg: '#fff' },
        staging: { label: 'STAGING',    badge: 'STG',  color: '#2e7d32', fg: '#fff' },
        uat:     { label: 'UAT',        badge: 'UAT',  color: '#00897b', fg: '#fff' },
        argon:   { label: 'ARGON',      badge: 'ARG', color: '#ef6c00', fg: '#fff' },
        helium:  { label: 'HELIUM',     badge: 'HE',   color: '#c2185b', fg: '#fff' },
        lt:      { label: 'LOAD TEST',  badge: 'LT',   color: '#6d4c41', fg: '#fff' },
        qa:      { label: 'QA',         badge: 'QA',   color: '#1565c0', fg: '#fff' },
        volt:    { label: 'VOLT',       badge: 'VLT', color: '#fbc02d', fg: '#222' },
        dev:     { label: 'DEV',        badge: 'DEV',  color: '#7b1fa2', fg: '#fff' },
        ideas:   { label: 'IDEAS',      badge: 'IDE', color: '#4527a0', fg: '#fff' },
        proxy:   { label: 'PROXY-DEV',  badge: 'PXY',  color: '#546e7a', fg: '#fff' },
        local:   { label: 'LOCAL',      badge: 'LOC',  color: '#616161', fg: '#fff' },
    };

    // Root domains we care about, and which region they belong to.
    const DOMAINS = [
        { suffix: 'catalystedu.com',   region: 'US' },
        { suffix: 'labflow.com',       region: 'US' },
        { suffix: 'catalyst-edu.ca',   region: 'CA' },
        { suffix: 'catalystedu.ca',    region: 'CA' },
        { suffix: 'labflow.ca',        region: 'CA' },
        { suffix: 'labflow.localhost', region: null },
    ];

    // Subdomains whose name doesn't start with the env name.
    const ALIASES = {
        courses: 'prod',          // courses.catalystedu.com / courses.catalyst-edu.ca
        studio: 'prod',           // Course Studio prod
        'studio-dev': 'dev',
    };

    // hostname -> { key, region, ...ENVS[key] } or null
    const detectEnv = (hostname) => {
        const host = (hostname || '').toLowerCase().replace(/\.$/, '');
        const domain = DOMAINS.find((d) => host === d.suffix || host.endsWith('.' + d.suffix));
        if (!domain) return null;

        let key = null;
        if (domain.suffix === 'labflow.localhost') {
            key = 'local';
        } else {
            const sub = host === domain.suffix ? '' : host.slice(0, -(domain.suffix.length + 1));
            if (sub === '' || sub === 'www') {
                // Bare labflow.com/.ca was the old prod app; bare catalystedu.* is the marketing site.
                key = domain.suffix.startsWith('labflow') ? 'prod' : null;
            } else {
                const label = sub.split('.').pop();       // closest label to the root domain
                // Exact alias, else the part before the first dash:
                // "qa" -> qa, "volt-core-service" -> volt, "prod-identity-service" -> prod, "proxy-dev1" -> proxy
                key = ALIASES[label] || (ENVS[label.split('-')[0]] ? label.split('-')[0] : null);
            }
        }
        if (!key) return null;
        return { key, region: domain.region, ...ENVS[key] };
    };

    const regionName = (region) => (region === 'CA' ? 'CANADA' : region === 'US' ? 'US' : '');

    globalThis.EnvNotifier = { ENVS, DOMAINS, detectEnv, regionName };
})();
