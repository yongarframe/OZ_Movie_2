## 📖 프로젝트 소개

이 프로젝트는 **TMDB API**를 활용하였으며, 영화 정보 탐색 및 데이터를 확인 할 수 있습니다.

<br/>

### ✨ 주요 기능

- 🔍 영화 검색 및 필터링
- 🎬 영화 상세 정보 확인 (줄거리, 감독, 출연진, 예고편 등)
- 📝 댓글 작성, 수정, 삭제 기능
- ⭐ 즐겨찾기(북마크) 관리
- 📱 반응형 UI 제공

<br/>

### 📅 프로젝트 개요

- 프로젝트 유형: 개인 프로젝트
- 개발 기간: 2025년 4월 ~ 진행중

<br/>

## 🛠 기술 스택

### 🎨 Frontend

- **Framework & Language**: React, TypeScript, Vite
- **Styling**: TailwindCSS, clsx, CVA, tailwind-merge
- **State Management**: Zustand
- **Routing**: react-router-dom
- **Data Fetching/caching**: Axios, TanStack Query

### ⚙️ Backend

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
