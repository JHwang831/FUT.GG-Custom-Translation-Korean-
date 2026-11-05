const fs = require('node:fs');
const assert = require('node:assert/strict');
const {JSDOM} = require('jsdom');
const source = fs.readFileSync('FUTGG_KOR_3.0.user.js','utf8').replace(/\}\)\(\);\s*$/, 'window.testAPI={translate,stats,isCondition};})();');
const delay = ms => new Promise(r => setTimeout(r,ms));
async function main() {
    const base = new JSDOM('<body/>',{url:'https://www.fut.gg/',runScripts:'outside-only'});
    await delay(0);
    base.window.eval(source);
    const translate = base.window.testAPI.translate;
    const golden = [
        ['Same nation: Min. 3 players', '동일 국가 소속 선수 최소 3명'],
        ['Same league: Max. 4 players', '동일 리그 소속 선수 최대 4명'],
        ['Quality: Min. 3 Gold players','골드 선수 최소 3명'],
        ['Quality: Min. Bronze','선수 등급: 최소 브론즈'],
        ['Club: Min. 2 players from Liverpool or Arsenal','Liverpool 또는 Arsenal 소속 선수 최소 2명'],
        ['Players: 7','선수 수: 7명'],
        ['Chemistry: Min. 26','조직력: 최소 26'],
        ['Max. 3 players rated 88 to 91','88~91등급 선수 최대 3명'],
        ['Max. 2 players rated 85+','85등급 이상 선수 최대 2명'],
        ['Max. 1 player from HERO','영웅 선수 최대 1명'],
        ['Min. 6 Gold players','골드 선수 최소 6명'],
        ['No players rated 92+','92등급 이상 선수 사용 불가'],
        ['Assist at least 1 goal in 2 separate matches in the FC Heritage Circuit Kick Off Event.', 'FC Heritage Circuit Kick Off Event에서 2개의 서로 다른 경기에서 각각 최소 1도움을 기록하세요.'],
        ['Win 1 Quarter-Finals match while having Min. 2 Serie A players in your starting 11 in the FC Heritage Circuit Tournament.','FC Heritage Circuit Tournament에서 선발 명단에 Serie A 선수 최소 2명을 포함하여 8강전 1경기에서 승리하세요.'],
        ['Win both matches in a single Ultimate Gauntlet 1 round, three times.', 'Ultimate Gauntlet 1의 한 라운드에서 2경기 모두 승리하는 것을 3회 달성하세요.'],
        ['Win the FC Heritage Circuit Tournament 3 times.','FC Heritage Circuit Tournament에서 3회 우승하세요.'],
        ['3 Rounds, Classic Match, Tournament','3라운드, 클래식 경기, 토너먼트'],
        ['3x 78+ Serie A Gold Players Pack','78등급 이상 Serie A 골드 선수 3명 팩']
    ];
    for (const [en,ko] of golden) assert.equal(translate(en),ko,en);
    for (const [index,en] of require('./fixtures/live-condition-sources.json').entries()) {
        if ([0,1,32].includes(index)) continue; // navigation and event introduction
        const ko = translate(en);
        assert.notEqual(ko,en,en);
        assert.doesNotMatch(ko,/\b(?:separate matches|goals|starting|while having|Quarter-Finals|players? items?|match(?:es)? in|Min\.)\b/i,en);
    }
    base.window.close();
    const dynamic = new JSDOM('<body><section><h4>Win <!-- -->1</h4><p>Win 1 match in the Test Event.</p></section></body>', {url:'https://www.fut.gg/live-events/999-test/',runScripts:'outside-only'});
    await delay(0);
    const countNode = dynamic.window.document.querySelector('h4').lastChild;
    dynamic.window.eval(source);
    assert.equal(dynamic.window.document.querySelector('h4').textContent,'1경기 승리');
    countNode.nodeValue = '2';
    await delay(0);
    assert.equal(dynamic.window.document.querySelector('h4').textContent,'2경기 승리');
    dynamic.window.close();
    let conditions = 0, requirements = 0;
    for (const item of require('./fixtures/live-sbc-review-manifest.json')) {
        if (!fs.existsSync(`research/${item.file}`)) { console.log('SKIP optional live HTML fixture: '+item.file); continue; }
        const dom = new JSDOM(fs.readFileSync(`research/${item.file}`,'utf8'),{url:item.url,runScripts:'outside-only'});
        await delay(0);
        const d = dom.window.document;
        const title = d.querySelector('h1').textContent;
        const checks = [];
        if (item.file.startsWith('review-live')) {
            for (const e of d.querySelectorAll('p')) {
                const en = e.textContent.trim();
                if (/^(?:(Play|Win|Score|Assist)\b.*\.|Finish in the top)/.test(en) && !/show that you are Destined/.test(en)) checks.push({e,en,kind:'condition'});
            }
        } else {
            for (const e of d.querySelectorAll('li.text-xs')) checks.push({e,en:e.textContent.trim(),kind:'requirement'});
        }
        dom.window.eval(source);
        assert.equal(d.querySelector('h1').textContent,title,'Preserve content title: '+item.file);
        if (item.file === 'review-live-312.html') assert.ok([...d.querySelectorAll('h4')].some(e => e.textContent === '1경기 승리'));
        if (item.file === 'review-live-334.html') assert.ok([...d.querySelectorAll('h4')].some(e => e.textContent === '20경기에서 도움'));
        if (item.file === 'review-live-406.html') assert.ok([...d.querySelectorAll('h4')].some(e => e.textContent === 'French Fright'));
        for (const {e,en,kind} of checks) {
            assert.notEqual(e.textContent,en,`${item.file}: ${en}`);
            assert.doesNotMatch(e.textContent,/\b(?:Same|Quality|players?|goals|Min\.|Max\.|separate matches|while having|Quarter-Finals)\b/i,en);
            if(kind === 'condition') conditions++; else requirements++;
        }
        const flushes = dom.window.testAPI.stats.flushes;
        await delay(0);
        assert.equal(dom.window.testAPI.stats.flushes,flushes);
        dom.window.close();
    }
    console.log(`PASS: ${golden.length} golden cases, all live condition sources, ${conditions} rendered live conditions, ${requirements} rendered SBC requirements; content names and performance behaviour preserved.`);
}
main().catch(e => { console.error(e); process.exitCode=1; });
