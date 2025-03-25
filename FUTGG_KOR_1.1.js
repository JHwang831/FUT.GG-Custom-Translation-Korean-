// ==UserScript==
// @name         FUT.GG Custom Translation (Korean)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Translate English text on FUT.GG into Korean
// @author       JHwang831(리스제임스의목발)
// @match        https://www.fut.gg/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 번역 데이터 (영어 -> 한국어)
    const translations = {
        //메인
        "Evolutions": "진화",
        "Objectives": "목표",
        "Rush": "러시",
        "Campaign Squads": "캠페인 스쿼드",
        "Tools": "도구",
        "Evo Lab": "진화 연구",
        "Live Hub": "라이브 허브",
        "Squad Builder": "스쿼드 빌더",
        "Mode Mastery": "모드 마스터리",
        "Collections": "컬렉션",
        "Player Pools": "선수 풀",
        "Upgrade Hub": "업그레이드 허브",
        "Card Creator": "카드 생성기",
        "Compare": "비교",
        "Trackers": "트래커",
        "Thunderstruck Tracker": "천둥번개 트래커",
        "RTTK Tracker": "RTTK 트래커",
        "TOTS Live Tracker": "TOTS 라이브 트래커",
        "Fantasy FC Tracker": "판타지 FC 트래커",
        "Momentum Trends": "가격변동 추이",
        "Cheapest by Rating": "오버롤 별 최저가",
        "Resources": "리소스",
        "Past & Present": "과거 & 현재 소속 팀",
        "Clubs": "클럽",
        "Nations": "국가",
        "Leagues": "리그",
        "Rarities": "희귀도",
        "Trending": "인기",
        "Trending Evos": "인기 진화",
        "Recent": "최신",
        "In Packs": "현재 확률업 선수",
        "TOTW": "이 주의 선수",
        "View All Trending Players": "모든 인기 선수 보기",
        "Home": "홈",
        "Players": "선수",
        "Squads": "스쿼드",
        "Builder": "빌더",
        "Market": "시장",
        "News": "뉴스",
        "Login": "로그인",
        "Register": "회원가입",
        "Search": "검색",
        "Overview": "개요",

        //PS
        "PlayStyles": "플레이스타일",
        "Scoring": "득점",
        "Finesse Shot": "감아차기",
        "Chip Shot": "칩 슛",
        "Power Shot": "파워 슛",
        "Dead Ball": "데드볼",
        "Power Header": "파워 헤딩",
        "Low Driven Shot": "낮은 드리븐 슛",
        "Passing": "패스",
        "Incisive Pass": "예리한 패스",
        "Pinged Pass": "핑 패스",
        "Long Ball Pass": "긴 패스",
        "Tiki Taka": "티키타카",
        "Whipped Pass": "휩 패스",
        "Defending": "수비",
        "Jockey": "견제",
        "Block": "블로킹",
        "Intercept": "가로채기",
        "Anticipate": "예상",
        "Slide Tackle": "슬라이딩 태클",
        "Bruiser": "브루저",
        "Ball Control": "볼 컨트롤",
        "Technical": "테크니컬",
        "Rapid": "래피드",
        "Flair": "플레어",
        "First Touch": "퍼스트 터치",
        "Trickster": "트릭스터",
        "Press Proven": "압박 검증",
        "Physical": "피지컬",
        "Quick Step": "퀵 스텝",
        "Relentless": "끈기와 인내",
        "Trivela": "트리벨라",
        "Acrobatic": "아크로바틱",
        "Long Throw": "긴 스로우",
        "Aerial": "공중전",
        "Goalkeeping": "골키퍼",
        "Far Throw": "긴 스로우",
        "Footwork": "발놀림",
        "Cross Claimer": "크로스 클레이머",
        "Rush Out": "러시 블로킹",
        "Far Reach": "넓은 수비 범위",
        "Deflector": "디플렉터",

        //스탯
        "Pace": "페이스",
        "Acceleration": "가속력",
        "Sprint Speed": "전력 질주 속도",
        "Shooting": "슈팅",
        "Att. Position": "포지셔닝",
        "Finishing": "골 결정력",
        "Shot Power": "슛 파워",
        "Long Shots": "중거리 슛",
        "Volleys": "발리슛",
        "Penalties": "페널티킥",
        "Vision": "시야",
        "Crossing": "크로스",
        "FK. Acc.": "프리킥 정확도",
        "Short Pass": "짧은 패스",
        "Long Pass": "긴 패스",
        "Curve": "커브",
        "Agility": "민첩성",
        "Balance": "밸런스",
        "Reactions": "반응 속도",
        "Composure": "평정심",
        "Interceptions": "가로채기",
        "Heading Acc.": "헤딩 정확도",
        "Def. Aware": "수비 이해도",
        "Stand Tackle": "스탠딩 태클",
        "Jumping": "점프",
        "Stamina": "스태미나",
        "Strength": "몸싸움",
        "Aggression": "적극성",

        //필터
        "Filter": "필터",
        "Apply Filters": "필터 적용",
        "Reset Filters": "필터 초기화",
        "General": "일반",
        "Name": "이름",
        "Player Name": "선수 이름",
        "Quality": "품질",
        "Rarity": "희귀도",
        "Rarity Squad": "희귀도 스쿼드",
        "Nation": "국가",
        "League": "리그",
        "Club": "클럽",
        "Past and Present": "과거 및 현재 소속 팀",
        "Overall": "종합 능력치",
        "Price": "가격",
        "Skill Moves": "개인기",
        "Weak Foot": "약한 발",
        "Position": "포지션",
        "Attackers": "공격수",
        "Midfielders": "미드필더",
        "Defenders": "수비수",
        "Has All of Selected Positions": "선택한 모든 포지션 포함",
        "Only Primary Positions": "주 포지션만 포함",
        "Roles": "역할",
        "Advanced Forward": "어드밴스 포워드",
        "False 9": "폴스 나인",
        "Poacher": "포처",
        "Target Forward": "타겟 포워드",
        "Inside Forward": "인사이드 포워드",
        "Wide Playmaker": "와이드 플레이메이커",
        "Winger": "윙어",
        "Classic 10": "클래식 10번",
        "Half-Winger": "하프 윙어",
        "Playmaker": "플레이메이커",
        "Shadow Striker": "쉐도우 스트라이커",
        "Wide Midfielder": "와이드 미드필더",
        "Box-To-Box": "박스 투 박스",
        "Deep-Lying Playmaker": "딥라잉 플레이메이커",
        "Holding": "홀딩",
        "Centre-Half": "센터 하프",
        "Wide Half": "와이드 하프",
        "Ball-Playing Defender": "볼플레잉 수비수",
        "Defender": "수비수",
        "Stopper": "스토퍼",
        "Attacking Wingback": "공격형 윙백",
        "Falseback": "폴스백",
        "Fullback": "풀백",
        "Wingback": "윙백",
        "Goalkeeper": "골키퍼",
        "Sweeper Keeper": "스위퍼 키퍼",
        "# of Roles+": "역할+ 개수",
        "# of Roles++": "역할++ 개수",
        "Miscellaneous": "기타 필터",
        "Show Only Market Players": "판매 선수만 보기",
        "Show Only SBC/Obj. Players": "SBC/목표 선수만 보기",
        "Has Dynamic Image": "미페 있음",
        "Has Real Face": "페이스온 있음",
        "Lengthy": "길게 가속 - 랭시",
        "Explosive": "폭발적인 가속 - 익스",
        "Mostly Lengthy": "대부분 길게 가속 - 모랭",
        "Mostly Explosive": "대부분 폭발적인 가속 - 모익",
        "Controlled Lengthy": "제어된 길게 가속 - 컨랭",
        "Controlled Explosive": "제어된 폭발적인 가속 - 컨익",
        "Controlled": "제어된 가속 - 컨트롤드",
        "Strong Foot": "주 발",
        "Left": "왼발잡이",
        "Right": "오른발잡이",
        "Gender": "성별",
        "Male": "남성",
        "Female": "여성",
        "Body Type": "체형 - 체중, 키 순",
        "Lean Short": "마르고 작음",
        "Lean Medium": "마르고 보통",
        "Lean Tall": "마르고 큼",
        "Average Short": "보통 작음",
        "Average Medium": "보통 보통",
        "Average Tall": "보통 큼",
        "Stocky Short": "덩치 작음",
        "Stocky Medium": "덩치 보통",
        "Stocky Tall": "덩치 큼",
        "Unique": "유니크 - 고유 체형",
        "Height": "키",
        "Weight": "몸무게",
        "Age": "나이",
        "Has Any of Selected PlayStyles": "선택한 모든 플레이스타일 포함",
        "# of PS": "플레이스타일 개수",
        "# of PS+": "플레이스타일+ 개수",
        "Custom Filters": "커스텀 필터",
        "Diving": "GK 다이빙",
        "Handling": "GK 핸들링",
        "Kicking": "GK 킥",
        "Reflexes": "GK 반응속도",
        "Speed": "GK 스피드",
        "Positioning": "위치선정",
        "FK Accuracy": "프리킥 정확도",
        "Heading Accuracy": "헤딩 정확도",
        "Short Passing": "짧은 패스",
        "Long Passing": "긴 패스",
        "Defensive Awareness": "수비 이해도",
        "Standing Tackle": "스탠딩 태클",
        "Sliding Tackle": "슬라이딩 태클",
        "Sorting": "정렬",
        "Select": "선택",
        "Descending": "내림차순",
        "Ascending": "오름차순",
        "Foot": "주 발",
        "Real Face": "페이스온 적용여부",
        "Yes": "예",
        "No": "아니오",
        "Shirt Number": "등번호",
        "Added on": "추가된 날짜",
        "CHEM LINKS": "조직력 높은 선수",
        "Top Chemistry Links": "조직력 높은 선수",
        "Actions":"추가",
        "Add to Evo Lab":"진화 연구에 추가",
        "Add to Compare":"비교에 추가",
        "Other Versions": "다른 버전",

        //가격관련
        "Price Momentum": "가격변동 추이",
        "Lowest": "최저가",
        "Highest": "최고가",
        "Lowest BIN": "현재 최저 즉시구매가",
        "Last Update": "최근 갱신",
        "Price Range": "가격 범위",
        "Average BIN": "일일 평균 즉시구매가",
        "Cheapest Sale": "일일 최저가",
        "Discard Value": "퀵셀 가격",
        "Attributes": "능력치",
        "AcceleRATE": "가속타입",
        "Dribbling": "드리블",
        "Physicality": "피지컬",
        "Prices": "가격",
        "YEAR": "년",
        "MONTH": "월",
        "WEEK": "주",
        "3 DAYS": "3일",
        "TODAY": "오늘",
        "Recent Sales": "최근 판매 목록",
        "Time Sold": "판매된 시간",
        "Live Auctions": "실시간 경매",
        "Ending": "만료까지",
        "Start Bid": "시작 가격",
        "BIN": "즉시구매가",

        //캐미
        "basic": "기본",
        "sniper": "스나이퍼",
        "finisher": "피니셔",
        "deadeye": "데드아이",
        "marksman": "마크스맨",
        "hawk": "호크",
        "artist": "아티스트",
        "architect": "아키텍트",
        "powerhouse": "파워하우스",
        "maestro": "마에스트로",
        "engine": "엔진",
        "sentinel": "센티넬",
        "guardian": "가디언",
        "gladiator": "글래디에이터",
        "backbone": "백본",
        "anchor": "앵커",
        "hunter": "헌터",
        "catalyst": "카탈리스트",
        "shadow": "섀도우",
        "wall" : "월",
        "glove" : "글러브",
        "shield" : "쉴드",
        "cat" : "캣",

        //SBC 및 OBJ
        "CHALLENGES" : "챌린지",
        "EXPIRES" : "만료까지",
        "REPEATABLE" : "반복 가능 횟수",
        "View Rewards" : "보상 보기",
        "View Solution" : "솔루션 보기",
        "Rewards" : "보상",
        "Mark as Completed" : "완료로 표시하기",
        "All": "모두",
        "Expiring Soon": "곧 만료됨",
        "Season Points": "시즌 포인트",
        "Season Pass": "시즌 패스",
        "Weekly Rush Objectives": "주간 러시 목표",
        "Seasonal": "시즌",
        "Live": "라이브",
        "FC Pro": "FC 프로",
        "FC Coaching Masterclass": "FC 코칭 마스터클래스",
        "Milestones": "마일스톤",
        "Foundations": "기본",
        "ICONS": "아이콘",
        "UPGRADES": "업그레이드",

        //스쿼드 빌더
        "TOTAL CHEMISTRY:" : "총 조직력",
        "EVOS" : "내 진화선수",
        "Save" : "저장",
        "Squad Title" : "스쿼드 이름",
        "Reset" : "초기화",
        "MANAGER" : "감독",
        "FORMATION:" : "포메이션",
        "Change Formation" : "포메이션 변경",
        "Bench" : "벤치",
        "Settings" : "설정"

        //EVO


    };

