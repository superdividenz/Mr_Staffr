# Project structure

High-level layout for Mr. Staffr.

## Root

- **.env.example** – Template for environment variables (do not commit `.env`).
- **.gitignore** – Ignore node_modules, .next, .env, IDE, OS files.
- **package.json** – Dependencies and scripts.
- **tailwind.config.ts** – Tailwind theme and brand colors.
- **tsconfig.json** – TypeScript config.
- **next.config.mjs** – Next.js config.
- **railway.json** – Railway deploy config (build, start, healthcheck).
- **README.md** – Quick start, structure, env, deploy.

## `prisma/`

- **schema.prisma** – All models (User, Job, Payment, Review, etc.) and enums.
- **seed.ts** – Seeds legacy AI roles for `/hire`; run with `npm run db:seed`.

## `src/app/`

App Router routes and UI.

- **layout.tsx** – Root layout (fonts, metadata).
- **page.tsx** – Landing page.
- **globals.css** – Global styles and CSS variables.

### Route groups & pages

- **(auth)/** – `login`, `register` (no shared layout beyond root).
- **api/** – All API routes (auth, jobs, payments, completions, reviews, etc.).
- **dashboard/** – Authenticated dashboard: `page` (home), `profile`, `jobs/new`, `jobs/[id]`, `payments`, `settings`.
- **hire/** – Legacy flow: list roles, `[slug]` hire form, order creation.
- **jobs/** – Public job list; `[id]` job detail and apply.
- **order/** – Legacy order status `[id]`.

## `src/components/`

Shared React components (e.g. `Providers` for NextAuth).

## `src/lib/`

- **db.ts** – Prisma client singleton.
- **auth.ts** – NextAuth config (credentials, callbacks).
- **auth-server.ts** – `getSession`, `getCurrentUser`, `requireAuth`.
- **api-auth.ts** – API key auth for `/api/v1/*`.
- **recommendations.ts** – Recommendation scoring and helpers.
- **webhooks.ts** – Trigger webhooks (HMAC optional).

## `src/types/`

- **next-auth.d.ts** – Extend NextAuth `User` and `Session` (e.g. `id`, `role`).

## Conventions

- **API routes** – Use `getServerSession(authOptions)` for auth; return clear JSON errors and status codes.
- **Server components** – Fetch in page/layout; pass minimal props to client components.
- **Client components** – Use `"use client"`; keep forms and interactive UI here.
- **Naming** – kebab-case for routes and files; PascalCase for components.
- **Env** – Never commit secrets; document every variable in `.env.example` and README.
