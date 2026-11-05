// ==UserScript==
// @name         FUT.GG Custom Translation (Korean)
// @namespace    http://tampermonkey.net/
// @version      3.0.0
// @description  Translate English text on FUT.GG into Korean
// @author       JHwang831(리스제임스의목발)
// @match        https://www.fut.gg/*
// @run-at       document-end
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/JHwang831/FUT.GG-Custom-Translation-Korean-/main/FUTGG_KOR_3.0.user.js
// @updateURL    https://raw.githubusercontent.com/JHwang831/FUT.GG-Custom-Translation-Korean-/main/FUTGG_KOR_3.0.meta.js
// ==/UserScript==

(function () {
'use strict';
// 번역 사전: 고정된 UI 문구를 한국어로 바꿀 때 사용합니다.
const translations = {
  "Apply a filter to get started...": "필터를 적용하여 시작하세요...",
  "Try out our Smart Search...": "스마트 검색을 사용해보세요...",
  "SORT": "정렬",
  "RATING": "등급",
  "OVR / Price": "오버롤 / 가격",
  "Min OVR": "최소 오버롤",
  "Max OVR": "최대 오버롤",
  "Min Price": "최소 가격",
  "Max Price": "최대 가격",
  "Positions": "포지션",
  "SM / WF": "개인기 / 약한 발",
  "Has All Selected Positions": "선택한 모든 포지션 포함",
  "Min PlayStyles": "최소 플레이스타일",
  "Max PlayStyles": "최대 플레이스타일",
  "Min PlayStyles+": "최소 플레이스타일+",
  "Max PlayStyles+": "최대 플레이스타일+",
  "Has Any Selected PlayStyles": "선택한 플레이스타일 중 하나 포함",
  "Min Roles+": "최소 역할+",
  "Max Roles+": "최대 역할+",
  "Min Roles++": "최소 역할++",
  "Max Roles++": "최대 역할++",
  "Show Only Challenge Players": "챌린지 선수만 보기",
  "Has Dynamic": "다이나믹 이미지 있음",
  "AccelerRATE Type": "가속 타입",
  "Accelerate Type": "가속 타입",
  "Min Height": "최소 키",
  "Max Height": "최대 키",
  "Min Weight": "최소 몸무게",
  "Max Weight": "최대 몸무게",
  "Min Age": "최소 나이",
  "Max Age": "최대 나이",
  "Go Back": "뒤로가기",
  "Search...": "검색...",
  "Home": "홈",
  "Players": "선수",
  "Squads": "스쿼드",
  "Builder": "빌더",
  "Market": "시장",
  "News": "뉴스",
  "Login": "로그인",
  "Log In": "로그인",
  "Register": "회원가입",
  "Sign Up": "회원가입",
  "Sign Out": "로그아웃",
  "Account": "계정",
  "My Squads": "내 스쿼드",
  "Search": "검색",
  "Search Players...": "선수 검색...",
  "Type \"/\" to search...": "검색하려면 \"/\"를 입력...",
  "Search for a player": "선수 검색",
  "Overview": "개요",
  "Evolutions": "진화",
  "Objectives": "목표",
  "Rush": "러시",
  "Squad Battles": "스쿼드 배틀",
  "Rivals": "라이벌",
  "Champions": "챔피언스",
  "Live Events": "라이브 이벤트",
  "Semi-Pro": "세미프로",
  "min. Semi-Pro": "최소 세미프로",
  "on min. Semi-Pro difficulty": "(최소 세미프로 난이도)",
  "on min Semi-Pro difficulty": "(최소 세미프로 난이도)",
  "using your active EVO Player in game": "활성화된 진화 선수를 사용하여",
  "using your active EVO player in game": "활성화된 진화 선수를 사용하여",
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
  "Thunderstruck Tracker": "Thunderstruck 트래커",
  "RTTK Tracker": "RTTK 트래커",
  "TOTS Live Tracker": "TOTS Live 트래커",
  "Fantasy FC Tracker": "Fantasy FC 트래커",
  "Momentum Trends": "가격 변동 추세",
  "Cheapest by Rating": "등급별 최저가",
  "Resources": "자료",
  "Past & Present": "과거와 현재",
  "Clubs": "클럽",
  "Nations": "국가",
  "Leagues": "리그",
  "Rarities": "희귀도",
  "SBC Rating Combinations": "SBC 등급 조합",
  "Trending": "인기",
  "Recent": "최근",
  "Trending Evos": "인기 진화",
  "Trending Evolutions": "인기 진화",
  "In Packs": "팩에서 획득 가능",
  "View All Trending Players": "모든 인기 선수 보기",
  "EXPIRING SOON": "곧 만료",
  "Expiring Soon": "곧 만료됨",
  "New Players": "신규 선수",
  "Trending Players": "인기 선수",
  "Women Players": "여자선수",
  "View All": "모두 보기",
  "Download the FUT.GG Mobile App": "FUT.GG 모바일 앱 다운로드",
  "PlayStyles": "플레이스타일",
  "Scoring": "득점",
  "Finesse Shot": "감아차기",
  "Chip Shot": "칩 슛",
  "Power Shot": "파워 슛",
  "Dead Ball": "데드볼",
  "Power Header": "파워 헤딩",
  "Low Driven Shot": "낮은 드리븐 슛",
  "Low Driven": "로우 드리븐",
  "Precision Header": "정밀 헤더",
  "Gamechanger": "게임체인저",
  "Game Changer": "게임체인저",
  "Passing": "패스",
  "Incisive Pass": "예리한 패스",
  "Pinged Pass": "핑 패스",
  "Long Ball Pass": "긴 패스",
  "Long Ball": "긴 패스",
  "Tiki Taka": "티키타카",
  "Whipped Pass": "휩 패스",
  "Inventive": "창의적인 패스",
  "Defending": "수비",
  "Jockey": "견제",
  "Block": "블로킹",
  "Intercept": "가로채기",
  "Slide Tackle": "슬라이딩 태클",
  "Bruiser": "브루저",
  "Aerial Fortress": "에어리얼 포트리스",
  "Enforcer": "볼 보호",
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
  "Goalkeeping": "골키핑",
  "Far Throw": "긴 스로우",
  "Footwork": "발놀림",
  "Cross Claimer": "크로스 클레이머",
  "Rush Out": "러시 블로킹",
  "Far Reach": "넓은 수비 범위",
  "Deflector": "디플렉터",
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
  "PAC": "페이스",
  "SHO": "슈팅",
  "PAS": "패스",
  "DRI": "드리블",
  "DEF": "수비",
  "PHY": "피지컬",
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
  "Actions": "추가",
  "Add to Evo Lab": "진화 연구에 추가",
  "Add to Compare": "비교에 추가",
  "Other Versions": "다른 버전",
  "Comments": "댓글",
  "Total IGS": "총 인게임스탯 (IGS)",
  "Total Face Stats": "총 페이스스탯",
  "Number of PlayStyles": "플레이스타일 개수",
  "Number of PlayStyles+": "플레이스타일+ 개수",
  "Number of Total PlayStyles": "총 플레이스타일(금/은특) 개수",
  "Player Filters": "선수 필터",
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
  "wall": "월",
  "glove": "글러브",
  "shield": "쉴드",
  "cat": "캣",
  "EA SPORTS FC 26 Objectives": "EA SPORTS FC 26 목표",
  "LIVE EVENTS": "라이브 이벤트",
  "CAMPAIGN": "캠페인",
  "CHALLENGERS": "챌린저스",
  "Completed": "완료됨",
  "Evo Unlock": "진화 잠금 해제",
  "Award": "보상",
  "SP": "SP",
  "of": "중",
  "Objective": "목표",
  "Complete": "완료",
  "challenges to earn": "챌린지를 완료하여 획득",
  "SBC": "SBC",
  "CHALLENGES": "챌린지",
  "EXPIRES": "만료까지",
  "REPEATABLE": "반복 가능 횟수",
  "REFRESHES EVERY": "새로고침 주기",
  "Refreshes Every": "새로고침 주기",
  "REFRESHES": "새로고침",
  "Refreshes": "새로고침",
  "EVERY": "주기",
  "Every": "주기",
  "View Rewards": "보상 보기",
  "View Solution": "솔루션 보기",
  "View": "보기",
  "Exchange a": "교환:",
  "Exchange an": "교환:",
  "Top Form": "최고의 폼",
  "Rewards": "보상",
  "Solution": "솔루션",
  "Mark as Completed": "완료로 표시하기",
  "All": "모두",
  "Season Points": "시즌 포인트",
  "Season Pass": "시즌 패스",
  "Weekly Rush Objectives": "주간 러시 목표",
  "Seasonal": "시즌",
  "Live": "라이브",
  "FC Pro": "FC 프로",
  "FC Coaching Masterclass": "FC 코칭 마스터클래스",
  "Milestones": "마일스톤",
  "Foundations": "기본",
  "UPGRADES": "업그레이드",
  "TOTAL CHEMISTRY:": "총 조직력",
  "EVOS": "내 진화선수",
  "Save": "저장",
  "Squad Title": "스쿼드 이름",
  "Reset": "초기화",
  "MANAGER": "감독",
  "FORMATION:": "포메이션",
  "Change Formation": "포메이션 변경",
  "Bench": "벤치",
  "Settings": "설정",
  "SHARE": "공유",
  "Select a Manager": "감독 선택",
  "Select a League": "리그 선택",
  "Select a Nation": "국가 선택",
  "TACTICS": "전술",
  "SQUAD TACTICS": "스쿼드 전술",
  "SQUAD TACTICS (2/4)": "스쿼드 전술 (2/4)",
  "GG CLUB": "GG 클럽",
  "GG Club": "GG 클럽",
  "Build Up Style": "빌드업 스타일",
  "Defensive Approach": "수비 접근",
  "Balanced": "밸런스",
  "Versatile": "다재다능",
  "Attack": "공격",
  "Counter": "역습",
  "Aggressive": "공격적",
  "Deep": "낮게",
  "High": "높게",
  "Roaming": "로밍",
  "Build-Up": "빌드업",
  "Wide": "넓게",
  "Ball-Winning": "볼 위닝",
  "Defend": "수비",
  "Support": "지원",
  "Manually Adjust Line": "수비 라인 수동 조정",
  "Select an item": "항목 선택",
  "ROLE (5)": "역할 (5)",
  "FOCUS": "집중",
  "STARTING": "시작 포메이션",
  "Wide Back": "와이드 백",
  "Hide Reward Evolutions": "보상 진화 숨기기",
  "Hide Evo Lab Excluded Evolutions": "진화 연구에서 제외된 진화 숨기기",
  "Hide Evo Lab Completed Evolutions": "진화 연구에서 완료된 진화 숨기기",
  "You have no players that match the requirements": "요구사항을 만족하는 선수가 없습니다.",
  "Evo Lab Mode": "진화 연구 모드",
  "Community Verdict": "커뮤니티 평가",
  "Must Do": "필수",
  "Solid Evo": "좋은 진화",
  "Worth Doing": "할만함",
  "Worth Considering": "고려해볼만함",
  "Weak Evo": "별로인 진화",
  "Skip": "건너뛰기",
  "Is Your Player Eligible?": "내 선수가 진화 가능한가요?",
  "Search for your player": "선수 검색",
  "Want to check eligibility for your already evolved players? Sync them now on": "이미 진화한 선수의 적격 여부를 확인하고 싶으신가요? 지금 동기화하세요:",
  "Completion Difficulty": "완료 난이도",
  "Number of Games": "필요 경기 수",
  "Recommended Position": "추천 포지션",
  "Number of Wins": "필요 승리 수",
  "Easy": "쉬움",
  "Medium": "보통",
  "Hard": "어려움",
  "Player Requirements": "선수 요구사항",
  "Details": "세부정보",
  "Submit by": "제출 기한",
  "Expiry": "만료",
  "Coins Cost": "코인 비용",
  "Points Cost": "포인트 비용",
  "Games": "경기",
  "Wins": "승리",
  "Clean Sheets": "무실점",
  "Online Required": "온라인 필수",
  "Analysis": "분석",
  "Stats Boost": "스탯 부스트",
  "Evolution Upgrades": "진화 업그레이드",
  "How do I unlock this?": "어떻게 잠금 해제하나요?",
  "No challenges": "챌린지 없음",
  "Show Expired": "만료된 진화 보기",
  "Hide Expired": "만료된 진화 가리기",
  "EXPIRED EVOLUTIONS": "만료된 진화",
  "Expired Evolutions": "만료된 진화",
  "EXCLUDED RARITY": "제외된 희귀도",
  "Excluded Rarity": "제외된 희귀도",
  "Show all": "모두 보기",
  "Show less": "접기",
  "Your Players": "내 선수",
  "You have no players that can be upgraded in this Evolution.": "이 진화로 업그레이드할 수 있는 선수가 없습니다.",
  "Go To Evo Lab": "진화 연구로 이동",
  "GG RATING": "GG 등급",
  "All Roles & Positions": "모든 역할 & 포지션",
  "Best Chemistry Styles": "최고의 케미스트리 스타일",
  "Ranked": "랭크",
  "Requirements": "요구사항",
  "Best Possible Path": "최적 진화 경로",
  "Select a Version...": "버전 선택...",
  "Filters": "필터",
  "View Upgrades": "업그레이드 보기",
  "Hide Upgrades": "업그레이드 숨기기",
  "Base Player": "기본 선수",
  "Level 1": "1단계",
  "Level 2": "2단계",
  "Level 3": "3단계",
  "Level 4": "4단계",
  "Level 5": "5단계",
  "Level 6": "6단계",
  "GENERATE": "생성하기",
  "INCLUDE REWARD EVOLUTIONS": "보상 진화 포함",
  "ELIGIBLE EVOLUTIONS": "진화 가능",
  "ACTIVE EVOLUTIONS": "활성 진화",
  "USED EVOLUTIONS": "사용한 진화",
  "ALL EVOLUTIONS": "모든 진화",
  "Search for an Evolution": "진화 검색",
  "YOUR ELIGIBLE PLAYERS": "진화 가능한 내 선수",
  "here": "여기",
  "Show Evolution Info": "진화 정보 보기",
  "Hide Evolution Info": "진화 정보 숨기기",
  "Show Evolution Information": "진화 정보 보기",
  "Hide Evolution Information": "진화 정보 숨기기",
  "Exclude from Player Upgrades": "선수 업그레이드에서 제외",
  "Other Evo Options": "다른 진화 옵션",
  "EXPIRES IN": "만료까지",
  "There are no evolutions available.": "사용 가능한 진화가 없습니다.",
  "WATCH PLAYER": "선수 보기",
  "VERSIONS": "버전",
  "Go to Evolution": "진화로 이동",
  "Exclude Your Evolutions": "내 진화 제외",
  "OFF": "끔",
  "ON": "켬",
  "Show Non-Upgraded Players": "업그레이드되지 않은 선수 보기",
  "Show Multiple Versions of Same Player": "동일 선수의 여러 버전 보기",
  "Clear All": "모두 지우기",
  "GGR": "GGR",
  "YOUR UPGRADES": "내 업그레이드",
  "NEW": "신규",
  "Custom Attributes": "커스텀 능력치",
  "OVR": "오버롤",
  "GK Reactions": "반응속도",
  "Dribbling (Att.)": "드리블 (공격)",
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
  "Full Evolution Path": "전체 진화 단계",
  "EXPIRED": "만료됨",
  "FREE": "무료",
  "TRAINING TIME": "훈련 기간",
  "For You": "맞춤 설정",
  "Exclude Your Used Evolutions": "내가 사용한 진화 제외",
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
  "Hide Base Players": "순정 선수 숨기기",
  "Hide Evolutions Players": "진화 선수 숨기기",
  "EVOLVE": "진화하기",
  "NUMBER OF UPGRADES": "업그레이드 개수",
  "NO UPGRADES": "업그레이드 없음",
  "Select a player to evolve": "진화할 선수 선택",
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
  "+ CREATE": "제작하기",
  "Select a rarity": "희귀도 선택",
  "Loading...": "로딩중...",
  "+ ADD FROM MY PLAYERS": "+ 내 선수중에서 추가하기",
  "+ ADD FROM EVOLVE": "+ 진화에서 추가하기",
  "Recently Viewed": "최근 본 선수",
  "EXTINCT": "매물없음",
  "Info": "정보",
  "Advanced Forward": "어드밴스 포워드",
  "False 9": "폴스 나인",
  "Poacher": "포처",
  "Target Forward": "타겟 포워드",
  "Inside Forward": "인사이드 포워드",
  "Wide Playmaker": "와이드 플레이메이커",
  "Winger": "윙어",
  "Classic 10": "클래식 10번",
  "Half-Winger": "하프 윙어",
  "Half Winger": "하프 윙어",
  "Playmaker": "플레이메이커",
  "Shadow Striker": "쉐도우 스트라이커",
  "Wide Midfielder": "와이드 미드필더",
  "Box-To-Box": "박스 투 박스",
  "Box to Box": "박스 투 박스",
  "Deep-Lying Playmaker": "딥라잉 플레이메이커",
  "Deep Lying Playmaker": "딥라잉 플레이메이커",
  "Holding": "홀딩",
  "Centre-Half": "센터 하프",
  "Centre Half": "센터 하프",
  "Wide Half": "와이드 하프",
  "Ball-Playing Defender": "볼플레잉 수비수",
  "Ball Playing Defender": "볼플레잉 수비수",
  "Ball Playing Keeper": "볼플레잉 키퍼",
  "Defender": "수비수",
  "Stopper": "스토퍼",
  "Attacking Wingback": "공격형 윙백",
  "Falseback": "폴스백",
  "Fullback": "풀백",
  "Wingback": "윙백",
  "Inverted Wingback": "인버티드 윙백",
  "Wideback": "와이드백",
  "Box Crasher": "박스 크래셔",
  "Goalkeeper": "골키퍼",
  "Sweeper Keeper": "스위퍼 키퍼",
  "Search everything...": "전체 검색...",
  "Search everything…": "전체 검색...",
  "Standard": "기본",
  "Pristine Holographic": "프리스틴 홀로그램",
  "Average": "평균",
  "Browse Evolutions": "진화 찾아보기",
  "TIER VOTE": "티어 투표",
  "Player Information": "선수 정보",
  "Player ID": "선수 ID",
  "Item ID": "아이템 ID",
  "Squad": "스쿼드",
  "Att. Pos.": "포지셔닝",
  "FK Acc.": "프리킥 정확도",
  "Def. Aware.": "수비 이해도",
  "Community Chemistry Styles": "커뮤니티 추천 케미스트리 스타일",
  "Select a chemistry style to vote": "투표할 케미스트리 스타일을 선택하세요",
  "+Shooting & Passing": "+슈팅 및 패스",
  "+1 Shooting & Passing": "+1 슈팅 및 패스",
  "+1 PS": "+1 플레이스타일",
  "+1 OVR": "+1 오버롤",
  "Fixtures": "경기 일정",
  "View Fixtures": "경기 일정 보기",
  "Add version": "버전 추가",
  "All time": "전체 기간",
  "Current price": "현재 가격",
  "Last known price": "최근 확인 가격",
  "Updated": "갱신",
  "PlayStyle Effect": "플레이스타일 효과",
  "PlayStyle+ Effect": "플레이스타일+ 효과",
  "Unique GK throw animations and increased GK throw max distance.": "고유한 골키퍼 스로우 애니메이션이 적용되며, 골키퍼의 최대 스로우 거리가 증가합니다.",
  "Unique GK throw animations and even greater increase in GK throw max distance.": "고유한 골키퍼 스로우 애니메이션이 적용되며, 골키퍼의 최대 스로우 거리가 더욱 증가합니다.",
  "See players with this PlayStyle": "이 플레이스타일을 가진 선수 보기",
  "See players with this PlayStyle+": "이 플레이스타일+를 가진 선수 보기",
  "Recommended paths": "추천 진화 경로",
  "Community leaderboard": "커뮤니티 순위표",
  "Sync your evolutions": "내 진화 동기화",
  "CLIMB THE RANKINGS": "순위 올리기",
  "SHOWCASE YOUR CLUB": "내 클럽 자랑하기",
  "TRACK EVERY EVO": "모든 진화 추적",
  "Player history": "선수 카드 이력",
  "About": "소개",
  "Editorial Policy": "편집 정책",
  "Terms of Service": "서비스 이용약관",
  "Tracker": "추적",
  "MOTM": "경기 최우수 선수",
  "Team of the Year": "올해의 팀",
  "Rare": "레어",
  "EA SPORTS FC PlayStyle and PlayStyle+": "EA SPORTS FC 플레이스타일 및 플레이스타일+",
  "Performs finesse shots faster with additional curve and improved accuracy.": "감아차기를 더 빠르게 수행하며, 공의 휘어짐과 정확도가 향상됩니다.",
  "Performs finesse shots significantly faster with maximum curve and exceptional accuracy.": "감아차기를 훨씬 더 빠르게 수행하며, 최대의 휘어짐과 뛰어난 정확도를 제공합니다.",
  "All rights reserved": "모든 권리 보유",
  "Privacy Policy": "개인정보 보호정책",
  "Terms & Conditions": "이용약관",
  "Business Inquiries": "비즈니스 문의",
  "Featured": "추천",
  "All Players": "모든 선수",
  "Best PlayStyles by Role": "역할별 추천 플레이스타일",
  "Hidden Gems": "숨은 보석",
  "SBCs": "SBC",
  "All SBCs": "모든 SBC",
  "Streamlined SBC Solver": "간편 SBC 솔버",
  "All Objectives": "모든 목표",
  "Objectives Tracker": "목표 추적",
  "Gauntlet Builder": "건틀릿 빌더",
  "Popular Tactics": "인기 전술",
  "Price Ranges": "가격 범위",
  "Leaderboards": "순위표",
  "Evo Leaderboards": "진화 순위표",
  "Campaigns": "캠페인",
  "Community Tools": "커뮤니티 도구",
  "S Tier Lists": "S 티어 목록",
  "Managers": "감독",
  "Chemistry Styles": "케미스트리 스타일",
  "Games Archive": "이전 게임",
  "Latest Squads": "최신 스쿼드",
  "All Campaign Squads": "모든 캠페인 스쿼드",
  "Connect your EA Account": "EA 계정 연결",
  "Official EA SPORTS FC™ community partner": "EA SPORTS FC™ 공식 커뮤니티 파트너",
  "Bring your whole club to FUT.GG, synced straight from EA SPORTS FC™.": "EA SPORTS FC™에서 내 클럽을 FUT.GG로 동기화하세요.",
  "Connect": "연결",
  "Countdowns": "남은 시간",
  "This week": "이번 주",
  "Quick Links": "바로가기",
  "What's In Packs": "현재 팩 구성",
  "What's New": "새로운 소식",
  "What's Hot": "인기 소식",
  "Latest News": "최신 뉴스",
  "Evos": "진화",
  "Previous": "이전",
  "Past Games": "이전 게임",
  "Best Players": "추천 선수",
  "Expiring Soon Evolutions": "곧 만료되는 진화",
  "Cosmetics": "외형",
  "PlayStyles Lab": "플레이스타일 연구소",
  "Best Evolutions": "추천 진화",
  "EA FC 27 Players": "EA FC 27 선수",
  "EA FC 27 Players, Prices, and Squad Builder": "EA FC 27 선수, 가격 및 스쿼드 빌더",
  "EA SPORTS FC 27 Evolutions": "EA SPORTS FC 27 진화",
  "EA SPORTS FC 27 Objectives": "EA SPORTS FC 27 목표",
  "A player who tends to perform acrobatic passes, clearances, and shots.": "아크로바틱한 패스, 걷어내기, 슈팅을 자주 시도하는 선수입니다.",
  "Performs volleys with improved accuracy and has access to acrobatic volley animations.": "발리슛의 정확도가 향상되며 아크로바틱 발리 애니메이션을 사용할 수 있습니다.",
  "A defensive player who is known for dominating aerial battles in defensive situations.": "수비 상황의 공중볼 경합을 지배하는 수비수입니다.",
  "Performs higher jumps and has improved defensive aerial presence.": "더 높이 점프하며 수비 시 공중볼 장악력이 향상됩니다.",
  "Performs even higher jumps and has greatly improved defensive aerial presence.": "훨씬 더 높이 점프하며 수비 시 공중볼 장악력이 크게 향상됩니다.",
  "A player who is known for performing elastic and overreaching blocks.": "몸을 유연하게 뻗어 넓은 범위의 슈팅을 막아내는 선수입니다.",
  "Increased reach when performing blocks and improved ability to make a successful block.": "블로킹 범위가 넓어지고 블로킹 성공 능력이 향상됩니다.",
  "Even greater reach when performing blocks and improved ability to make a successful block.": "블로킹 범위가 더욱 넓어지고 블로킹 성공 능력이 향상됩니다.",
  "A player who is known for winning possession by physical imposition.": "몸싸움으로 공의 소유권을 가져오는 데 뛰어난 선수입니다.",
  "Greater strength when performing physical tackles.": "몸싸움 태클을 할 때 힘이 증가합니다.",
  "Even greater strength when performing physical tackles.": "몸싸움 태클을 할 때 힘이 더욱 증가합니다.",
  "A player who is known to often try to chip the goalkeeper when shooting at goal.": "슈팅 시 골키퍼를 넘기는 칩슛을 자주 시도하는 선수입니다.",
  "Performs chip shots faster and with greater accuracy.": "칩슛을 더 빠르고 정확하게 구사합니다.",
  "Performs chip shots more quickly with exceptional accuracy.": "칩슛을 더욱 빠르고 매우 정확하게 구사합니다.",
  "Unique punching animations and even greater increases in ball out speed and hand strength.": "고유한 펀칭 애니메이션이 적용되고 펀칭 후 공의 속도와 손의 힘이 더욱 증가합니다.",
  "A player who is known for being a specialist at taking set pieces.": "세트피스 처리에 뛰어난 선수입니다.",
  "A goalkeeper who is known for having great deflection control to safer spaces.": "공을 안전한 공간으로 쳐내는 능력이 뛰어난 골키퍼입니다.",
  "Unique animations when deflecting the ball. Increased power to parry shots into safer areas.": "공을 쳐낼 때 고유한 애니메이션이 적용되며, 슈팅을 안전한 지역으로 쳐내는 힘이 증가합니다.",
  "Unique animations when deflecting the ball. Maximum power to parry shots into safer areas.": "공을 쳐낼 때 고유한 애니메이션이 적용되며, 슈팅을 안전한 지역으로 쳐내는 힘이 최대치로 증가합니다.",
  "Greater strength when performing shield dribbles.": "공을 보호하는 드리블을 할 때 힘이 증가합니다.",
  "Unique long diving distance jump animations and increased chances of saving long distance shots.": "멀리 다이빙하는 고유한 점프 애니메이션이 적용되며 먼 거리의 슈팅을 막을 확률이 높아집니다.",
  "A goalkeeper who is known for starting counter attacks with long throws.": "긴 스로우로 역습을 시작하는 골키퍼입니다.",
  "A player who is known to try and place the ball when shooting at goal.": "골문을 향해 공을 정교하게 배치하는 슈팅을 자주 시도하는 선수입니다.",
  "A player who is known for accurate first touch control in difficult situations.": "어려운 상황에서도 정확한 첫 터치로 공을 제어하는 선수입니다.",
  "A goalkeeper who is known for using their feet to make difficult saves.": "발을 활용해 어려운 슈팅을 막아내는 골키퍼입니다.",
  "Exclusive foot save animations and increased performance against low trajectory shots.": "고유한 발 선방 애니메이션이 적용되며 낮은 궤적의 슈팅에 대한 선방 능력이 향상됩니다.",
  "Exclusive foot save animations and even better performance against low trajectory shots.": "고유한 발 선방 애니메이션이 적용되며 낮은 궤적의 슈팅에 대한 선방 능력이 더욱 향상됩니다.",
  "A player who is known for making defense-splitting passes for a teammate to run onto.": "수비를 가르는 패스로 동료의 침투를 돕는 선수입니다.",
  "A player who is known for performing interceptions and keeping ball possession.": "패스를 가로챈 뒤 공의 소유권을 유지하는 선수입니다.",
  "A player who is known for being successful in 1v1 situations.": "일대일 상황에서 상대를 제압하는 데 뛰어난 선수입니다.",
  "Increased max speed of Sprint Jockey and improved transition speed from jockey to sprint.": "스프린트 견제의 최고 속도가 증가하고 견제에서 스프린트로 전환하는 속도가 향상됩니다.",
  "Increased max speed of Sprint Jockey and greatly improves transition speed from jockey to sprint.": "스프린트 견제의 최고 속도가 증가하고 견제에서 스프린트로 전환하는 속도가 크게 향상됩니다.",
  "A player who is known for performing lobbed long passes to teammates.": "동료에게 로빙 롱패스를 보내는 데 뛰어난 선수입니다.",
  "A player who is known to throw the ball further than the average player.": "다른 선수보다 더 멀리 스로인하는 선수입니다.",
  "Performs throw-ins with increased power to cover a greater distance.": "스로인의 힘이 증가하여 더 먼 거리로 공을 던질 수 있습니다.",
  "Performs throw-ins with more power to cover maximum distance.": "스로인의 힘이 더욱 증가하여 최대 거리로 공을 던질 수 있습니다.",
  "A player who can execute precise shots with increased shot accuracy.": "높은 정확도로 정교한 슈팅을 구사하는 선수입니다.",
  "A player who is known for making high speed ground passes.": "빠른 땅볼 패스를 구사하는 선수입니다.",
  "Passes travel faster along the ground without impacting the trapping difficulty of the receiver.": "받는 선수의 트래핑 난도를 높이지 않으면서 땅볼 패스가 더 빠르게 전달됩니다.",
  "A player who is known for taking powerful shots from outside the box.": "페널티 박스 밖에서 강력한 슈팅을 시도하는 선수입니다.",
  "Performs power shots faster and with increased speed.": "파워슛 동작과 공의 속도가 빨라집니다.",
  "Performs power shots much faster and with a significant increase in speed.": "파워슛 동작이 훨씬 빨라지고 공의 속도가 크게 증가합니다.",
  "Performs headers with increased accuracy and has access to Precision Header animations.": "헤더 정확도가 높아지며 정밀 헤더 애니메이션을 사용할 수 있습니다.",
  "Performs headers with even greater accuracy and has access to unique Precision Header animations.": "헤더 정확도가 더욱 높아지며 고유한 정밀 헤더 애니메이션을 사용할 수 있습니다.",
  "A player who is known for keeping ball possession under physical pressure from the opponent.": "상대의 신체적 압박을 받으면서도 공을 지키는 선수입니다.",
  "Accelerates faster during Explosive Sprint.": "폭발적인 스프린트를 할 때 더 빠르게 가속합니다.",
  "Accelerates significantly faster during Explosive Sprint.": "폭발적인 스프린트를 할 때 훨씬 빠르게 가속합니다.",
  "A player who is known for often performing slide tackles.": "슬라이딩 태클을 자주 구사하는 선수입니다.",
  "Grants the ability to stop the ball directly at their feet when performing a slide tackle.": "슬라이딩 태클을 할 때 공을 발밑에 바로 멈출 수 있습니다.",
  "A player who is known for making first-time accurate and short passes.": "정확한 원터치 짧은 패스를 구사하는 선수입니다.",
  "A player who is known for being able to perform skill moves in 1v1 situations.": "일대일 상황에서 개인기를 구사하는 데 뛰어난 선수입니다.",
  "Grants the ability to perform unique flick Skill Moves.": "고유한 플릭 개인기를 사용할 수 있습니다.",
  "A player who is known for making high-speed whipped crosses into the box.": "빠르고 휘어지는 크로스를 박스 안으로 보내는 선수입니다.",
  "All crosses are highly accurate, travel faster and with more curve.": "모든 크로스가 매우 정확해지고 더 빠르고 크게 휘어집니다.",
  "A traditional attacking midfielder, through whom most creative and attacking play will go\nthrough.": "창의적인 플레이와 공격 전개가 주로 거쳐 가는 전통적인 공격형 미드필더입니다.",
  "When set to Attack, the Half Winger can advance freely, sacrificing defensive responsibilities.": "공격으로 설정하면 하프 윙어가 수비 책임을 줄이고 자유롭게 전진합니다.",
  "A central defender who opens wide to cover for the fullbacks. Usually deployed on 3-back formations.": "풀백을 지원하기 위해 측면으로 벌리는 중앙 수비수입니다. 주로 3백 전술에 배치합니다.",
  "With a Balanced focus, the Stopper will intercept passes and pressure attackers receiving the ball.": "밸런스로 설정하면 스토퍼가 패스를 가로채고 공을 받는 공격수를 압박합니다.",
  "When asked to Defend, the Defender will focus only on their defensive responsibilities.": "수비로 설정하면 수비수가 수비 임무에만 집중합니다.",
  "With a Balanced focus, the Defender will step up to close down attackers when needed.": "밸런스로 설정하면 수비수가 필요할 때 전진하여 공격수에게 접근합니다.",
  "A defensive midfielder charged with marking and covering the sides of the pitch when needed.": "필요할 때 측면을 마크하고 커버하는 수비형 미드필더입니다.",
  "When set to Defend, the Centre Half will focus on their defensive duties.": "수비로 설정하면 센터 하프가 수비 임무에 집중합니다.",
  "A risk-taking goalkeeper who focuses on stopping attacks outside their box.": "박스 밖으로 전진하는 위험을 감수하며 공격을 저지하는 골키퍼입니다.",
  "A traditional goalkeeper who stays on their line and focuses on shot-stopping.": "골라인에 머무르며 슈팅 선방에 집중하는 전통적인 골키퍼입니다.",
  "With a Defend focus, the Goalkeeper won't rush out to collect long or loose balls.": "수비로 설정하면 골키퍼가 긴 공이나 루스볼을 잡으러 급하게 전진하지 않습니다.",
  "A Build-Up focus encourages the Ball-Playing Keeper to push higher up the pitch to support play.": "빌드업으로 설정하면 볼플레잉 키퍼가 더 높은 위치로 전진하여 플레이를 지원합니다.",
  "With an Attack focus, the Wide Playmaker will move forward, and receive passes out wide.": "공격으로 설정하면 와이드 플레이메이커가 전진하여 측면에서 패스를 받습니다.",
  "With an Attack focus, the wide Playmaker will move forward, and receive passes out wide.": "공격으로 설정하면 와이드 플레이메이커가 전진하여 측면에서 패스를 받습니다.",
  "FUT Gallery": "FUT 갤러리",
  "Holographic Cards": "홀로그램 카드",
  "FUT Grid": "FUT 그리드",
  "Token Store": "토큰 상점",
  "Tier Lists": "티어 목록",
  "Tier List": "티어 목록",
  "Type": "유형",
  "Pathway, pick one option per level": "분기형: 단계마다 하나 선택",
  "Token Cost": "토큰 비용",
  "Boost": "강화",
  "Level": "단계",
  "Upgrade paths": "업그레이드 경로",
  "Pick one": "하나 선택",
  "Option": "선택지",
  "Recommended": "추천",
  "with EA Account": "EA 계정으로",
  "Play": "플레이",
  "FC 27 Hall of FUT": "FC 27 FUT 명예의 전당",
  "FC 27 FUT Gallery": "FC 27 FUT 갤러리",
  "Promo": "프로모션",
  "Guides": "가이드",
  "Coming Soon": "공개 예정",
  "Mastery": "마스터리",
  "Pick objectives": "목표 선택",
  "We build your squad from GG Club": "GG 클럽 선수로 스쿼드 구성",
  "Track every game": "모든 경기 추적",
  "Open Objectives Tracker": "목표 추적 열기",
  "total": "합계",
  "Badge": "배지",
  "Grading Score": "평가 점수",
  "no votes yet": "아직 투표가 없습니다",
  "Chemistry Boost": "조직력 보너스",
  "Full individual chemistry": "개인 조직력 최대",
  "+1 chem to every league in the squad": "스쿼드 내 모든 리그에 조직력 +1",
  "Chemistry Style": "케미스트리 스타일",
  "No price history available.": "가격 이력이 없습니다.",
  "No sales data available.": "판매 데이터가 없습니다.",
  "No live auctions.": "진행 중인 경매가 없습니다.",
  "Hover or tap a PlayStyle to see what it does.": "플레이스타일에 마우스를 올리거나 눌러 효과를 확인하세요.",
  "EA SPORTS FC 27 SBC": "EA SPORTS FC 27 SBC",
  "EA FC 27 Chemistry Styles": "EA FC 27 케미스트리 스타일",
  "Outfield chemistry styles": "필드 선수 케미스트리 스타일",
  "Goalkeeper chemistry styles": "골키퍼 케미스트리 스타일",
  "Style": "스타일",
  "Best positions": "추천 포지션",
  "Stat boosts": "능력치 증가",
  "no change": "변화 없음",
  "(Default)": "(기본)",
  "GK Basic": "골키퍼 기본",
  "Best chemistry style for each role": "역할별 추천 케미스트리 스타일",
  "How chemistry styles work": "케미스트리 스타일 적용 방식",
  "Prices and best roles": "가격 및 추천 역할",
  "EA Sports FC 27 PlayStyles": "EA SPORTS FC 27 플레이스타일",
  "Best by Role": "역할별 추천",
  "See every PlayStyle nerf and buff in FC 27": "FC 27 플레이스타일 상향·하향 전체 보기",
  "EA FC 27 Roles": "EA FC 27 역할",
  "Learn more about each Role and Focus below.": "아래에서 각 역할과 집중 설정을 자세히 확인하세요.",
  "Solve": "해결하기",
  "Cheapest": "최저가",
  "Cost": "비용",
  "Total cards": "총 카드 수",
  "Rating combination": "등급 조합",
  "cards": "카드",
  "1v1 Close Down": "일대일 압박",
  "Best players by position": "포지션별 추천 선수",
  "Gauntlet squad builder": "건틀릿 스쿼드 빌더",
  "Tactics and formations": "전술 및 포메이션",
  "Cheapest players by rating": "등급별 최저가 선수",
  "SBC solutions": "SBC 솔루션",
  "Player tier list": "선수 티어 목록",
  "Squad Builder FAQ": "스쿼드 빌더 자주 묻는 질문",
  "What is the FUT.GG Squad Builder?": "FUT.GG 스쿼드 빌더란?",
  "Does it calculate chemistry automatically?": "조직력을 자동으로 계산하나요?",
  "Can I use it as a formation and tactics builder?": "포메이션과 전술을 구성할 수 있나요?",
  "Is this only for Ultimate Team, or any football lineup?": "얼티밋 팀 전용인가요, 일반 축구 라인업도 만들 수 있나요?",
  "How do I share a squad I have built?": "만든 스쿼드는 어떻게 공유하나요?",
  "Is the squad builder free?": "스쿼드 빌더는 무료인가요?",
  "Can I build squads for other FC and FIFA games?": "다른 FC와 FIFA 게임의 스쿼드도 만들 수 있나요?",
  "Build and test": "구성 및 테스트",
  "formations, roles and tactics": "포메이션, 역할 및 전술",
  "Useful while you build": "스쿼드 구성에 유용한 도구",
  "tactics hub": "전술 허브",
  "Transfer Market Access": "이적 시장 접근 권한",
  "Gallery Excellence": "갤러리의 달인",
  "Coin Boost": "코인 부스트",
  "Stadium Trophy": "경기장 트로피",
  "Learn about": "알아보기",
  "Changes in FC 27": "FC 27 변경 사항",
  "PlayStyle Rankings": "플레이스타일 순위",
  "PlayStyle+ Players": "플레이스타일+ 선수",
  "PlayStyle Players": "플레이스타일 선수",
  "PlayStyle ranking by role": "역할별 플레이스타일 순위",
  "Related PlayStyles": "관련 플레이스타일",
  "Stormstrike Inc. All rights reserved.": "Stormstrike Inc. 모든 권리 보유.",
  "Compare the top-rated cards at every position.": "각 포지션에서 가장 높은 등급의 카드를 비교하세요.",
  "A separate squad for every round of the current Gauntlet.": "현재 건틀릿의 각 라운드에 맞는 별도 스쿼드를 구성하세요.",
  "Popular custom tactics, roles and EA tactic codes.": "인기 사용자 전술, 역할과 EA 전술 코드를 확인하세요.",
  "Which playstyles matter for each role you set.": "설정한 역할에 중요한 플레이스타일을 확인하세요.",
  "Fodder and budget links for tight squads.": "제한된 예산에 맞는 재료 선수와 저렴한 연계 선수를 찾아보세요.",
  "Cheap solutions for every live challenge.": "진행 중인 모든 챌린지의 저렴한 솔루션을 확인하세요.",
  "Upgrade a card before you slot it into the eleven.": "선발 명단에 넣기 전에 카드를 업그레이드하세요.",
  "Meta ratings for every card in the game.": "게임 내 모든 카드의 메타 평가를 확인하세요.",
  "Gold": "골드",
  "Silver": "실버",
  "Bronze": "브론즈",
  "Base Hero": "기본 영웅",
  "TOTW": "이 주의 팀",
  "Gallery": "갤러리",
  "Premier League Gold": "프리미어 리그 골드",
  "Draft": "드래프트",
  "Co-Op": "협동",
  "Moments Stars": "모먼트 별",
  "Squad Building": "스쿼드 구성",
  "Transfer Market": "이적 시장",
  "Goals and Assist": "득점 및 도움",
  "First Owned": "최초 소유",
  "Jumbo Gold Pack": "점보 골드 팩",
  "Large Gold Pack": "대형 골드 팩",
  "Large Gold Players Pack": "대형 골드 선수 팩",
  "Giant Gold Pack": "초대형 골드 팩",
  "Mixed Players Pack": "혼합 선수 팩",
  "Small Gold Players Pack": "소형 골드 선수 팩",
  "Large Electrum Players Pack": "대형 일렉트럼 선수 팩",
  "Squad Foundations": "스쿼드 파운데이션",
  "Squad Foundations Player": "스쿼드 파운데이션 선수",
  "Base Hero Player": "기본 영웅 선수",
  "tokens)": "토큰)",
  "Token Store (": "토큰 상점 (",
  ", recommended": ", 추천",
  "for the": "선택한",
  "route": "경로",
  "for": "대상",
  "Gold Player": "골드 선수",
  "All the PlayStyles in the": "플레이스타일 분류:",
  "Other PlayStyles in the": "관련 플레이스타일 분류:",
  "category.": "분류의 플레이스타일입니다.",
  "Where": "순위:",
  "ranks against every other PlayStyle for each role, based on the": "의 역할별 플레이스타일 순위입니다. 기준:",
  "role weightings. Gold means it makes the role's recommended PlayStyle+ build.": "역할별 가중치. 금색은 해당 역할의 추천 플레이스타일+ 조합에 포함됨을 뜻합니다.",
  "In": "게임:",
  "an EA SPORTS FC 27": "EA SPORTS FC 27의",
  "If you're starting from scratch, the": "처음 구성한다면",
  "has the formations and roles the community and pro players actually run, and": "에서 커뮤니티와 프로 선수가 사용하는 포메이션·역할을 확인하고,",
  "shows which playstyles are worth paying for in each slot.": "에서 포지션별로 투자할 만한 플레이스타일을 확인하세요.",
  "Team builder for": "스쿼드 빌더 지원 게임:",
  "and other games": "및 기타 게임",
  "The team builder is not limited to one season. Alongside": "스쿼드 빌더는 한 시즌에 한정되지 않습니다.",
  " , you can build squads for": ", 추가로 지원하는 게임:",
  ", you can build squads for": ", 추가로 지원하는 게임:",
  ", each with its own player database.": "에는 각 게임의 별도 선수 데이터베이스가 적용됩니다.",
  "The role rankings come from the GG Rating. We score every": "역할 순위는 GG 등급을 기준으로 합니다. 대상 게임:",
  "player rated": "선수 등급 기준:",
  "Who has it?": "보유 선수",
  "Best Roles for": "추천 역할:",
  "Players with": "보유 선수:",
  "+ Players": "+ 보유 선수",
  "Other": "다른",
  "Ball Playing": "볼플레잉",
  "is changing in FC 27": "FC 27에서 변경됩니다",
  "See the best": "추천 선수 보기:",
  "players in": "선수 / 게임:",
  "Best": "추천",
  "Focus Options": "집중 설정",
  "Characteristics": "특징",
  "Creative": "창의성",
  "Movement": "움직임",
  "Out of Position": "위치 이탈",
  "Supports the Defence": "수비 지원",
  "Position Heatmap": "포지션 히트맵",
  "Build-Up Support": "빌드업 지원",
  "Supports Attacks": "공격 지원",
  "Pass Option": "패스 선택지",
  "Stamina Usage": "스태미나 소모",
  "Limited Versatility": "제한된 다재다능함",
  "Lacks Mobility": "부족한 기동성",
  "Wide Support": "측면 지원",
  "Dynamic Width": "유동적인 폭",
  "Attacking": "공격 가담",
  "Defence Support": "수비 지원",
  "Defense Support": "수비 지원",
  "Dynamic Side": "유동적인 측면",
  "Attacking Runs": "공격 침투",
  "Support Centrally": "중앙 지원",
  "Supports Centrally": "중앙 지원",
  "Cover Side": "측면 커버",
  "Stays Back": "후방 대기",
  "Aggressiveness": "적극성",
  "Leaves Gaps": "빈틈 발생",
  "Leave Gaps": "빈틈 발생",
  "Pressure": "압박",
  "Limited Width": "제한된 폭",
  "Intercepts Passes": "패스 가로채기",
  "Supports Play": "플레이 지원",
  "Attack Support": "공격 지원",
  "Some Risk": "일부 위험 부담",
  "Stay in Position": "위치 유지",
  "Low Risk": "낮은 위험 부담",
  "Supports Attack": "공격 지원",
  "Defence Option": "수비 선택지",
  "Cut Inside": "안쪽으로 침투",
  "DIV": "다이빙",
  "HAN": "핸들링",
  "KIC": "킥",
  "REF": "반사신경",
  "SPD": "스피드",
  "POS": "위치 선정",
  "Icons": "아이콘",
  "Believe": "믿음",
  "EA FC 27 Cheapest Players by Rating": "EA FC 27 등급별 최저가 선수",
  "Rating Combinations": "등급 조합",
  "Rated Players": "등급 선수",
  "EA SPORTS FC 27 Compare": "EA SPORTS FC 27 선수 비교",
  "EA FC 27 Momentum Trends": "EA FC 27 가격 변동 추세",
  "EA SPORTS FC 27 Momentum Trends": "EA SPORTS FC 27 가격 변동 추세",
  "Only Special Cards": "특별 카드만",
  "EA FC 27 Tactics & Formations": "EA FC 27 전술 및 포메이션",
  "Build your own tactic": "내 전술 만들기",
  "Tactics Codes": "전술 코드",
  "Most Used Players": "가장 많이 쓰는 선수",
  "Most used by pros": "프로 선수 인기 포메이션",
  "build-up ·": "빌드업 ·",
  "line": "수비 라인",
  "of pros": "프로 선수 사용 비율",
  "View tactics →": "전술 보기 →",
  "All formations": "모든 포메이션",
  "Rank by": "정렬 기준",
  "Community": "커뮤니티",
  "Pros": "프로 선수",
  "of community squads": "커뮤니티 스쿼드 사용 비율",
  "Most popular roles": "인기 역할",
  "EA FC 27 Price Ranges": "EA FC 27 가격 범위",
  "Extinct before update": "갱신 전 매물 없음",
  "Console": "콘솔",
  "Refresh": "새로고침",
  "Old": "이전",
  "Listed before": "갱신 전 매물 있음",
  "Extinct before": "갱신 전 매물 없음",
  "Older results": "이전 결과",
  "EA SPORTS FC 27 Live Events": "EA SPORTS FC 27 라이브 이벤트",
  "Squad Requirements": "스쿼드 요구사항",
  "No requirements": "요구사항 없음",
  "Unlimited attempts": "참가 횟수 제한 없음",
  "Starts": "시작",
  "Ends": "종료",
  "In game since": "게임 내 공개일",
  "Match": "경기",
  "Offline": "오프라인",
  "Online": "온라인",
  "Solo": "솔로",
  "Solo & Co-op": "솔로 및 협동",
  "Opponent": "상대",
  "Half length": "하프 시간",
  "Attempts": "참가 횟수",
  "Unlimited": "제한 없음",
  "Attempts reset": "참가 횟수 초기화",
  "Rounds": "라운드 수",
  "Difficulty": "난이도",
  "Professional": "프로페셔널",
  "World Class": "월드클래스",
  "Legendary": "전설",
  "Chemistry": "조직력",
  "Team rating": "팀 등급",
  "Coins": "코인",
  "Consumables Pack": "소모품 팩",
  "Player items can only be used in one round": "선수 아이템은 한 라운드에서만 사용 가능",
  "No UEFA Champions League Common or Rare players": "UEFA 챔피언스 리그 일반·레어 선수 사용 불가",
  "Build squad": "스쿼드 구성",
  "Build your Gauntlet squads": "건틀릿 스쿼드 구성",
  "Rewards not released yet": "보상 미공개",
  "EA have not published the rewards for this event yet.": "EA가 아직 이 이벤트의 보상을 공개하지 않았습니다.",
  "Counts towards": "연계 목표",
  "Quickest": "최소 카드",
  "card": "카드",
  "Who would you pick?": "누구를 선택하시겠어요?",
  "Vote": "투표",
  "Small Gold Pack": "소형 골드 팩",
  "Small Electrum Players Pack": "소형 일렉트럼 선수 팩",
  "Gold Pack": "골드 팩",
  "Cheapest cost by item score": "아이템 점수별 최저 비용",
  "Item score": "아이템 점수",
  "Cheapest cost": "최저 비용",
  "Calculate score left": "남은 점수 계산",
  "Score left": "남은 점수",
  "Item score still needed": "추가로 필요한 아이템 점수",
  "Max players": "최대 선수 수",
  "Most players to hand in": "최대 제출 선수 수",
  "Lowest rating": "최소 등급",
  "Highest rating": "최대 등급",
  "Any rarity": "모든 희귀도",
  "Any position": "모든 포지션",
  "Any nation": "모든 국가",
  "Any league": "모든 리그",
  "Any club": "모든 클럽",
  "Loading prices": "가격 불러오는 중",
  "Streamlined SBC FAQ": "간편 SBC 자주 묻는 질문",
  "Classic Match": "클래식 경기",
  "Event Series": "이벤트 시리즈",
  "Event": "이벤트",
  "Gauntlet": "건틀릿",
  "Tournament": "토너먼트",
  "Long Range": "중거리 슛",
  "Max Chemistry": "최대 조직력",
  "Precision Shooting": "정밀 슈팅",
  "Casual": "캐주얼",
  "Co-op": "협동",
  "No Rules": "규칙 없음",
  "First to 3": "3골 선승제",
  "Player items": "선수 아이템",
  "Entry Requirements": "참가 요구사항",
  "Entry requirements": "참가 요구사항",
  "Progress": "진행도",
  "Untradeable": "거래 불가",
  "Tradeable": "거래 가능",
  "Objective Rewards": "목표 보상",
  "Group Reward": "그룹 보상",
  "Completion Reward": "완료 보상",
  "Earned Rewards": "획득한 보상",
  "Daily limit": "일일 제한",
  "Attempt limit": "참가 횟수 제한",
  "Total score": "총점",
  "Score so far": "현재까지의 점수",
  "Attacking Positioning": "공격 위치 선정",
  "Free Kick Accuracy": "프리킥 정확도",
  "Def. Awareness": "수비 이해도",
  "Heading": "헤더",
  "Defence": "수비",
  "Midfield": "미드필드",
  "Evolutions Count": "진화 횟수",
  "Special": "특별",
  "Number of Positions": "포지션 수",
  "Roles Count": "역할 수",
  "Roles Plus Plus Count": "역할++ 수",
  "SBC Players Only": "SBC 선수만",
  "Objective Players Only": "목표 선수만",
  "Season Pass Players Only": "시즌 패스 선수만",
  "Active SBC Players Only": "진행 중인 SBC 선수만",
  "Active Objective Players Only": "진행 중인 목표 선수만",
  "Active Season Pass Only": "현재 시즌 패스만",
  "One Per Base Player": "동일 기본 선수당 한 명",
  "Holographics": "홀로그램",
  "Hide": "숨기기",
  "Show": "표시",
  "Only": "선택 항목만",
  "Holographic Type": "홀로그램 유형",
  "Regular": "일반",
  "Pristine": "프리스틴",
  "Date of Birth": "생년월일",
  "Date Added": "추가 날짜",
  "PlayStyles Count": "플레이스타일 수",
  "PlayStyles Plus Count": "플레이스타일+ 수",
  "Player Type": "선수 유형",
  "Evolution": "진화",
  "Loan": "임대",
  "First Owner": "최초 소유",
  "Purchased": "구매한 선수",
  "Not In Any Squad": "스쿼드에 포함되지 않음",
  "Transfer List": "이적 목록",
  "GGR Increase": "GG 등급 증가량",
  "Created At": "생성 날짜",
  "Date obtained": "획득 날짜",
  "Number of All Playstyles": "전체 플레이스타일 수",
  "OVR / Item Score / Price": "오버롤 / 아이템 점수 / 가격",
  "GGR Roles": "역할별 GG 등급",
  "Face Stats": "대표 능력치",
  "Misc": "기타",
  "GGR Positions": "포지션별 GG 등급",
  "Positions Search Mode": "포지션 검색 방식",
  "Playstyles Search Mode": "플레이스타일 검색 방식",
  "Has All Selected Playstyles": "선택한 모든 플레이스타일 포함",
  "Only Market Players": "이적 시장 선수만",
  "Only Challenge Players": "챌린지 선수만",
  "Bodytype": "체형",
  "Custom": "사용자 지정",
  "Evolution Toggle": "진화 표시 설정",
  "Best Chem Role": "최고의 케미스트리 역할",
  "Men": "남자",
  "Women": "여자",
  "Gallery order": "갤러리 순서",
  "Name: A to Z": "이름: 알파벳순",
  "Fewest items": "아이템 수 적은 순",
  "Lowest S score": "S 등급 필요 점수 낮은 순",
  "Score": "점수",
  "Search for a player...": "선수 검색...",
  "Search players, SBCs, evolutions, clubs…": "선수, SBC, 진화, 클럽 검색...",
  "Player details": "선수 상세",
  "Search for a sort...": "정렬 기준 검색...",
  "Search for anything...": "전체 검색...",
  "Name this filter set": "필터 세트 이름",
  "Search saved filters...": "저장된 필터 검색...",
  "Extinct only": "매물 없는 선수만",
  "Hide extinct": "매물 없는 선수 숨기기",
  "Saved Filters": "저장된 필터",
  "Save current filters": "현재 필터 저장",
  "No saved filters yet. Set some filters and save them above.": "저장된 필터가 없습니다. 필터를 설정한 뒤 저장하세요.",
  "Min": "최소",
  "Max": "최대",
  "Exact": "정확히 일치",
  "Matches": "경기",
  "Goals": "득점",
  "Assists": "도움",
  "Mode": "모드",
  "Any": "전체",
  "Left Foot": "왼발",
  "Right Foot": "오른발",
  "Young Players": "어린 선수",
  "Oldest": "나이 많은 순",
  "Fastest": "빠른 순",
  "Strongest": "피지컬 높은 순",
  "5★ Skills": "개인기 5성",
  "Remove": "제거",
  "Remove all": "모두 제거",
  "Loading…": "불러오는 중...",
  "Loading PlayStyle...": "플레이스타일 불러오는 중...",
  "Loading Role...": "역할 불러오는 중...",
  "No players match your search query.": "검색 조건에 맞는 선수가 없습니다.",
  "No recently viewed players.": "최근 본 선수가 없습니다.",
  "Search for a player to add.": "추가할 선수를 검색하세요.",
  "No results": "결과 없음",
  "Select All on Page": "현재 페이지 모두 선택",
  "Exclude": "제외",
  "Search FUT.GG": "FUT.GG 검색",
  "Search players, SBCs, evolutions, clubs, leagues and more": "선수, SBC, 진화, 클럽, 리그 등을 검색하세요",
  "Show expired SBCs, objectives & evos": "만료된 SBC·목표·진화 표시",
  "Clear": "지우기",
  "No combinations match your filters": "필터에 맞는 조합이 없습니다",
  "Loading more...": "추가로 불러오는 중...",
  "No players found.": "선수를 찾을 수 없습니다.",
  "Hide loans": "임대 선수 숨기기",
  "No sorts found": "정렬 기준을 찾을 수 없습니다",
  "Show more results...": "결과 더 보기...",
  "Load more": "더 불러오기",
  "Include loan cards": "임대 카드 포함",
  "Keep current chem styles": "현재 케미스트리 스타일 유지",
  "Search clubs": "클럽 검색",
  "Quarter Finals": "8강",
  "Semi Finals": "준결승",
  "Final": "결승",
  "Only Show Fixtures With Trackers": "추적 가능한 경기만 표시",
  "Upcoming": "예정",
  "Finished": "종료",
  "Wingers": "윙어",
  "Log in to see which of your players are eligible for this evolution.": "로그인하면 이 진화에 사용할 수 있는 내 선수를 확인할 수 있습니다.",
  "to see which of your players are eligible for this evolution.": "하면 이 진화에 사용할 수 있는 내 선수를 확인할 수 있습니다.",
  "If you wish to have your settings saved for next time, please sign in.": "다음에도 설정을 사용하려면 로그인하세요.",
  "Build and simulate Evolution paths for any player right now. Log in to save them to My Players and track your available upgrades.": "원하는 선수의 진화 경로를 만들고 미리 확인하세요. 로그인하면 내 선수에 저장하고 가능한 강화를 확인할 수 있습니다.",
  "Tap once to add a PlayStyle, tap again to upgrade to PlayStyle+, tap a third time to remove.": "한 번 누르면 플레이스타일 추가, 다시 누르면 플레이스타일+로 강화, 세 번째 누르면 제거됩니다.",
  "Press Evolve to generate evolution paths matching your filters.": "진화를 눌러 필터에 맞는 진화 경로를 생성하세요.",
  "No results found": "검색 결과가 없습니다",
  "Search players…": "선수 검색...",
  "Search your players…": "내 선수 검색...",
  "Search your evolutions…": "내 진화 선수 검색...",
  "Search for an evolution…": "진화 검색...",
  "Search evolutions…": "진화 검색...",
  "Search…": "검색...",
  "Clear search": "검색어 지우기",
  "Created On": "생성일",
  "Not found": "찾을 수 없습니다",
  "You have no players in your Evo Lab. Add some players to get started.": "Evo Lab에 선수가 없습니다. 선수를 추가해 시작하세요.",
  "You must be signed in to view your Evo Lab.": "내 Evo Lab을 보려면 로그인하세요.",
  "Loading My Players…": "내 선수 불러오는 중...",
  "Create New Player": "새 선수 만들기",
  "Evolve any player": "원하는 선수 진화하기",
  "Evolve a Player": "선수 진화하기",
  "Want to save your players?": "내 선수를 저장하시겠어요?",
  "Reset player selection": "선수 선택 초기화",
  "Preview player attributes": "선수 능력치 미리 보기",
  "Select a partial Evolution (level)": "진화 단계 선택",
  "Partial Evolution": "일부 단계 진화",
  "Upgrade your current player to this version": "현재 선수를 이 버전으로 강화",
  "Add this player to compare": "이 선수를 비교에 추가",
  "Download assets": "이미지 다운로드",
  "Delete player from My Players": "내 선수에서 삭제",
  "Delete Player": "선수 삭제",
  "Replace player?": "선수를 교체하시겠어요?",
  "You have unsaved changes on the current player. Loading a new player will discard them.": "현재 선수의 변경사항이 저장되지 않았습니다. 새 선수를 불러오면 변경사항이 사라집니다.",
  "Replace player": "선수 교체",
  "Applied Evolutions": "적용된 진화",
  "No evolutions applied": "적용된 진화가 없습니다",
  "RESET TO SAVED": "저장 상태로 복원",
  "Remove Evolution": "진화 제거",
  "Your customizations will need to be re-applied.": "직접 변경한 설정은 다시 적용해야 합니다.",
  "Excluded Evolutions": "제외한 진화",
  "Your Player": "내 선수",
  "Drafts": "임시 저장",
  "Player Drafts": "선수 임시 저장",
  "No drafts for this player yet. Apply some evolutions and hit Save Draft to keep a build for later.": "이 선수의 임시 저장 내역이 없습니다. 진화를 적용하고 임시 저장을 누르면 나중에 이어서 사용할 수 있습니다.",
  "Saved": "저장됨",
  "Unsaved": "저장 안 됨",
  "Build": "구성",
  "Close": "닫기",
  "Cancel": "취소",
  "Sync": "동기화",
  "Synced": "동기화됨",
  "Public": "공개",
  "Private": "비공개",
  "Excluded": "제외됨",
  "Reward": "보상",
  "Session": "이번 접속",
  "Preview": "미리 보기",
  "Include": "포함",
  "Included": "포함됨",
  "Discard": "버리기",
  "Required": "필수",
  "Optional": "선택 사항",
  "Require": "필수로 지정",
  "Always": "항상",
  "Eligible": "사용 가능",
  "Used": "사용함",
  "Collapse": "접기",
  "Expand": "펼치기",
  "Unknown": "알 수 없음",
  "Token": "토큰",
  "Sync to Evo Lab": "Evo Lab에 동기화",
  "Sync changes": "변경사항 동기화",
  "Syncing…": "동기화 중...",
  "Syncing all…": "전체 동기화 중...",
  "No evolutions match your search.": "검색 조건에 맞는 진화 선수가 없습니다.",
  "Try a different player name.": "다른 선수 이름으로 검색해 보세요.",
  "No evolutions found in your GG Club.": "GG 클럽에 진화 선수가 없습니다.",
  "Sync your club to pull in your latest evolutions.": "클럽을 동기화해 최신 진화 선수를 불러오세요.",
  "Your Evo Lab is now public. It may take up to 5 minutes to update everywhere.": "내 Evo Lab을 공개했습니다. 전체 반영까지 최대 5분이 걸릴 수 있습니다.",
  "Your Evo Lab is now private. It may take up to 5 minutes to update everywhere.": "내 Evo Lab을 비공개로 전환했습니다. 전체 반영까지 최대 5분이 걸릴 수 있습니다.",
  "Something went wrong. Please try again.": "문제가 발생했습니다. 다시 시도해 주세요.",
  "Copied to clipboard": "클립보드에 복사했습니다",
  "Copy Link": "링크 복사",
  "Has Upgrade + GGR": "강화 가능 + GG 등급 상승",
  "Checking your players...": "내 선수 확인 중...",
  "Premium Season Pass": "프리미엄 시즌 패스",
  "Standard Season Pass": "일반 시즌 패스",
  "Price: Low to High": "가격 낮은 순",
  "Price: High to Low": "가격 높은 순",
  "Expiring Soonest": "만료 임박순",
  "Used in your club": "내 클럽에서 사용함",
  "This player": "이 선수",
  "Include all": "모두 포함",
  "Exclude all": "모두 제외",
  "No evolutions match your filters.": "필터에 맞는 진화가 없습니다.",
  "Discard unsaved changes?": "저장하지 않은 변경사항을 버리시겠어요?",
  "Unknown error": "알 수 없는 오류",
  "Must Include": "반드시 포함",
  "Season Pass Evos": "시즌 패스 진화",
  "Max Evolutions in Path": "경로 내 최대 진화 수",
  "No evolution paths match your filters. Try adjusting or clearing them, or modify the settings above.": "필터에 맞는 진화 경로가 없습니다. 필터를 변경하거나 초기화하고 위의 설정을 조정해 보세요.",
  "No active Evolution paths found for this player. You may modify the settings to potentially find more paths.": "이 선수의 진행 가능한 진화 경로가 없습니다. 설정을 변경해 다른 경로를 찾아보세요.",
  "View evolution details": "진화 상세 보기",
  "This evolution is in your excluded list": "제외 목록에 있는 진화입니다",
  "Remove one use": "적용 횟수 1회 줄이기",
  "Remove evolution": "진화 제거",
  "Pick upgrade paths and apply again": "강화 경로를 선택해 다시 적용",
  "Apply evolution again": "진화 다시 적용",
  "Maximum uses reached": "최대 사용 횟수에 도달했습니다",
  "Preview player": "선수 미리 보기",
  "More options": "추가 옵션",
  "Pick level": "단계 선택",
  "Include again": "다시 포함",
  "Exclude Evo": "진화 제외",
  "For this player": "이 선수에 적용",
  "For this session": "이번 접속에 적용",
  "Pick upgrade paths and apply": "강화 경로를 선택해 적용",
  "Apply evolution": "진화 적용",
  "PICK OPTIONS": "옵션 선택",
  "Possible Path": "가능한 경로",
  "Preview Evolution": "진화 미리 보기",
  "Go to Player": "선수 페이지로 이동",
  "Save as Draft": "임시 저장",
  "GG Rating: Best position": "GG 등급: 최적 포지션",
  "Best Role": "최적 역할",
  "Sort players by": "선수 정렬 기준",
  "No evolutions found": "진화가 없습니다",
  "You currently have no used Evolutions. You can use the Evo Lab to start adding them.": "아직 사용한 진화가 없습니다. Evo Lab에서 진화를 적용해 추가할 수 있습니다.",
  "Your used Evolutions are now excluded by default.": "사용한 진화는 기본적으로 제외됩니다.",
  "Current evolution": "현재 진화",
  "Evolution path": "진화 경로",
  "Reset build": "구성 초기화",
  "Preview current card": "현재 카드 미리 보기",
  "View player": "선수 보기",
  "Unable to load this player.": "이 선수를 불러올 수 없습니다.",
  "Evolution levels": "진화 단계",
  "Pathway evolution": "분기형 진화",
  "Choose your upgrades, then apply the evolution.": "강화를 선택한 뒤 진화를 적용하세요.",
  "Reward Evos": "보상 진화",
  "Premium SP Evos": "프리미엄 시즌 패스 진화",
  "Sort by": "정렬 기준",
  "No upgrades found for your saved players.": "저장한 선수의 가능한 강화가 없습니다.",
  "No Active Evolution Paths were found for this player": "이 선수의 진행 가능한 진화 경로가 없습니다",
  "Are you looking for an expired Evolution? Try Evo Lab!": "만료된 진화를 찾으시나요? Evo Lab을 이용해 보세요!",
  "Best Stats Evo": "최고 능력치 진화",
  "Top Single Evo": "최고 단일 진화",
  "Best Playstyle Evo": "최고 플레이스타일 진화",
  "Alt Single Evo": "다른 단일 진화",
  "Best Combo Evo": "최고 조합 진화",
  "No active combo paths": "진행 가능한 조합 경로 없음",
  "Evolution views": "진화 보기",
  "Failed to load Evo Lab data": "Evo Lab 정보를 불러오지 못했습니다",
  "Open draft?": "임시 저장을 여시겠어요?",
  "Open draft": "임시 저장 열기",
  "You have unsaved changes on the current player. Opening this draft will discard them.": "현재 선수의 변경사항이 저장되지 않았습니다. 임시 저장을 열면 변경사항이 사라집니다.",
  "Sync all (": "전체 동기화 (",
  "Stop ·": "중지 ·",
  "Best position": "최적 포지션",
  "Best position (default)": "최적 포지션 (기본값)",
  "Premium Season Pass Evos": "프리미엄 시즌 패스 진화",
  "Reward Evolutions": "보상 진화",
  "Token Evos": "토큰 진화",
  "Calculate GG Rating": "GG 등급 계산",
  "Search SBCs": "SBC 검색",
  "Ended": "종료됨",
  "Sign in to see your upgrades": "로그인하고 내 강화 확인하기",
  "Log in to see available Evolution upgrades for the players in your My Players.": "로그인하면 내 선수에 저장한 선수들의 가능한 진화 강화를 확인할 수 있습니다.",
  "Sign in to see your drafts": "로그인하고 임시 저장 확인하기",
  "Log in to save Evolution drafts and pick up where you left off.": "로그인하면 진화 구성을 임시 저장하고 나중에 이어서 진행할 수 있습니다.",
  "No active Evolutions right now": "현재 진행 가능한 진화가 없습니다",
  "Past Evolutions might still work. Try Evo Lab.": "지난 진화는 사용할 수 있을지도 모릅니다. 진화 연구에서 확인해 보세요.",
  "Think you can build your own? Try it in Evo Lab.": "직접 진화 경로를 만들어 보고 싶으신가요? 진화 연구에서 시작해 보세요.",
  "Open Evo Lab": "진화 연구 열기",
  "Born After": "출생일 (이후)",
  "Born Before": "출생일 (이전)",
  "Added After": "추가일 (이후)",
  "Added Before": "추가일 (이전)",
  "Select date": "날짜 선택",
  "Anticipate": "예측",
  "January": "1월",
  "February": "2월",
  "March": "3월",
  "April": "4월",
  "May": "5월",
  "June": "6월",
  "July": "7월",
  "August": "8월",
  "September": "9월",
  "October": "10월",
  "November": "11월",
  "December": "12월"
};
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

// Content boundaries, not a list of individual event names/descriptions.
const functionalHeadings = new Set([
    'details','requirements','squad requirements','entry requirements','rewards',
    'challenges','player requirements','analysis','eligible players','rating combination',
    'upgrades','upgrade paths','stats boost','cost','solution','recommended',
    'how do i unlock this?','completion difficulty','community verdict'
]);
let identityLabels;
function identityValue(element) {
    if(!/^(SPAN|DIV|A)$/.test(element.tagName)) return false;
    if(!identityLabels) {
        const fields=['name','club','league','nation','country','rarity','card type','season','campaign','squad'];
        identityLabels=new Set(fields.flatMap(field=>[field,contentKey(dictionary.get(field) || field)]));
    }
    const label=element.parentElement?.firstElementChild;
    return Boolean(label && label!==element && label.childElementCount<=1 && identityLabels.has(contentKey(label.textContent)));
}
function contentDetailLink(link) {
    return Boolean(link && /\/(?:(?:evolutions|live-events)\/\d[^/]*|objectives\/[^/]+\/[^/]+|sbc\/(?:players|upgrades|challenges|foundations)\/[^/]+)\//.test(link.getAttribute('href') || ''));
}
function playerProfileLink(link) {
    return Boolean(link && /^(?:https?:\/\/[^/]+)?\/players\/\d+[^/]*(?:\/\d{2}-\d+)?\/?(?:[?#].*)?$/.test(link.getAttribute('href') || ''));
}
function roleEvolutionTitle(text) {
    const match = text.trim().match(/^(GK|RB|CB|LB|CDM|RM|CM|LM|CAM|RW|ST|LW|CF|LWB|RWB)\s+Roles(\+{0,2})$/i);
    return match ? `${match[1].toUpperCase()} 역할${match[2]}` : null;
}
function taskParagraph(paragraph) {
    let container=paragraph.parentElement;
    for(let depth=0;container && depth<3;depth++,container=container.parentElement) {
        const heading=container.querySelector('h3,h4');
        if(heading) return heading.tagName === 'H4';
    }
    return null;
}
function contentProtection(element) {
    const path=pagePath;
    const tag=element.tagName;
    const link=tag==='A' && element.hasAttribute('href') ? element : null;
    if(/^\/players(?:\/|$)/.test(path) && identityValue(element)) return true;
    if(link && /\/(?:clubs|leagues|nations|rarities)\/[^/?#]+/.test(link.getAttribute('href'))) return true;
    // /sbc/players/... is an SBC detail, not a player identity link.
    if(playerProfileLink(link) && !/^\s*(?:View\s+|Player details|Add to|Compare)\b/i.test(link.textContent)) return true;
    if(/^\/players\/\d+[^/]*\/(?:\d{2}-\d+\/)?$/.test(path) && (tag==='H1' || (tag==='H2' && element.classList.contains('truncate')))) return true;
    if(tag==='DIV' && element.classList.contains('absolute') && element.classList.contains('text-center') && (element.classList.contains('leading-none') || element.classList.contains('uppercase')) && element.closest('.fc-card')) return true;
    if (link && /\/news\/[^/?#]+/.test(link.getAttribute('href'))) return true;
    if (/^\/news(?:\/|$)/.test(path) && /^(MAIN|ARTICLE)$/.test(tag)) return true;
    if (tag==='ARTICLE' && element.querySelector('a[href*="/news/"]')) return true;
    const contentPage=/^\/(?:objectives|sbc|evolutions|live-events)\//.test(path);
    const heading=/^H[1-6]$/.test(tag);
    const key=heading ? contentKey(element.textContent) : '';
    if((link || heading) && /^\/(?:evo-lab|evolutions)(?:\/|$)/.test(path) && roleEvolutionTitle(element.textContent)) return false;
    if(heading && /^H[34]$/.test(tag) && /^\/(?:objectives|live-events)\//.test(path) && (quantityTitle(element.textContent) || (quantityGroups.has(element) && !/[a-z]/i.test(element.textContent)))) return false;
    if(heading && /^H[23]$/.test(tag) && contentDetailLink(element.closest('a[href]')) && !functionalHeadings.has(key)) return true;
    if(link && contentDetailLink(link) && !link.querySelector('p,h2,h3,h4') && !/^(?:Challenges|Expires|Repeatable|Refreshes)/i.test(link.textContent.trim()) && !isCondition(link.textContent.trim()) && !functionalHeadings.has(contentKey(link.textContent))) return true;
    const detail=/^\/(?:(?:evolutions|live-events)\/\d[^/]*|objectives\/[^/]+\/[^/]+|sbc\/(?:players|upgrades|challenges|foundations)\/[^/]+)\/?$/.test(path);
    if(heading && detail && tag==='H1') return true;
    if(heading && /^\/(?:objectives|sbc|live-events)\//.test(path) && /^H[34]$/.test(tag) && !functionalHeadings.has(key)) return true;
    if(tag==='P') {
        // Directly under the page title is the introduction, never a task.
        if(contentPage && element.parentElement.querySelector(':scope > h1')) return true;
        if(uiMessageGroups.has(element) || splitUiMessage(element.textContent) || dictionary.has(contentKey(element.textContent)) || translateEvoUi(element.textContent.trim()) !== null) return false;
        if(contentPage) {
            const task=taskParagraph(element);
            if(task!==null) return !task;
            if(contentDetailLink(element.closest('a[href]')) && !isCondition(element.textContent.trim())) return true;
            if(!isCondition(element.textContent.trim()) && !dictionary.has(contentKey(element.textContent))) return true;
        }
        if(isLongProse(element.textContent.trim())) return true;
    }
    return false;
}

// Runtime is independent of the dictionary and legacy pattern data.
const dictionary = new Map(Object.entries(translations).map(([key, value]) => [key.trim().replace(/\s+/g, ' ').toLowerCase(), value]));
const contentKey = value => value.trim().replace(/\s+/g, ' ').toLowerCase();
const protectedSelector = 'script,style,noscript,template,textarea,input,select,option,code,pre,svg,canvas,[contenteditable]:not([contenteditable="false"]),[data-futgg-no-translate]';
const chartDateSelector = 'svg.recharts-surface text.recharts-cartesian-axis-tick-value';
const attributes = ['placeholder', 'title', 'aria-label'];
const textState = new WeakMap();
const attributeState = new WeakMap();
const pending = new Set();
const results = new Map();
const groupOwner = new WeakMap();
const knownGroups = new WeakSet();
const quantityGroups = new WeakSet();
const uiMessageGroups = new WeakSet();
let protectionCache = new WeakMap();
let pagePath = '';
const stats = { flushes: 0, visited: 0, writes: 0 };
let timer = null;
let observer;

function isCondition(text) {
    if (/^(?:Complete|Fully complete|Buy|List|Apply|Change|Build|Reach|Achieve|Grade|Keep)\b|^Earn (?:[\d,]+ points|Gallery Score)\b/i.test(text)) return true;
    return /^(?:(?:Play|Win|Score|Assist)\s+(?:\d|at least\b|a total\b|in\b|both\b|with\b|the\b|one\b|two\b|three\b)|Finish in the top\b|Completing this challenge counts towards\b|No players rated\b|Earn\s+[\d,]+\s+Rush Points|(?:Min|Max)\.|(?:Number of players|Rating|Team rating|Chemistry|Players|Nations|Leagues|Clubs|Quality|Same nation|Same league|Same club|Nation|League|Club):|Exchange\s+(?:a|an)\s+\d)/i.test(text);
}
function isLongProse(text) {
    return !isCondition(text) && (text.length > 100 || text.split(/\s+/).length > 16);
}
function translate(text) {
    if (results.has(text)) return results.get(text);
    const output = translateUncached(text);
    if (results.size >= 3000) results.clear();
    results.set(text, output);
    return output;
}
function translateUncached(text) {
    const trimmed = text.trim();
    if (!trimmed) return text;
    const normalized = trimmed.replace(/\s+/g, ' ');
    if (!/[a-z]/i.test(normalized)) return text;
    const functional = translateObjective(normalized) ?? translateFunctional(normalized);
    if (functional !== null) return text.replace(trimmed, functional);
    // Registered complete UI sentences precede the general prose cutoff.
    const exact = dictionary.get(normalized.toLowerCase());
    if (exact) return text.replace(trimmed, exact);
    const ui = translateEvoUi(normalized);
    if (ui !== null) return text.replace(trimmed, ui);
    if (isLongProse(normalized)) return text;
    if (/^[\d,.]+\s*[MK]$/i.test(trimmed)) return text;
    const additional = translateAdditional(normalized);
    if (additional !== null) return text.replace(trimmed, additional);

    // Roles are parsed as a whole, including hyphens, digits, and +/++.
    const role = normalized.match(/^(CAM|CDM|CM|ST|CF|LW|RW|LM|RM|CB|LB|RB|LWB|RWB|GK)(\s+-\s+|\s+)(.*?)(\s*\+{1,2})?$/i);
    if (role) {
        const value = translateRole(role[3]);
        if (value !== role[3]) return text.replace(trimmed, `${role[1].toUpperCase()}${role[2].includes('-') ? ' - ' : ' '}${value}${role[4] ? ' ' + role[4].trim() : ''}`);
    }

    // Complete relative-time expressions take precedence over individual units.
    const relative = normalized.match(/^(Expires in|in)?\s*(\d+)\s*(years?|months?|days?|hours?|minutes?|seconds?)\s*(ago|전)?$/i);
    if (relative) {
        const unit = { year: '년', month: '달', day: '일', hour: '시간', minute: '분', second: '초' }[relative[3].toLowerCase().replace(/s$/, '')];
        const ending = relative[1] ? (/^Expires/i.test(relative[1]) ? ' 후 만료 예정' : ' 후') : relative[4] ? ' 전' : '';
        return text.replace(trimmed, `${relative[2]}${unit}${ending}`);
    }
    // Capture every allowed game mode instead of dropping optional Rush.
    const evo = normalized.match(/^(Play|Win|Score|Assist) (\d+) (?:matches?|goals?) in (.+?) using your active EVO player(?: in game)?\.?$/i);
    if (evo) {
        const mode = normalizeMode(evo[3]);
        const actions = { play: `선수를 사용해 ${evo[2]}경기를 플레이하세요.`, win: `선수를 사용해 ${evo[2]}경기에서 승리하세요.`, score: `선수로 ${evo[2]}골을 기록하세요.`, assist: `선수로 ${evo[2]}도움을 기록하세요.` };
        return text.replace(trimmed, `${mode}에서 활성화된 진화 ${actions[evo[1].toLowerCase()]}`);
    }
    const evoWith = normalized.match(/^(Score|Assist) (\d+) goals? with your active EVO player(?: (?:in|on) (.+?))?\.?$/i);
    if (evoWith) return text.replace(trimmed, `${normalizeMode(evoWith[3] || 'any mode')}에서 활성화된 진화 선수로 ${evoWith[2]}${/^score$/i.test(evoWith[1]) ? '골' : '도움'}을 기록하세요.`);

    for (const { pattern, replacement } of dynamicTranslations) {
        pattern.lastIndex = 0;
        if (!pattern.test(normalized)) { pattern.lastIndex = 0; continue; }
        pattern.lastIndex = 0;
        const result = normalized.replace(pattern, replacement);
        pattern.lastIndex = 0;
        // Unsupported conditions stay readable in the original instead of
        // publishing a half-English sentence after a generic Min/Max match.
        if (isCondition(normalized) && /\b(?:players? rated|goals? in|matches? in|while having|starting (?:11|XI)|Min\.|Max\.)/i.test(result)) continue;
        if (result !== normalized) return text.replace(trimmed, result);
    }
    return text;
}
// Compatibility bridge for date callbacks in the retained domain rules.
function translateTextNode(node) { node.nodeValue = translate(node.nodeValue); }

function isProtected(node) {
    const parent = node.nodeType === 1 ? node : node.parentElement;
    if (!parent) return true;
    if (protectionCache.has(parent)) return protectionCache.get(parent);
    const blocked = computeProtection(parent);
    protectionCache.set(parent, blocked);
    return blocked;
}
function computeProtection(parent) {
    if (parent.matches(protectedSelector)) return true;
    if (parent.parentElement && isProtected(parent.parentElement)) return true;
    return contentProtection(parent);
}

function sourceOf(node) {
    const current = node.nodeValue;
    const previous = textState.get(node);
    if (previous && current === previous.output) return previous.source;
    textState.set(node, { source: current, output: current });
    return current;
}
function write(node, output) {
    const source = sourceOf(node);
    if (node.nodeValue !== output) { node.nodeValue = output; stats.writes++; }
    textState.set(node, { source, output });
}
function textNodes(root, includeIdentity = false) {
    if (root.nodeType === 3) return isProtected(root) ? [] : [root];
    if (isProtected(root)) return [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: node => (includeIdentity ? node.parentElement.closest(protectedSelector) : isProtected(node)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const result = [];
    let node;
    while ((node = walker.nextNode())) result.push(node);
    return result;
}

function rolePillLabel(node, source) {
    const label = node.parentElement;
    if (!label?.matches('span.truncate') || !label.nextElementSibling?.matches('span.text-evo')) return null;
    if (!/^\+{1,2}$/.test(label.nextElementSibling.textContent.trim())) return null;
    const m = source.trim().match(/^(.+?)\s*\+{1,2}$/);
    if (!m) return null;
    const translated = translatedTerm(m[1]);
    // The site's data may already suffix the role name while its pill adds a
    // separate green +/++. Keep that badge and translate only the base label.
    return translated !== m[1] ? source.replace(source.trim(), translated) : null;
}

// Component adapters match small, complete phrases. Never replace innerHTML,
// elements, React comment anchors, input values, or event handlers.
function translateGroup(element, handled) {
    if (!element || isProtected(element)) return false;
    const numericHeading = /^H[34]$/.test(element.tagName) && /^\/(?:live-events|objectives)\//.test(pagePath) && (quantityTitle(element.textContent) || quantityGroups.has(element));
    // Test the cheap visible prefix before ever walking descendants. Only known
    // split UI phrases need reconstruction; ordinary text takes the fast path.
    if (!knownGroups.has(element) && !numericHeading) {
        const visible = element.textContent.trim();
        if (visible.length>220) return false;
        const visibleDuration=visible.replace(/^(?:Expires in|Starts in|Ends in|Refreshes in|만료까지|시작까지|종료까지|갱신까지)\s*/i,'');
        const timerGroup=/^\d+[dhms]/i.test(visibleDuration) && translateCountdown(visibleDuration)!==null && (visibleDuration.match(/[dhms]/gi) || []).length>=2;
        if (!timerGroup && !splitUiMessage(visible) && !translateEventTime(visible) && !(playerProfileLink(element) && /^View\s+/i.test(visible)) && !/^Best (?:GK|RB|CB|LB|CDM|RM|CM|LM|CAM|RW|ST|LW|CF|LWB|RWB) Role$/i.test(visible) && !/^(?:Roles\s*\(|[\d,]+\s*placements?\b|Where would\b|Have a better\b|(?:View all|모두 보기)\s*\d|FC\s*\d+\s*Ratings|in\s*\d|(?:Current price|Last known price|현재 가격|최근 확인 가격)\s*[-–·]\s*Updated|(?:·\s*)?vs current\b)/i.test(visible)) return false;
    }
    const nodes = textNodes(element, true);
    if (!nodes.length || (!numericHeading && nodes.length < 2) || nodes.some(n => handled.has(n))) return false;
    const sources = nodes.map(sourceOf);
    const combined = sources.join('').trim().replace(/\s+/g, ' ');
    const message = splitUiMessage(combined);
    const eventTime = translateEventTime(combined);
    const bestRole = /^Best (?:GK|RB|CB|LB|CDM|RM|CM|LM|CAM|RW|ST|LW|CF|LWB|RWB) Role$/i.test(combined);
    const playerView = playerProfileLink(element) && combined.match(/^View (?!all\b)(.+)$/i);
    const countdown = translateCountdown(combined) ?? (/^(?:Expires in|Starts in|Ends in|Refreshes in)\s+/i.test(combined) ? translateAdditional(combined) : null);
    const quantity = numericHeading || (knownGroups.has(element) && /^H[34]$/.test(element.tagName) && quantityTitle(combined));
    const roles = combined.match(/^Roles\s*\(\s*(\d+)\s*\)$/i);
    const votes = combined.match(/^([\d,]+)\s*placements?$/i);
    const question = combined.match(/^Where would you place (.+?)\?$/i);
    const banner = combined.match(/^Have a better (.+?) Evolution\?$/i);
    const allCards = /^(?:View all|모두 보기)\s*\d+\s*cards$/i.test(combined);
    const hub = /^FC\s*\d+\s*Ratings\s*Hub$/i.test(combined);
    const future = /^in\s*\d+\s*(?:minutes?|hours?|seconds?|days?)$/i.test(combined);
    const updated = /^(?:Current price|Last known price|현재 가격|최근 확인 가격)\s*[-–·]\s*Updated\s+.+$/i.test(combined);
    const comparison = /^(?:·\s*)?vs current\s+[\d,.]+(?:\s*[KM])?$/i.test(combined);
    if (!comparison && !playerView && !eventTime && !bestRole && !message && !countdown && !quantity && !roles && !votes && !question && !banner && !allCards && !hub && !future && !updated) return false;
    if (playerView) {
        const nameIndex = sources.findIndex(s => s.trim() === playerView[1]);
        nodes.forEach((node, i) => write(node, i === (nameIndex >= 0 ? nameIndex : 0) ? `${playerView[1]} 보기` : ''));
    } else if (eventTime || bestRole) {
        const output = eventTime || translateEvoUi(combined);
        nodes.forEach((node, i) => write(node, i === 0 ? output : ''));
    } else if (message) {
        // Keep the clickable login action and the highlighted PlayStyle token
        // in their existing nodes instead of making the whole sentence a link.
        const pivot = sources.findIndex(value => contentKey(value) === contentKey(message.pivot));
        if (pivot < 0) return false;
        const before = nodes.slice(0, pivot).findIndex((_, i) => sources[i].trim());
        let after = -1;
        for (let i = pivot + 1; i < nodes.length; i++) if (sources[i].trim()) { after = i; break; }
        if ((message.before && before < 0) || (message.after && after < 0)) return false;
        nodes.forEach((node, i) => write(node, i === pivot ? message.token : i === before ? message.before : i === after ? message.after : ''));
        uiMessageGroups.add(element);
    } else if (countdown) {
        nodes.forEach((node,i)=>write(node,i===0 ? countdown : ''));
    } else if (quantity) {
        quantityGroups.add(element);
        const title = quantityTitle(combined, nearbyCondition(element));
        nodes.forEach((node,i) => write(node, i === 0 ? title : ''));
    } else if (roles) {
        // Keep the count in its original React-owned node.
        nodes.forEach((node, i) => write(node, sources[i].replace(/Roles/i, '역할')));
    } else if (question || banner) {
        const name = (question || banner)[1];
        const nameIndex = sources.findIndex(s => s.trim() === name);
        if (nameIndex >= 0 && nameIndex !== 0) {
            // Preserve the player-name node (including a possible player link).
            const prefix = question ? '' : '더 좋은 ';
            const suffix = question ? '에게 어떤 티어를 주시겠어요?' : ' 진화 선수가 있나요?';
            nodes.forEach((node, i) => write(node, i === 0 ? prefix : i === nameIndex ? name + suffix : ''));
        } else {
            nodes.forEach((node, i) => write(node, i === 0 ? translate(combined) : ''));
        }
    } else {
        const output = votes ? `${votes[1]}명이 투표함` : comparison
            ? `${sources.join('').match(/^\s*/)[0]}${translate(combined)}${sources.join('').match(/\s*$/)[0]}`
            : translate(combined);
        if (output === combined) return false;
        nodes.forEach((node, i) => write(node, i === 0 ? output : ''));
    }
    knownGroups.add(element);
    nodes.forEach(n => { handled.add(n); groupOwner.set(n, element); });
    return true;
}

function translateTimer(element, handled) {
    // Homepage countdowns live inside content-name links. Bypass only that
    // boundary for the semantic timer, retaining news and editable exclusions.
    for (let parent = element; parent; parent = parent.parentElement) {
        if (parent.matches(protectedSelector)) return;
        if (contentProtection(parent) && !(parent.tagName === 'A' && contentDetailLink(parent))) return;
    }
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
        acceptNode: node => node.parentElement.closest(protectedSelector) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    const source = nodes.map(sourceOf).join('').trim().replace(/\s+/g, ' ');
    const output = translateCountdown(source);
    if (output === null) return;
    nodes.forEach((node, i) => { write(node, i === 0 ? output : ''); handled.add(node); groupOwner.set(node, element); });
    let records = attributeState.get(element);
    if (!records) { records = new Map(); attributeState.set(element, records); }
    const value = element.getAttribute('aria-label');
    if (value) {
        const previous = records.get('aria-label');
        const original = previous && value === previous.output ? previous.source : value;
        const translated = translateTimerLabel(original);
        if (translated !== null) {
            if (value !== translated) { element.setAttribute('aria-label', translated); stats.writes++; }
            records.set('aria-label', { source: original, output: translated });
        }
    }
}

function translateChartDate(element, handled) {
    for (let parent = element; parent; parent = parent.parentElement) {
        if ((parent.matches(protectedSelector) && parent.localName !== 'svg') || contentProtection(parent)) return;
    }
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    const output = translateShortDate(nodes.map(sourceOf).join('').trim());
    if (output === null) return;
    nodes.forEach((node, i) => { write(node, i === 0 ? output : ''); handled.add(node); groupOwner.set(node, element); });
}

function translateAttribute(element) {
    if ((element.parentElement && isProtected(element.parentElement)) || contentProtection(element)) return;
    if (element.closest('script,style,textarea,select,[contenteditable]:not([contenteditable="false"])')) return;
    let records = attributeState.get(element);
    if (!records) { records = new Map(); attributeState.set(element, records); }
    for (const name of attributes) {
        const value = element.getAttribute(name);
        if (!value) continue;
        const previous = records.get(name);
        const source = previous && value === previous.output ? previous.source : value;
        const output = translate(source);
        if (output !== value) { element.setAttribute(name, output); stats.writes++; }
        records.set(name, { source, output });
    }
}
function processRoot(root, handled) {
    const container = root.nodeType === 1 ? root : root.parentElement;
    const timerElement = container?.closest('[role="timer"]');
    if (timerElement) translateTimer(timerElement, handled);
    else if (root.nodeType !== 3) container?.querySelectorAll('[role="timer"]').forEach(element => translateTimer(element, handled));
    const chartDate = container?.closest(chartDateSelector);
    if (chartDate) translateChartDate(chartDate, handled);
    else if (root.nodeType !== 3) container?.querySelectorAll(chartDateSelector).forEach(element => translateChartDate(element, handled));
    const nodes = textNodes(root);
    for (const node of nodes) {
        stats.visited++;
        if (handled.has(node)) continue;
        const source = sourceOf(node);
        const pill = /\+{1,2}\s*$/.test(source) ? rolePillLabel(node, source) : null;
        if (pill !== null) { write(node, pill); handled.add(node); continue; }
        const owner = groupOwner.get(node);
        if (owner?.isConnected) translateGroup(owner, handled);
        // Numeric candidates are needed for split vote counts, but all other
        // labels bypass ancestor searches entirely.
        if (!handled.has(node) && (/^\s*(?:Starts\b|Ends\b|Ended\b|Best\s*$|Roles\b|Where would\b|Have a better\b|Log in\b|Tap once\b|You've reached the maximum\b|Press\s*$|(?:View|모두 보기)\b|FC\s*\d|in\b|Current price\b|Last known price\b|현재 가격|최근 확인 가격|(?:[-–·]\s*)?Updated\b|(?:·\s*)?vs current\b|[\d,]+\s*$)/i.test(source) || /^\s*(?:Play|Win|Score|Assist|Level)(?: in)?\s*\d*\s*$/i.test(source) || /^\s*\d+[dhms]\b/i.test(source) || /^\s*[\d,]+ (?:Rush Points|Stars|Goals|Assists|Wins|Matches|SBCs)$/i.test(source))) {
            let parent = node.parentElement;
            for (let depth = 0; parent && depth < 3; depth++, parent = parent.parentElement) {
                if (translateGroup(parent, handled)) break;
            }
        }
        if (!handled.has(node)) write(node, translate(source));
    }
    const element = root.nodeType === 1 ? root : root.parentElement;
    if (!element) return;
    if (element.matches('[placeholder],[title],[aria-label]')) translateAttribute(element);
    // A character edit has no newly inserted descendants to scan for attributes.
    if (root.nodeType !== 3) element.querySelectorAll('[placeholder],[title],[aria-label]').forEach(translateAttribute);
}
function observe() {
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: attributes });
}
function flush() {
    timer = null;
    if (typeof document === 'undefined' || !document?.body?.isConnected) { pending.clear(); return; }
    const roots = [...pending].filter(root => root.isConnected);
    pending.clear();
    if (!roots.length) return;
    observer.disconnect();
    try {
        protectionCache = new WeakMap();
        pagePath = location.pathname;
        stats.flushes++;
        const handled = new Set();
        // Don't scan a subtree twice when its ancestor is already queued.
        const selected = new Set(roots);
        for (const root of roots) {
            let ancestor = root.parentNode;
            while (ancestor && !selected.has(ancestor)) ancestor = ancestor.parentNode;
            if (!ancestor) processRoot(root, handled);
        }
    } finally { observe(); }
}
function queue(root) {
    if (!root || !root.isConnected) return;
    pending.add(root);
    // Coalesce mutations before the next task without adding a 40ms delay.
    if (timer === null) { timer = true; queueMicrotask(() => { if (pending.size) flush(); else timer = null; }); }
}
function changedRoot(node) {
    const owner=groupOwner.get(node);
    if(owner?.isConnected) return owner;
    let parent=node.nodeType===1 ? node : node.parentElement;
    for(let depth=0;parent && depth<3;depth++,parent=parent.parentElement) if(knownGroups.has(parent)) return parent;
    return node;
}
function start() {
    if (!document.body) return;
    observer = new MutationObserver(records => {
        if (typeof document === 'undefined' || !document?.body?.isConnected) return;
        for (const record of records) {
            if (record.type === 'childList') {
                record.addedNodes.forEach(node => { if (node.nodeType === 1 || node.nodeType === 3) queue(changedRoot(node)); });
                // Removals can also change a split phrase.
                if (record.removedNodes.length) queue(record.target);
            } else queue(changedRoot(record.target));
        }
    });
    pending.add(document.body);
    flush();
}
if (document.body) start();
else {
    const bootstrap = new MutationObserver(() => {
        if (!document.body) return;
        bootstrap.disconnect();
        start();
    });
    bootstrap.observe(document, { childList: true, subtree: true });
}

})();
