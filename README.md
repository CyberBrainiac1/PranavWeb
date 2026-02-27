# PranavWeb

Portfolio site for Pranav Emmadi, rebuilt as a Vite + React + TypeScript project with Tailwind and Framer Motion.

## Stack

- Vite + React + TypeScript
- Tailwind CSS (via `@tailwindcss/vite`)
- Framer Motion
- HashRouter (`react-router-dom`) for GitHub Pages refresh safety

## Local Development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Contact Form Key (Web3Forms)

The contact form uses Web3Forms.

1. Create a key at `https://web3forms.com/`.
2. Choose one setup path:
   - Local dev: add `.env.local` with  
     `VITE_WEB3FORMS_ACCESS_KEY=your_key_here`
   - GitHub Pages deploy (recommended): add repo secret  
     `VITE_WEB3FORMS_ACCESS_KEY` in `Settings -> Secrets and variables -> Actions`
3. Push to `main`. The workflow now injects that secret during build.

## Bot Setup (Ask Pranav Bot)

Open the `Contact` page and use the **Ask Pranav Bot** panel.

- Bot works with built-in local facts by default.
- Optional AI mode can be enabled with environment configuration.

### Bot env vars (optional)

Create `.env.local` (ignored by git):

```bash
VITE_BOT_MODEL=openai/gpt-oss-120b
VITE_BOT_API_KEY=your_key_here
```

Important: this keeps keys out of the repository, but GitHub Pages is a static frontend, so any key shipped to the browser can still be extracted.  
For true secret protection, use a backend proxy (server/worker) and keep the key there.

To "train" it better, update your site data files:
- `src/data/profile.ts`
- `src/data/projects.ts`
- `src/data/skills.ts`
- `src/data/designed.ts`

The bot response context is built from those files automatically.

## LinkedIn Timeline Import

1. Add entries to `LINKEDIN.txt` using:
   `YYYY-MM | Role or Milestone | Organization | Notes`
2. Generate timeline data:

```bash
npm run timeline:generate
```

This writes to `src/data/timeline.ts`.

## GitHub Pages Settings Checklist

1. Open this repo in GitHub.
2. Go to `Settings -> Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. In the same Pages screen, set Custom domain to:
   `pranav-e.engineer`
5. After DNS is verified and certificate is ready, enable `Enforce HTTPS`.

## Name.com DNS Checklist

Add these records:

- `A` `@` -> `185.199.108.153`
- `A` `@` -> `185.199.109.153`
- `A` `@` -> `185.199.110.153`
- `A` `@` -> `185.199.111.153`

Optional IPv6 records:

- `AAAA` `@` -> `2606:50c0:8000::153`
- `AAAA` `@` -> `2606:50c0:8001::153`
- `AAAA` `@` -> `2606:50c0:8002::153`
- `AAAA` `@` -> `2606:50c0:8003::153`

Optional `www` alias:

- `CNAME` `www` -> `cyberbrainiac1.github.io`

## GitHub CLI (Optional)

If `gh` is installed, you can run:

```bash
gh auth login
gh repo edit CyberBrainiac1/PranavWeb --enable-pages
gh api -X POST repos/CyberBrainiac1/PranavWeb/pages --input - <<'JSON'
{"source":{"branch":"main","path":"/"},"build_type":"workflow"}
JSON
```

If this API call reports Pages already configured, keep the existing setup and just confirm the source is GitHub Actions in the web UI.
