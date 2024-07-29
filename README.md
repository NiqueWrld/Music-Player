# Musicflix
Musicflix는 사용자가 음악을 탐색하고 즐길 수 있도록 설계된 현대적이고 사용자 친화적인 웹 애플리케이션입니다. 이 플랫폼은 사용자가 다양한 음악, 큐레이션된 재생 목록 및 최신 뮤직 비디오를 탐험할 수 있도록 합니다. 또한, Musicflix는 다양한 기능과 직관적인 디자인을 통해 사용자가 쉽게 음악을 즐길 수 있도록 돕습니다.

## 작업 순서
1. Node.js 설치 및 버전 확인
2. 프로젝트 폴더 설정 및 필요없는 파일 제거

## 필요한 라이브러리 설치
- React 설치: `npm create-react-app .` (현재 폴더에 설치)
- react-router-dom 설치: `npm install react-router-dom` (주소 설정 라이브러리)
- axios 설치: `npm install axios` (API 호출 라이브러리)
- react-icons 설치: `npm install react-icons` (리액트 아이콘)
- react-player 설치: `npm install react-player` (유튜브 영상 재생 라이브러리)
- sass 설치: `npm install sass` (CSS 전처리기)
- react-helmet-async 설치: `npm install react-helmet-async` (React 앱의 HTML 헤드 관리)
- swiper 설치: `npm install swiper` (이미지 슬라이드 라이브러리)

## 주요 기능
음악 탐색: 최신 히트곡, 트렌드 트랙 및 큐레이션된 재생 목록을 탐색할 수 있습니다.
뮤직 비디오: 좋아하는 아티스트의 뮤직 비디오를 직접 시청할 수 있습니다.
사용자 친화적인 인터페이스: 간단하고 직관적인 디자인으로 매끄러운 사용자 경험을 제공합니다.


## 기술 스택
1. 프론트엔드: Vue.js, Swiper
2. 백엔드: Node.js, Express
3. API: The Movie Database API (TMDb) 사용
4. 배포: Vercel

## 작업중 문제 해결 사항

### API 작동 문제
- 문제: API가 간헐적으로 작동하지 않는 현상이 있었습니다.
- 해결 방법: API 호출에 대한 에러 핸들링을 강화하고, 백엔드 서버의 요청 처리 로직을 최적화했습니다. 또한, API 요청 실패 시 재시도 로직을 추가하여 안정성을 높였습니다.
- 
### 사용자 피드백 반영
- 문제: 사용자 인터페이스와 경험에 대한 피드백을 반영하는 과정에서 여러 문제가 발생했습니다.
- 해결 방법: 사용자 피드백을 적극적으로 수렴하고, 이를 바탕으로 UI/UX를 지속적으로 개선했습니다. 또한, 사용자의 요구를 신속하게 반영할 수 있는 애자일 개발 방법론을 적용했습니다.
