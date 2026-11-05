// Runtime is independent of the dictionary and legacy pattern data.
const dictionary = new Map(Object.entries(translations).map(([key, value]) => [key.trim().replace(/\s+/g, ' ').toLowerCase(), value]));
const contentKey = value => value.trim().replace(/\s+/g, ' ').toLowerCase();
const protectedSelector = 'script,style,noscript,template,textarea,input,select,option,code,pre,svg,canvas,[contenteditable]:not([contenteditable="false"]),[data-futgg-no-translate]';
const chartDateSelector = 'svg.recharts-surface text.recharts-cartesian-axis-tick-value';
const attributes = ['placeholder', 'title', 'aria-label'];
const textState = new WeakMap();
const attributeState = new WeakMap();
const pending = new Set();
const results = new Map();
const groupOwner = new WeakMap();
const knownGroups = new WeakSet();
const quantityGroups = new WeakSet();
const uiMessageGroups = new WeakSet();
let protectionCache = new WeakMap();
let pagePath = '';
const stats = { flushes: 0, visited: 0, writes: 0 };
let timer = null;
let observer;

function isCondition(text) {
    if (/^(?:Complete|Fully complete|Buy|List|Apply|Change|Build|Reach|Achieve|Grade|Keep)\b|^Earn (?:[\d,]+ points|Gallery Score)\b/i.test(text)) return true;
    return /^(?:(?:Play|Win|Score|Assist)\s+(?:\d|at least\b|a total\b|in\b|both\b|with\b|the\b|one\b|two\b|three\b)|Finish in the top\b|Completing this challenge counts towards\b|No players rated\b|Earn\s+[\d,]+\s+Rush Points|(?:Min|Max)\.|(?:Number of players|Rating|Team rating|Chemistry|Players|Nations|Leagues|Clubs|Quality|Same nation|Same league|Same club|Nation|League|Club):|Exchange\s+(?:a|an)\s+\d)/i.test(text);
}
function isLongProse(text) {
    return !isCondition(text) && (text.length > 100 || text.split(/\s+/).length > 16);
}
function translate(text) {
    if (results.has(text)) return results.get(text);
    const output = translateUncached(text);
    if (results.size >= 3000) results.clear();
    results.set(text, output);
    return output;
}
function translateUncached(text) {
    const trimmed = text.trim();
    if (!trimmed) return text;
    const normalized = trimmed.replace(/\s+/g, ' ');
    if (!/[a-z]/i.test(normalized)) return text;
    const functional = translateObjective(normalized) ?? translateFunctional(normalized);
    if (functional !== null) return text.replace(trimmed, functional);
    // Registered complete UI sentences precede the general prose cutoff.
    const exact = dictionary.get(normalized.toLowerCase());
    if (exact) return text.replace(trimmed, exact);
    const ui = translateEvoUi(normalized);
    if (ui !== null) return text.replace(trimmed, ui);
    if (isLongProse(normalized)) return text;
    if (/^[\d,.]+\s*[MK]$/i.test(trimmed)) return text;
    const additional = translateAdditional(normalized);
    if (additional !== null) return text.replace(trimmed, additional);

    // Roles are parsed as a whole, including hyphens, digits, and +/++.
    const role = normalized.match(/^(CAM|CDM|CM|ST|CF|LW|RW|LM|RM|CB|LB|RB|LWB|RWB|GK)(\s+-\s+|\s+)(.*?)(\s*\+{1,2})?$/i);
    if (role) {
        const value = translateRole(role[3]);
        if (value !== role[3]) return text.replace(trimmed, `${role[1].toUpperCase()}${role[2].includes('-') ? ' - ' : ' '}${value}${role[4] ? ' ' + role[4].trim() : ''}`);
    }

    // Complete relative-time expressions take precedence over individual units.
    const relative = normalized.match(/^(Expires in|in)?\s*(\d+)\s*(years?|months?|days?|hours?|minutes?|seconds?)\s*(ago|전)?$/i);
    if (relative) {
        const unit = { year: '년', month: '달', day: '일', hour: '시간', minute: '분', second: '초' }[relative[3].toLowerCase().replace(/s$/, '')];
        const ending = relative[1] ? (/^Expires/i.test(relative[1]) ? ' 후 만료 예정' : ' 후') : relative[4] ? ' 전' : '';
        return text.replace(trimmed, `${relative[2]}${unit}${ending}`);
    }
    // Capture every allowed game mode instead of dropping optional Rush.
    const evo = normalized.match(/^(Play|Win|Score|Assist) (\d+) (?:matches?|goals?) in (.+?) using your active EVO player(?: in game)?\.?$/i);
    if (evo) {
        const mode = normalizeMode(evo[3]);
        const actions = { play: `선수를 사용해 ${evo[2]}경기를 플레이하세요.`, win: `선수를 사용해 ${evo[2]}경기에서 승리하세요.`, score: `선수로 ${evo[2]}골을 기록하세요.`, assist: `선수로 ${evo[2]}도움을 기록하세요.` };
        return text.replace(trimmed, `${mode}에서 활성화된 진화 ${actions[evo[1].toLowerCase()]}`);
    }
    const evoWith = normalized.match(/^(Score|Assist) (\d+) goals? with your active EVO player(?: (?:in|on) (.+?))?\.?$/i);
    if (evoWith) return text.replace(trimmed, `${normalizeMode(evoWith[3] || 'any mode')}에서 활성화된 진화 선수로 ${evoWith[2]}${/^score$/i.test(evoWith[1]) ? '골' : '도움'}을 기록하세요.`);

    for (const { pattern, replacement } of dynamicTranslations) {
        pattern.lastIndex = 0;
        if (!pattern.test(normalized)) { pattern.lastIndex = 0; continue; }
        pattern.lastIndex = 0;
        const result = normalized.replace(pattern, replacement);
        pattern.lastIndex = 0;
        // Unsupported conditions stay readable in the original instead of
        // publishing a half-English sentence after a generic Min/Max match.
        if (isCondition(normalized) && /\b(?:players? rated|goals? in|matches? in|while having|starting (?:11|XI)|Min\.|Max\.)/i.test(result)) continue;
        if (result !== normalized) return text.replace(trimmed, result);
    }
    return text;
}
// Compatibility bridge for date callbacks in the retained domain rules.
function translateTextNode(node) { node.nodeValue = translate(node.nodeValue); }

