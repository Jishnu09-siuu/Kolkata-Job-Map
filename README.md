# 📍 Kolkata Job Map (কলকাতা জব ম্যাপ)

> **The definitive geospatial job discovery and verified IT office directory for Greater Kolkata.**  
> Explore real office buildings, tech parks, active openings, fresher-friendly drives, and commute times across Salt Lake Sector V, New Town, Park Street, Kasba, and Bantala SEZ.

---

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://kolkata-job-map.vercel.app)

---

## 🌟 Overview

**Kolkata Job Map** bridges the gap between tech professionals, fresh graduates, and the expanding technology ecosystem of West Bengal. Unlike generic job boards with unverified listings, ghost positions, and vague locations, Kolkata Job Map is built from the ground up on **geospatial precision**:

- **Real Office Locations:** Pinpointed coordinates of corporate headquarters and delivery centers in major tech parks (DLF 1 & 2, Candor TechSpace, Ecospace, Gitanjali Park, Godrej Genesis, Webel STP, etc.).
- **Live Verification Status:** Each listing and office is categorized with confidence ratings (`High Confidence`, `Recently Verified`, `Official Source Verified`).
- **Commute Estimation:** Instant transit (Metro Line 2 / Green Line, Suburban Rail, Bus), driving, two-wheeler, and walking commute estimates from 50+ iconic Kolkata landmarks and custom GPS locations.
- **Fresher & Student Focus:** Dedicated filters for 0-1 year experience, graduate trainee drives (TCS Digital/Ninja, Cognizant GenC, Wipro Elite), and tech internships.
- **Real-Time Live Hiring Stream:** Live event ticker broadcasting newly verified openings directly from recruiters and verified company portals.

---

## 🚀 Key Features

### 🗺️ 1. Interactive Geospatial Map Engine
- Custom-styled high-contrast cartography powered by **Leaflet** and **React-Leaflet** with zero SSR flash.
- Color-coded pins for hiring intensity:
  - 🟢 **Actively Hiring:** Verified open tech roles
  - 🟣 **Fresher Friendly:** Explicit openings for 0-1 YOE & fresh graduates
  - ⚪ **Office Listed:** Verified office footprint with periodic monitoring
- Dynamic bounding and auto-centering on office complexes when selecting companies from the directory.
- Fast switching between **Salt Lake Sector V**, **New Town Rajarhat**, **Bantala IT SEZ**, **Kasba Ruby Connector**, and **Park Street CBD**.

### ⏱️ 2. Hyper-Local Commute Calculator
- Select from **50+ curated Kolkata transit junctions & neighborhoods**:
  - *Transit Terminals:* Howrah Station, Sealdah Station, Kolkata Airport (CCU), Santragachi
  - *Central Hubs:* Park Street, Esplanade, Victoria / Exide, Chandni Chowk, College Street
  - *IT & Suburbs:* Karunamoyee, Biswa Bangla Gate, Chinar Park, Eco Park, Kestopur, Baguiati
  - *South Kolkata:* Gariahat, Jadavpur 8B, South City, Ruby Crossing, Garia / Kavi Nazrul Metro
  - *North & Howrah:* Shyambazar, Dum Dum Junction, Dunlop, Bally, Nabanna
- Accurate commute breakdown:
  - 🚇 **Metro & Public Transit** (factoring East-West Green Line & Blue Line connections)
  - 🚗 **Car / Cab**
  - 🛵 **Two-Wheeler**
  - 🚶 **Walking**
- Filter jobs directly by **Maximum Commute Time** (e.g., `< 30 mins`, `< 45 mins`).

