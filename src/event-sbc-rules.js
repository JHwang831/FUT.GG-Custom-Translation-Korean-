// Full-match functional rules. Event/player/club names remain in the original.
const requirementLabel = {
    rating:'등급', 'team rating':'팀 등급', chemistry:'조직력', players:'선수 수',
    nations:'국적 수', leagues:'리그 수', clubs:'클럽 수',
    'same nation':'동일 국가', 'same league':'동일 리그', 'same club':'동일 클럽',
    nation:'국가', league:'리그', club:'클럽'
};
function quantityTitle(text, condition = '') {
    const level=text.trim().match(/^Level (\d+)$/i);
    if(level) return `${level[1]}레벨`;
    const points=text.trim().match(/^([\d,]+) (Rush Points|Stars|Goals|Assists|Wins|Matches|SBCs)$/i);
    if(points) return `${points[1]} ${({'rush points':'러시 포인트',stars:'별',goals:'골',assists:'도움',wins:'승',matches:'경기',sbcs:'SBC'})[points[2].toLowerCase()]}`;
    const m = text.trim().match(/^(Play|Win|Score|Assist)( in)? (\d+)$/i);
    if (!m) return null;
    const verb = m[1].toLowerCase();
    if (verb === 'play') return `${m[3]}경기 플레이`;
    if (verb === 'win') return `${m[3]}경기 승리`;
    const separateMatches = new RegExp(`^${m[1]} in \\d+ separate matches\\b`,'i').test(condition.trim());
    if (m[2] || separateMatches) return `${m[3]}경기에서 ${verb === 'score' ? '득점' : '도움'}`;
    return `${m[3]}${verb === 'score' ? '골' : '도움'} 기록`;
}
function nearbyCondition(heading) {
    let parent = heading.parentElement;
    for (let depth = 0; parent && depth < 3; depth++, parent = parent.parentElement) {
        const paragraph = parent.querySelector('p');
        if (paragraph) return textNodes(paragraph).map(sourceOf).join('') || paragraph.textContent;
    }
    return '';
}
function subjectLabel(text) {
    const labels = {Spanish:'스페인',French:'프랑스',Belgian:'벨기에',English:'잉글랜드',Dutch:'네덜란드',Mexican:'멕시코',Hungarian:'헝가리',Scottish:'스코틀랜드',Iceland:'아이슬란드',Türkiye:'튀르키예',USA:'미국',Spain:'스페인',Germany:'독일',Italy:'이탈리아','Premier League':'프리미어 리그',"Women's Super League":'여자 슈퍼 리그'};
    return labels[text] || text;
}
function translateFunctional(text) {
    let m;
    if (/^[\d,]+ (?:Rush Points|Stars)$/i.test(text)) return quantityTitle(text);
    if ((m = text.match(/^(.+?) \(Loan\)$/i))) return `${m[1]} (임대)`;
    if ((m = text.match(/^(.+?) Trophy$/i))) return `${m[1]} 트로피`;
    if ((m = text.match(/^(.+?) Bronze & Silver Players Pack$/i))) return `${m[1]} 브론즈 및 실버 선수 팩`;
    if ((m = text.match(/^([\d,]+) Half Length, (.+)$/i))) return `하프 시간 ${m[1]}분, ${m[2].split(', ').map(translatedTerm).join(', ')}`;
    if ((m = text.match(/^(\d+) Rounds, (.+)$/i))) return `${m[1]}라운드, ${m[2].split(', ').map(translatedTerm).join(', ')}`;
    if (/^(?:Classic Match|Event|Casual), /.test(text)) return text.split(', ').map(translatedTerm).join(', ');
    if ((m = text.match(/^(\d+)\+ TOTW (\d+)-(\d+) Player Pack$/i))) return `${m[1]}등급 이상 TOTW ${m[2]}~${m[3]} 선수 팩`;
    if ((m = text.match(/^(\d+)x (\d+)\+ (Serie A|LALIGA|Premier League) Gold Players Pack$/i))) return `${m[2]}등급 이상 ${subjectLabel(m[3])} 골드 선수 ${m[1]}명 팩`;
    if ((m = text.match(/^(.+?) (Premium|Regular) Badge$/i))) return `${m[1]} ${/^premium$/i.test(m[2]) ? '프리미엄' : '일반'} 배지`;
    if ((m = text.match(/^Completing this challenge counts towards (.+?)\.$/i))) return `이 챌린지를 완료하면 ${m[1]} 진행도에 반영됩니다.`;
    if ((m = text.match(/^(Min|Max)\. (\d+) players? rated (\d+)(?:\+| to (\d+))$/i))) return `${m[3]}${m[4] ? `~${m[4]}등급` : '등급 이상'} 선수 ${/^min$/i.test(m[1]) ? '최소' : '최대'} ${m[2]}명`;
    if ((m = text.match(/^(Min|Max)\. (\d+) players? from (.+)$/i))) return `${/^Icons$/i.test(m[3]) ? '아이콘' : /^HERO$/i.test(m[3]) ? '영웅' : m[3]} 선수 ${/^min$/i.test(m[1]) ? '최소' : '최대'} ${m[2]}명`;
    if ((m = text.match(/^(Min|Max)\. (\d+) (.+?) players?$/i))) return `${translatedTerm(m[3])} 선수 ${/^min$/i.test(m[1]) ? '최소' : '최대'} ${m[2]}명`;
    if ((m = text.match(/^(Rating|Team rating|Chemistry|Players|Nations|Leagues|Clubs):\s*(?:(Min|Max)\.\s*)?(\d+)$/i))) {
        if (/^Rating$/i.test(m[1]) && m[2]) return `${/^min$/i.test(m[2]) ? '최소' : '최대'} 등급: ${m[3]}`;
        const unit = /^(Players|Nations|Leagues|Clubs)$/i.test(m[1]) ? (/^Players$/i.test(m[1]) ? '명' : '개') : '';
        return `${requirementLabel[m[1].toLowerCase()]}: ${m[2] ? (/^min$/i.test(m[2]) ? '최소 ' : '최대 ') : ''}${m[3]}${unit}`;
    }
    if ((m = text.match(/^Same (nation|league|club):\s*(Min|Max)\.\s*(\d+) players?$/i))) return `${requirementLabel['same ' + m[1].toLowerCase()]} 소속 선수 ${/^min$/i.test(m[2]) ? '최소' : '최대'} ${m[3]}명`;
    if ((m = text.match(/^Quality:\s*(Min|Max)\.\s*(?:(\d+)\s+)?(Gold|Silver|Bronze)(?: players?)?$/i))) return m[2]
        ? `${translatedTerm(m[3])} 선수 ${/^min$/i.test(m[1]) ? '최소' : '최대'} ${m[2]}명`
        : `선수 등급: ${/^min$/i.test(m[1]) ? '최소' : '최대'} ${translatedTerm(m[3])}`;
    if ((m = text.match(/^(Club|Nation|League):\s*(Min|Max)\.\s*(\d+) players? from (.+)$/i))) return `${m[4].split(/ or /i).map(subjectLabel).join(' 또는 ')} 소속 선수 ${/^min$/i.test(m[2]) ? '최소' : '최대'} ${m[3]}명`;
    if ((m = text.match(/^No players rated (\d+)\+$/i))) return `${m[1]}등급 이상 선수 사용 불가`;
    if ((m = text.match(/^Min\. Div (\d+) Rivals$/i))) return `라이벌 디비전 ${m[1]} 이상`;
    if ((m = text.match(/^(\d+) attempts$/i))) return `참가 기회 ${m[1]}회`;
    if ((m = text.match(/^(\d+) min$/i))) return `${m[1]}분`;
    if ((m = text.match(/^Finish in the top (\d+) in the (.+?) region of the (.+?)\.$/i))) {
        const regions = {Oceania:'오세아니아','North America':'북미','Middle East':'중동','LATAM South':'중남미 남부','LATAM North':'중남미 북부','Europe East':'유럽 동부','Europe West':'유럽 서부','Asia South':'아시아 남부','Asia North':'아시아 북부',Africa:'아프리카'};
        return `${m[3]}의 ${regions[m[2]] || m[2]} 지역에서 상위 ${m[1]}위 이내로 마치세요.`;
    }
    if ((m = text.match(/^Win both matches in a single (.+?) round(?:, (twice|three times|\d+ times))?\.$/i))) {
        const repeats = m[2] === 'twice' ? 2 : m[2] === 'three times' ? 3 : m[2] ? parseInt(m[2],10) : 1;
        return `${m[1]}의 한 라운드에서 2경기 모두 승리하는 것을 ${repeats}회 달성하세요.`;
    }
    if (!/^(Play|Win|Score|Assist)\b/i.test(text)) return null;
    let rest = text.replace(/\.$/, '');
    const extras = [];
    rest = rest.replace(/ and qualify for (.+)$/i, (_, event) => { extras.push(`${event} 참가 자격을 획득하세요.`); return ''; });
    rest = rest.replace(/ using the ([\d-]+) formation \(without changing\)/i, (_, formation) => { extras.unshift(`${formation} 포메이션을 변경하지 않고 사용하여`); return ''; });
    rest = rest.replace(/(?: while having| with) (min\.? |at least )?(\d+) (.+?) in your starting (?:11|XI)/i, (_, minimum, count, descriptor) => {
        let subject = descriptor.replace(/^player items? from /i,'').replace(/^players? from /i,'').replace(/ players?(?: items?)?$/i,'').replace(/ player items?$/i,'');
        extras.unshift(`선발 명단에 ${subjectLabel(subject)} 선수 ${minimum ? '최소 ' : ''}${count}명을 포함하여`);
        return '';
    });
    if ((m = rest.match(/^Win the (.+?Tournament)(?: (\d+) times)?$/i))) return `${extras.join(' ')}${extras.length ? ' ' : ''}${m[1]}에서 ${m[2] || 1}회 우승하세요.`;
    // The last "in" separates the event from match-count restrictions.
    const separator = rest.lastIndexOf(' in ');
    if (separator < 0) return null;
    const action = rest.slice(0,separator);
    const event = objectiveMode(rest.slice(separator + 4).replace(/^the /i,''));
    if (/using your active EVO|with your active EVO/i.test(event)) return null;
    let result;
    const count = value => ({one:'1',two:'2',three:'3'}[value?.toLowerCase()] || value);
    const number = '(\\d+|one|two|three)';
    if ((m = action.match(/^Play (\d+) match(?:es)?$/i))) result = `${m[1]}경기를 플레이하세요.`;
    else if ((m = action.match(/^Win (\d+) (?:(Quarter-Finals) )?(?:match(?:es)?|games?)$/i))) result = `${m[2] ? '8강전 ' : ''}${m[1]}경기에서 승리하세요.`;
    else if ((m = action.match(/^(Score|Assist) in (\d+) separate matches$/i))) result = `${m[2]}경기에서 ${/^score$/i.test(m[1]) ? '득점' : '도움'}을 기록하세요.`;
    else if (/^Score$/i.test(action)) result = '득점하세요.';
    else if ((m = action.match(/^(Score|Assist) (\d+) times$/i))) result = `${m[2]}${/^Score$/i.test(m[1]) ? '골' : '도움'}을 기록하세요.`;
    else if ((m = action.match(/^Score with a (.+?) player$/i))) result = `${subjectLabel(m[1])} 선수로 득점하세요.`;
    else if ((m = action.match(new RegExp(`^(Score|Assist) (at least |a total of )?${number} (?:(Finesse|Low Driven|Chip Shot|Header|Free Kick) )?goals?( from outside the box)?(?: in ${number} (separate )?match(?:es)?)?$`,'i')))) {
        const [, verb, minimum, amount, technique, outside, games, separate] = m;
        const kind = technique ? ({finesse:'감아차기 ','low driven':'로우 드리븐 ','chip shot':'칩슛 ',header:'헤더 ','free kick':'직접 프리킥 '}[technique.toLowerCase()]) : '';
        result = `${games ? `${count(games)}${separate ? '개의 서로 다른 경기' : '경기'}에서 ${separate ? '각각 ' : ''}` : ''}${outside ? '박스 밖에서 ' : ''}${/^at least/i.test(minimum || '') ? '최소 ' : /^a total/i.test(minimum || '') ? '총 ' : ''}${count(amount)}${/^assist$/i.test(verb) ? '도움' : `개의 ${kind}골`}을 기록하세요.`;
    }
    if (!result) return null;
    const qualifiers = extras.filter(e => !e.endsWith('획득하세요.'));
    const qualification = extras.filter(e => e.endsWith('획득하세요.'));
    return `${event}에서 ${qualifiers.length ? qualifiers.join(' ') + ' ' : ''}${result}${qualification.length ? ' ' + qualification.join(' ') : ''}`;
}
