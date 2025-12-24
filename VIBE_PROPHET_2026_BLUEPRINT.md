# VIBE PROPHET 2026 - PRODUCT BLUEPRINT

**Status:** Ready to ship (Dec 24, 2025)  
**Stack:** Next.js + Upstash Search + Tavily + Activepieces + Vercel Blob  
**Estimated Build Time:** 6-8 hours  
**Foundation:** Vectr Template (Vercel) + Tattoo Dashboard

---

## 📋 EXECUTIVE SUMMARY

**Vibe Prophet 2026** is an addictive trend prediction app where users predict what will go viral in 2026. Real-time momentum scoring (via Tavily crawl + Activepieces automation) validates predictions and ranks users on accuracy. Social leaderboards, FOMO mechanics, and "You Called It" badges drive engagement.

**Why Ship This:**

- ✅ Ships TODAY (uses existing Vectr + Tattoo template infrastructure)
- ✅ Addictive loop (predict → validate → score → leaderboard)
- ✅ Real data (Tavily crawls actual trends)
- ✅ Monetizable (premium predictions, early access categories)
- ✅ Viral potential (share "I called it first" moments)

---

## 🏗️ ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                     VIBE PROPHET 2026                            │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   USER FRONTEND  │
│   (Next.js App)  │
├──────────────────┤
│ • Prediction     │
│   Form           │
│ • Leaderboard    │
│ • Real-time      │
│   Momentum       │
│ • Share/Social   │
└────────┬─────────┘
         │
         │ (HTTP API)
         ▼
┌─────────────────────────────────────────────────────────────────┐
│               NEXT.JS API ROUTES                                 │
├─────────────────────────────────────────────────────────────────┤
│ /api/predictions/submit  (POST)   ─────────┐                    │
│ /api/predictions/list    (GET)             │                    │
│ /api/leaderboard         (GET)             │                    │
│ /api/momentum/update     (POST - Webhook)  │                    │
└──────────────────────────────────────────────────────────────────┘
         │
         │
    ┌────┴────────────────────────────────────────────┐
    │                                                  │
    ▼                                                  ▼
┌──────────────────────┐          ┌──────────────────────────┐
│  UPSTASH SEARCH      │          │   VERCEL BLOB STORAGE    │
│  (Data Storage)      │          │   (User Avatars, etc)    │
├──────────────────────┤          └──────────────────────────┘
│ Index: predictions   │
│ • prediction_id      │
│ • user_id            │
│ • trend_name         │
│ • category           │
│ • submitted_at       │
│ • current_momentum   │
│ • metadata           │
│                      │
│ Search: semantic +   │
│ full-text hybrid     │
└──────────────────────┘
         ▲
         │
    ┌────┴──────────────────────────────────────┐
    │                                            │
    │                                            │
    ▼                                            ▼
┌──────────────────────┐         ┌──────────────────────────┐
│  ACTIVEPIECES        │         │   TAVILY SEARCH/CRAWL    │
│  (Automation)        │         │   (Trend Discovery)      │
├──────────────────────┤         ├──────────────────────────┤
│ Trigger: Every 15min │         │ • Search Reddit threads  │
│                      │         │ • Crawl TikTok trends    │
│ Action:              │         │ • Monitor GitHub         │
│ 1. Call Tavily API   │◄────────┤   trending               │
│ 2. Parse results     │         │ • Extract momentum       │
│ 3. Calculate score   │         │   signals                │
│ 4. POST to /api/     │         │ • Return JSON with       │
│    momentum/update   │         │   upvotes, comments,     │
│                      │         │   mentions, velocity     │
└──────────────────────┘         └──────────────────────────┘
```

---

## 🔄 DATA FLOW & USER JOURNEY

### **Phase 1: Prediction Submission**

```
User signs in → Browse predictions or create new
↓
User inputs: "Alien core aesthetic will blow up in 2026"
↓
Select category: "Fashion & Aesthetics"
↓
Submit prediction → Stored in Upstash Search
↓
Prediction appears on dashboard (indexed immediately)
```

### **Phase 2: Automated Momentum Scoring (Every 15 mins)**

```
Activepieces trigger fires
↓
Call Tavily Search/Crawl:
  - Query: "alien core aesthetic trending"
  - Search depth: advanced
  - Max results: 20
↓
Extract momentum signals:
  - Reddit upvotes on threads mentioning "alien core"
  - TikTok hashtag velocity
  - GitHub repo stars if tech-related
  - Twitter/X retweet growth
↓
Calculate score:
  momentum_score = (upvotes + comments) / hours_elapsed
↓
Update prediction in Upstash Search with new score
↓
Webhook POST to /api/momentum/update
↓
Leaderboard recalculates in real-time
```

### **Phase 3: Leaderboard & Gamification**

```
User views leaderboard
↓
See predictions ranked by:
  1. Momentum growth (velocity)
  2. Accuracy (did it trend?)
  3. Community vote (other users agree)
