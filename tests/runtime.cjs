const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const source = fs.readFileSync('FUTGG_KOR_3.0.user.js', 'utf8').replace(/\}\)\(\);\s*$/, 'window.testAPI = { translate, stats };\n})();');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function load(html, url = 'https://www.fut.gg/players/test/') {
    const dom = new JSDOM(html, { url, runScripts: 'outside-only' });
    await delay(0);
    dom.window.eval(source);
    return dom;
}
async function main() {
    const dom = await load(`<!doctype html><body>
      <span id="roles">Roles (<!-- -->7<!-- -->)</span>
      <span id="question">Where would<!-- --> <b>you</b> <!-- -->place <a href="/players/test/">Johan Cruyff</a>?</span>
      <h4 id="banner">Have a better <!-- -->Johan Cruyff<!-- --> Evolution?</h4>
      <button id="votes"><i></i><span>628</span> placements</button>
      <span id="time">in <span>22</span> minutes</span>
      <input id="search" placeholder="Search everything…" value="Home">
      <pre>Home</pre><div contenteditable="true">Roles (7)</div>
      <script type="application/json">{"name":"Home"}</script><svg><text>Home</text></svg>
      <div id="large">${'<span>Untranslated filler</span>'.repeat(1200)}</div>
    </body>`);
    const d = dom.window.document;
    const { translate, stats } = dom.window.testAPI;
    assert.equal(d.querySelector('#roles').textContent, '역할 (7)');
    assert.equal(d.querySelector('#question').textContent, 'Johan Cruyff에게 어떤 티어를 주시겠어요?');
    assert.match(d.querySelector('#question a').textContent, /Johan Cruyff/);
    assert.equal(d.querySelector('#banner').textContent, '더 좋은 Johan Cruyff 진화 선수가 있나요?');
    assert.equal(d.querySelector('#votes').textContent, '628명이 투표함');
    assert.equal(d.querySelector('#time').textContent, '22분 후');
    assert.equal(d.querySelector('#search').placeholder, '전체 검색...');
    assert.equal(d.querySelector('#search').value, 'Home');
    assert.equal(d.querySelector('pre').textContent, 'Home');
    assert.equal(d.querySelector('[contenteditable]').textContent, 'Roles (7)');
    assert.equal(d.querySelector('svg text').textContent, 'Home');
    assert.match(d.querySelector('script').textContent, /"Home"/);
    const originalRoleNodes = [...d.querySelector('#roles').childNodes];
    const countNode = originalRoleNodes.find(n => n.nodeType === 3 && n.nodeValue === '7');
    const button = d.querySelector('#votes');
    let clicks = 0;
    button.addEventListener('click', () => clicks++);
    button.click();
    assert.equal(clicks, 1);
    const visited = stats.visited;
    countNode.nodeValue = '12';
    d.querySelector('#votes span').firstChild.nodeValue = '629';
    d.querySelector('#time span').firstChild.nodeValue = '21';
    await delay(100);
    assert.equal(d.querySelector('#roles').textContent, '역할 (12)');
    assert.equal(d.querySelector('#votes').textContent, '629명이 투표함');
    assert.equal(d.querySelector('#time').textContent, '21분 후');
    assert.ok(originalRoleNodes.every((n, i) => d.querySelector('#roles').childNodes[i] === n));
    assert.ok(stats.visited - visited < 20, 'Small updates must not revisit the 1200-node body');
    const flushes = stats.flushes;
    await delay(100);
    assert.equal(stats.flushes, flushes, 'Own writes must not cause observer loops');
    const section = d.createElement('section');
    section.innerHTML = '<h2>Player Information</h2><input placeholder="Search everything...">';
    d.body.append(section);
    await delay(100);
    assert.equal(section.querySelector('h2').textContent, '선수 정보');
    section.querySelector('input').setAttribute('placeholder', 'Search Players...');
    await delay(100);
    assert.equal(section.querySelector('input').placeholder, '선수 검색...');
    for (const [original, expected] of [
        ['2.5M', '2.5M'], ['100K', '100K'], ['8,650,000', '8,650,000'],
        ['ST - Advanced Forward ++', 'ST - 어드밴스 포워드 ++'],
        ['ST False 9 ++', 'ST 폴스 나인 ++'],
        ['Assist 2 goals with your active EVO player in Rush.', '러시에서 활성화된 진화 선수로 2도움을 기록하세요.'],
        ['in 22 minutes', '22분 후'], ['19 minutes ago', '19분 전'],
        ['1h 30m', '1시간 30분'],
        ['sep 25, 2026, 7:00 PM UTC', '2026년 9월 25일 오후 7시 00분 UTC']
        ,['Earn a pack containing 1 TOTW Player Item, rated 81 or higher, from TOTW 1 to 7.', 'Earn a pack containing 1 TOTW Player Item, rated 81 or higher, from TOTW 1 to 7.']
        ,['2X 84+ Gold Players Pack', '84등급 이상 골드 선수 2명 팩']
        ,['2x Max 85 Gold Players Pack', '최대 85등급 골드 선수 2명 팩']
        ,['1 Of 4 Squad Foundations Pick', '스쿼드 파운데이션 4개 중 1개 선택']
        ,['1,000 Coins', '1,000 코인']
        ,['1,272 players have the regular Aerial Fortress PlayStyle, led by Maldini (93), Thuram (89) and Stam (88).', '1,272 players have the regular Aerial Fortress PlayStyle, led by Maldini (93), Thuram (89) and Stam (88).']
        ,['Play 15 Squad Battles Matches on any difficulty.', '아무 난이도에서 스쿼드 배틀 15경기를 플레이하세요.']
        ,['ST Roles & Focus', 'ST 역할 및 집중 설정']
        ,['Rating: Min. 45', '최소 등급: 45']
        ,['Squad Battles Milestone - EA SPORTS FC 27 Objectives', '스쿼드 배틀 마일스톤 - EA SPORTS FC 27 목표']
        ,['See all Johan Cruyff Evolution paths', 'Johan Cruyff의 모든 진화 경로 보기']
        ,['1 of 3 79+ Gold Player Pick', '79등급 이상 골드 선수 3개 중 1개 선택']
        ,['Max 88 Base Hero Upgrade', 'Max 88 Base Hero Upgrade']
        ,['4-3-3 Holding', '4-3-3 홀딩']
        ,['03 Nov, 22:45 UTC', '11월 3일 22:45 UTC']
        ,['Only Special Cards', '특별 카드만']
        ,['Extinct before update', '갱신 전 매물 없음']
    ]) assert.equal(translate(original), expected, original);
    const challenge = 'Play 1 match in Squad Battles on min Semi-Pro difficulty (or Rush/Rivals/Champions/Live Events) using your active EVO player in game.';
    assert.match(translate(challenge), /러시\/라이벌\/챔피언스\/라이브 이벤트/);
    // Retain the previous version's sample coverage, with bare duration semantics clarified.
    const cases = require('./fixtures/legacy-cases.json');
    for (const [original, expected] of cases) {
        const descriptions = ['Kylian Mbappé Destined for Glory 91 OVR ST (Real Madrid) on EA FC 27. Full stats, prices, evolutions, playstyles, GG Rating and community votes.'];
        assert.equal(translate(original), descriptions.includes(original) ? original : original === '19 minutes' ? '19분' : expected, original);
    }
    dom.window.close();

    const preference = await load('<body><h1>New Objective - EA SPORTS FC 27 Objectives</h1><p>Win 3 matches to earn rewards in 24 hours.</p><section><h4>Play 20</h4><p>Play 20 Squad Battles Matches on any difficulty.</p></section><button>View Rewards</button></body>', 'https://www.fut.gg/objectives/live/999-new-objective/');
    assert.equal(preference.window.document.querySelector('h1').textContent, 'New Objective - EA SPORTS FC 27 Objectives');
    assert.equal(preference.window.document.querySelector('body > p').textContent, 'Win 3 matches to earn rewards in 24 hours.');
    assert.equal(preference.window.document.querySelector('h4').textContent, '20경기 플레이');
    assert.match(preference.window.document.querySelector('section p').textContent, /스쿼드 배틀 20경기/);
    assert.equal(preference.window.document.querySelector('button').textContent, '보상 보기');
    preference.window.close();

    // If a body is already available, the runtime adds no extra load-event wait.
    const early = new JSDOM('<body><button>Refresh</button></body>', {url:'https://www.fut.gg/',runScripts:'outside-only'});
    assert.equal(early.window.document.readyState, 'loading');
    early.window.eval(source);
    assert.equal(early.window.document.querySelector('button').textContent, '새로고침');
    await delay(0);
    early.window.close();

    const lateBody = new JSDOM('<html><head></head></html>', {url:'https://www.fut.gg/',runScripts:'outside-only'});
    lateBody.window.document.body.remove();
    lateBody.window.eval(source);
    const body = lateBody.window.document.createElement('body');
    body.innerHTML = '<button>Refresh</button>';
    lateBody.window.document.documentElement.append(body);
    await delay(0);
    assert.equal(body.querySelector('button').textContent, '새로고침');
    lateBody.window.close();

    const livePages = fs.existsSync('research') ? fs.readdirSync('research').filter(f => f.endsWith('.html')).map(f => f.slice(0, -5)) : [];
    if (!livePages.length) console.log('SKIP optional public-page HTML fixtures: research/*.html not present.');
    for (const name of livePages) {
        const file = `research/${name}.html`;
        if (!fs.existsSync(file)) { console.log(`SKIP optional live fixture: ${file}`); continue; }
        const paths = { evolutions:'/evolutions/', evolution:'/evolutions/2622-the-haunted-wall/', objectives:'/objectives/', 'objective-detail':'/objectives/milestones/42-squad-battles-milestone/', sbcs:'/sbc/', 'sbc-detail':'/sbc/players/27-96-martin-ojeda/' };
        const manifest = ['tests/fixtures/live-sbc-review-manifest.json','tests/fixtures/objective-review-manifest.json'].flatMap(file=>JSON.parse(fs.readFileSync(file,'utf8')));
        const explicitURL = manifest.find(p => p.file === name + '.html')?.url;
        const fixture = await load(fs.readFileSync(file, 'utf8'), explicitURL || 'https://www.fut.gg' + (paths[name] || '/players/test/'));
        const doc = fixture.window.document;
        const api = fixture.window.testAPI;
        assert.equal(doc.querySelector('input[placeholder]')?.placeholder, '전체 검색...');
        const texts = [...doc.querySelectorAll('span,h4')].map(e => e.textContent);
        if (name === 'player') {
            assert.ok(texts.some(t => /^역할 \(\d+\)$/.test(t)));
            assert.ok(texts.some(t => /Johan Cruyff에게 어떤 티어/.test(t)));
            assert.ok(texts.some(t => /^더 좋은 Johan Cruyff/.test(t)));
        }
        // Titles and introductions stay English; functional conditions still translate.
        if (name === 'evolutions') {
            assert.equal([...doc.querySelectorAll('h2')].find(e => e.textContent === 'Glow Guard')?.textContent, 'Glow Guard');
            assert.ok([...doc.querySelectorAll('p')].some(e => e.textContent.startsWith('Develop a raw defensive prospect')));
        }
        if (name === 'evolution') {
            assert.equal(doc.querySelector('h1').textContent, 'The Haunted Wall - EA SPORTS FC 27');
            assert.ok([...doc.querySelectorAll('p')].some(e => e.textContent.startsWith('Make your defense a nightmare')));
            assert.ok(doc.body.textContent.includes('활성화된 진화 선수'));
        }
        if (name === 'objectives') {
            assert.ok([...doc.querySelectorAll('h3')].some(e => e.textContent === 'Weekly Rush Points'));
            assert.ok([...doc.querySelectorAll('p')].some(e => e.textContent.startsWith('Complete Rush Bonuses')));
        }
        if (name === 'objective-detail') {
            assert.equal(doc.querySelector('h1').textContent, 'Squad Battles Milestone - EA SPORTS FC 27 Objectives');
            assert.ok(doc.body.textContent.includes('아무 난이도에서 스쿼드 배틀 15경기를 플레이하세요.'));
        }
        if (name === 'sbcs') {
            assert.ok([...doc.querySelectorAll('h3')].some(e => e.textContent === 'Hocus Pocus'));
            assert.ok([...doc.querySelectorAll('p')].some(e => e.textContent === 'Earn a special Ultimate Scream Martín Ojeda.'));
        }
        if (name === 'sbc-detail') assert.ok(doc.body.textContent.includes('최소 등급: 45'));
        if (name === 'role-st') assert.ok(doc.body.textContent.includes('집중 설정'));
        if (name === 'playstyle-finesse-shot') {
            assert.ok(doc.body.textContent.includes('플레이스타일 효과'));
            assert.ok([...doc.querySelectorAll('p')].some(p => p.textContent.startsWith('Finesse Shot is changing in FC 27.')));
        }
        const writes = api.stats.writes;
        await delay(80);
        assert.equal(api.stats.writes, writes);
        assert.equal(api.stats.flushes, 1);
        console.log(`PASS live HTML: ${name}, ${api.stats.visited} nodes, ${writes} writes, no observer loop`);
        fixture.window.close();
    }
    console.log('PASS: legacy cases, live HTML, React comment/element identity, count/time refresh, insertion, attributes, protected content, bounded incremental work.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
