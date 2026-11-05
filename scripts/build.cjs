const fs = require('node:fs');
const header = fs.readFileSync('src/userscript-header.txt', 'utf8').trimEnd();
const data = JSON.parse(fs.readFileSync('src/ko-KR.json', 'utf8'));
const modules = ['rules.js','additional-rules.js','event-sbc-rules.js','objective-rules.js','content-policy.js','runtime.js'];
const output = `${header}\n\n(function () {\n'use strict';\n// 번역 사전: 고정된 UI 문구를 한국어로 바꿀 때 사용합니다.\nconst translations = ${JSON.stringify(data, null, 2)};\n${modules.map(file=>fs.readFileSync('src/'+file,'utf8')).join('\n')}\n})();\n`;
const version = header.match(/^\/\/ @version\s+(\S+)/m)?.[1];
if (!version || version !== JSON.parse(fs.readFileSync('package.json', 'utf8')).version) throw new Error('Header/package version mismatch');
const files = new Map([['FUTGG_KOR_3.0.user.js', output], ['FUTGG_KOR_3.0.meta.js', header + '\n']]);
for (const [file, content] of files) {
    if (process.argv.includes('--check')) {
        if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== content) throw new Error(`${file} is out of date. Run npm run build.`);
    } else fs.writeFileSync(file, content);
}
console.log(`${process.argv.includes('--check') ? 'Verified' : 'Built'} ${[...files.keys()].join(', ')}`);
