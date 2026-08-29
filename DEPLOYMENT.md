Vercel deployment notes

1) Required environment variables (set these in your Vercel Project Settings or via `vercel env`):

- `DATABASE_URL` — a production database connection string. Do NOT use the local `file:./dev.db` in production. Recommended: a managed Postgres (Neon, PlanetScale, Heroku Postgres, Supabase, etc.).
- `ADMIN_EMAIL` — the admin login email used by the seed or initial admin account.
- `ADMIN_PASSWORD` — the admin login password used by the seed or initial admin account.
- `NEXT_PUBLIC_SITE_URL` — your site URL (e.g. `https://learnsapwithsayan.vercel.app`).

2) Build & generate Prisma Client

- `package.json` contains `postinstall: "prisma generate"` so Prisma Client will be generated during install on Vercel.
- For production migrations, prefer running Prisma migrations locally and applying them with `npx prisma migrate deploy` on your deployment target before or during deployment.

3) Recommended deploy workflow

- Create a managed Postgres database and set `DATABASE_URL` in Vercel.
- Add secrets in Vercel Project Settings for `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- Deploy from the `main` branch. Vercel will run `npm install` -> `prisma generate` (postinstall) -> `npm run build`.
- If you rely on Prisma Migrate, run `npx prisma migrate deploy` (you can run this as part of a server-side startup script or CI step).

4) Troubleshooting Prisma on Vercel

- Do NOT commit `prisma/dev.db` or `node_modules/.prisma` (this repo ignores them).
- If Prisma fails during build with engine errors, try setting the `PRISMA_CLIENT_ENGINE_TYPE` environment variable to `binary` or `library` depending on the platform (check Prisma docs). In most cases Prisma's default generated client works if `prisma generate` runs during build and `DATABASE_URL` is valid.
- Ensure the production `DATABASE_URL` points to a reachable database; otherwise `prisma generate` may still succeed but runtime DB calls will fail.

5) Optional: add secrets via Vercel CLI

```bash
vercel login
vercel env add DATABASE_URL production
vercel env add ADMIN_EMAIL production
vercel env add ADMIN_PASSWORD production
vercel env add NEXT_PUBLIC_SITE_URL production
```

6) Notes

- This project uses Prisma and Next.js (App Router). For serverless deployments, prefer a managed Postgres rather than SQLite.
- If you want me to wire up a PostgreSQL provider (example config, sample `DATABASE_URL`, and CI migration job), tell me which provider you prefer and I will add the instructions and a sample GitHub Actions job.