### 💼 3. Dual-Channel Application System
- **Direct Platform Application:** Instant in-app apply modal with resume attachment, portfolio/LinkedIn/GitHub links, and automated email dispatch to hiring teams.
- **Official Career Portal Redirection:** Direct deep-links to official ATS systems (Workday, Greenhouse, Lever, TCS iON, Infosys Careers, Cognizant 2X) with zero spam intermediaries.
- **My Applications Tracker:** Local tracking dashboard keeping tabs on applied roles, submitted dates, tracking codes, and status updates (`Submitted`, `Under Review`, `Interview Scheduled`).

### ⚡ 4. Real-Time Hiring Stream & Alerts
- Real-time Server-Sent Events / Polling API (`/api/events/live-hiring`) broadcasting newly opened positions across the city.
- Non-intrusive hiring toasts informing users of newly verified openings in real time.
- Configurable **Job Alerts Modal** with custom role criteria, commute thresholds, and notification frequencies.

### 🛡️ 5. Crowdsourced Verification & Admin Suite
- **Community Issue Reporting:** Report incorrect office coordinates, company relocations, or expired job postings.
- **Admin Control Panel:** Review community reports, inspect verification confidence metrics, and broadcast live hiring events.
- **Live Sync & Onboarding Engine:** Register newly opened tech offices and startup hubs across Kolkata with instant coordinate validation.

---

## 🏢 Covered Tech Hubs & Corridors

