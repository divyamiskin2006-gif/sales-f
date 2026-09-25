# 📊 Sales Analytics Dashboard

A **frontend-only** Sales Analytics Dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Recharts**.

It lets users explore mock sales data for 2022–2024 with interactive charts, year switching, and a revenue-threshold filter.

> 🚀 **Live Demo:** [https://sales-f.vercel.app](https://sales-f.vercel.app)

---

## 📸 Screenshots

| Desktop | Mobile |
|---|---|
| ![Dashboard](./public/screenshot-desktop.png) | ![Mobile](./public/screenshot-mobile.png) |

*(Replace these image paths with your own screenshots, or remove this section.)*

---

## ✨ Features

- 📅 Year selector — switch between **2022, 2023, 2024** with instant updates
- 📈 Three chart types — **Bar**, **Line**, and **Pie** — toggle with one click
- 💰 KPI cards — Total Revenue, Total Profit, Units Sold, Average Order Value
- 🧭 Category breakdown chart with a ranked list of categories
- 🔍 Custom revenue threshold filter to narrow down records
- 📱 Fully responsive — desktop, tablet, and mobile
- 🧩 Atomic Design architecture (atoms → molecules → organisms)
- 🟦 100% TypeScript with strict typing
- 🎨 Clean, professional UI using Tailwind CSS
- ⚡ Zero backend required — runs completely in the browser

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [React 19](https://react.dev/) | UI library |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Recharts](https://recharts.org/) | Charts (Bar, Line, Pie) |

---

## 📦 Prerequisites

Before you begin, make sure you have:

- **Node.js** — version **18.18** or higher ([download](https://nodejs.org/))
- **npm** — comes with Node.js (or use `yarn` / `pnpm` / `bun`)

Check your versions:

```bash
node -v
npm -v
```

---

## ⚙️ Installation

**1. Clone the repository:**

```bash
git clone https://github.com/divyamiskin2006-gif/sales-f.git
cd sales-f
```

**2. Install dependencies:**

```bash
npm install
```

**3. (Optional) Start the dev server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/dashboard`.

---

## 🚀 Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server at `http://localhost:3000` |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs ESLint to check for code issues |

---

## 🧱 Atomic Component Structure

```
components/
├── atoms.tsx       → Button, Card, Input, Label, Badge
├── molecules.tsx   → StatCard, YearSelector, ChartSwitcher, FilterInput
└── organisms.tsx   → DashboardHeader, StatsGrid, SalesChart,
                      CategoryBreakdown, FilterCard
```

Every UI element is built from small, reusable pieces following **Atomic Design**:

| Level | Purpose | Examples |
|---|---|---|
| **Atoms** | Smallest UI primitives | Button, Input, Badge |
| **Molecules** | Combinations of atoms | StatCard, FilterInput |
| **Organisms** | Complex, self-contained sections | SalesChart, StatsGrid |

---

## 📊 How the Sales Data Works

- Mock data lives in **`data/salesData.ts`** and covers **2022, 2023, 2024**.
- Every combination of **month × category × region** produces one `SalesRecord`.
- A **deterministic pseudo-random generator** ensures numbers stay consistent across reloads.
- Each record contains:

```typescript
{
  id: string;
  year: 2022 | 2023 | 2024;
  month: string;
  category: "Electronics" | "Furniture" | "Clothing" | "Groceries" | "Sports";
  region: "North" | "South" | "East" | "West";
  unitsSold: number;
  revenue: number;
  profit: number;
}
```

- Data is aggregated on the fly in `lib/utils.ts`:
  - `getMonthlySales()` — groups by month
  - `getCategorySales()` — groups by category
  - `getDashboardStats()` — computes KPI totals

**No backend, database, or API is required.**

---

## 📁 Project Folder Structure

```
sales-f/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard page (client)
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Redirects to /dashboard
│   └── globals.css           # Tailwind + global styles
├── components/
│   ├── atoms.tsx             # Small UI primitives
│   ├── molecules.tsx         # Combinations of atoms
│   └── organisms.tsx         # Complex sections
├── data/
│   └── salesData.ts          # Mock sales data
├── lib/
│   └── utils.ts              # Filters, aggregations, formatters
├── types/
│   └── sales.ts              # TypeScript interfaces
├── public/                   # Static assets
├── README.md
├── package.json              # Node dependencies & scripts
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
└── .gitignore
```

---

## ☁️ Deployment

This project is deployed on **Vercel** (free for Next.js).

**Deploy your own copy in 3 steps:**

1. Push this repo to your GitHub account
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Click **Deploy** — Vercel auto-detects Next.js and builds it

You'll get a live URL in ~2 minutes.

**Live version of this project:** [https://sales-f.vercel.app](https://sales-f.vercel.app)

---

## 🔮 Future Enhancements

- 🔌 Replace mock data with a real API (REST or GraphQL)
- 🗄️ Add a database (PostgreSQL + Prisma or Supabase)
- 🔐 Authentication and role-based dashboards
- 📅 Custom date-range picker
- 📤 CSV / Excel export of filtered results
- 🌙 Dark mode toggle
- 🌍 Region-level filtering and drill-down
- 🧪 Unit tests (Jest + React Testing Library)
- 🎞️ Animations with Framer Motion

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and share.

---

## 🙌 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Vercel](https://vercel.com/)