↓
Earn badges:
  - "You Called It" (was 1st to predict)
  - "Trend Slayer" (5 correct predictions)
  - "Prophet" (10+ correct)
  - "Unhinged" (weird predictions that came true)
↓
Share: "I predicted [trend] on Dec 24, 2025 and called it first!"
```

---

## 📁 PROJECT STRUCTURE

```
piptav/
├── app/
│   ├── api/
│   │   ├── predictions/
│   │   │   ├── submit/route.ts         ← User submits prediction
│   │   │   └── list/route.ts           ← Get all predictions
│   │   ├── leaderboard/route.ts        ← Get ranked users
│   │   └── momentum/
│   │       └── update/route.ts         ← Webhook from Activepieces
│   │
│   ├── dashboard/
│   │   ├── page.tsx                    ← Main dashboard
│   │   ├── components/
│   │   │   ├── PredictionForm.tsx      ← shadcn form
│   │   │   ├── Leaderboard.tsx         ← Ranked table
│   │   │   ├── TrendCard.tsx           ← Individual trend card
│   │   │   └── MomentumChart.tsx       ← Real-time momentum
│   │   └── layout.tsx
│   │
│   ├── auth/
│   │   ├── signin/page.tsx
│   │   └── callback/route.ts
│   │
│   └── layout.tsx
│
├── lib/
│   ├── upstash.ts                      ← Upstash Search client
│   ├── tavily.ts                       ← Tavily API wrapper
│   ├── momentum.ts                     ← Scoring logic
│   └── utils.ts
│
├── components/
│   ├── ui/                             ← shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   └── table.tsx
│   │
│   └── shared/
│       └── navigation.tsx
│
├── public/
│   └── images/
│
├── .env.local                          ← Secrets (see below)
├── package.json
├── tsconfig.json
└── VIBE_PROPHET_2026_BLUEPRINT.md      ← This file
```

---

## 🔑 ENVIRONMENT VARIABLES

```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth (Clerk or similar)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxx
CLERK_SECRET_KEY=xxx

# Upstash Search
UPSTASH_SEARCH_REST_URL=https://xxx.upstash.io
UPSTASH_SEARCH_REST_TOKEN=xxx

# Tavily API
TAVILY_API_KEY=tvly-xxx

# Vercel Blob
BLOB_READ_WRITE_TOKEN=xxx

# Activepieces Webhook Secret (for /api/momentum/update)
ACTIVEPIECES_WEBHOOK_SECRET=xxx
```

---

## 💾 UPSTASH SEARCH SCHEMA

### Index: `predictions`

```json
{
  "prediction_id": "uuid",
  "user_id": "uuid",
  "user_name": "string",
  "user_avatar": "string (blob url)",
  "trend_name": "string",
  "category": "enum: tech|fashion|meme|social|unhinged",
  "description": "string (optional)",
  "submitted_at": "timestamp",
  "current_momentum": "number (0-100)",
  "momentum_history": "array of {timestamp, score}",
  "reddit_upvotes": "number",
  "twitter_mentions": "number",
  "tiktok_velocity": "number",
  "status": "enum: pending|trending|viral|dead",
  "badges": "array of strings",
  "is_correct": "boolean (marked by mods or auto-detected)"
}
```

---

## 🚀 IMPLEMENTATION ROADMAP

### **STEP 1: Setup Foundation (1 hour)**

- [ ] Clone Tattoo Dashboard template
- [ ] Remove tattoo-specific pages
- [ ] Update Blob storage configuration
- [ ] Setup auth (keep existing or add Clerk)
- [ ] Install dependencies: `@upstash/search`, `@tavily/ai-sdk`, `zod`

### **STEP 2: Upstash Search Integration (1.5 hours)**

- [ ] Create `lib/upstash.ts` client
- [ ] Define prediction index schema
- [ ] Create upsert functions
- [ ] Create search/filter functions
- [ ] Test with dummy data

### **STEP 3: Core UI Components (2 hours)**

- [ ] Build `PredictionForm.tsx` (shadcn form)
- [ ] Build `Leaderboard.tsx` (table component)
- [ ] Build `TrendCard.tsx` (individual prediction display)
- [ ] Build `MomentumChart.tsx` (simple chart with recharts)
- [ ] Wire components to dashboard layout

### **STEP 4: API Routes (1.5 hours)**

- [ ] POST `/api/predictions/submit` ← Save to Upstash
- [ ] GET `/api/predictions/list` ← Search/filter
- [ ] GET `/api/leaderboard` ← Ranked by momentum
- [ ] POST `/api/momentum/update` ← Webhook for Activepieces

### **STEP 5: Tavily Integration (1 hour)**

- [ ] Create `lib/tavily.ts` wrapper
- [ ] Build momentum scoring logic
- [ ] Test with real Tavily queries
- [ ] Create test script to verify data

### **STEP 6: Activepieces Automation (0.5 hours)**

- [ ] Setup Activepieces account
- [ ] Create workflow: trigger every 15 mins
- [ ] Wire Tavily search → scoring → webhook POST
- [ ] Test end-to-end

### **STEP 7: Polish & Deploy (1 hour)**

- [ ] Add badges/gamification UI
- [ ] Add share buttons
- [ ] Setup real-time updates (WebSocket or polling)
- [ ] Deploy to Vercel
- [ ] Test in production

**Total: ~8 hours**

---

## 🔗 KEY API INTEGRATIONS

### Tavily Search (Every 15 mins via Activepieces)

```typescript
// Example: Finding momentum for "alien core aesthetic"
const response = await tavily.search({
  query: "alien core aesthetic trending 2026",
  search_depth: "advanced",
  max_results: 10,
  include_raw_content: true,
  topic: "general",
});

