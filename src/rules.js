// Existing domain rules retained from 2.1.3; runtime adapters take priority.


    // ============================================
    // 성능 최적화: 금액 형식 체크 함수 (개선됨)
    // ============================================
    const isMoneyFormat = (text) => {
        const trimmed = text.trim();
        // 2.5M, 2.5m (소수점) 또는 2M, 10M, 100K (정수) 형태 모두 체크
        return /^\d+(?:\.\d+)?\s*[MKmk]$/.test(trimmed);
    };

    // ============================================
    // 게임 모드 매핑 (진화 조건용) - 확장됨
    // ============================================
    const evoModeMap = new Map([
        ["any mode", "아무 모드"],
        ["rush, rivals, champions, or squad battles on min. semi-pro", "러시, 라이벌, 챔피언스, 혹은 스쿼드 배틀 (최소 세미프로)"],
        ["rush, rivals, champions, or squad battles on min semi-pro", "러시, 라이벌, 챔피언스, 혹은 스쿼드 배틀 (최소 세미프로)"],
        ["squad battles on min. semi-pro difficulty (or rush/rivals/champions/live events)", "스쿼드 배틀(최소 세미프로) 또는 러시/라이벌/챔피언스/라이브 이벤트"],
        ["squad battles on min semi-pro difficulty (or rush/rivals/champions/live events)", "스쿼드 배틀(최소 세미프로) 또는 러시/라이벌/챔피언스/라이브 이벤트"],
        ["squad battles on min. semi-pro difficulty (or rivals/champions/live events)", "스쿼드 배틀(최소 세미프로) 또는 라이벌/챔피언스/라이브 이벤트"],
        ["squad battles on min semi-pro difficulty (or rivals/champions/live events)", "스쿼드 배틀(최소 세미프로) 또는 라이벌/챔피언스/라이브 이벤트"],
        ["squad battles (최소 세미프로 난이도)", "스쿼드 배틀(최소 세미프로 난이도)"],
        ["rivals or champions", "라이벌 또는 챔피언스"],
        ["champions or rivals", "챔피언스 또는 라이벌"],
        ["squad battles", "스쿼드 배틀"],
        ["rush", "러시"],
        ["rivals", "라이벌"],
        ["champions", "챔피언스"],
        ["live events", "라이브 이벤트"]
    ]);

    // ============================================
    // 유틸리티 함수
    // ============================================
    const normalize = (str) => str.trim().toLowerCase().replace(/[\.,]+$/, '');

    // normalizeMode 함수 개선 - 'in' 접두어 제거 및 정규화
    const normalizeMode = (mode) => {
        if (!mode) return 'any mode';

        // 앞의 'in' 제거 및 정규화
        const cleaned = mode.trim().toLowerCase()
            .replace(/^in\s+/, '')  // 앞의 'in' 제거
            .replace(/[\.,]+$/, '') // 끝의 점/쉼표 제거
            .replace(/\s+/g, ' ');  // 연속 공백 정리

        return evoModeMap.get(cleaned) || mode;
    };

    // 역할명 정규화 (하이픈/공백 무관하게 처리)
    const normalizeRole = (role) => role.trim().toLowerCase().replace(/[-\s]+/g, ' ');

    // ============================================
    // 역할(Role) 번역 맵
    // ============================================
    const roleTranslations = new Map([
        ["advanced forward", "어드밴스 포워드"],
        ["false 9", "폴스 나인"],
        ["poacher", "포처"],
        ["target forward", "타겟 포워드"],
        ["inside forward", "인사이드 포워드"],
        ["wide playmaker", "와이드 플레이메이커"],
        ["winger", "윙어"],
        ["classic 10", "클래식 10번"],
        ["half winger", "하프 윙어"],
        ["playmaker", "플레이메이커"],
        ["shadow striker", "쉐도우 스트라이커"],
        ["wide midfielder", "와이드 미드필더"],
        ["box to box", "박스 투 박스"],
        ["deep lying playmaker", "딥라잉 플레이메이커"],
        ["holding", "홀딩"],
        ["centre half", "센터 하프"],
        ["wide half", "와이드 하프"],
        ["ball playing defender", "볼플레잉 수비수"],
        ["ball playing keeper", "볼플레잉 키퍼"],
        ["defender", "수비수"],
        ["stopper", "스토퍼"],
        ["attacking wingback", "공격형 윙백"],
        ["falseback", "폴스백"],
        ["fullback", "풀백"],
        ["wingback", "윙백"],
        ["inverted wingback", "인버티드 윙백"],
        ["wideback", "와이드백"],
        ["box crasher", "박스 크래셔"],
        ["goalkeeper", "골키퍼"],
        ["sweeper keeper", "스위퍼 키퍼"]
    ]);

    // 역할 번역 함수
    const translateRole = (role) => {
        const normalized = normalizeRole(role);
        return roleTranslations.get(normalized) || role;
    };

    // ============================================
    // 월 매핑
    // ============================================
    const monthMap = {
        january: '1월', february: '2월', march: '3월', april: '4월',
        may: '5월', june: '6월', july: '7월', august: '8월',
        september: '9월', october: '10월', november: '11월', december: '12월',
        jan: '1월', feb: '2월', mar: '3월', apr: '4월',
        jun: '6월', jul: '7월', aug: '8월',
        sep: '9월', oct: '10월', nov: '11월', dec: '12월'
    };

    // ============================================
    // 정적 번역 데이터
    // ============================================
    const dynamicTranslations = [
        // 선수 상세 페이지: 문장 전체를 먼저 처리
        { pattern: /on EA FC (\d+)\. Full stats, prices, evolutions, playstyles, GG Rating and community votes\.?$/i,
          replacement: '— EA FC $1 선수 정보. 전체 능력치, 가격, 진화, 플레이스타일, GG 등급 및 커뮤니티 투표.' },
        { pattern: /^FC\s*(\d+)\s+Ratings\s+Hub$/i, replacement: 'FC $1 등급 허브' },
        { pattern: /^([-–]\s*)?Updated\b/i, replacement: '$1갱신' },
        { pattern: /^Current price\s*[-–]\s*Updated\s+(.+)$/i,
          replacement: (_, date) => {
              const node = { nodeValue: date };
              translateTextNode(node);
              return `현재 가격 - 갱신 ${node.nodeValue}`;
          } },
        { pattern: /^Have a better (.+?) Evolution\?$/i, replacement: '더 좋은 $1 진화 선수가 있나요?' },
        { pattern: /^Where\s+would\s+you\s+place\s+(.+?)\?$/i, replacement: '$1에게 어떤 티어를 주시겠어요?' },
        { pattern: /^What is GG Rating\?$/i, replacement: 'GG 등급이란?' },
        { pattern: /^(?:Roles|역할)\s*\(\s*(\d+)\s*\)$/i, replacement: '역할 ($1)' },
        { pattern: /^(\d+) goals? or assists?$/i, replacement: '$1골 또는 도움' },
        { pattern: /^\+(\d+)\s*Shooting\s*&\s*Passing$/i, replacement: '+$1 슈팅 및 패스' },
        { pattern: /^\+(\d+)\s*PS$/i, replacement: '+$1 플레이스타일' },
        { pattern: /^\+(\d+)\s*OVR$/i, replacement: '+$1 오버롤' },
        { pattern: /^#(\d+)\s*Ranked$/i, replacement: '#$1위' },
        { pattern: /^([\d,]+)\s+placements?$/i, replacement: '$1명이 투표함' },
        { pattern: /^(?:View all|모두 보기)\s+(\d+)\s+cards$/i, replacement: '카드 $1개 모두 보기' },
        { pattern: /^in\s+(\d+)\s*(minutes?|seconds?)$/i,
          replacement: (_, count, unit) => `${count}${/^minute/i.test(unit) ? '분' : '초'} 후` },
        { pattern: /^(\d+)\s*(minutes?|seconds?)\s*(?:ago|전)?$/i,
          replacement: (_, count, unit) => `${count}${/^minute/i.test(unit) ? '분' : '초'} 전` },

        // ========== 우선순위 1: 가장 자주 사용되는 패턴 ==========

        // +N more 패턴
        { pattern: /\+\s*(\d+)\s+more/gi, replacement: '+$1개 더' },
        { pattern: /\+(\d+)\s+more/gi, replacement: '+$1개 더' },
        { pattern: /\+ (\d+) more/gi, replacement: '+$1개 더' },

        // CHEM & ROLE 패턴
        { pattern: /CHEM\s*\((\d+)\)/gi, replacement: '조직력($1)' },
        { pattern: /ROLE\s*\((\d+)\)/gi, replacement: '역할($1)' },

        // ========== 우선순위 2: 시간/날짜 표현 ==========

        // 만료 시간 (구체적인 것부터)
        { pattern: /Expires in (\d+)\s*day(?:s)?/i, replacement: '$1일 후 만료 예정' },
        { pattern: /Expires in (\d+)\s*month(?:s)?/i, replacement: '$1달 후 만료 예정' },
        { pattern: /in (\d+)\s*day(?:s)?/i, replacement: '$1일 후' },
        { pattern: /in (\d+)\s*month(?:s)?/i, replacement: '$1달 후' },
        { pattern: /in (\d+)\s*hour(?:s)?/i, replacement: '$1시간 후' },

        // 시간 포맷 (복합 → 단일 순서)
        { pattern: /(\d+)d\s*(\d+)h\s*(\d+)m/i, replacement: '$1일 $2시간 $3분' },
        { pattern: /(\d+)d\s*(\d+)h/i, replacement: '$1일 $2시간' },
        { pattern: /(\d+)d\s*(\d+)m/i, replacement: '$1일 $2분' },
        { pattern: /(\d+)\s*h\s*(\d+)\s*m/i, replacement: '$1시간 $2분' },
        { pattern: /(\d+)h(\d+)m/i, replacement: '$1시간 $2분' },
        { pattern: /(\d+)\s*years\b/i, replacement: '$1년' },
        { pattern: /(\d+)\s*months\b/i, replacement: '$1달' },
        { pattern: /(\d+)\s*month\b/i, replacement: '$1달' },
        { pattern: /(\d+)\s*days\b/i, replacement: '$1일' },
        { pattern: /(\d+)\s*day\b/i, replacement: '$1일' },
        { pattern: /(\d+)\s*hours\b/i, replacement: '$1시간' },
        { pattern: /(\d+)\s*h\b/i, replacement: '$1시간' },

        // 날짜 포맷
        {
            pattern: /([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4}),?\s+(\d{1,2}):(\d{2})\s+(AM|PM)/i,
            replacement: (match, monthName, day, year, hour, minute, period) => {
                const m = monthMap[monthName.toLowerCase()];
                if (!m) return match;
                const h = parseInt(hour, 10) % 12 || 12;
                const ampm = period.toUpperCase() === 'PM' ? '오후' : '오전';
                return `${year}년 ${m} ${day}일 ${ampm} ${h}시 ${minute}분`;
            }
        },
        {
            pattern: /([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})/i,
            replacement: (match, monthName, day, year) => {
                const krMonth = monthMap[monthName.toLowerCase()];
                if (!krMonth) return match;
                return `${year}년 ${krMonth} ${day}일`;
            }
        },
        {
            pattern: /(\d{1,2})(st|nd|rd|th)? ([A-Za-z]+) (\d{1,2}):(\d{2})/i,
            replacement: (_, day, __, month, hour, minute) => {
                const krMonth = monthMap[month.toLowerCase()] || month;
                return `${krMonth} ${day}일 ${hour}:${minute}`;
            }
        },

        // ========== 우선순위 3: SBC 요구사항 ==========

        { pattern: /Exchange (?:a|an) (\d+)-Rated Squad/i, replacement: '$1등급 스쿼드 교환' },
        { pattern: /Number of players:\s*(\d+)/i, replacement: '필요 선수: $1명' },
        { pattern: /(\d+)-rated squad/i, replacement: '$1등급 스쿼드' },
        { pattern: /Min\. (\d+) Players from: (.+)/i, replacement: '$2 소속 선수 최소 $1명' },
        { pattern: /Min\. (\d+) Players: Team of the Week/i, replacement: '최소 $1명: 이 주의 팀 선수' },
        { pattern: /Min\. Team Rating: (\d+)/i, replacement: '최소 팀 등급: $1' },
        { pattern: /Min\. Nationalities in Squad: (\d+)/i, replacement: '스쿼드 내 최소 국적 수: $1' },
        { pattern: /Max\. Nationalities in Squad: (\d+)/i, replacement: '스쿼드 내 최대 국적 수: $1' },
        { pattern: /Min\. (\d+) Players from the same League/i, replacement: '동일 리그 소속 선수 최소 $1명' },
        { pattern: /Max\. (\d+) Players from the same League/i, replacement: '동일 리그 소속 선수 최대 $1명' },
        { pattern: /Min\. (\d+) Players from the same Club/i, replacement: '동일 클럽 소속 선수 최소 $1명' },
        { pattern: /Max\. (\d+) Players from the same Club/i, replacement: '동일 클럽 소속 선수 최대 $1명' },
        { pattern: /Min\. Clubs in Squad: (\d+)/i, replacement: '스쿼드 내 클럽 최소 $1개' },
        { pattern: /Max\. Clubs in Squad: (\d+)/i, replacement: '스쿼드 내 클럽 최대 $1개' },
        { pattern: /Min\. (\d+) Players from the same Nation/i, replacement: '동일 국가 소속 선수 최소 $1명' },
        { pattern: /Max\. (\d+) Players from the same Nation/i, replacement: '동일 국가 소속 선수 최대 $1명' },
        { pattern: /Min\. Leagues in Squad: (\d+)/i, replacement: '스쿼드 내 리그 최소 $1개' },
        { pattern: /Max\. Leagues in Squad: (\d+)/i, replacement: '스쿼드 내 리그 최대 $1개' },
        { pattern: /Min\. (\d+) Players: (.+)/i, replacement: '최소 $1명: $2 선수' },
        { pattern: /Min\. Squad Total Chemistry Points: (\d+)/i, replacement: '최소 팀 총 조직력: $1' },
        { pattern: /Min\. (\d+) player with minimum OVR of (\d+)/i, replacement: '$2등급 선수 최소 $1명' },
        { pattern: /Min\. Leagues Squad: (\d+)/i, replacement: '스쿼드 내 리그 최소 $1개' },
        { pattern: /Min\. Clubs Squad: (\d+)/i, replacement: '스쿼드 내 클럽 최소 $1개' },
        { pattern: /Min\. Nationalities Squad: (\d+)/i, replacement: '스쿼드 내 국적 최소 $1개' },
        { pattern: /Player quality: Min\. ['"]?([A-Za-z\s]+)['"]?/i, replacement: '최소 $1 선수' },

        // ========== 우선순위 4: 목표(Objectives) 조건 ==========

        {
            pattern: /(\d+) of (\d+) Objectives/i,
            replacement: '$2개 중 $1개 목표'
        },
        {
            pattern: /Score at least (\d+) goals? from outside of the box in the (.+?)\. Earn an EVO Consumable that grants (.+?), applicable to all Player Items \(excluding (.+?)\) with a 최대 (\d+) OVR\./i,
            replacement: (match, goals, event, bonus, excluded, ovr) => `${event.trim()}에서 박스 밖에서 최소 ${goals}골을 기록하세요. 모든 선수 아이템(${excluded} 제외, 최대 ${ovr} 오버롤)에 적용 가능한 ${bonus} 진화 소모품을 획득하세요.`
        },
        {
            pattern: /Score at least (\d+) goals? in (\d+) separate matches in (?:the )?(.+?)(?: to earn a special (.+?))?\.$/i,
            replacement: (match, goals, matches, event, reward) => {
                const base = `${event.trim()}에서 ${matches}경기에서 최소 ${goals}골을 기록하세요`;
                return reward ? `${base.slice(0, -1)}여 특별한 ${reward.trim()}을 획득하세요.` : base + '.';
            }
        },
        {
            pattern: /Earn ([\d,]+) Rush Points\./i,
            replacement: '러시 포인트 $1 획득.'
        },
        {
            pattern: /(\d+) Completions/i,
            replacement: '$1회 완료'
        },
        {
            pattern: /(\d+) Completion/i,
            replacement: '$1회 완료'
        },
        {
            pattern: /(\d+) Objectives/i,
            replacement: '$1개 목표'
        },

        // ========== 우선순위 5: 진화 조건 (가장 구체적 → 일반) ==========

        // 커뮤니티 투표 패턴
        {
            pattern: /(\d+)% of GG users upvoted this Evolution\. Vote Now!/i,
            replacement: 'GG 사용자의 $1%가 이 진화를 추천했습니다. 지금 투표하세요!'
        },

        // 구체적인 진화 조건들 - Squad Battles 변형 포함
        {
            pattern: /Play (\d+) matches? in Squad Battles on min\.? Semi-Pro difficulty \(or (?:Rush\/)?Rivals\/Champions\/Live Events\) using your active EVO [Pp]layer in game\./i,
            replacement: '스쿼드 배틀(최소 세미프로) 또는 라이벌/챔피언스/라이브 이벤트에서 활성화된 진화 선수를 사용해 $1경기를 플레이하세요.'
        },
        {
            pattern: /Win (\d+) matches? in Squad Battles on min\.? Semi-Pro difficulty \(or (?:Rush\/)?Rivals\/Champions\/Live Events\) using your active EVO [Pp]layer in game\./i,
            replacement: '스쿼드 배틀(최소 세미프로) 또는 라이벌/챔피언스/라이브 이벤트에서 활성화된 진화 선수를 사용해 $1경기를 승리하세요.'
        },
        {
            pattern: /Assist (\d+) goals? in Squad Battles on min\.? Semi-Pro difficulty \(or (?:Rush\/)?Rivals\/Champions\/Live Events\) using your active EVO [Pp]layer in game\./i,
            replacement: '스쿼드 배틀(최소 세미프로) 또는 라이벌/챔피언스/라이브 이벤트에서 활성화된 진화 선수로 $1도움을 기록하세요.'
        },
        {
            pattern: /Score (\d+) goals? in Squad Battles on min\.? Semi-Pro difficulty \(or (?:Rush\/)?Rivals\/Champions\/Live Events\) using your active EVO [Pp]layer in game\./i,
            replacement: '스쿼드 배틀(최소 세미프로) 또는 라이벌/챔피언스/라이브 이벤트에서 활성화된 진화 선수로 $1골을 기록하세요.'
        },
        {
            pattern: /Score at least (\d+) Low Driven goals? with your active EVO player in (\d+) separate matches in any mode\./i,
            replacement: '아무 모드에서 활성화된 진화 선수로 $2경기에서 최소 $1개의 로우 드리븐 골을 기록하세요.'
        },
        {
            pattern: /Win (\d+) matches? while conceding (\d+) goals? or less in Squad Battles on min\.? Semi-Pro difficulty \(or Rivals,? Champions,? Live Events\) using your active EVO player in game\./i,
            replacement: '스쿼드 배틀(최소 세미프로) 또는 라이벌/챔피언스/라이브 이벤트에서 활성화된 진화 선수를 사용해 $2실점 이하로 $1경기를 승리하세요.'
        },

        // Rivals/Champions 전용
        {
            pattern: /Play (\d+) match(?:es)? in (?:Rivals or Champions|Champions or Rivals) using your active EVO [Pp]layer in game/i,
            replacement: '라이벌 또는 챔피언스에서 활성화된 진화 선수를 사용해 $1경기를 플레이하세요'
        },
        {
            pattern: /Win (\d+) match(?:es)? in (?:Rivals or Champions|Champions or Rivals) using your active EVO [Pp]layer in game/i,
            replacement: '라이벌 또는 챔피언스에서 활성화된 진화 선수를 사용해 $1경기를 승리하세요'
        },

        // 일반화된 진화 조건 (가장 마지막에 배치)
        {
            pattern: /Play (\d+) match(?:es)?(?: (?:in|on)? (.*?))? using your active EVO player(?: in game| game)?\.?$/i,
            replacement: (_, count, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수를 사용해 ${count}경기를 플레이하세요.`
        },
        {
            pattern: /Win (\d+) match(?:es)?(?: (?:in|on)? (.*?))? using your active EVO player(?: in game| game)?\.?/i,
            replacement: (_, count, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수를 사용해 ${count}경기를 승리하세요.`
        },
        {
            pattern: /Score (\d+) goals? with your active EVO player(?: (?:in|on)? (.*?))?\.?$/i,
            replacement: (_, goals, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수로 ${goals}골을 기록하세요.`
        },
        {
            pattern: /Assist (\d+) goals? with your active EVO player(?: (?:in|on)? (.*?))?\.?/i,
            replacement: (_, assists, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수로 ${assists}도움을 기록하세요.`
        },

        // ========== 우선순위 6: 포지션-역할 패턴 ==========

        // 하이픈 포함 패턴 (예: "ST - Advanced Forward ++")
        {
            pattern: /\b(CAM|CM|CDM|ST|CF|LW|RW|LM|RM|CB|LB|RB|LWB|RWB|GK)\s*-\s*([A-Za-z\s-]+?)(\s*\+{1,2})?\b/gi,
            replacement: (match, position, role, plus = '') => {
                const translatedRole = translateRole(role);
                return `${position} - ${translatedRole}${plus}`;
            }
        },
        // 스페이스만 있는 패턴 (예: "ST Advanced Forward ++")
        {
            pattern: /\b(CAM|CM|CDM|ST|CF|LW|RW|LM|RM|CB|LB|RB|LWB|RWB|GK)\s+([A-Za-z\s-]+?)(\s*\+{1,2})?\b(?!\s*-)/gi,
            replacement: (match, position, role, plus = '') => {
                const translatedRole = translateRole(role);
                return `${position} ${translatedRole}${plus}`;
            }
        },

        // ========== 우선순위 7: 기타 패턴 ==========

        { pattern: /^Max\. (\d+)$/i, replacement: '최대 $1' },
        { pattern: /^Min\. (\d+)$/i, replacement: '최소 $1' },
        { pattern: /^([\d,]+)\s+players$/i, replacement: '$1 선수 진화 가능' },
        { pattern: /^Level\s*(\d+)/i, replacement: '$1단계' },
        {
            pattern: /Selected (.+?) Evolution Path/i,
            replacement: '선택된 $1 진화 경로'
        },
        {
            pattern: /Best (.+?) Evolutions Path/i,
            replacement: '최고의 $1 진화 경로'
        },
        {
            pattern: /All (.+?) Evolution Paths/i,
            replacement: '$1의 모든 진화 경로'
        },

        // 시제 단어
        { pattern: /\bago\b/i, replacement: ' 전' }
    ];

    // ============================================
    // 소문자 변환된 번역 맵 생성
    // ============================================