| Corridor / Region | Major Landmarks & Tech Parks | Representative Companies |
| :--- | :--- | :--- |
| **Salt Lake Sector V** | Godrej Genesis, Infinity Benchmark, Webel STP, RDB Boulevard, SDF Building | PwC India, Cognizant, Wipro, Ericsson, Tech Mahindra, ITC Infotech |
| **New Town Action Area I & II** | DLF 1 & 2, Candor TechSpace, Ecospace Business Park, Mani Casadona | Capgemini, IBM, Tata Elxsi, LTIMindtree, British Telecom, Genpact |
| **New Town Action Area III** | TCS Gitanjali Park, Bengal Silicon Valley Tech Hub | Tata Consultancy Services (TCS), Reliance Jio Intelligence Hub |
| **Bantala IT SEZ** | Cognizant Bantala Campus, Tech Mahindra Special Economic Zone | Cognizant Technology Solutions, Tech Mahindra |
| **Kasba & E.M. Bypass** | Acropolis Mall Commercial Towers, Siemens Building, Megh Mallar | Siemens, Lexmark, Exide IT, Regional FinTech Offices |
| **Central CBD** | Park Street, Camac Street, Chowringhee, Shakespeare Sarani | ITC Limited HQ, Tata Steel Downtown, Berger Paints Tech Unit |

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components & Dynamic Client Modules)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) for strict type safety
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) with PostCSS
- **Geospatial Visualization:** [Leaflet 1.9](https://leafletjs.com/) & [React-Leaflet 4.2](https://react-leaflet.js.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** Google Fonts (`Poppins`)

### **Backend & APIs (Next.js Route Handlers)**
- `/api/companies` — Search, filter, and paginate verified Kolkata companies
- `/api/jobs` — Retrieve active roles with multi-dimensional filtering
- `/api/applications` — Ingest direct applications with payload validation
- `/api/events/live-hiring` — Real-time stream of newly verified hiring actions
- `/api/sync` — Live sync stats and database telemetry

### **Utilities & Communications**
- **Mailing Engine:** [Nodemailer](https://nodemailer.com/) for candidate application dispatch & recruiter alerts
- **Security:** HTTP security headers, XSS prevention, payload sanitization, Strict-Transport-Security, and Content-Security-Policy settings

---

## 📁 Project Structure

```text
kolkata-job-map/
├── .github/                     # GitHub workflows and issue templates
├── public/                      # Static assets, branding, and metadata
├── src/
│   ├── app/
│   │   ├── api/                 # Next.js API route handlers
│   │   │   ├── applications/    # Job application submission handler
│   │   │   ├── companies/       # Company directory endpoints
│   │   │   ├── events/          # Live hiring SSE / polling endpoint
│   │   │   ├── jobs/            # Job query & filter endpoint
│   │   │   └── sync/            # Data freshness and sync metrics
│   │   ├── globals.css          # Tailwind base & custom scrollbar styles
│   │   ├── layout.tsx           # Root layout, metadata & JSON-LD schema
│   │   ├── page.tsx             # Main geospatial split-screen dashboard
│   │   ├── robots.ts            # Dynamic SEO robots.txt generator
│   │   └── sitemap.ts           # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── admin/               # Admin panel & review moderation
│   │   ├── alerts/              # Job alert creation modal
│   │   ├── applications/        # Native application submission drawer
│   │   ├── brand/               # Brand logos and vector graphics
│   │   ├── commute/             # Location selector & commute estimates
│   │   ├── company/             # Company details, drawer & office cards
│   │   ├── dashboard/           # Saved companies & My Applications drawer
│   │   ├── directory/           # Sidebar company list & search filters
│   │   ├── filters/             # Multi-faceted filter drawer
│   │   ├── header/              # Navigation bar, stats counter & actions
│   │   ├── jobs/                # Job detail cards & screening questions
│   │   ├── map/                 # Leaflet interactive map engine
│   │   ├── notifications/       # In-app notification drawer & live toasts
│   │   ├── reports/             # Community issue reporting modal
│   │   ├── sync/                # Live sync modal & telemetry display
│   │   └── verification/        # Verification methodology explainer modal
│   ├── context/
│   │   └── AppContext.tsx       # Global state (filters, location, drawers)
│   ├── data/
│   │   └── kolkataData.ts       # 9,000+ line curated dataset of Kolkata IT
│   ├── types/
│   │   └── index.ts             # TypeScript definitions & data models
│   └── utils/
│       ├── commute.ts           # Distance computation & travel estimation
│       └── mailer.ts            # Nodemailer integration & HTML templates
├── next.config.js               # Next.js configuration & security headers
├── package.json                 # Project dependencies and npm scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind theme customizations
└── tsconfig.json                # TypeScript compiler configuration
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or later (LTS recommended)
- **npm** (v9+) or **yarn** / **pnpm** / **bun**

### 1. Clone the Repository
```bash
git clone https://github.com/Jishnu09-siuu/Kolkata-Job-Map.git
cd Kolkata-Job-Map
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Base URL for metadata, OpenGraph, sitemaps & canonical URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# (Optional) SMTP Mailer credentials for sending application emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Kolkata Job Map <no-reply@kolkatajobmap.in>"

# (Optional) Override recipient for testing application emails
RECRUITER_OVERRIDE_EMAIL=test-receiver@example.com
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the interactive map.

### 5. Production Build & Validation
```bash
npm run build
npm run start
```

---

## 🔍 SEO & Search Engine Indexing

Kolkata Job Map implements full technical SEO best practices:
- **JSON-LD Schema Markup:** Automatically renders `JobPosting` and `Organization` structured data for rich snippets in Google Jobs.
- **Dynamic OpenGraph & Twitter Cards:** Rich social preview cards highlighting Kolkata IT opportunities.
- **Sitemap & Robots:** Automatic generation of [`/sitemap.xml`](https://kolkata-job-map.vercel.app/sitemap.xml) and [`/robots.txt`](https://kolkata-job-map.vercel.app/robots.txt).
- **Responsive Viewport:** Optimized for mobile screens, tablets, and ultrawide desktop monitors.

---

## 🤝 Contributing

Contributions are welcome! If you want to add newly verified Kolkata companies, update tech park coordinates, or suggest new features:

1. **Fork** the repository
2. **Create your feature branch:**
   ```bash
   git checkout -b feature/add-new-company
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Add Webel IT Park Phase II companies"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/add-new-company
   ```
5. **Open a Pull Request** with details of the verified office or feature.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ for the Kolkata tech community, engineering graduates, and software developers across Bengal.</sub>
</div>