// Extract momentum signals from response
const momentumScore = calculateScore({
  redditMentions: parseRedditResults(response),
  tiktokVelocity: parseTikTokTrends(response),
  githubTrending: parseGitHubTrending(response),
});

// POST to /api/momentum/update
fetch("/api/momentum/update", {
  method: "POST",
  body: JSON.stringify({
    prediction_id: "xxx",
    momentum_score: momentumScore,
    sources: response.results,
  }),
});
```

### Upstash Search (Real-time)

```typescript
// Submit prediction
await search.index("predictions").upsert([
  {
    id: "pred_12345",
    content: {
      prediction_id: "pred_12345",
      trend_name: "Alien core aesthetic",
      category: "fashion",
    },
    metadata: {
      user_id: "user_1",
      submitted_at: new Date().toISOString(),
      momentum: 0,
    },
  },
]);

// Search predictions
const results = await search
  .index("predictions")
  .search("alien aesthetic 2026", {
    where: {
      category: { equals: "fashion" },
    },
  });

// Get leaderboard (sorted by momentum)
const leaderboard = await search.index("predictions").search("*", {
  orderBy: "current_momentum",
  limit: 10,
});
```

---

## 📱 SHADCN COMPONENTS TO USE

```
✅ Button (submit, share)
✅ Card (prediction cards, leaderboard)
✅ Badge (category tags, status)
✅ Form (prediction submission)
✅ Input (text, search)
✅ Table (leaderboard ranking)
✅ Toast (notifications)
✅ Dialog (share modal)
✅ Tabs (category filters)
```

All already installed in Tattoo template.

---

## 🎯 MVP FEATURES (SHIP TODAY)

- ✅ User authentication
- ✅ Submit prediction (form)
- ✅ View all predictions (searchable)
- ✅ Real-time momentum scoring
- ✅ Leaderboard (top predictions)
- ✅ Category filtering
- ✅ Share button

## 🚀 POST-SHIP FEATURES (WEEK 2)

- 🔄 Badges/achievements system
- 🔄 Premium predictions (early access categories)
- 🔄 WebSocket real-time updates
- 🔄 User profile pages
- 🔄 Prediction comments/discussion
- 🔄 Admin moderation dashboard

---

## 🤖 COPILOT INSTRUCTIONS

### **For File Creation & Editing:**

**Instruction 1: Create `lib/upstash.ts`**

```
Create a TypeScript module that:
1. Imports Search from "@upstash/search"
2. Initializes Search client with env vars
3. Exports functions:
   - submitPrediction(data: PredictionInput) → Promise<string>
   - listPredictions(query?: string) → Promise<Prediction[]>
   - getPredictionById(id: string) → Promise<Prediction>
   - updateMomentum(id: string, score: number) → Promise<void>
   - getLeaderboard(limit: number) → Promise<User[]>

Define types: Prediction, PredictionInput, User
Use Zod for validation on input
```

**Instruction 2: Create `lib/tavily.ts`**

```
Create a Tavily wrapper that:
1. Takes a trend name (string)
2. Calls tavily.search() with:
   - search_depth: "advanced"
   - max_results: 10
   - include_raw_content: true
3. Parses response to extract:
   - Reddit upvote mentions
   - TikTok hashtag velocity
   - GitHub trending repos
4. Returns momentum score (0-100)
5. Use cache to avoid duplicate queries
```

**Instruction 3: Create `lib/momentum.ts`**

```
Create momentum calculation logic:
1. Function: calculateMomentum(source_data: any) → number
   - Weight Reddit upvotes: 30%
   - Weight Twitter mentions: 25%
   - Weight TikTok velocity: 25%
   - Weight comment growth: 20%
