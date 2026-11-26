# grocery-manage-app (SupaGrocer SK 🛒🇸🇰)
> This application is designed for tracking stores and their discounts only in Slovakia. You can use this open source project and develop it for your area or country.

### Smart Grocery Deal & Leaflet Tracker with Automated Flyer Lifecycle Rotation

A web application designed for users in Slovakia (and surrounding regions) to track, compare, and optimize grocery shopping across major supermarket chains: **Kaufland, Lidl, Billa, Tesco, and FRESH / FRESH Plus**, as well as shopping malls.

---

## 🌟 Key Features

### 1. 📍 Step 1: Location & Nearby Store / Mall Discovery
- **Automatic Geolocation / GPS Detection**: Gets user coordinates and detects nearby supermarket branches with exact distances in km and estimated driving/walking time.
- **Slovak Cities Coverage**: Pre-configured with stores across major Slovak cities: **Bratislava, Košice, Žilina, Nitra, Banská Bystrica, Trnava, Prešov, Trenčín, and Poprad**.
- **Shopping Malls Directory**: Includes major retail hubs with supermarkets: Eurovea, Nivy Mall, Avion Shopping Park, Aupark, Optima Košice, Mirage Žilina.
- **Store Amenities & Hours**: Detailed info for each branch (Opening hours, In-store Bakery, Bottle recycling deposit machine `Zálohomat`, EV charging, Parking).

### 2. 📊 Step 2 & 3: Multi-Store Comparison Matrix ("Compare Offers in Table Format")
- **Side-by-Side Supermarket Price Grid**:
  - Columns for **Kaufland, Lidl, Billa, Tesco, FRESH**.
  - Highlights the **Lowest Price** with a distinctive green badge and discount percentage.
  - Compares unit prices (€/kg, €/liter, €/piece).
  - Category filters: *Mliečne & Vajcia (Dairy), Mäso & Hydina (Meat), Pečivo (Bakery), Ovocie & Zelenina (Produce), Špajza (Pantry), Nápoje & Pivo (Drinks), Drogéria (Household)*.
  - Search by keyword with instant autocomplete.
  - Sort by: *Highest Discount (%), Lowest Price (€), Highest Price (€), Alphabetical (A-Z)*.
  - Quick action: **"Add All Essentials / Pridať základné potraviny"** to populate a weekly basket in one click.

### 3. 🛒 Step 3: Smart Basket & "Where to Buy Where" Split Optimizer
- **Solves Shopping Confusion**:
  - Automatically splits your grocery basket into store-by-store shopping lists so you buy each product where it is cheapest.
  - Displays subtotals per store, items to pick, and total money saved.
- **Single-Store Alternative Comparison**:
  - Shows what your list would cost if you bought everything at a single supermarket (e.g., Kaufland €18.20 vs Lidl €17.50 vs Billa €23.10 vs Smart Split €14.80).
- **Manual Store Assignment Override**:
  - Allows you to change the store for any item with a dropdown if you prefer not to visit a specific shop.
- **In-Store Checklist Mode**:
  - Check off items while walking through supermarket aisles.
  - Print/Export friendly shopping checklist.

### 4. 📅 Step 4: Automated Offer Date Analysis, Expiry & Rotation Engine
- **Autonomous Lifecycle Tracking**:
  - Automatically analyzes weekly offer start and end dates (`validFrom` -> `validUntil`).
  - Active background cron job continuously monitors expiration.
  - Live countdown clock: Displays exact time remaining before leaflets expire (e.g., `2d 14h 23m`).
- **End-of-Period Automatic Replacement**:
  - When the current offer date ends, the app **automatically replaces old prices with the new upcoming cycle** and archives past deals.
  - **Auto-Generated Prescribed Grocery List**: Synthesizes a newly prescribed weekly shopping plan with fresh deals, top discounts, and recommended store splits.
  - **Live Alert Banner**: Notifies users when a new flyer cycle has been activated.
