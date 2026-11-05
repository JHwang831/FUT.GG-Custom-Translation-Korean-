// Audited against public FUT.GG pages, November 2026.
function translatedTerm(value) {
    const rating = value.match(/^(\d+)\+\s+(.+)$/);
    if (rating) return `${rating[1]}등급 이상 ${translatedTerm(rating[2])}`;
    const key = value.trim().toLowerCase();
    return dictionary.get(key) || translateRole(value);
}
function translateCountdown(text) {
    const match=text.match(/^(?:(\d+)d\s*)?(?:(\d+)h\s*)?(?:(\d+)m\s*)?(?:(\d+)s\s*)?$/i);
    if(!match || !match.slice(1).some(v=>v!==undefined)) return null;
    // A bare 5m/5M can be a coin price. Mixed units are unambiguous.
    if(match[3]!==undefined && match[1]===undefined && match[2]===undefined && match[4]===undefined) return null;
    return match.slice(1).map((v,i)=>v===undefined ? '' : `${Number(v)}${['일','시간','분','초'][i]}`).filter(Boolean).join(' ');
}
function translateTimerLabel(text) {
    if (!/^(?:\d+\s+(?:days?|hours?|minutes?|seconds?)\s*)+$/i.test(text)) return null;
    const units = { day: '일', hour: '시간', minute: '분', second: '초' };
    return [...text.matchAll(/(\d+)\s+(days?|hours?|minutes?|seconds?)/gi)]
        .map(m => `${Number(m[1])}${units[m[2].toLowerCase().replace(/s$/, '')]}`).join(' ');
}
// A small allowlist of complete functional phrases rendered across React nodes.
// Content names and introductions never enter this adapter.
const splitUiMessages = new Map([
    ['log in to see which of your players are eligible for this evolution.', { pivot: 'Log in', token: '로그인', before: '', after: '하면 이 진화에 사용할 수 있는 내 선수를 확인할 수 있습니다.' }],
    ['tap once to add a playstyle, tap again to upgrade to playstyle+, tap a third time to remove.', { pivot: 'PlayStyle+', token: '플레이스타일+', before: '한 번 누르면 플레이스타일 추가, 다시 누르면 ', after: '로 강화, 세 번째 누르면 제거됩니다.' }],
    ['press evolve to generate evolution paths matching your filters.', { pivot: 'Evolve', token: '진화', before: '', after: '를 눌러 필터에 맞는 진화 경로를 생성하세요.' }]
]);
function splitUiMessage(text) {
    const normalized = text.trim().replace(/\s+/g, ' ');
    const exact = splitUiMessages.get(normalized.toLowerCase());
    if (exact) return exact;
    const limit = normalized.match(/^You've reached the maximum of ([\d,]+) saved players\. Remove some players before adding new ones\.$/i);
    return limit ? { pivot: limit[1], token: limit[1], before: '선수 저장 한도인 ', after: '명에 도달했습니다. 새 선수를 추가하려면 기존 선수를 삭제하세요.' } : null;
}
function translateEvoUi(text) {
    let m;
    if ((m = text.match(/^Removing this evolution will convert your saved player to an unsaved build\.( Your customizations will need to be re-applied\.)? Are you sure\?$/i))) return `이 진화를 제거하면 저장된 선수가 저장되지 않은 구성으로 바뀝니다.${m[1] ? ' 직접 변경한 설정은 다시 적용해야 합니다.' : ''} 계속하시겠어요?`;
    if ((m = text.match(/^You've reached the maximum of ([\d,]+) saved players\. Remove some players before adding new ones\.$/i))) return `선수 저장 한도인 ${m[1]}명에 도달했습니다. 새 선수를 추가하려면 기존 선수를 삭제하세요.`;
    if ((m = text.match(/^Save ([\d,]+) players to your FUT\.GG account\?$/i))) return `선수 ${m[1]}명을 FUT.GG 계정에 저장하시겠어요?`;
    if ((m = text.match(/^Save (.+?) to your FUT\.GG account\?$/i))) return `${m[1] === 'this player' ? '이' : m[1]} 선수를 FUT.GG 계정에 저장하시겠어요?`;
    if ((m = text.match(/^Are you sure you want to delete (.+?)\?$/i))) return `${m[1]} 삭제를 진행하시겠어요?`;
    if ((m = text.match(/^(.+?) Drafts$/))) return `${m[1]} 임시 저장`;
    if ((m = text.match(/^(GK|RB|CB|LB|CDM|RM|CM|LM|CAM|RW|ST|LW|CF|LWB|RWB) Best Role$/i))) return `${m[1].toUpperCase()} 최적 역할`;
    if ((m = text.match(/^Best (GK|RB|CB|LB|CDM|RM|CM|LM|CAM|RW|ST|LW|CF|LWB|RWB) Role$/i))) return `${m[1].toUpperCase()} 최적 역할`;
    if ((m = text.match(/^View (?!all\b)(.+)$/i))) return `${m[1]} 보기`;
    return null;
}
function translateEventTime(text) {
    const m = text.match(/^(Starts|Ends|Ended)\s+(?:in\s+)?([\d,]+)\s*(years?|months?|weeks?|days?|hours?|minutes?|seconds?|년|개월|달|주|일|시간|분|초)\s*(ago|후|전)?$/i);
    if (!m) return null;
    const units = {year:'년',month:'달',week:'주',day:'일',hour:'시간',minute:'분',second:'초'};
    const unit = units[m[3].toLowerCase().replace(/s$/, '')] || m[3];
    const past = /^ended$/i.test(m[1]) || /^(?:ago|전)$/i.test(m[4] || '');
    return `${m[2]}${unit} ${past ? '전' : '후'} ${/^starts$/i.test(m[1]) ? '시작' : '종료'}`;
}
function translateShortDate(text) {
    const m = text.match(/^([A-Za-z]{3,9})\s+(\d{1,2})$/);
    return m && monthMap[m[1].toLowerCase()] && Number(m[2]) >= 1 && Number(m[2]) <= 31 ? `${monthMap[m[1].toLowerCase()]} ${Number(m[2])}일` : null;
}
function translateAdditional(text) {
    let m;
    const shortDate = translateShortDate(text);
    if (shortDate !== null) return shortDate;
    if ((m = text.match(/^(Current price|Last known price|현재 가격|최근 확인 가격)\s*([-–·])\s*Updated\s+(.+)$/i))) return `${translatedTerm(m[1])} ${m[2]} 갱신 ${translate(m[3])}`;
    if ((m = text.match(/^([-–·]\s*)?Updated(?:\s+(.+))?$/i))) return `${m[1] || ''}갱신${m[2] ? ' ' + translate(m[2]) : ''}`;
    if ((m = text.match(/^(·\s*)?vs current\s+([\d,.]+(?:\s*[KM])?)$/i))) return `${m[1] || ''}현재 가격 ${m[2]} 대비`;
    const eventTime = translateEventTime(text);
    if (eventTime !== null) return eventTime;
    const roleTitle = roleEvolutionTitle(text);
    if (roleTitle !== null) return roleTitle;
    const timerLabel = translateTimerLabel(text);
    if (timerLabel !== null) return timerLabel;
    const countdown=translateCountdown(text);
    if(countdown!==null) return countdown;
    if((m=text.match(/^(Expires in|Starts in|Ends in|Refreshes in)\s+(.+)$/i))) {
        const duration=translateCountdown(m[2]);
        if(duration!==null) return `${{ 'expires in':'만료까지','starts in':'시작까지','ends in':'종료까지','refreshes in':'갱신까지' }[m[1].toLowerCase()]} ${duration}`;
    }
    if((m=text.match(/^(GK|RB|CB|LB|CDM|RM|CM|LM|CAM|RW|ST|LW)(?: (.+?))? GGR$/i))) {
        const role=m[2] ? ({'classic ten':'클래식 10번','wide back':'와이드백','ball playing':'볼플레잉 키퍼'}[m[2].toLowerCase()] || translateRole(m[2])) : '';
        return `${m[1]}${role ? ' '+role : ''} GG 등급`;
    }
    if((m=text.match(/^(Min|Max) (.+)$/i))) {
        const field=dictionary.get(m[2].toLowerCase());
        if(field) return `${/^Min$/i.test(m[1]) ? '최소' : '최대'} ${field}`;
    }
    if ((m = text.match(/^(\d(?:-\d)+)\s+(Narrow|Wide|Holding|Attack|Defend|Flat)$/i))) {
        const shape = {narrow:'좁게',wide:'넓게',holding:'홀딩',attack:'공격형',defend:'수비형',flat:'일자형'};
        return `${m[1]} ${shape[m[2].toLowerCase()]}`;
    }
    if ((m = text.match(/^(\d{1,2})\s+([A-Za-z]+),\s*(\d{1,2}):(\d{2})(\s+UTC)?$/i)) && monthMap[m[2].toLowerCase()]) return `${monthMap[m[2].toLowerCase()]} ${Number(m[1])}일 ${m[3]}:${m[4]}${m[5] || ''}`;
    if ((m = text.match(/^(.+?) - EA SPORTS FC (\d+) Objectives$/i))) return `${translate(m[1])} - EA SPORTS FC ${m[2]} 목표`;
    if ((m = text.match(/^(?:See\s+)?All (.+?) Evolution paths$/i))) return `${m[1]}의 모든 진화 경로 보기`;
    if ((m = text.match(/^Rating:\s*Min\.\s*(\d+)$/i))) return `최소 등급: ${m[1]}`;
    if ((m = text.match(/^([\d,]+) players have the regular (.+?) PlayStyle, led by (.+)\.$/i))) return `${translatedTerm(m[2])} 일반 플레이스타일 보유 선수는 ${m[1]}명입니다. 대표 선수: ${m[3].replace(/ and /, ', ')}.`;
    if ((m = text.match(/^(CAM|CDM|CM|ST|CF|LW|RW|LM|RM|CB|LB|RB|LWB|RWB|GK) Roles(?: & Focus)?$/i))) return `${m[1]} 역할${/Focus/i.test(text) ? ' 및 집중 설정' : ''}`;
    if ((m = text.match(/^Play (\d+)$/i))) return `${m[1]}경기 플레이`;
    if ((m = text.match(/^x(\d+) Players Pack$/i))) return `선수 ${m[1]}명 팩`;
    if ((m = text.match(/^TOTW (\d+)$/i))) return `이 주의 팀 ${m[1]}`;
    if ((m = text.match(/^(.+?)(\+{1,2})$/i))) {
        const term = translatedTerm(m[1]);
        if(term !== m[1]) return `${term}${m[2]}`;
    }
    if ((m = text.match(/^Learn about the (.+?) PlayStyle in EA SPORTS FC (\d+)\.$/i))) return `EA SPORTS FC ${m[2]}의 ${translatedTerm(m[1])} 플레이스타일을 알아보세요.`;
    if ((m = text.match(/^All available roles and focus options for the (\w+) position in EA SPORTS FC (\d+)\.$/i))) return `EA SPORTS FC ${m[2]}의 ${m[1]} 포지션에서 사용할 수 있는 모든 역할과 집중 설정입니다.`;
    if ((m = text.match(/^([\d,]+) players have (?:the regular )?(.+?)(\+| PlayStyle) in EA SPORTS FC (\d+), led by (.+)\.$/i))) return `EA SPORTS FC ${m[4]}에서 ${translatedTerm(m[2])}${m[3] === '+' ? '+' : ''} 보유 선수는 ${m[1]}명입니다. 대표 선수: ${m[5].replace(/ and /, ', ')}.`;
    if ((m = text.match(/^EA has confirmed changes to (\d+) PlayStyles in FC (\d+)\.$/i))) return `EA가 FC ${m[2]} 플레이스타일 ${m[1]}개의 변경을 확정했습니다.`;
    if ((m = text.match(/^(?:Other|All the) PlayStyles in the (.+?) category\.$/i))) return `${translatedTerm(m[1])} 분류의 플레이스타일입니다.`;
    if ((m = text.match(/^Play (\d+) Squad Battles Matches on any difficulty\.$/i))) return `아무 난이도에서 스쿼드 배틀 ${m[1]}경기를 플레이하세요.`;
    if ((m = text.match(/^Add (.+?) to any qualified player\.$/i))) return `요구사항을 만족하는 선수에게 ${translatedTerm(m[1].replace(/\+{1,2}$/, ''))}${m[1].match(/\+{1,2}$/)?.[0] || ''} 추가.`;
    if ((m = text.match(/^Unlocked by completing the "(.+?)" (objective|Season Pass) in FC (\d+)$/i))) return `FC ${m[3]}의 "${translatedTerm(m[1])}" ${m[2].toLowerCase() === 'objective' ? '목표' : '시즌 패스'} 완료로 잠금 해제`;
    if ((m = text.match(/^(\d+)\s*Rare$/i))) return `${m[1]} 레어`;
    if ((m = text.match(/^([\d,]+)\s+Coins$/i))) return `${m[1]} 코인`;
    if ((m = text.match(/^([\d,]+)\s+(.+?) Tokens$/i))) return `${translatedTerm(m[2])} 토큰 ${m[1]}개`;
    if ((m = text.match(/^Token Store\s*\((\d+)\)$/i))) return `토큰 상점 (${m[1]})`;
    if ((m = text.match(/^FC\s*(\d+)\s+Players$/i))) return `FC ${m[1]} 선수`;
    if ((m = text.match(/^(.+?) (Milestone|Mastery)$/i))) {
        const domain = translatedTerm(m[1]);
        if(domain !== m[1]) return `${domain} ${m[2].toLowerCase() === 'milestone' ? '마일스톤' : '마스터리'}`;
    }
    if ((m = text.match(/^1 Of (\d+) (.+?) Pick$/i))) return `${translatedTerm(m[2])} ${m[1]}개 중 1개 선택`;
    if ((m = text.match(/^(?:(\d+)x\s+)?(?:(\d+(?:-\d+)?)(\+)?\s+|Max\s+(\d+)\s+)?(Gold|Bronze|Silver|Premier League Gold) Players? (Pack|Pick)$/i))) {
        return `${m[4] ? `최대 ${m[4]}등급 ` : m[2] ? `${m[2]}등급${m[3] ? ' 이상' : ''} ` : ''}${translatedTerm(m[5])} 선수 ${m[1] || '1'}명 ${m[6].toLowerCase() === 'pack' ? '팩' : '선택'}`;
    }
    if ((m = text.match(/^(\d+) of (\d+) (.+?) Pick$/i))) return `${translatedTerm(m[3])} ${m[2]}개 중 ${m[1]}개 선택`;
    return null;
}
