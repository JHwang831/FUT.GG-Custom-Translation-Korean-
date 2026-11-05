const fs = require('node:fs');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const source = fs.readFileSync('FUTGG_KOR_3.0.user.js', 'utf8').replace(/\}\)\(\);\s*$/, 'window.api={translate,stats};})();');
const tick = () => new Promise(resolve => setTimeout(resolve, 0));
async function load(html, path) {
    const dom = new JSDOM(html, { url: 'https://www.fut.gg' + path, runScripts: 'outside-only' });
    await tick();
    dom.window.eval(source);
    return dom;
}
async function main() {
    // Homepage xr/vr components: a name-only content link encloses the timer.
    const home = await load(`<body><ul><li><a href="/live-events/434-phantom-playgrounds/">
      <img alt=""><span><span id="event-name">Holding</span><span>
        <span>Live event</span><span>Nov 6</span>
        <span id="clock" role="timer" aria-label="0 days 4 hours 36 minutes">0d 04h 36m 14s</span>
      </span></span></a></li></ul><div id="large">${'<span>Filler</span>'.repeat(1000)}</div>
      <span id="plain-clock" role="timer" aria-label="1 days 2 hours 3 minutes">1d 02h 03m 04s</span>
      <a href="/news/example/"><span role="timer">0d 04h 36m 14s</span></a>
      <div contenteditable="true"><span role="timer">0d 04h 36m 14s</span></div></body>`, '/');
    const d = home.window.document, clock = d.querySelector('#clock'), text = clock.firstChild;
    assert.equal(clock.textContent, '0일 4시간 36분 14초', 'Actual homepage content-card countdown');
    assert.equal(clock.getAttribute('aria-label'), '0일 4시간 36분');
    assert.equal(d.querySelector('#plain-clock').getAttribute('aria-label'), '1일 2시간 3분');
    assert.equal(d.querySelector('#event-name').textContent, 'Holding');
    assert.equal(d.querySelector('a[href*="/news/"]').textContent, '0d 04h 36m 14s');
    assert.equal(d.querySelector('[contenteditable]').textContent, '0d 04h 36m 14s');
    const visited = home.window.api.stats.visited;
    for (const seconds of [13, 12, 11]) {
        text.nodeValue = `0d 04h 36m ${seconds}s`;
        await tick();
        assert.equal(clock.textContent, `0일 4시간 36분 ${seconds}초`);
        assert.equal(clock.firstChild, text);
    }
    assert.ok(home.window.api.stats.visited - visited < 12, 'Timer updates stay local');
    clock.setAttribute('aria-label', '0 days 4 hours 35 minutes');
    clock.textContent = '0d 04h 35m 59s';
    await tick();
    assert.equal(clock.textContent, '0일 4시간 35분 59초');
    assert.equal(clock.getAttribute('aria-label'), '0일 4시간 35분');
    const card = d.createElement('a');
    card.href = '/evolutions/999-holding/';
    card.innerHTML = '<span>Holding</span><span role="timer">0d 00h 00m 01s</span>';
    d.body.append(card);
    await tick();
    assert.equal(card.querySelector('[role="timer"]').textContent, '0일 0시간 0분 1초');
    const flushes = home.window.api.stats.flushes;
    await tick();
    assert.equal(home.window.api.stats.flushes, flushes, 'No self-triggered mutations');
    home.window.close();

    for (const path of ['/evo-lab/evolutions/', '/evolutions/']) {
        // Source: evolutions-CHVpcAAB.js. React renders a clickable login span,
        // a space, and the remainder as separate text nodes.
        const dom = await load(`<body><p id="login"><span id="action">Log in</span><!-- --> <!-- -->to see which of your players are eligible for this evolution.</p>
          <p id="settings">If you wish to have your settings saved for next time, please sign in.</p>
          <p id="long">Build and simulate Evolution paths for any player right now. Log in to save them to My Players and track your available upgrades.</p>
          <span id="limit">You've reached the maximum of <!-- -->1,000<!-- --> saved players. Remove some players before adding new ones.</span>
          <div id="portal"></div></body>`, path);
        const doc = dom.window.document, action = doc.querySelector('#action');
        let clicks = 0;
        action.addEventListener('click', () => clicks++);
        assert.equal(doc.querySelector('#login').textContent, '로그인하면 이 진화에 사용할 수 있는 내 선수를 확인할 수 있습니다.');
        assert.equal(action.textContent, '로그인', 'Only the login action stays clickable');
        action.click();
        assert.equal(clicks, 1);
        assert.equal(doc.querySelector('#settings').textContent, '다음에도 설정을 사용하려면 로그인하세요.');
        assert.ok(!/[a-z]/i.test(doc.querySelector('#long').textContent), 'Registered long UI messages precede prose exclusion');
        assert.equal(doc.querySelector('#limit').textContent, '선수 저장 한도인 1,000명에 도달했습니다. 새 선수를 추가하려면 기존 선수를 삭제하세요.');
        doc.querySelector('#portal').innerHTML = `<div role="dialog"><input placeholder="Select a player to evolve" value="Holding"><p>No results found</p>
          <button>Reset player selection</button><button title="Preview player attributes">Preview player</button>
          <div role="option"><a href="/players/123-holding/27-123/">Holding</a></div>
          <p id="help">Tap once to add a PlayStyle, tap again to upgrade to <span>PlayStyle+</span>, tap a third time to remove.</p>
          <p>You must be signed in to view your Evo Lab.</p></div>`;
        await tick();
        assert.equal(doc.querySelector('input').placeholder, '진화할 선수 선택');
        assert.equal(doc.querySelector('input').value, 'Holding');
        assert.equal(doc.querySelector('[role="option"]').textContent, 'Holding');
        assert.equal(doc.querySelector('[role="dialog"] p').textContent, '검색 결과가 없습니다');
        assert.equal(doc.querySelector('button').textContent, '선수 선택 초기화');
        assert.equal(doc.querySelector('[title]').title, '선수 능력치 미리 보기');
        assert.equal(doc.querySelector('#help').textContent, '한 번 누르면 플레이스타일 추가, 다시 누르면 플레이스타일+로 강화, 세 번째 누르면 제거됩니다.');
        assert.equal(doc.querySelector('#help span').textContent, '플레이스타일+');
        for (const [english, korean] of [
            ['Removing this evolution will convert your saved player to an unsaved build. Your customizations will need to be re-applied. Are you sure?', '이 진화를 제거하면 저장된 선수가 저장되지 않은 구성으로 바뀝니다. 직접 변경한 설정은 다시 적용해야 합니다. 계속하시겠어요?'],
            ['Save Holding to your FUT.GG account?', 'Holding 선수를 FUT.GG 계정에 저장하시겠어요?'],
            ['Holding Drafts', 'Holding 임시 저장']
        ]) assert.equal(dom.window.api.translate(english), korean);
        // React re-renders only the suffix of an already translated phrase.
        doc.querySelector('#login').lastChild.nodeValue = 'to see which of your players are eligible for this evolution.';
        await tick();
        assert.equal(doc.querySelector('#login').textContent, '로그인하면 이 진화에 사용할 수 있는 내 선수를 확인할 수 있습니다.');
        dom.window.close();
    }
    console.log('PASS: real homepage timer card and live ticks; Evo Lab portal/player picker, complete split login and PlayStyle help, long UI messages, identities and click handlers.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
