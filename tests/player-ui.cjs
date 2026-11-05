const fs=require('node:fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const source=fs.readFileSync('FUTGG_KOR_3.0.user.js','utf8').replace(/\}\)\(\);\s*$/,'window.api={translate,stats};})();');
const tick=()=>new Promise(r=>setTimeout(r,0));
async function main(){
    const page=new JSDOM(`<body>
      <h1>Holding - Ultimate Scream 91 OVR</h1>
      <a id="player" href="/players/123-holding/27-123/">Holding</a>
      <div><span>Name</span><span id="name">Holding</span></div>
      <div><span>Club</span><span id="club">Reading</span></div>
      <div><span>Rarity</span><span id="season">Special</span></div>
      <a id="league" href="/leagues/13/">Premier League</a>
      <button id="role">Holding</button>
      <h4 id="question">Where would <b>you</b> place <a href="/players/123-holding/27-123/">Holding</a>?</h4>
      <button id="filter">Active Objective Players Only</button>
      <input placeholder="Search saved filters...">
      <div id="timer"><span>0d</span> <span>04h</span> <span>36m</span> <span>14s</span></div>
      <div id="split"><span>0</span>d <span>04</span>h <span>36</span>m <span>14</span>s</div>
      <div id="zero">0d 00h 00m 00s</div>
      <span id="coins">2.5M</span><span id="bare">5m</span>
      <span id="oneoff">Liga Bbva Mx - Día De Muertos</span><span id="hannibal">Hannibal</span>
    </body>`,{url:'https://www.fut.gg/players/123-holding/27-123/',runScripts:'outside-only'});
    await tick();
    const d=page.window.document;
    const seconds=d.querySelector('#timer').lastElementChild.firstChild;
    const splitSeconds=d.querySelector('#split').lastElementChild.firstChild;
    page.window.eval(source);
    for(const id of ['player','name','role']) assert.equal(d.getElementById(id).textContent,id==='role'?'홀딩':'Holding');
    assert.equal(d.getElementById('club').textContent,'Reading');
    assert.equal(d.getElementById('season').textContent,'Special');
    assert.equal(d.getElementById('league').textContent,'Premier League');
    assert.equal(d.querySelector('h1').textContent,'Holding - Ultimate Scream 91 OVR');
    assert.equal(d.getElementById('filter').textContent,'진행 중인 목표 선수만');
    assert.equal(d.getElementById('question').textContent,'Holding에게 어떤 티어를 주시겠어요?');
    assert.ok(d.querySelector('#question a').textContent.includes('Holding'));
    assert.equal(d.querySelector('input').placeholder,'저장된 필터 검색...');
    assert.equal(d.getElementById('timer').textContent,'0일 4시간 36분 14초');
    assert.equal(d.getElementById('split').textContent,'0일 4시간 36분 14초');
    assert.equal(d.getElementById('zero').textContent,'0일 0시간 0분 0초');
    assert.equal(d.getElementById('coins').textContent,'2.5M');
    assert.equal(d.getElementById('bare').textContent,'5m');
    assert.equal(d.getElementById('oneoff').textContent,'Liga Bbva Mx - Día De Muertos');
    assert.equal(d.getElementById('hannibal').textContent,'Hannibal');
    seconds.nodeValue='13s';splitSeconds.nodeValue='13';
    await tick();
    assert.equal(d.getElementById('timer').textContent,'0일 4시간 36분 13초');
    assert.equal(d.getElementById('split').textContent,'0일 4시간 36분 13초');
    for(const [en,ko] of [
      ['0d 04h 36m 14s','0일 4시간 36분 14초'],['1h 30m','1시간 30분'],['14s','14초'],
      ['Expires in 0d 04h 36m 14s','만료까지 0일 4시간 36분 14초'],
      ['GK Goalkeeper GGR','GK 골키퍼 GG 등급'],['CAM Classic Ten GGR','CAM 클래식 10번 GG 등급'],
      ['ST False 9 GGR','ST 폴스 나인 GG 등급'],['Min PlayStyles Count','최소 플레이스타일 수'],
      ['No players match your search query.','검색 조건에 맞는 선수가 없습니다.']
    ])assert.equal(page.window.api.translate(en),ko,en);
    await tick();const flushes=page.window.api.stats.flushes;await tick();assert.equal(page.window.api.stats.flushes,flushes);
    page.window.close();
    if(fs.existsSync('research/player-assets/asset-3.js')) {
        const bundle=fs.readFileSync('research/player-assets/asset-3.js','utf8');
        for(const label of ['Active Objective Players Only','Search saved filters...','No players match your search query.']) assert.ok(bundle.includes(label),'Observed public UI string: '+label);
    }
    console.log('PASS: whole and fragmented countdowns, seconds refresh, zero values, coin prices, one-off names, player identities versus roles, and observed player filter/search/GGR labels.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
