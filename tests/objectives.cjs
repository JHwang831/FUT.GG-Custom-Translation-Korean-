const fs=require('node:fs');
const assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');
const source=fs.readFileSync('FUTGG_KOR_3.0.user.js','utf8').replace(/\}\)\(\);\s*$/,'window.testAPI={translate,stats};})();');
const pause=()=>new Promise(r=>setTimeout(r,0));
async function main(){
    const dom=new JSDOM('<body/>',{url:'https://www.fut.gg/',runScripts:'outside-only'});
    await pause();dom.window.eval(source);
    const translate=dom.window.testAPI.translate;
    const cases=[
        ['Earn 35,000 points by completing bonuses in Rush.','러시 보너스를 완료하여 러시 포인트 35,000점을 획득하세요.'],
        ['Complete any 4 SBC Groups.','SBC 그룹 4개를 완료하세요.'],
        ['Assist at least 1 goal in 7 separate matches with a player with min. 85 PAC in any FUT game mode.','페이스 85 이상인 선수로 아무 FUT 모드에서 7개의 서로 다른 경기에서 각각 최소 1도움을 기록하세요.'],
        ['Score 10 goals in any FUT game mode using a player from Germany.','독일 선수로 아무 FUT 모드에서 10개의 골을 기록하세요.'],
        ['Win 10 matches in Squad Battles on min. Semi-Pro difficulty (or Rivals/Champions/Live Events/Rush).','스쿼드 배틀(최소 세미프로) 또는 라이벌/챔피언스/라이브 이벤트/러시에서 10경기에서 승리하세요.'],
        ['Play 7 Live Events matches (or Rivals/Squad Battles).','라이브 이벤트 또는 라이벌/스쿼드 배틀에서 7경기를 플레이하세요.'],
        ['Apply a Chemistry Style item.','케미스트리 스타일 아이템을 적용하세요.'],
        ['Buy 1,000 players using Buy Now on the Transfer Market.','이적 시장에서 즉시구매로 선수 1,000명을 구매하세요.'],
        ['List 500 players on the Transfer Market.','이적 시장에 선수 500명을 등록하세요.'],
        ['Achieve A Rank in the Ultimate Scream Gallery Set.','Ultimate Scream Gallery Set에서 A 등급을 달성하세요.'],
        ['Reach Gallery Level 25.','갤러리 레벨 25에 도달하세요.'],
        ['Score 20 goals as a team in Rush.','팀 전체로 러시에서 20개의 골을 기록하세요.'],
        ['Play 50 Co-Op matches.','협동에서 50경기를 플레이하세요.'],
        ['Win 100 matches in any FUT game mode with a starting squad of First Owned players.','선발 전원을 최초 소유 선수로 구성하여 아무 FUT 모드에서 100경기에서 승리하세요.']
    ];
    for(const [en,ko] of cases)assert.equal(translate(en),ko,en);
    const sources=require('./fixtures/objective-task-sources.json');
    for(const {text} of sources){
        const ko=translate(text);
        assert.notEqual(ko,text,text);
        assert.doesNotMatch(ko,/\b(?:any FUT|game mode|Live Events \(|while having|starting|players? from|player items?|with a through ball|from a cross|separate matches|Min\.)\b/i,text);
    }
    dom.window.close();
    let checked=0, pagesChecked=0;
    for(const item of require('./fixtures/objective-review-manifest.json')){
        if(!fs.existsSync('research/'+item.file)){console.log('SKIP optional objective HTML fixture: '+item.file);continue;}
        pagesChecked++;
        const page=new JSDOM(fs.readFileSync('research/'+item.file,'utf8'),{url:item.url,runScripts:'outside-only'});
        await pause();
        const d=page.window.document;
        const title=d.querySelector('h1').textContent;
        const intro=d.querySelector('h1').parentElement.querySelector('p');
        const originalIntro=intro?.textContent;
        const taskNodes=[];
        for(const p of d.querySelectorAll('p')){
            let node=p.parentElement,heading;
            for(let i=0;node&&i<3;i++,node=node.parentElement){heading=node.querySelector('h3,h4');if(heading)break;}
            if(heading?.tagName==='H4')taskNodes.push({node:p,source:p.textContent.trim()});
        }
        page.window.eval(source);
        assert.equal(d.querySelector('h1').textContent,title);
        if(intro)assert.equal(intro.textContent,originalIntro);
        for(const {node,source:en} of taskNodes){assert.equal(node.textContent,translate(en),item.file+': '+en);assert.notEqual(node.textContent,en);checked++;}
        if(item.file.includes('weekly-rush-points'))assert.ok([...d.querySelectorAll('h4')].some(h=>h.textContent==='35,000 러시 포인트'));
        if(item.file.includes('gallery-milestone'))assert.ok([...d.querySelectorAll('h4')].some(h=>h.textContent==='5레벨'));
        await pause();assert.equal(page.window.testAPI.stats.flushes,1);
        page.window.close();
    }
    const news=new JSDOM('<body><nav><a href="/players/">Players</a></nav><a id="teaser" href="/news/example/" aria-label="View Rewards"><h3>Play 5</h3><p>Score 2 goals in any FUT game mode.</p></a></body>',{url:'https://www.fut.gg/',runScripts:'outside-only'});
    await pause();news.window.eval(source);
    assert.equal(news.window.document.querySelector('#teaser h3').textContent,'Play 5');
    assert.equal(news.window.document.querySelector('#teaser p').textContent,'Score 2 goals in any FUT game mode.');
    assert.equal(news.window.document.querySelector('#teaser').getAttribute('aria-label'),'View Rewards');
    assert.equal(news.window.document.querySelector('nav').textContent,'선수');news.window.close();
    const article=new JSDOM('<body><nav>Players</nav><main><h1>Play 5</h1><article><p>Score 2 goals in any FUT game mode.</p></article></main></body>',{url:'https://www.fut.gg/news/example/',runScripts:'outside-only'});
    await pause();article.window.eval(source);
    assert.equal(article.window.document.querySelector('h1').textContent,'Play 5');
    assert.equal(article.window.document.querySelector('p').textContent,'Score 2 goals in any FUT game mode.');
    assert.equal(article.window.document.querySelector('nav').textContent,'선수');article.window.close();
    console.log(`PASS: ${cases.length} objective golden cases, ${sources.length} raw conditions, ${checked} rendered conditions across ${pagesChecked} objective pages, original names/intros, news exclusion.`);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
