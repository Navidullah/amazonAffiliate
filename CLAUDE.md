# ShopYor — Project Context for Claude

## Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript (jsconfig.json, no TypeScript)
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn UI + Radix UI
- **Animations:** Framer Motion (already installed as `framer-motion`)
- **Icons:** Lucide React + React Icons + Iconify

## Frontend UI Skill
This project has the **frontend-ui** skill installed at `.claude/skills/frontend-ui.skill`.

Use it automatically for any UI/component/design task. When building components:
- Use `framer-motion` (already in package.json) for animations — import as `import { motion } from 'framer-motion'`
- Use Tailwind CSS utility classes (v4 — no config file needed, just use classes)
- Use Shadcn components from `@/components/ui/` for primitives
- Use Lucide React for icons: `import { IconName } from 'lucide-react'`
- Place new components in `components/` folder
- Place new pages/routes in `app/` folder (App Router)

## Import Aliases
- `@/` → project root (e.g. `@/components/ui/button`)

## Key Folders
- `app/` — Next.js App Router pages and layouts
- `components/` — Reusable React components
- `lib/` — Utility functions and helpers
- `public/` — Static assets