// 특정 패턴 번역 데이터 (정규 표현식 활용)
const dynamicTranslations = [
    { pattern: /in\s*(\d+)\s*years?/i, replacement: '$1년' },
    { pattern: /in\s*(\d+)\s*months?/i, replacement: '$1달' },
    { pattern: /in\s*(\d+)\s*days?/i, replacement: '$1일' },
    { pattern: /in\s*(\d+)\s*hours?/i, replacement: '$1시간' },
    { pattern: /(\d+)\s*m\s*ago/i, replacement: '$1분 전' },
    { pattern: /(\d+)\s*h\s*ago/i, replacement: '$1시간 전' },
    { pattern: /(\d+)\s*months?/i, replacement: '$1달' },
    { pattern: /(\d+)\s*days?/i, replacement: '$1일' },
    { pattern: /(\d+)\s*hours?/i, replacement: '$1시간' },
    { pattern: /(\d+)\s*minutes?\s*ago/i, replacement: '$1분 전' },
    { pattern: /Available for (\d+)\s*weeks?/i, replacement: '$1주 동안 사용 가능' },
    { pattern: /Expires in (\d+ .*?)$/i, replacement: '$1후 만료 예정' },
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
    { pattern: /Min\. (\d+) player with minimum OVR of (\d+)/i, replacement: '$2등급 선수 최소 $1명' }
];

