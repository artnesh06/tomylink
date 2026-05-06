# YourLink

Bio link platform like Linktree/Lynk.id built with Next.js + Supabase + Vercel.

## Pages
- `/{username}` - Public bio link page
- `/dashboard` - User settings & earnings
- `/admin` - Admin panel
- `/login` - Login page

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Setup Supabase
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key
3. Update `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run locally
```bash
npm run dev
```

### 4. Deploy to Vercel
1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

## Tech Stack
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Hosting**: Vercel
