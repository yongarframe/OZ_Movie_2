# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
N1
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ loginicon.png
│  │  └─ react.svg
│  ├─ component
│  │  ├─ MovieCardRender.jsx
│  │  ├─ NavbarMobileView.jsx
│  │  ├─ NavbarPcView.jsx
│  │  ├─ Search.jsx
│  │  └─ SkeletonMovieDetail.jsx
│  ├─ customHooks
│  │  └─ useDebounce.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ page
│  │  ├─ MovieCard.jsx
│  │  ├─ MovieDetail.jsx
│  │  ├─ NavBar.jsx
│  │  ├─ NotFound.jsx
│  │  ├─ Signup.jsx
│  │  ├─ layout.jsx
│  │  ├─ login.jsx
│  │  └─ mypage.jsx
│  ├─ store.jsx
│  ├─ supabase
│  │  ├─ auth
│  │  │  ├─ index.js
│  │  │  ├─ useAuth.js
│  │  │  ├─ useEmail.auth.js
│  │  │  └─ useOauth.auth.js
│  │  ├─ context
│  │  │  └─ index.jsx
│  │  ├─ index.js
│  │  └─ utilities
│  │     ├─ config.js
│  │     ├─ dto.js
│  │     ├─ env.js
│  │     ├─ index.js
│  │     └─ localStorage.js
│  └─ util
│     └─ delay.js
├─ vercel.json
└─ vite.config.js

```