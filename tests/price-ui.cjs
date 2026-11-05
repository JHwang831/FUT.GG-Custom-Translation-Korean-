const fs = require('node:fs');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const source = fs.readFileSync('FUTGG_KOR_3.0.user.js', 'utf8');
const tick = () => new Promise(resolve => setTimeout(resolve, 0));
async function main() {
    const dates = ['Oct 30','Oct 31','Nov 1','Nov 2','Nov 3','Nov 4','Nov 5','Nov 6'];
    const dom = new JSDOM(`<body><p id="updated">현재 가격<span> · Updated <!-- -->2026년 11월 6일 오전 1시 25분</span></p>
      <p>2026년 11월 5일<span id="comparison"> · vs current <!-- -->7,370,000</span></p>
      <svg class="recharts-surface">${dates.map(date=>`<text class="recharts-text recharts-cartesian-axis-tick-value"><tspan>${date}</tspan></text>`).join('')}
        <text class="recharts-cartesian-axis-tick-value"><tspan>7.3M</tspan></text>
        <text id="svg-label">Home</text></svg>
      <a href="/news/example/"><svg class="recharts-surface"><text class="recharts-cartesian-axis-tick-value">Oct 30</text></svg></a>
      <div id="large">${'<span>Filler</span>'.repeat(1000)}</div></body>`, { url:'https://www.fut.gg/players/123-holding/27-123/', runScripts:'outside-only' });
    await tick();
    const d = dom.window.document, amount = d.querySelector('#comparison').lastChild;
    dom.window.eval(source);
    assert.equal(d.querySelector('#updated').textContent,'현재 가격 · 갱신 2026년 11월 6일 오전 1시 25분');
    assert.equal(d.querySelector('#comparison').textContent,' · 현재 가격 7,370,000 대비');
    assert.deepEqual([...d.querySelectorAll('body > svg .recharts-cartesian-axis-tick-value')].map(e=>e.textContent),['10월 30일','10월 31일','11월 1일','11월 2일','11월 3일','11월 4일','11월 5일','11월 6일','7.3M']);
    assert.equal(d.querySelector('#svg-label').textContent,'Home');
    assert.equal(d.querySelector('a svg').textContent,'Oct 30');
    const dateNode = d.querySelector('svg tspan').firstChild;
    dateNode.nodeValue = 'Nov 7';
    amount.nodeValue = '7,400,000';
    await tick();
    assert.equal(d.querySelector('svg tspan').textContent,'11월 7일');
    assert.equal(d.querySelector('#comparison').textContent,' · 현재 가격 7,400,000 대비');
    const late = d.createElementNS('http://www.w3.org/2000/svg','text');
    late.setAttribute('class','recharts-cartesian-axis-tick-value');
    late.textContent = 'Nov 8';
    d.querySelector('svg').append(late);
    await tick();
    assert.equal(late.textContent,'11월 8일');
    dom.window.close();
    console.log('PASS: split Korean/English price update and comparison, changing amounts, observed Recharts SVG dates and insertions, chart prices and unrelated SVG/news preserved.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
