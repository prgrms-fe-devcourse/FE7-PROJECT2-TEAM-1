# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```
FE7-PROJECT2-TEAM-1
├─ .env
├─ .prettierignore
├─ .prettierrc
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ AuthBootstrap.tsx
│  │  ├─ Header.tsx
│  │  ├─ SearchBar.tsx
│  │  ├─ common
│  │  │  ├─ Button.tsx
│  │  │  └─ Input.tsx
│  │  ├─ loading
│  │  │  ├─ PostsSkeleton.tsx
│  │  │  ├─ ProfileSkeleton.tsx
│  │  │  └─ UsersSkeleton.tsx
│  │  ├─ modal
│  │  │  ├─ Completed.tsx
│  │  │  ├─ Report.tsx
│  │  │  └─ Sure.tsx
│  │  └─ routes
│  │     ├─ ProtectedRoute.tsx
│  │     └─ PublicOnlyRoute.tsx
│  ├─ css
│  │  ├─ font.css
│  │  ├─ index.css
│  │  └─ tailwind.css
│  ├─ layouts
│  │  └─ Default.tsx
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ NotFound.tsx
│  │  ├─ auth
│  │  │  ├─ SignIn.tsx
│  │  │  └─ SignUp.tsx
│  │  ├─ home
│  │  │  └─ Home.tsx
│  │  ├─ post
│  │  │  ├─ Posts.tsx
│  │  │  └─ Write.tsx
│  │  ├─ profile
│  │  │  └─ Profile.tsx
│  │  └─ search
│  │     ├─ Search.tsx
│  │     ├─ SearchPosts.tsx
│  │     └─ SearchUsers.tsx
│  ├─ services
│  │  ├─ alarm.ts
│  │  ├─ post.ts
│  │  ├─ signIn.ts
│  │  └─ user.ts
│  ├─ stores
│  │  └─ authStore.ts
│  ├─ types
│  │  ├─ alarm.d.ts
│  │  ├─ comment.d.ts
│  │  ├─ database.d.ts
│  │  ├─ like.d.ts
│  │  ├─ option.d.ts
│  │  ├─ post.d.ts
│  │  ├─ profile.d.ts
│  │  ├─ report.d.ts
│  │  └─ vote.d.ts
│  └─ utils
│     └─ supabase.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```