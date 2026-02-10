# 🍑 Peach - Your Delightfully Old-Fashioned Money Coach

A budgeting app with personality. Peach is a 1960s housewife AI companion who helps you manage your money with charm, sass, and vintage wisdom.

## Quick Start

```bash
cd peach
npm install
npm run dev
```

## Project Structure

```
peach/
├── README.md
├── docs/
│   ├── PRD.md                 # Product requirements
│   ├── LANDING_PAGE.md        # Website copy
│   └── UI_GUIDELINES.md       # Design system
├── prompts/
│   └── peach_system_prompt.md # Claude API persona
├── db/
│   └── schema.sql             # Supabase schema
├── assets/
│   ├── happy_final.png        # Peach - happy mood
│   ├── neutral_final.png      # Peach - neutral mood
│   ├── anguished_final.png    # Peach - anguished mood
│   ├── background.png         # 1960s living room
│   └── icon_cookie_jar.png    # Cookie jar icon
└── src/                       # React app (TBD)
    ├── components/
    ├── pages/
    ├── hooks/
    ├── lib/
    └── styles/
```

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: Claude API (Anthropic)
- **Payments**: Stripe
- **Hosting**: Vercel

## Key Features

- 💬 **Chat with Peach** - AI-powered financial companion
- ✉️ **Envelope System** - Visual budget categories
- 🍪 **Cookie Jar** - Savings goal tracker
- 📅 **Kitchen Calendar** - Bill reminders
- 📰 **Sunday Paper** - Weekly spending reports

## Development

### Prerequisites
- Node.js 18+
- Supabase account
- Anthropic API key
- Stripe account (for payments)

### Environment Variables
```bash
cp .env.example .env.local
```

Required:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `ANTHROPIC_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`

## Deployment

### Supabase Setup
1. Create new Supabase project
2. Run `db/schema.sql` in SQL editor
3. Enable Row Level Security
4. Copy project URL and anon key

### Vercel Deploy
1. Connect GitHub repo
2. Add environment variables
3. Deploy

## License

Proprietary - All rights reserved.
