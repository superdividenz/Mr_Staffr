# Contributing

## Setup

1. Clone the repo and run `npm install`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
3. Run `npx prisma generate` and `npx prisma db push`.
4. Run `npm run dev`.

## Code style

- Use TypeScript; avoid `any` where possible.
- Follow existing patterns: server components for data, client components for interactivity.
- Run `npm run lint` before committing.
- See `.editorconfig` for indent and line endings.

## Structure

- **API** – `src/app/api/`; use `getServerSession` for auth; return JSON and appropriate status codes.
- **Pages** – `src/app/`; co-locate page-specific components in the same route folder when they’re only used there.
- **Shared** – `src/components/` and `src/lib/` for reuse.

## Commits

Use clear, present-tense messages (e.g. “Add platform fee to payment release”, “Fix login redirect”).
