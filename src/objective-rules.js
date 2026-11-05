// Whole objective conditions, with numeric values and named items preserved.
function objectiveMode(value) {
    const basic = {'any FUT game mode':'아무 FUT 모드','any Football Ultimate Team game mode':'아무 FUT 모드',Rush:'러시',Rivals:'라이벌',Champions:'챔피언스',Draft:'드래프트','Co-Op':'협동','Live Events':'라이브 이벤트','Squad Battles':'스쿼드 배틀'};
    if (basic[value]) return basic[value];
    let m = value.match(/^(Live Events|Rush|Rivals|Champions|Squad Battles) \(or (.+)\)$/i);
    if(m) return `${objectiveMode(m[1])} 또는 ${m[2].split('/').map(objectiveMode).join('/')}`;
    m = value.match(/^Squad Battles on (min\.? )?(.+?) difficulty(?: \(or (.+)\))?$/i);
    if (m) {
        const difficulty = /^any$/i.test(m[2]) ? '난이도 무관' : `${m[1] ? '최소 ' : ''}${translatedTerm(m[2])}`;
        const alternatives = m[3] ? ' 또는 ' + m[3].split('/').map(v => /^Champs$/i.test(v) ? '챔피언스' : objectiveMode(v)).join('/') : '';
        return `스쿼드 배틀(${difficulty})${alternatives}`;
    }
    m = value.match(/^any Live Events match \(or (.+)\)$/i);
    if (m) return `라이브 이벤트 또는 ${m[1].split('/').map(objectiveMode).join('/')}`;
    return value;
}
function translateObjective(text) {
    let m;
    if ((m=text.match(/^Play (\d+) Squad Battles Matches on any difficulty\.$/i))) return `아무 난이도에서 스쿼드 배틀 ${m[1]}경기를 플레이하세요.`;
    if ((m=text.match(/^Earn ([\d,]+) points by completing bonuses in Rush\.$/i))) return `러시 보너스를 완료하여 러시 포인트 ${m[1]}점을 획득하세요.`;
    if ((m=text.match(/^Complete (?:any )?([\d,]+) (SBC Groups|Squad Building Challenge groups|Sets in the Gallery|Rush bonuses)\.$/i))) {
        const thing = /^Sets/i.test(m[2]) ? '갤러리 세트' : /^Rush/i.test(m[2]) ? '러시 보너스' : 'SBC 그룹';
        return `${thing} ${m[1]}개를 완료하세요.`;
    }
    if ((m=text.match(/^Complete Moments challenges to earn (\d+) Stars\.$/i))) return `모먼트 챌린지를 완료하여 별 ${m[1]}개를 획득하세요.`;
    if ((m=text.match(/^Complete (.+?) Puzzle SBC\.$/i))) return `${m[1]} 퍼즐 SBC를 완료하세요.`;
    if ((m=text.match(/^Complete the (.+?) Weekly Play Objective (\d+) times?\.$/i))) return `${m[1]} 주간 플레이 목표를 ${m[2]}회 완료하세요.`;
    if ((m=text.match(/^Complete the (.+?) objective\.$/i))) return `${m[1]} 목표를 완료하세요.`;
    if ((m=text.match(/^Fully complete the ['"](.+?)['"] Objectives Group\.$/i))) return `'${m[1]}' 목표 그룹을 모두 완료하세요.`;
    if ((m=text.match(/^Complete the (.+?) Squad Building Challenge group\.$/i))) return `${m[1]} SBC 그룹을 완료하세요.`;
    if ((m=text.match(/^List ([\d,]+) (?:players|player items) (?:on|in) the Transfer Market\.$/i))) return `이적 시장에 선수 ${m[1]}명을 등록하세요.`;
    if ((m=text.match(/^Buy ([\d,]+) (?:players|Player Items) using Buy Now (?:on|in) the Transfer Market\.$/i))) return `이적 시장에서 즉시구매로 선수 ${m[1]}명을 구매하세요.`;
    if ((m=text.match(/^Reach Division (\d+) in Rivals to qualify for (.+?)\.$/i))) return `라이벌 디비전 ${m[1]}에 도달하여 ${m[2]} 참가 자격을 획득하세요.`;
    if ((m=text.match(/^Reach Gallery Level (\d+)\.$/i))) return `갤러리 레벨 ${m[1]}에 도달하세요.`;
    if ((m=text.match(/^Earn Gallery Score and reach Gallery Level (\d+)\.$/i))) return `갤러리 점수를 획득하여 갤러리 레벨 ${m[1]}에 도달하세요.`;
    if ((m=text.match(/^Achieve ([A-S]) Rank in (.+?)\.$/i))) return `${m[2].replace(/^the /,'')}에서 ${m[1]} 등급을 달성하세요.`;
    if ((m=text.match(/^Achieve Rank ([A-S]) on any Set in the Gallery\.$/i))) return `갤러리의 아무 세트에서 ${m[1]} 등급을 달성하세요.`;
    if (/^Complete the Starter Set and get familiar with the Gallery\.$/i.test(text)) return '스타터 세트를 완료하여 갤러리 사용법을 익히세요.';
    if (/^Grade any Set in the Gallery and see how your squad measures up\.$/i.test(text)) return '갤러리의 아무 세트를 평가하여 내 스쿼드의 수준을 확인하세요.';
    if ((m=text.match(/^Apply a (Consumable|Chemistry Style) item\.$/i))) return `${/^Consumable$/i.test(m[1]) ? '소모품' : '케미스트리 스타일'} 아이템을 적용하세요.`;
    if (/^Change your Club's Formation\.$/i.test(text)) return '클럽의 포메이션을 변경하세요.';
    if (/^Change your Club name\.$/i.test(text)) return '클럽 이름을 변경하세요.';
    if ((m=text.match(/^Build (\d+)\+ Chemistry in your squad\.$/i))) return `스쿼드 조직력을 ${m[1]} 이상으로 만드세요.`;
    if (!/^(Play|Win|Score|Assist|Keep)\b/i.test(text)) return null;
    let body=text;
    const qualifiers=[];
    body=body.replace(/ while having at least (\d+) player from any (.+?) team and (\d+) player from any (.+?) team in your starting 11/i,(_,n,a,k,b)=>{qualifiers.push(`선발 명단에 ${subjectLabel(a)} 선수 ${n}명 이상과 ${subjectLabel(b)} 선수 ${k}명 이상을 포함하여`);return '';});
    body=body.replace(/ while having a Defender with min\.? (\d+) DEF in your starting 11/i,(_,n)=>{qualifiers.push(`선발 명단에 수비 능력치 ${n} 이상인 수비수를 포함하여`);return '';});
    body=body.replace(/ with a starting squad of First Owned players/i,()=>{qualifiers.push('선발 전원을 최초 소유 선수로 구성하여');return '';});
    body=body.replace(/ with a player with min\.? (\d+) PAC/i,(_,n)=>{qualifiers.push(`페이스 ${n} 이상인 선수로`);return '';});
    body=body.replace(/ with a ST \(Main Position\)/i,()=>{qualifiers.push('주 포지션이 ST인 선수로');return '';});
    body=body.replace(/ with (\d+)\* or higher WF players/i,(_,n)=>{qualifiers.push(`약한 발 ${n}성 이상인 선수로`);return '';});
    body=body.replace(/ (?:with a Player Item from|using a player from) (.+?)(?= in |\.$)/i,(_,name)=>{qualifiers.push(`${subjectLabel(name)} 선수로`);return '';});
    body=body.replace(/ with a (Striker|Defender|Midfielder)/i,(_,role)=>{qualifiers.push(`${{striker:'공격수',defender:'수비수',midfielder:'미드필더'}[role.toLowerCase()]}로`);return '';});
    body=body.replace(/ with a through ball/i,()=>{qualifiers.push('스루 패스로');return '';});
    body=body.replace(/ from a cross/i,()=>{qualifiers.push('크로스로');return '';});
    body=body.replace(/ as a team/i,()=>{qualifiers.push('팀 전체로');return '';});
    body=body.replace(/ (?:while having|with) (?:the )?(.+?) equipped(?= in |\.$)/i,(_,name)=>{
        const label=name.replace(/ Animated TIFO$/i,' 움직이는 TIFO').replace(/ Away kit$/i,' 원정 유니폼');
        qualifiers.push(`${label} 아이템을 장착하여`);return '';
    });
    body=body.replace(/\ba match\b/i,'1 match').replace(/\bheaders\b/i,'Header goals').replace(/\bdirect Free Kicks\b/i,'Free Kick goals').replace(/\bfive times\b/i,'5 times');
    if ((m=body.match(/^(Play|Win) (\d+) (Draft|Co-Op|Rush|Rivals|Champions|Live Events|Squad Battles) match(?:es)?(.*)\.$/i))) body=`${m[1]} ${m[2]} matches in ${m[3]}${m[4]}.`;
    if ((m=body.match(/^Play any Live Events match (.+)\.$/i))) body=`Play 1 match in any Live Events match ${m[1]}.`;
    if ((m=body.match(/^Win a PVE Live Events match on min\.? (.+?) difficulty \(or PVP Live Events\)\.$/i))) return `PVE 라이브 이벤트(최소 ${translatedTerm(m[1])}) 또는 PVP 라이브 이벤트에서 1경기에서 승리하세요.`;
    if ((m=body.match(/^Keep a clean sheet in (.+?)\.$/i))) return `${qualifiers.join(' ')} ${objectiveMode(m[1])}에서 무실점을 기록하세요.`.trim();
    const result=translateFunctional(body);
    return result === null ? null : `${qualifiers.length ? qualifiers.join(' ')+' ' : ''}${result}`;
}
