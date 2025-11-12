## 📖 프로젝트 소개

TMDB API와 Supabase를 활용하여 만든 영화 정보 및 커뮤니티 웹 애플리케이션입니다. 
<br/>
사용자는 다양한 영화를 탐색하고, 상세 정보를 확인하며, 다른 사용자들과 소통할 수 있습니다.

<br/>

### ✨ 주요 기능

- 🍿 **영화 정보 제공**: 현재 상영 중, 인기, 평점 높은, 개봉 예정 영화 목록 제공
- 🎬 **영화 상세 정보**: 영화 포스터, 줄거리, 출연진, 감독, 예고편 등 상세 정보 확인
- 🔍 **영화 검색**: 원하는 영화를 제목으로 검색
- 🔐 **사용자 인증**: Supabase를 이용한 이메일/소셜 로그인 및 회원가입
- ⭐ **즐겨찾기**: 보고 싶은 영화를 즐겨찾기에 추가하고 마이페이지에서 관리
- 💬 **코멘트**: 각 영화에 대한 한 줄 평 작성 및 조회
- ♾️ **무한 스크롤**: 장르별/검색 페이지에서 부드러운 사용자 경험을 위한 무한 스크롤 적용
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 등 다양한 디바이스 지원
- ⏳ **스켈레톤 UI**: 데이터 로딩 중 스켈레톤 UI를 표시하여 사용자 경험 향상

<br/>

### 📅 프로젝트 개요

- 프로젝트 유형: 개인 프로젝트
- 개발 기간: 2025년 4월 ~ 진행중

<br/>

## 🛠 기술 스택

### 🎨 Frontend

- **Framework & Language**: React, TypeScript, Vite
- **Styling**: TailwindCSS, clsx, CVA, tailwind-merge
- **State Management**
   - Server State : Tanstack Query
   - Client State : Zustand
- **Routing**: react-router-dom
- **Data Fetching/caching**: Axios, TanStack Query

### ⚙️ Backend & DB

- Supabase (인증, DB, API)

### 🚀 Deployment

- Vercel

### 🧰 Tools & Utilities

- Git (버전 관리)
- Prettier (코드 스타일링)
- Husky (Git Hook 관리)

<br/>

## ⚙️ 설치 및 실행 방법

```bash
# 1. 레포지토리 클론
git clone https://github.com/yongarframe/OZ_Movie_2.git

# 2. 패키지 설치
npm install

# 3. 로컬 실행
npm run dev
```

<br/>

## 환경 변수

```bash
#TMDB
VITE_API_TOKEN = [TMDB 엑세스 토큰]

#SUPABASE
VITE_SUPABASE_PROJECT_URL = https://[project ID].supabase.co  #settings > Data API
VITE_SUPABASE_API_KEY = [SUPABASE_API_KEY]                    #settings > API Keys

#카카오 공유
VITE_KAKAO_JAVASCRIPT_KEY = [카카오 javascript 키]
```

<br/>

## 📜 사용 가능한 스크립트

- 개발 서버 실행:
  ```bash
  npm run dev
  ```
- 프로덕션용 프로젝트 빌드:
  ```bash
  npm run build
  ```
- 빌드된 프로젝트 미리보기:
  ```bash
  npm run start
  ```
- ESLint로 코드 스타일 검사:
  ```bash
  npm run lint
  ```
- ESLint가 발견한 문제 자동 수정:
  ```bash
  npm run lint:fix
  ```
- Prettier로 모든 파일의 코드 포맷팅:
  ```bash
  npm run format
  ```
- Prettier로 포맷팅 필요한 파일 확인:
  ```bash
  npm run format:check
  ```
- TypeScript 컴파일러로 타입 에러 검사:
  ```bash
  npm run type-check
  ```

<br/>

## 📁 폴더 구조

     src
     ├── api/          # 외부 API 호출 함수
     ├── assets/       # 이미지, 폰트 등 정적 에셋
     ├── component/    # 재사용 가능한 공통 컴포넌트
     ├── hooks/        # 커스텀 훅
     ├── page/         # 라우팅 단위의 페이지 컴포넌트
     ├── services/     # 비즈니스 로직 관련 서비스
     ├── store/        # Zustand를 사용한 클라이언트 상태 관리
     ├── supabase/     # Supabase 클라이언트 및 관련 로직
     ├── types/        # 프로젝트 전반에서 사용되는 타입 정의
     └── util/         # 유틸리티 함수
