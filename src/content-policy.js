// Content boundaries, not a list of individual event names/descriptions.
const functionalHeadings = new Set([
    'details','requirements','squad requirements','entry requirements','rewards',
    'challenges','player requirements','analysis','eligible players','rating combination',
    'upgrades','upgrade paths','stats boost','cost','solution','recommended',
    'how do i unlock this?','completion difficulty','community verdict'
]);
let identityLabels;
function identityValue(element) {
    if(!/^(SPAN|DIV|A)$/.test(element.tagName)) return false;
    if(!identityLabels) {
        const fields=['name','club','league','nation','country','rarity','card type','season','campaign','squad'];
        identityLabels=new Set(fields.flatMap(field=>[field,contentKey(dictionary.get(field) || field)]));
    }
    const label=element.parentElement?.firstElementChild;
    return Boolean(label && label!==element && label.childElementCount<=1 && identityLabels.has(contentKey(label.textContent)));
}
function contentDetailLink(link) {
    return Boolean(link && /\/(?:(?:evolutions|live-events)\/\d[^/]*|objectives\/[^/]+\/[^/]+|sbc\/(?:players|upgrades|challenges|foundations)\/[^/]+)\//.test(link.getAttribute('href') || ''));
}
function playerProfileLink(link) {
    return Boolean(link && /^(?:https?:\/\/[^/]+)?\/players\/\d+[^/]*(?:\/\d{2}-\d+)?\/?(?:[?#].*)?$/.test(link.getAttribute('href') || ''));
}
function roleEvolutionTitle(text) {
    const match = text.trim().match(/^(GK|RB|CB|LB|CDM|RM|CM|LM|CAM|RW|ST|LW|CF|LWB|RWB)\s+Roles(\+{0,2})$/i);
    return match ? `${match[1].toUpperCase()} 역할${match[2]}` : null;
}
function taskParagraph(paragraph) {
    let container=paragraph.parentElement;
    for(let depth=0;container && depth<3;depth++,container=container.parentElement) {
        const heading=container.querySelector('h3,h4');
        if(heading) return heading.tagName === 'H4';
    }
    return null;
}
function contentProtection(element) {
    const path=pagePath;
    const tag=element.tagName;
    const link=tag==='A' && element.hasAttribute('href') ? element : null;
    if(/^\/players(?:\/|$)/.test(path) && identityValue(element)) return true;
    if(link && /\/(?:clubs|leagues|nations|rarities)\/[^/?#]+/.test(link.getAttribute('href'))) return true;
    // /sbc/players/... is an SBC detail, not a player identity link.
    if(playerProfileLink(link) && !/^\s*(?:View\s+|Player details|Add to|Compare)\b/i.test(link.textContent)) return true;
    if(/^\/players\/\d+[^/]*\/(?:\d{2}-\d+\/)?$/.test(path) && (tag==='H1' || (tag==='H2' && element.classList.contains('truncate')))) return true;
    if(tag==='DIV' && element.classList.contains('absolute') && element.classList.contains('text-center') && (element.classList.contains('leading-none') || element.classList.contains('uppercase')) && element.closest('.fc-card')) return true;
    if (link && /\/news\/[^/?#]+/.test(link.getAttribute('href'))) return true;
    if (/^\/news(?:\/|$)/.test(path) && /^(MAIN|ARTICLE)$/.test(tag)) return true;
    if (tag==='ARTICLE' && element.querySelector('a[href*="/news/"]')) return true;
    const contentPage=/^\/(?:objectives|sbc|evolutions|live-events)\//.test(path);
    const heading=/^H[1-6]$/.test(tag);
    const key=heading ? contentKey(element.textContent) : '';
    if((link || heading) && /^\/(?:evo-lab|evolutions)(?:\/|$)/.test(path) && roleEvolutionTitle(element.textContent)) return false;
    if(heading && /^H[34]$/.test(tag) && /^\/(?:objectives|live-events)\//.test(path) && (quantityTitle(element.textContent) || (quantityGroups.has(element) && !/[a-z]/i.test(element.textContent)))) return false;
    if(heading && /^H[23]$/.test(tag) && contentDetailLink(element.closest('a[href]')) && !functionalHeadings.has(key)) return true;
    if(link && contentDetailLink(link) && !link.querySelector('p,h2,h3,h4') && !/^(?:Challenges|Expires|Repeatable|Refreshes)/i.test(link.textContent.trim()) && !isCondition(link.textContent.trim()) && !functionalHeadings.has(contentKey(link.textContent))) return true;
    const detail=/^\/(?:(?:evolutions|live-events)\/\d[^/]*|objectives\/[^/]+\/[^/]+|sbc\/(?:players|upgrades|challenges|foundations)\/[^/]+)\/?$/.test(path);
    if(heading && detail && tag==='H1') return true;
    if(heading && /^\/(?:objectives|sbc|live-events)\//.test(path) && /^H[34]$/.test(tag) && !functionalHeadings.has(key)) return true;
    if(tag==='P') {
        // Directly under the page title is the introduction, never a task.
        if(contentPage && element.parentElement.querySelector(':scope > h1')) return true;
        if(uiMessageGroups.has(element) || splitUiMessage(element.textContent) || dictionary.has(contentKey(element.textContent)) || translateEvoUi(element.textContent.trim()) !== null) return false;
        if(contentPage) {
            const task=taskParagraph(element);
            if(task!==null) return !task;
            if(contentDetailLink(element.closest('a[href]')) && !isCondition(element.textContent.trim())) return true;
            if(!isCondition(element.textContent.trim()) && !dictionary.has(contentKey(element.textContent))) return true;
        }
        if(isLongProse(element.textContent.trim())) return true;
    }
    return false;
}
