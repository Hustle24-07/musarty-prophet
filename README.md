# Vibe Prophet 2026 🚀

**Predict what will trend in 2026. Get scored in real-time. Win the leaderboard.**

A viral trend prediction platform where users forecast emerging trends, get validated by real-time momentum data from Tavily, and compete on global leaderboards.

![Status](https://img.shields.io/badge/status-shipping-brightgreen)
![Built with](https://img.shields.io/badge/built%20with-Next.js-black)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

- **Predict Trends** - Submit predictions across tech, fashion, memes, social, and "unhinged" categories
- **Real-Time Momentum Scoring** - Automated Tavily crawls validate predictions every 15 minutes
- **Global Leaderboard** - Compete with other predictors, earn badges
- **Semantic Search** - Find predictions by keyword or meaning (Upstash Search)
- **Share & Brag** - "I called it first" moments go viral
- **Zero Setup** - One-click authentication, no complex onboarding

---

## 🏗️ Tech Stack

| Layer             | Technology                                   |
| ----------------- | -------------------------------------------- |
| **Frontend**      | Next.js 15 + React + TypeScript              |
| **UI Components** | shadcn/ui (Tailwind CSS)                     |
| **Database**      | Upstash Search (semantic + full-text hybrid) |
| **Automation**    | Activepieces (15-min interval jobs)          |
| **Trend Data**    | Tavily Search/Crawl API                      |
| **Storage**       | Vercel Blob (user avatars, optional)         |
| **Hosting**       | Vercel                                       |
| **Auth**          | Clerk (or existing auth)                     |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Upstash account (free tier OK)
- Tavily API key
- Vercel account (for deployment)

### Installation

```bash
# Clone the repo
git clone https://github.com/Tattzy25/prophet.git
cd prophet

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local

# Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here

# Upstash Search
UPSTASH_SEARCH_REST_URL=https://xxx.upstash.io
UPSTASH_SEARCH_REST_TOKEN=your_token_here

# Tavily API
TAVILY_API_KEY=tvly-your_key_here

# Vercel Blob (optional)
BLOB_READ_WRITE_TOKEN=your_token_here

# Activepieces Webhook
ACTIVEPIECES_WEBHOOK_SECRET=your_secret_here
```

---

## 📁 Project Structure

```
app/
├── api/
│   ├── predictions/
│   │   ├── submit/route.ts         # POST predictions
│   │   └── list/route.ts           # GET filtered predictions
│   ├── leaderboard/route.ts        # GET ranked users
│   └── momentum/update/route.ts    # Webhook from Activepieces
├── dashboard/
│   ├── page.tsx                    # Main dashboard
│   └── components/
│       ├── PredictionForm.tsx
│       ├── Leaderboard.tsx
│       ├── TrendCard.tsx
│       └── MomentumChart.tsx
└── layout.tsx

lib/
├── upstash.ts                      # Upstash Search client
├── tavily.ts                       # Tavily wrapper
└── momentum.ts                     # Scoring logic

components/
└── ui/                             # shadcn components
```

---

## 🔄 How It Works

### 1. **User Submits Prediction**

```
User enters: "Alien core aesthetic will blow up"
Category: Fashion
→ Stored in Upstash Search
→ Appears on dashboard instantly
```

### 2. **Automated Momentum Scoring (Every 15 mins)**

```
Activepieces trigger fires
→ Calls Tavily Search/Crawl
→ Extracts momentum signals (upvotes, comments, mentions)
→ Calculates score (0-100)
→ POSTs to /api/momentum/update
→ Leaderboard updates in real-time
```

### 3. **User Competes**

```
See predictions ranked by momentum
Earn badges: "You Called It", "Trend Slayer", "Prophet"
Share: "I predicted [trend] and called it first!"
```

---

## 🔗 API Routes

### POST `/api/predictions/submit`

Submit a new prediction

```json
{
  "trend_name": "Alien core aesthetic",
  "category": "fashion",
  "description": "Optional details"
}
```

### GET `/api/predictions/list?search=alien&category=fashion`

Search predictions with filters

### GET `/api/leaderboard?limit=50`

Get top predictors by momentum score

### POST `/api/momentum/update`

Webhook endpoint (called by Activepieces)

```json
{
  "prediction_id": "uuid",
  "momentum_score": 85
}
```

---

## 🤖 Activepieces Automation Setup

1. Create workflow in Activepieces
2. Trigger: **Every 15 minutes**
3. Actions:
   - Call Tavily Search API
   - Parse momentum signals
   - POST to `/api/momentum/update`

**Example workflow:**

```
┌─────────────────────────────┐
│ Trigger: Every 15 min       │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│ Tavily Search               │
│ Query: trending topics      │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│ Calculate Momentum Score    │
│ (upvotes + comments) / time │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│ POST /api/momentum/update   │
│ Update leaderboard          │
└─────────────────────────────┘
```

---

## 📊 Data Schema (Upstash Search)

```json
{
  "prediction_id": "uuid",
  "user_id": "uuid",
  "user_name": "string",
  "trend_name": "string",
  "category": "tech|fashion|meme|social|unhinged",
  "description": "string",
  "submitted_at": "timestamp",
  "current_momentum": "0-100",
  "reddit_upvotes": "number",
  "twitter_mentions": "number",
  "tiktok_velocity": "number",
  "status": "pending|trending|viral|dead",
  "is_correct": "boolean"
}
```

---

## 🧪 Testing

```bash
# Run tests
pnpm test

# Test Tavily integration
pnpm run test:tavily

# Test Upstash queries
pnpm run test:upstash
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Then redeploy: vercel --prod
```

### Manual Deployment

```bash
pnpm build
pnpm start
```

---

## 🎯 Roadmap

### ✅ MVP (Live Now)

- Prediction form
- Leaderboard
- Real-time momentum
- Search & filter

### 🔄 Phase 2 (Week 2)

- User profiles
- Prediction history
- Badges/achievements
- Comments on predictions

### 🚀 Phase 3 (Month 2)

- Premium tiers
- Custom categories
- API access
- Mobile app

---

## 💰 Monetization

| Tier        | Price    | Features                                     |
| ----------- | -------- | -------------------------------------------- |
| **Free**    | $0       | Basic predictions, leaderboard               |
| **Pro**     | $4.99/mo | Early access categories, premium badges      |
| **Creator** | $9.99/mo | Custom categories, private leaderboards, API |

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open PR

---

## 📝 License

MIT © 2025 Vibe Prophet

---

## 🙋 Support

- **Issues**: GitHub Issues
- **Email**: support@vibeprophet.dev
- **Discord**: [Join our community](https://discord.gg/vibeprophet)

---

## 🎉 Credits

Built with:

- [Vercel](https://vercel.com) - Hosting & Blob Storage
- [Upstash](https://upstash.com) - Serverless Search
- [Tavily](https://tavily.com) - Trend Intelligence
- [Activepieces](https://activepieces.com) - Workflow Automation
- [shadcn/ui](https://ui.shadcn.com) - Component Library

---

**Ready to predict the future? Let's ship! 🚀**