2. Normalize all scores to 0-100
3. Apply time decay (older mentions = less weight)
```

**Instruction 4: Create `app/api/predictions/submit/route.ts`**

```
Create POST endpoint:
1. Extract user from auth context
2. Validate request body: { trend_name, category, description }
3. Call upstash.submitPrediction()
4. Return { success: true, prediction_id }
5. Error handling for validation failures
```

**Instruction 5: Create `app/api/momentum/update/route.ts`**

```
Create POST endpoint for Activepieces webhook:
1. Verify webhook signature from ACTIVEPIECES_WEBHOOK_SECRET
2. Parse body: { prediction_id, momentum_score }
3. Call upstash.updateMomentum()
4. Return { success: true }
```

**Instruction 6: Create `app/dashboard/components/PredictionForm.tsx`**

```
Create React component using shadcn Form:
1. Use react-hook-form + zod
2. Fields:
   - trend_name (text input, required)
   - category (select: tech/fashion/meme/social/unhinged)
   - description (textarea, optional)
3. On submit: POST to /api/predictions/submit
4. Show loading state, error toast, success toast
5. Clear form on success
```

**Instruction 7: Create `app/dashboard/components/Leaderboard.tsx`**

```
Create table component using shadcn Table:
1. Fetch from /api/leaderboard
2. Columns: Rank | User | Top Prediction | Momentum | Badges
3. Sort by momentum DESC
4. Show user avatar from Blob
5. Add pagination (limit 50)
6. Real-time refresh every 30 seconds
```

**Instruction 8: Create `app/dashboard/page.tsx`**

```
Create main dashboard layout:
1. Hero section: "Welcome to Vibe Prophet 2026"
2. PredictionForm component (tab 1)
3. Leaderboard component (tab 2)
4. Recent predictions list (tab 3)
5. Category filter tabs
6. All components responsive (mobile-first)
```

---

## 🧪 TESTING CHECKLIST

- [ ] Submit prediction → appears in search results within 2 sec
- [ ] Leaderboard updates every 15 mins with new momentum scores
- [ ] Search filters by category
- [ ] Momentum calculation doesn't produce NaN
- [ ] Share button copies correct URL
- [ ] Form validation shows errors
- [ ] Webhook from Activepieces successfully updates scores
- [ ] Real-time leaderboard changes visible without page refresh

---

## 🎬 LAUNCH SEQUENCE (DEC 24-25, 2025)

| Time    | Task                         | Owner   |
| ------- | ---------------------------- | ------- |
| 2:00 PM | Scaffold setup, env config   | Copilot |
| 3:00 PM | Upstash + Tavily integration | Copilot |
| 4:30 PM | Core UI components           | Copilot |
| 5:30 PM | API routes                   | Copilot |
| 6:30 PM | Activepieces setup           | User    |
| 7:00 PM | Testing & QA                 | Copilot |
| 7:30 PM | Deploy to Vercel             | Copilot |
| 8:00 PM | **SHIP** 🚀                  | You     |

---

## 💰 MONETIZATION ROADMAP

1. **Free Tier:** Basic predictions, see leaderboard
2. **Pro Tier ($4.99/mo):**
   - Early access to new categories (1 day before others)
   - Premium badges
   - Export prediction history
3. **Creator Tier ($9.99/mo):**
   - Custom prediction categories
   - Private leaderboards
   - API access for bots

**Est. Revenue (1k active users):** $200-500/mo

---

## 🎯 SUCCESS METRICS (WEEK 1)

- 100+ predictions submitted
- 50+ active users
- Avg 3 predictions per user
- 80%+ accurate momentum scoring
- <500ms API response time
- 0 unhandled errors

---

## 📝 NOTES FOR COPILOT

When building this:

1. **NO plain HTML.** Use shadcn components ONLY.
2. **All imports from `@/components/ui/`**
3. **Use TypeScript strictly.** No `any` types.
4. **Validate all inputs** with Zod before storing.
5. **Handle errors gracefully** with user-facing messages.
6. **Make it responsive** (mobile-first).
7. **Test Upstash queries** before committing.
8. **Keep API routes lean** (business logic in `lib/`).
9. **Use environment variables** for all secrets.
10. **Comments only where logic is non-obvious.**

**If you get confused about anything:**

- Ask for clarification
- Show me the code you're about to write
- Wait for approval before proceeding
- Don't assume shadcn component APIs

---

## 🔗 USEFUL LINKS

- Upstash Docs: https://upstash.com/docs/search
- Tavily Docs: https://docs.tavily.com
- Vercel Vectr: https://github.com/vercel/vectr
- shadcn/ui: https://ui.shadcn.com
- Activepieces: https://www.activepieces.com

---

**READY TO SHIP? Let's go. 🚀**
