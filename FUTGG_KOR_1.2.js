// ==UserScript==
// @name         FUT.GG Custom Translation (Korean)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Translate English text on FUT.GG into Korean
// @author       JHwang831(리스제임스의목발)
// @match        https://www.fut.gg/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/530332/FUTGG%20Custom%20Translation%20%28Korean%29.user.js
// @updateURL https://update.greasyfork.org/scripts/530332/FUTGG%20Custom%20Translation%20%28Korean%29.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const isMoneyFormat = (text) => /\d+\.\d+\s*m\b/i.test(text.trim());

    const evoModeMap = new Map([
        ["any mode", "아무 모드"],
        ["rush, rivals, champions, or squad battles on min. semi-pro", "러시, 라이벌, 챔피언스, 혹은 스쿼드 배틀 (최소 세미프로)"],
        ["rush, rivals, champions, or squad battles on min semi-pro", "러시, 라이벌, 챔피언스, 혹은 스쿼드 배틀 (최소 세미프로)"],
        ["rivals or champions", "라이벌 또는 챔피언스"]
    ]);

    const normalize = (str) => str.trim().toLowerCase().replace(/[\.,]+$/, '');

    const normalizeMode = (mode) => evoModeMap.get(normalize(mode)) || mode;

    const translations = {
        //메인
        "Evolutions": "진화 목록",
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
        "Search...": "검색...",
        "Overview": "개요",
        "New Players": "신규선수",
        "Trending Players": "인기선수",
        "Women Players": "여자선수",
        "View All": "모두 보기",

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
        "Overall": "오버롤",
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
        "GK Diving": "GK 다이빙",
        "GK Handling": "GK 핸들링",
        "GK Kicking": "GK 킥",
        "GK Reflexes": "GK 반응속도",
        "GK Speed": "GK 스피드",
        "GK Positioning": "GK 위치선정",
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
        "Comments": "댓글",
        "Total IGS": "총 인게임스탯 (IGS)",
        "Total Face Stats": "총 페이스스탯",
        "Number of PlayStyles": "플레이스타일 개수",
        "Number of PlayStyles+": "플레이스타일+ 개수",
        "Number of Total PlayStyles": "총 플레이스타일(금/은특) 개수",
        "Player Filters":"선수 필터",

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
        "Solution" : "솔루션",
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
        "Settings" : "설정",
        "SHARE" : "공유",

        //EVO
        "Show Expired": "만료된 진화 보기",
        "Hide Expired": "만료된 진화 가리기",
        "Requirements": "요구사항",
        "Max PS": "최대 플레이스타일",
        "SM": "개인기",
        "PlayStyle": "플레이스타일",
        "PlayStyle+": "플레이스타일+",
        "Max Pos.": "최대 포지션",
        "Excluded Position": "제외 포지션",
        "Max PS+": "최대 플레이스타일+",
        "New Pos.": "새로운 포지션",
        "WF": "약한 발",
        "Role++": "역할++",
        "Role+": "역할+",
        "UNLOCK BY": "잠금해제 기한",
        "EXPIRES ON": "만료일",
        "# PLAYERS": "진화 가능 선수 수",
        "Player": "선수",
        "Eligible Players": "진화가능 선수",
        "Evolved Players": "진화완료 선수",
        "Trending Evolved Players": "인기 진화완료 선수",
        "Total Upgrades": "총 업그레이드",
        "Full Evolution Path": "총 진화 단계",
        "EXPIRED": "만료됨",
        "FREE": "무료",
        "TRAINING TIME":"훈련 기간",
        "For You":"맞춤 설정",
        "Exclude Your Used Evolutions":"내가 사용한 진화 제외",
        "Use Every Selected Evolution": "선택한 모든 진화 사용",
        "Exclude Unselected Evolutions": "선택하지 않은 진화 제외",
        "Hide Evolution Combinations": "진화 조합 숨기기",
        "Show All Versions of Same Player": "동일 선수의 모든 버전 보기",
        "Show Non-Boosted Players": "부스트되지 않은 선수 보기",
        "Hide Paid Evolutions": "유료 진화 숨기기",
        "Next": "다음",
        "Prev": "이전",
        "Assets": "스크린샷",
        "Share Path": "진화경로 공유",
        "All Versions": "모든 버전",
        "Check out Evo Lab for expired paths": "만료된 진화는 진화 연구에서 확인",
        // EVO LAB 관련
        "Hide Base Players": "순정 선수 숨기기",
        "Hide Evolutions Players": "진화 선수 숨기기",
        "EVOLVE": "진화하기",
        "NUMBER OF UPGRADES": "업그레이드 개수",
        "NO UPGRADES": "업그레이드 없음",
        "Select a player to evolve": "진화할 선수 검색",
        "Active": "활성",
        "All Evos": "모든 진화",
        "Customise": "커스텀",
        "Review": "진화 적용 확인",
        "SAVE PLAYER": "선수 저장하기",
        "Hide Used Evolutions": "사용한 진화 숨기기",
        "Reset Modifications": "조정 리셋",
        "Show Attributes": "능력치 보기",
        "General Information": "일반 정보",
        "View Rarities": "희귀도 보기",
        "Cosmetic Evolution": "코스메틱 진화",
        "Select a Cosmetic Evolution": "코스메틱 진화 선택",
        "View Gallery": "갤러리 보기",
        "Alternative Positions": "보조 포지션",
        "PlayStyles+": "플레이스타일+",
        "Roles+": "역할+",
        "Roles++": "역할++",
        "Apply upgrades": "업그레이드 적용",
        "Check eligibility": "진화 적격 여부 확인",
        "Show prices": "가격 보기",
        "NEWEST FIRST": "최신순",
        "OLDEST FIRST": "오래된 순",
        "PRICE ASCENDING": "가격 오름차순",
        "PRICE DESCENDING": "가격 내림차순",
        "Search evolutions...": "진화 검색...",
        "APPLY": "적용하기",
        "+ CREATE":"제작하기",
        "Select a rarity":"희귀도 선택",
        "Loading...":"로딩중...",
        "+ ADD FROM MY PLAYERS":"+ 내 선수중에서 추가하기",
        "+ ADD FROM EVOLVE":"+ 진화에서 추가하기",
        "Recently Viewed":"최근 본 선수",
        "EXTINCT":"매물없음",
        "Info":"정보"

    };

    const dynamicTranslations = [
        // Custom explicit expiration translations
        { pattern: /Expires in (\d+)\s*day(?:s)?/i, replacement: '$1일 후 만료 예정' },
        { pattern: /Expires in (\d+)\s*month(?:s)?/i, replacement: '$1달 후 만료 예정' },

        // Time formats
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
        { pattern: /(\d+)\s*m\b/i, replacement: '$1분' },
        { pattern: /(\d+)h\b/i, replacement: '$1시간' },
        { pattern: /(\d+)m\b/i, replacement: '$1분' },

        // Date format
        {
            pattern: /([A-Za-z]+) (\d{1,2}), (\d{4}), (\d{1,2}):(\d{2}) (AM|PM)/i,
            replacement: (_, monthName, day, year, hour, minute, period) => {
                const months = {
                    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
                    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
                };
                const m = months[monthName];
                let h = parseInt(hour, 10);
                if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
                if (period.toUpperCase() === 'AM' && h === 12) h = 0;
                const ampm = period.toUpperCase() === 'PM' ? '오후' : '오전';
                return `${year}년 ${m}월 ${day}일 ${ampm} ${h}시 ${minute}분`;
            }
        },
        {
            pattern: /(\d{1,2})(st|nd|rd|th)? ([A-Za-z]+) (\d{1,2}):(\d{2})/i,
            replacement: (_, day, __, month, hour, minute) => {
                const monthMap = {
                    january: '1월', february: '2월', march: '3월', april: '4월',
                    may: '5월', june: '6월', july: '7월', august: '8월',
                    september: '9월', october: '10월', november: '11월', december: '12월'
                };
                const krMonth = monthMap[month.toLowerCase()] || month;
                return `${krMonth} ${day}일 ${hour}:${minute}`;
            }
        },

        //SBC
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
        { pattern: /Min\. (\d+) player with minimum OVR of (\d+)/i, replacement: '$2등급 선수 최소 $1명' },
        { pattern: /Min\. Leagues Squad: (\d+)/i, replacement: '스쿼드 내 리그 최소 $1개' },
        { pattern: /Min\. Clubs Squad: (\d+)/i, replacement: '스쿼드 내 클럽 최소 $1개' },
        { pattern: /Min\. Nationalities Squad: (\d+)/i, replacement: '스쿼드 내 국적 최소 $1개' },
        { pattern: /Player quality: Min\. ['"]?([A-Za-z\s]+)['"]?/i, replacement: '최소 $1 선수'},

        //EVO
        { pattern: /\+(\d+)\s*more/i, replacement: '+$1개 더' },
        { pattern: /Max\. (\d+)/i, replacement: '최대 $1' },
        { pattern: /Min\. (\d+)/i, replacement: '최소 $1' },
        {
            pattern: /\b(CAM|CM|CDM|ST|CF|LW|RW|LM|RM|CB|LB|RB|LWB|RWB|GK)\s+(Advanced Forward|False 9|Poacher|Target Forward|Inside Forward|Wide Playmaker|Winger|Classic 10|Half-Winger|Playmaker|Shadow Striker|Wide Midfielder|Box-To-Box|Deep-Lying Playmaker|Holding|Centre-Half|Wide Half|Ball-Playing Defender|Defender|Stopper|Attacking Wingback|Falseback|Fullback|Wingback|Goalkeeper|Sweeper Keeper)(\+{1,2})?/i,
            replacement: (match) => {
                const regex = /\b(CAM|CM|CDM|ST|CF|LW|RW|LM|RM|CB|LB|RB|LWB|RWB|GK)\s+(Advanced Forward|False 9|Poacher|Target Forward|Inside Forward|Wide Playmaker|Winger|Classic 10|Half-Winger|Playmaker|Shadow Striker|Wide Midfielder|Box-To-Box|Deep-Lying Playmaker|Holding|Centre-Half|Wide Half|Ball-Playing Defender|Defender|Stopper|Attacking Wingback|Falseback|Fullback|Wingback|Goalkeeper|Sweeper Keeper)(\+{1,2})?/i;
                const exec = regex.exec(match);
                if (!exec) return match;

                const [, position, role, plus = ''] = exec;

                const roleMap = {
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
                    "Sweeper Keeper": "스위퍼 키퍼"
                };

                const translatedRole = roleMap[role] || role;
                return `${position} ${translatedRole}${plus}`;
            }
        },
        { pattern: /^([\d,]+)\s+players$/i, replacement: '$1 선수 진화 가능'},
        { pattern: /^Level\s*(\d+)/i, replacement: '$1단계'},

        // EVO Conditions
        {
            pattern: /Play (\d+) match(?:es)?(?: (?:in|on)? (.*?))? using your active EVO player(?: in game| game)?\.?/i,
            replacement: (_, count, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수를 사용해 ${count}경기를 플레이하세요.`
        },
        {
            pattern: /Win (\d+) match(?:es)?(?: (?:in|on)? (.*?))? using your active EVO player(?: in game| game)?\.?/i,
            replacement: (_, count, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수를 사용해 ${count}경기를 승리하세요.`
        },
        {
            pattern: /Win 1 match by at least (\d+) goals?(?: (?:in|on)? (.*?))? using your active EVO player(?: in game| game)?\.?/i,
            replacement: (_, diff, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수를 사용해 ${diff}골 이상 차이로 승리하세요.`
        },
        {
            pattern: /Score at least (\d+) goal(?:s)? with your active EVO player in (\d+) separate matches(?: in)? (.*?)\.?/i,
            replacement: (_, goals, matches, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수로 ${matches}경기에서 최소 ${goals}골을 기록하세요.`
        },
        {
            pattern: /Score (\d+) goals? with your active EVO player(?: (?:in|on)? (.*?))?\.?/i,
            replacement: (_, goals, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수로 ${goals}골을 기록하세요.`
        },
        {
            pattern: /Assist (\d+) goals? with your active EVO player(?: (?:in|on)? (.*?))?\.?/i,
            replacement: (_, assists, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수로 ${assists}도움을 기록하세요.`
        },
        {
            pattern: /Assist at least once in (\d+) separate matches(?: in)? (.*?) using your active EVO player(?: in game| game)?\.?/i,
            replacement: (_, matches, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수로 ${matches}경기에서 최소 1도움을 기록하세요.`
        },
        {
            pattern: /Assist at least (\d+) goals? with your active EVO player (\d+) separate matches(?: (?:in|on)? (.*?))?\.?/i,
            replacement: (_, assists, matches, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수로 ${matches}경기에서 최소 ${assists}도움을 기록하세요.`
        },
        {
            pattern: /Win (\d+) matches? while conceding (\d+) goal(?:s)? or less(?: (?:in|on)? (.*?))? using your active EVO player(?: in game| game)?\.?/i,
            replacement: (_, wins, goals, mode) => `${normalizeMode(mode || 'any mode')}에서 활성화된 진화 선수를 사용해 ${goals}실점 이하로 ${wins}경기를 승리하세요.`
        },

        //Evo Lab
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


        // EVO LAB - 포지션 + 역할++
        {
            pattern: /\b(CAM|CM|CDM|ST|CF|LW|RW|LM|RM|CB|LB|RB|LWB|RWB|GK)\s*-\s*(Advanced Forward|False 9|Poacher|Target Forward|Inside Forward|Wide Playmaker|Winger|Classic 10|Half-Winger|Playmaker|Shadow Striker|Wide Midfielder|Box-To-Box|Deep-Lying Playmaker|Holding|Centre-Half|Wide Half|Ball-Playing Defender|Defender|Stopper|Attacking Wingback|Falseback|Fullback|Wingback|Goalkeeper|Sweeper Keeper)(\+{1,2})?/i,
            replacement: (match) => {
                const regex = /\b(CAM|CM|CDM|ST|CF|LW|RW|LM|RM|CB|LB|RB|LWB|RWB|GK)\s*-\s*(Advanced Forward|False 9|Poacher|Target Forward|Inside Forward|Wide Playmaker|Winger|Classic 10|Half-Winger|Playmaker|Shadow Striker|Wide Midfielder|Box-To-Box|Deep-Lying Playmaker|Holding|Centre-Half|Wide Half|Ball-Playing Defender|Defender|Stopper|Attacking Wingback|Falseback|Fullback|Wingback|Goalkeeper|Sweeper Keeper)(\+{1,2})?/i;
                const exec = regex.exec(match);
                if (!exec) return match;

                const [, position, role, plus = ''] = exec;

                const roleMap = {
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
                    "Sweeper Keeper": "스위퍼 키퍼"
                };

                const translatedRole = roleMap[role] || role;
                return `${position} - ${translatedRole}${plus}`;
            }
        },

        // Tense words
        { pattern: /\bago\b/i, replacement: '전' },
        { pattern: /\bin\b/i, replacement: '' }
    ];

    const lowerCaseTranslations = Object.fromEntries(
        Object.entries(translations).map(([k, v]) => [k.trim().toLowerCase(), v])
    );

    function translateTextNode(node) {
        const original = node.nodeValue;
        if (!original || !original.trim() || isMoneyFormat(original)) return;

        const normalized = original.trim().toLowerCase();

        //1. 정적 번역 먼저
        if (lowerCaseTranslations[normalized]) {
            node.nodeValue = lowerCaseTranslations[normalized];
            return;
        }

        //2. 동적 패턴 번역 이후 적용
        for (const { pattern, replacement } of dynamicTranslations) {
            const match = pattern.exec(original);
            if (match) {
                node.nodeValue = typeof replacement === 'function'
                    ? replacement(...match)
                    : original.replace(pattern, replacement);
                return;
            }
        }
    }

    function applyTranslations() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) translateTextNode(node);
    }

    const observer = new MutationObserver(() => {
        clearTimeout(window._futggDebounce);
        window._futggDebounce = setTimeout(applyTranslations, 200);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('load', () => setTimeout(applyTranslations, 500));

})();