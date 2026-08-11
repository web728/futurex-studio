# Handover include/exclude manifest

## Include

- `src/`, `public/`, `scripts/`, `tests/`
- `package.json`, `package-lock.json`
- Next.js, TypeScript, ESLint, PostCSS and Tailwind configuration
- `.env.example` and `.gitignore`
- All Markdown documentation in the project root
- `AGENTS.md` and `CLAUDE.md`

## Exclude

- `.git/` and Git history
- `node_modules/`, `.next/`, `out/`, `build/`, `coverage/`
- `.vercel/`, `*.tsbuildinfo`, `next-env.d.ts`
- `.env`, `.env.local`, `.env.*` containing real values (only `.env.example` is included)
- `work/`, `publicnew-assets/`, screenshots, contact sheets and temporary exports
- Debug logs, editor/OS caches, personal files and credential JSON
- The ZIP itself and any previously expanded handover folder

The final archive was generated from the committed source tree, not from the existing dependency or build folders. No symlinks are present.
