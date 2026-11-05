const fs = require('node:fs');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const source = fs.readFileSync('FUTGG_KOR_3.0.user.js', 'utf8');
const tick = () => new Promise(resolve => setTimeout(resolve, 0));
async function load(html, path) {
    const dom = new JSDOM(html, { url: 'https://www.fut.gg' + path, runScripts: 'outside-only' });
    await tick(); dom.window.eval(source); return dom;
}
async function main() {
    const evo = await load(`<body><div id="portal"></div>
      <a href="/evolutions/123-clinical-or-technical/"><h2 id="name">Clinical or Technical? [SP+ 28]</h2>
        <p id="intro">Develop this player with your chosen upgrades.</p>
        <section><h3 id="requirements">Requirements</h3><div>Overall</div></section>
        <section><h3 id="upgrades">Upgrades</h3></section></a>
      <a href="/evolutions/124-rm-roles/"><h3 id="role-title">RM Roles++</h3></a>
      <a href="/evolutions/2629-anticipate/"><h3 id="named-anticipate">Anticipate</h3></a>
      <button id="playstyle-anticipate">Anticipate</button>
      <div class="fc-card"><div class="absolute text-center leading-none" id="player">Palmer</div></div>
      <h3>SEPTEMBER</h3><h3>OCTOBER</h3><button id="best">Best position</button>
      <button id="best-role">Best <!-- -->CAM<!-- --> Role</button>
      <span id="pill"><span class="truncate max-w-[80px]">Winger++</span><span class="text-evo shrink-0">++</span></span>
      <span id="single">Winger++</span>
      <label><span>Premium Season Pass Evos</span><button role="switch" aria-checked="false"></button></label>
      <label>Reward Evolutions</label><label>Token Evos</label><label>Calculate GG Rating</label>
      </body>`, '/evolutions/');
    const d = evo.window.document;
    assert.equal(d.querySelector('#requirements').textContent, '요구사항');
    assert.equal(d.querySelector('#upgrades').textContent, '업그레이드');
    assert.equal(d.querySelector('#name').textContent, 'Clinical or Technical? [SP+ 28]');
    assert.equal(d.querySelector('#intro').textContent, 'Develop this player with your chosen upgrades.');
    assert.equal(d.querySelector('#role-title').textContent, 'RM 역할++');
    assert.equal(d.querySelector('#named-anticipate').textContent, 'Anticipate');
    assert.equal(d.querySelector('#playstyle-anticipate').textContent, '예측');
    assert.equal(d.querySelector('#player').textContent, 'Palmer');
    assert.equal(d.querySelector('#best').textContent, '최적 포지션');
    assert.equal(d.querySelector('#best-role').textContent, 'CAM 최적 역할');
    assert.equal(d.querySelector('#pill').textContent, '윙어++');
    assert.equal(d.querySelector('#pill span.text-evo').textContent, '++');
    assert.equal(d.querySelector('#single').textContent, '윙어++');
    assert.deepEqual([...d.querySelectorAll('body > h3')].map(e=>e.textContent), ['9월','10월']);
    assert.deepEqual([...d.querySelectorAll('label')].map(e=>e.textContent), ['프리미엄 시즌 패스 진화','보상 진화','토큰 진화','GG 등급 계산']);
    assert.equal(d.querySelector('[role="switch"]').getAttribute('aria-checked'), 'false');
    d.querySelector('#portal').innerHTML = `<h2>Sign in to see your upgrades</h2><p>Log in to see available Evolution upgrades for the players in your My Players.</p>
      <h2>Sign in to see your drafts</h2><p>Log in to save Evolution drafts and pick up where you left off.</p>
      <h3>No active Evolutions right now</h3><p>Past Evolutions might still work. Try Evo Lab.</p>
      <p>Think you can build your own? Try it in Evo Lab.</p><button>Open Evo Lab</button>`;
    await tick();
    assert.ok(!/[a-z]/i.test(d.querySelector('#portal').textContent), 'All reported auth/empty-state UI translates after insertion');
    d.querySelector('#pill .truncate').firstChild.nodeValue = 'Half-Winger++';
    await tick();
    assert.equal(d.querySelector('#pill').textContent, '하프 윙어++');
    evo.window.close();

    const cards = fs.readFileSync('tests/fixtures/sbc-player-card.html','utf8');
    const sbc = await load(`<body><input placeholder="Search SBCs">${cards}
      <a href="/sbc/players/27-123-holding/" id="stat">CHALLENGES<span>1</span></a>
      <a href="/sbc/players/27-123-holding/" id="expiry">EXPIRES<span>in 6 days</span></a>
      <a href="/players/123-holding/27-123/" id="profile">Holding</a>
      <a href="/players/123-holding/27-123/" id="view">View Holding</a></body>`, '/sbc/');
    const s = sbc.window.document;
    assert.equal(s.querySelector('input').placeholder, 'SBC 검색');
    assert.equal(s.querySelector('#stat').textContent, '챌린지1');
    assert.equal(s.querySelector('#expiry').textContent, '만료까지6일 후');
    assert.equal(s.querySelector('#profile').textContent, 'Holding');
    assert.equal(s.querySelector('#view').textContent, 'Holding 보기');
    if (cards) {
        assert.equal(s.querySelector('h3').textContent, 'Martín Ojeda');
        const texts = [...s.querySelectorAll('a')].map(e=>e.textContent.trim());
        assert.ok(texts.includes('챌린지1'));
        assert.ok(texts.includes('반복 가능 횟수-'));
        assert.ok(texts.includes('새로고침 주기-'));
        assert.ok(texts.includes('Earn a special Ultimate Scream Martín Ojeda.'));
        assert.ok(texts.includes('Martín Ojeda 보기'));
    }
    sbc.window.close();
    const live = await load(`<body><div id="start">Starts <!-- -->in <span>1</span> day</div>
      <div id="end">Ends <span>in 1 day</span></div><div id="past">Ended <span>14일</span> ago</div></body>`, '/live-events/');
    const l = live.window.document;
    assert.equal(l.querySelector('#start').textContent, '1일 후 시작');
    assert.equal(l.querySelector('#end').textContent, '1일 후 종료');
    assert.equal(l.querySelector('#past').textContent, '14일 전 종료');
    l.querySelector('#start span').firstChild.nodeValue = '2';
    await tick();
    assert.equal(l.querySelector('#start').textContent, '2일 후 시작');
    live.window.close();
    console.log('PASS: screenshot Evo controls, functional headings, auth/empty-state prompts, role-title exception and single plus badge; real player SBC card UI/identity separation; split start/end/ended time updates.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