// 번역 적용 함수 (구조 유지 완벽 버전)
function applyTranslations() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

    let node;
    while ((node = walker.nextNode())) {
        const originalText = node.nodeValue;
        const text = originalText.trim();

        if (text.length === 0) continue;

        let translated = false;

        // 동적 패턴 매칭 (정규식 활용)
        for (const { pattern, replacement } of dynamicTranslations) {
            if (pattern.test(text)) {
                node.nodeValue = originalText.replace(pattern, replacement);
                translated = true;
                break;
            }
        }

        if (translated) continue;

        // 정적 번역 매칭
        const lowerText = text.toLowerCase();
        if (translations.hasOwnProperty(text)) {
            node.nodeValue = originalText.replace(text, translations[text]);
        } else {
            for (const [key, value] of Object.entries(translations)) {
                if (key.toLowerCase() === lowerText) {
                    node.nodeValue = originalText.replace(text, value);
                    break;
                }
            }
        }
    }
}

// MutationObserver + Debounce 유지 (기존 유지)
let debounceTimer = null;
const observer = new MutationObserver(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyTranslations, 300);
});

observer.observe(document.body, { childList: true, subtree: true });

// 로딩 후 최초 적용
window.addEventListener('load', () => {
    setTimeout(applyTranslations, 2000);
});

})();