- **Simulation Hook**:
  - A prominent **"Simulovať rotáciu letákov (Simulate Rotation)"** button allows users to test the automatic expiration and replacement in real-time.

### 5. 📰 Step 5: Public Leaflet Aggregator & Scraper
- Direct links and digital flyer cards for official Slovak supermarket portals:
  - Kaufland: `kaufland.sk/aktualne-letaky.html`
  - Lidl: `lidl.sk/c/online-letaky/s10022472`
  - Billa: `billa.sk/akcie/aktualny-letak`
  - Tesco: `tesco.sk/akciove-letaky/`
  - FRESH: `potravinyfresh.sk/letaky`
- "Sync Public Web Flyers" button that tests live connectivity to official retailer sites.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)

### Running the Application

1. **Start the Unified Server** (serves both API and frontend on port 5000):
   ```bash
   npm start
   ```

2. Open your web browser at:
   ```
   http://localhost:5000
   ```

3. **Development Mode (Optional)**:
   - Run backend server:
     ```bash
     npm run server
     ```
   - In another terminal, run Vite client with hot-module reload:
     ```bash
     npm run client
     ```
   - Open `http://localhost:3000` (automatically proxies `/api` calls to port 5000).

---

## 📁 Project Structure

```
Grocery Manage App/
├── client/                     # Vite + React + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Top bar, location selector, countdown, simulation trigger
│   │   │   ├── ComparisonMatrix.jsx     # Side-by-side supermarket price comparison table
│   │   │   ├── SmartBasket.jsx          # "Where to buy where" split optimizer & single-store compare
│   │   │   ├── StoreLocator.jsx         # Nearby stores, distances, opening hours & shopping malls
│   │   │   ├── LifecyclePrescriptions.jsx # Expiry countdown & newly prescribed weekly plans
│   │   │   ├── LeafletsView.jsx         # Official public leaflet portals & sync scraper
│   │   │   └── NotificationBanner.jsx   # Alert banner when new flyer cycle activates
│   │   ├── data/
│   │   │   └── translations.js          # Bilingual Slovak (SK) & English (EN) dictionary
│   │   ├── services/
│   │   │   └── api.js                   # Client REST API wrapper
│   │   ├── App.jsx                      # Main application orchestrator & state
│   │   └── index.css                    # Tailwind CSS v4 styling & print rules
│   ├── index.html
│   └── vite.config.js                   # Vite configuration with proxy to port 5000
│
├── server/                     # Node.js + Express Backend Engine
│   ├── data/
│   │   ├── storesData.js                # Slovak stores, chains, coordinates & shopping malls
│   │   └── productsData.js              # Grocery products catalog, prices, and weekly cycles
│   ├── services/
│   │   ├── locationService.js           # Haversine distance calculator & store finder
│   │   ├── offerService.js              # Price matrix builder & lowest-price evaluator
│   │   ├── lifecycleEngine.js           # Automated offer expiration & new prescription engine
│   │   ├── optimizerService.js          # Multi-store split solver & basket optimizer
│   │   └── scraperService.js            # Public supermarket leaflet fetcher & sync
│   └── index.js                         # Express server, REST endpoints & hourly cron scheduler
│
└── package.json
```

---

## 🇸🇰 Supported Supermarkets in Slovakia
| Chain | Website | Typical Leaflet Validity | Loyalty Program |
| :--- | :--- | :--- | :--- |
| **Kaufland** | [kaufland.sk](https://www.kaufland.sk) | Thursday → Wednesday | Kaufland Card |
| **Lidl** | [lidl.sk](https://www.lidl.sk) | Monday → Sunday / Thursday specials | Lidl Plus |
| **Billa** | [billa.sk](https://www.billa.sk) | Wednesday → Tuesday | Billa Bonus |
| **Tesco** | [tesco.sk](https://tesco.sk) | Wednesday → Tuesday | Clubcard |
| **FRESH / FRESH Plus** | [potravinyfresh.sk](https://potravinyfresh.sk) | Thursday → Wednesday (Bi-weekly) | Fresh Karta |