function isProtected(node) {
    const parent = node.nodeType === 1 ? node : node.parentElement;
    if (!parent) return true;
    if (protectionCache.has(parent)) return protectionCache.get(parent);
    const blocked = computeProtection(parent);
    protectionCache.set(parent, blocked);
    return blocked;
}
function computeProtection(parent) {
    if (parent.matches(protectedSelector)) return true;
    if (parent.parentElement && isProtected(parent.parentElement)) return true;
    return contentProtection(parent);
}

function sourceOf(node) {
    const current = node.nodeValue;
    const previous = textState.get(node);
    if (previous && current === previous.output) return previous.source;
    textState.set(node, { source: current, output: current });
    return current;
}
function write(node, output) {
    const source = sourceOf(node);
    if (node.nodeValue !== output) { node.nodeValue = output; stats.writes++; }
    textState.set(node, { source, output });
}
function textNodes(root, includeIdentity = false) {
    if (root.nodeType === 3) return isProtected(root) ? [] : [root];
    if (isProtected(root)) return [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: node => (includeIdentity ? node.parentElement.closest(protectedSelector) : isProtected(node)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const result = [];
    let node;
    while ((node = walker.nextNode())) result.push(node);
    return result;
}

function rolePillLabel(node, source) {
    const label = node.parentElement;
    if (!label?.matches('span.truncate') || !label.nextElementSibling?.matches('span.text-evo')) return null;
    if (!/^\+{1,2}$/.test(label.nextElementSibling.textContent.trim())) return null;
    const m = source.trim().match(/^(.+?)\s*\+{1,2}$/);
    if (!m) return null;
    const translated = translatedTerm(m[1]);
    // The site's data may already suffix the role name while its pill adds a
    // separate green +/++. Keep that badge and translate only the base label.
    return translated !== m[1] ? source.replace(source.trim(), translated) : null;
}

// Component adapters match small, complete phrases. Never replace innerHTML,
// elements, React comment anchors, input values, or event handlers.
function translateGroup(element, handled) {
    if (!element || isProtected(element)) return false;
    const numericHeading = /^H[34]$/.test(element.tagName) && /^\/(?:live-events|objectives)\//.test(pagePath) && (quantityTitle(element.textContent) || quantityGroups.has(element));
    // Test the cheap visible prefix before ever walking descendants. Only known
    // split UI phrases need reconstruction; ordinary text takes the fast path.
    if (!knownGroups.has(element) && !numericHeading) {
        const visible = element.textContent.trim();
        if (visible.length>220) return false;
        const visibleDuration=visible.replace(/^(?:Expires in|Starts in|Ends in|Refreshes in|만료까지|시작까지|종료까지|갱신까지)\s*/i,'');
        const timerGroup=/^\d+[dhms]/i.test(visibleDuration) && translateCountdown(visibleDuration)!==null && (visibleDuration.match(/[dhms]/gi) || []).length>=2;
        if (!timerGroup && !splitUiMessage(visible) && !translateEventTime(visible) && !(playerProfileLink(element) && /^View\s+/i.test(visible)) && !/^Best (?:GK|RB|CB|LB|CDM|RM|CM|LM|CAM|RW|ST|LW|CF|LWB|RWB) Role$/i.test(visible) && !/^(?:Roles\s*\(|[\d,]+\s*placements?\b|Where would\b|Have a better\b|(?:View all|모두 보기)\s*\d|FC\s*\d+\s*Ratings|in\s*\d|(?:Current price|Last known price|현재 가격|최근 확인 가격)\s*[-–·]\s*Updated|(?:·\s*)?vs current\b)/i.test(visible)) return false;
    }
    const nodes = textNodes(element, true);
    if (!nodes.length || (!numericHeading && nodes.length < 2) || nodes.some(n => handled.has(n))) return false;
    const sources = nodes.map(sourceOf);
    const combined = sources.join('').trim().replace(/\s+/g, ' ');
    const message = splitUiMessage(combined);
    const eventTime = translateEventTime(combined);
    const bestRole = /^Best (?:GK|RB|CB|LB|CDM|RM|CM|LM|CAM|RW|ST|LW|CF|LWB|RWB) Role$/i.test(combined);
    const playerView = playerProfileLink(element) && combined.match(/^View (?!all\b)(.+)$/i);
    const countdown = translateCountdown(combined) ?? (/^(?:Expires in|Starts in|Ends in|Refreshes in)\s+/i.test(combined) ? translateAdditional(combined) : null);
    const quantity = numericHeading || (knownGroups.has(element) && /^H[34]$/.test(element.tagName) && quantityTitle(combined));
    const roles = combined.match(/^Roles\s*\(\s*(\d+)\s*\)$/i);
    const votes = combined.match(/^([\d,]+)\s*placements?$/i);
    const question = combined.match(/^Where would you place (.+?)\?$/i);
    const banner = combined.match(/^Have a better (.+?) Evolution\?$/i);
    const allCards = /^(?:View all|모두 보기)\s*\d+\s*cards$/i.test(combined);
    const hub = /^FC\s*\d+\s*Ratings\s*Hub$/i.test(combined);
    const future = /^in\s*\d+\s*(?:minutes?|hours?|seconds?|days?)$/i.test(combined);
    const updated = /^(?:Current price|Last known price|현재 가격|최근 확인 가격)\s*[-–·]\s*Updated\s+.+$/i.test(combined);
    const comparison = /^(?:·\s*)?vs current\s+[\d,.]+(?:\s*[KM])?$/i.test(combined);
    if (!comparison && !playerView && !eventTime && !bestRole && !message && !countdown && !quantity && !roles && !votes && !question && !banner && !allCards && !hub && !future && !updated) return false;
    if (playerView) {
        const nameIndex = sources.findIndex(s => s.trim() === playerView[1]);
        nodes.forEach((node, i) => write(node, i === (nameIndex >= 0 ? nameIndex : 0) ? `${playerView[1]} 보기` : ''));
    } else if (eventTime || bestRole) {
        const output = eventTime || translateEvoUi(combined);
        nodes.forEach((node, i) => write(node, i === 0 ? output : ''));
    } else if (message) {
        // Keep the clickable login action and the highlighted PlayStyle token
        // in their existing nodes instead of making the whole sentence a link.
        const pivot = sources.findIndex(value => contentKey(value) === contentKey(message.pivot));
        if (pivot < 0) return false;
        const before = nodes.slice(0, pivot).findIndex((_, i) => sources[i].trim());
        let after = -1;
        for (let i = pivot + 1; i < nodes.length; i++) if (sources[i].trim()) { after = i; break; }
        if ((message.before && before < 0) || (message.after && after < 0)) return false;
        nodes.forEach((node, i) => write(node, i === pivot ? message.token : i === before ? message.before : i === after ? message.after : ''));
        uiMessageGroups.add(element);
    } else if (countdown) {
        nodes.forEach((node,i)=>write(node,i===0 ? countdown : ''));
    } else if (quantity) {
        quantityGroups.add(element);
        const title = quantityTitle(combined, nearbyCondition(element));
        nodes.forEach((node,i) => write(node, i === 0 ? title : ''));
    } else if (roles) {
        // Keep the count in its original React-owned node.
        nodes.forEach((node, i) => write(node, sources[i].replace(/Roles/i, '역할')));
    } else if (question || banner) {
        const name = (question || banner)[1];
        const nameIndex = sources.findIndex(s => s.trim() === name);
        if (nameIndex >= 0 && nameIndex !== 0) {
            // Preserve the player-name node (including a possible player link).
            const prefix = question ? '' : '더 좋은 ';
            const suffix = question ? '에게 어떤 티어를 주시겠어요?' : ' 진화 선수가 있나요?';
            nodes.forEach((node, i) => write(node, i === 0 ? prefix : i === nameIndex ? name + suffix : ''));
        } else {
            nodes.forEach((node, i) => write(node, i === 0 ? translate(combined) : ''));
        }
    } else {
        const output = votes ? `${votes[1]}명이 투표함` : comparison
            ? `${sources.join('').match(/^\s*/)[0]}${translate(combined)}${sources.join('').match(/\s*$/)[0]}`
            : translate(combined);
        if (output === combined) return false;
        nodes.forEach((node, i) => write(node, i === 0 ? output : ''));
    }
    knownGroups.add(element);
    nodes.forEach(n => { handled.add(n); groupOwner.set(n, element); });
    return true;
}

function translateTimer(element, handled) {
    // Homepage countdowns live inside content-name links. Bypass only that
    // boundary for the semantic timer, retaining news and editable exclusions.
    for (let parent = element; parent; parent = parent.parentElement) {
        if (parent.matches(protectedSelector)) return;
        if (contentProtection(parent) && !(parent.tagName === 'A' && contentDetailLink(parent))) return;
    }
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
        acceptNode: node => node.parentElement.closest(protectedSelector) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    const source = nodes.map(sourceOf).join('').trim().replace(/\s+/g, ' ');
    const output = translateCountdown(source);
    if (output === null) return;
    nodes.forEach((node, i) => { write(node, i === 0 ? output : ''); handled.add(node); groupOwner.set(node, element); });
    let records = attributeState.get(element);
    if (!records) { records = new Map(); attributeState.set(element, records); }
    const value = element.getAttribute('aria-label');
    if (value) {
        const previous = records.get('aria-label');
        const original = previous && value === previous.output ? previous.source : value;
        const translated = translateTimerLabel(original);
        if (translated !== null) {
            if (value !== translated) { element.setAttribute('aria-label', translated); stats.writes++; }
            records.set('aria-label', { source: original, output: translated });
        }
    }
}

function translateChartDate(element, handled) {
    for (let parent = element; parent; parent = parent.parentElement) {
        if ((parent.matches(protectedSelector) && parent.localName !== 'svg') || contentProtection(parent)) return;
    }
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    const output = translateShortDate(nodes.map(sourceOf).join('').trim());
    if (output === null) return;
    nodes.forEach((node, i) => { write(node, i === 0 ? output : ''); handled.add(node); groupOwner.set(node, element); });
}

function translateAttribute(element) {
    if ((element.parentElement && isProtected(element.parentElement)) || contentProtection(element)) return;
    if (element.closest('script,style,textarea,select,[contenteditable]:not([contenteditable="false"])')) return;
    let records = attributeState.get(element);
    if (!records) { records = new Map(); attributeState.set(element, records); }
    for (const name of attributes) {
        const value = element.getAttribute(name);
        if (!value) continue;
        const previous = records.get(name);
        const source = previous && value === previous.output ? previous.source : value;
        const output = translate(source);
        if (output !== value) { element.setAttribute(name, output); stats.writes++; }
        records.set(name, { source, output });
    }
}
function processRoot(root, handled) {
    const container = root.nodeType === 1 ? root : root.parentElement;
    const timerElement = container?.closest('[role="timer"]');
    if (timerElement) translateTimer(timerElement, handled);
    else if (root.nodeType !== 3) container?.querySelectorAll('[role="timer"]').forEach(element => translateTimer(element, handled));
    const chartDate = container?.closest(chartDateSelector);
    if (chartDate) translateChartDate(chartDate, handled);
    else if (root.nodeType !== 3) container?.querySelectorAll(chartDateSelector).forEach(element => translateChartDate(element, handled));
    const nodes = textNodes(root);
    for (const node of nodes) {
        stats.visited++;
        if (handled.has(node)) continue;
        const source = sourceOf(node);
        const pill = /\+{1,2}\s*$/.test(source) ? rolePillLabel(node, source) : null;
        if (pill !== null) { write(node, pill); handled.add(node); continue; }
        const owner = groupOwner.get(node);
        if (owner?.isConnected) translateGroup(owner, handled);
        // Numeric candidates are needed for split vote counts, but all other
        // labels bypass ancestor searches entirely.
        if (!handled.has(node) && (/^\s*(?:Starts\b|Ends\b|Ended\b|Best\s*$|Roles\b|Where would\b|Have a better\b|Log in\b|Tap once\b|You've reached the maximum\b|Press\s*$|(?:View|모두 보기)\b|FC\s*\d|in\b|Current price\b|Last known price\b|현재 가격|최근 확인 가격|(?:[-–·]\s*)?Updated\b|(?:·\s*)?vs current\b|[\d,]+\s*$)/i.test(source) || /^\s*(?:Play|Win|Score|Assist|Level)(?: in)?\s*\d*\s*$/i.test(source) || /^\s*\d+[dhms]\b/i.test(source) || /^\s*[\d,]+ (?:Rush Points|Stars|Goals|Assists|Wins|Matches|SBCs)$/i.test(source))) {
            let parent = node.parentElement;
            for (let depth = 0; parent && depth < 3; depth++, parent = parent.parentElement) {
                if (translateGroup(parent, handled)) break;
            }
        }
        if (!handled.has(node)) write(node, translate(source));
    }
    const element = root.nodeType === 1 ? root : root.parentElement;
    if (!element) return;
    if (element.matches('[placeholder],[title],[aria-label]')) translateAttribute(element);
    // A character edit has no newly inserted descendants to scan for attributes.
    if (root.nodeType !== 3) element.querySelectorAll('[placeholder],[title],[aria-label]').forEach(translateAttribute);
}
function observe() {
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: attributes });
}
function flush() {
    timer = null;
    if (typeof document === 'undefined' || !document?.body?.isConnected) { pending.clear(); return; }
    const roots = [...pending].filter(root => root.isConnected);
    pending.clear();
    if (!roots.length) return;
    observer.disconnect();
    try {
        protectionCache = new WeakMap();
        pagePath = location.pathname;
        stats.flushes++;
        const handled = new Set();
        // Don't scan a subtree twice when its ancestor is already queued.
        const selected = new Set(roots);
        for (const root of roots) {
            let ancestor = root.parentNode;
            while (ancestor && !selected.has(ancestor)) ancestor = ancestor.parentNode;
            if (!ancestor) processRoot(root, handled);
        }
    } finally { observe(); }
}
function queue(root) {
    if (!root || !root.isConnected) return;
    pending.add(root);
    // Coalesce mutations before the next task without adding a 40ms delay.
    if (timer === null) { timer = true; queueMicrotask(() => { if (pending.size) flush(); else timer = null; }); }
}
function changedRoot(node) {
    const owner=groupOwner.get(node);
    if(owner?.isConnected) return owner;
    let parent=node.nodeType===1 ? node : node.parentElement;
    for(let depth=0;parent && depth<3;depth++,parent=parent.parentElement) if(knownGroups.has(parent)) return parent;
    return node;
}
function start() {
    if (!document.body) return;
    observer = new MutationObserver(records => {
        if (typeof document === 'undefined' || !document?.body?.isConnected) return;
        for (const record of records) {
            if (record.type === 'childList') {
                record.addedNodes.forEach(node => { if (node.nodeType === 1 || node.nodeType === 3) queue(changedRoot(node)); });
                // Removals can also change a split phrase.
                if (record.removedNodes.length) queue(record.target);
            } else queue(changedRoot(record.target));
        }
    });
    pending.add(document.body);
    flush();
}
if (document.body) start();
else {
    const bootstrap = new MutationObserver(() => {
        if (!document.body) return;
        bootstrap.disconnect();
        start();
    });
    bootstrap.observe(document, { childList: true, subtree: true });
}
