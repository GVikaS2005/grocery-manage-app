const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const { getNearbyStores, CITIES, CHAINS } = require('./services/locationService');
const { SHOPPING_MALLS, STORES } = require('./data/storesData');
const offerService = require('./services/offerService');
const lifecycleEngine = require('./services/lifecycleEngine');
const optimizerService = require('./services/optimizerService');
const scraperService = require('./services/scraperService');
const flyerAnalyzerModel = require('./services/flyerAnalyzerModel');
const supabaseService = require('./services/supabaseService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Periodic lifecycle check: runs on the hour
cron.schedule('0 * * * *', () => {
  console.log('[Cron] Checking weekly leaflet offer validity dates...');
  lifecycleEngine.checkAndAutoRotate();
});

// -------------------------------------------------------------
// 1. HEALTH & METADATA
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'SupaGrocer SK - Smart Grocery Deal Tracker',
    serverTime: new Date().toISOString(),
    country: 'Slovakia (SK)',
    supportedChains: Object.keys(CHAINS)
  });
});

// -------------------------------------------------------------
// 2. LOCATION & STORES (Step 1)
// -------------------------------------------------------------
app.get('/api/location/cities', (req, res) => {
  res.json({
    success: true,
    cities: CITIES,
    defaultCity: 'bratislava'
  });
});

app.post('/api/location/stores', (req, res) => {
  const { lat, lng, cityId, maxDistanceKm, chainFilter } = req.body || {};
  const data = getNearbyStores({
    lat: lat ? parseFloat(lat) : null,
    lng: lng ? parseFloat(lng) : null,
    cityId,
    maxDistanceKm: maxDistanceKm ? parseFloat(maxDistanceKm) : 35,
    chainFilter
  });
  res.json({ success: true, ...data });
});

app.get('/api/stores', (req, res) => {
  res.json({
    success: true,
    chains: Object.values(CHAINS),
    totalStores: STORES.length,
    malls: SHOPPING_MALLS
  });
});

// -------------------------------------------------------------
// 3. OFFERS & COMPARISON MATRIX (Step 2 & 3)
// -------------------------------------------------------------
app.get('/api/offers/matrix', (req, res) => {
  // Check if current cycle expired before serving
  lifecycleEngine.checkAndAutoRotate();

  const { category, search, onlyOffers, sortBy } = req.query;
  const matrix = offerService.getComparisonMatrix({
    category,
    search,
    onlyOffers: onlyOffers === 'true',
    sortBy
  });
  const lifecycle = lifecycleEngine.getLifecycleStatus();

  res.json({
    success: true,
    lifecycle,
    ...matrix
  });
});

app.get('/api/offers/upcoming', (req, res) => {
  const upcoming = offerService.getUpcomingMatrix();
  res.json({
    success: true,
    ...upcoming
  });
});

app.get('/api/offers/leaflets', (req, res) => {
  const leaflets = offerService.getLeaflets();
  res.json({
    success: true,
    count: leaflets.length,
    leaflets
  });
});

// -------------------------------------------------------------
// 4. AUTOMATED LIFECYCLE & PRESCRIBED LIST (Step 4)
// -------------------------------------------------------------
app.get('/api/offers/lifecycle', (req, res) => {
  const status = lifecycleEngine.getLifecycleStatus();
  res.json({
    success: true,
    ...status
  });
});

// Manual trigger to simulate weekly offer expiration & rollover
app.post('/api/offers/simulate-rotation', (req, res) => {
  const result = lifecycleEngine.rotateCycle('Manuálna simulácia expirácie letáku a rotácie nových ponúk');
  res.json(result);
});

// Get current or generated prescribed grocery list
app.get('/api/prescriptions/current', (req, res) => {
  const prescription = lifecycleEngine.prescribedListHistory[0] || lifecycleEngine.generatePrescribedList();
  res.json({
    success: true,
    prescription
  });
});

// -------------------------------------------------------------
// 5. SMART BASKET & OPTIMIZER ("Fix where to buy where")
// -------------------------------------------------------------
app.post('/api/optimizer/split', (req, res) => {
  const { items, manualOverrides } = req.body || {};
  const result = optimizerService.optimizeBasket(items, manualOverrides);
  res.json({
    success: true,
    ...result
  });
});

// -------------------------------------------------------------
// 6. SCRAPER & PUBLIC FLYER SYNC
// -------------------------------------------------------------
app.post('/api/offers/sync-scrape', async (req, res) => {
  const result = await scraperService.syncPublicOffers();
  res.json(result);
});

app.get('/api/offers/sync-status', (req, res) => {
  res.json(scraperService.getLastSync());
});

// -------------------------------------------------------------
// 7. AI FLYER ANALYZER MODEL & INGESTION
// -------------------------------------------------------------
app.post('/api/flyers/analyze', async (req, res) => {
  const result = await flyerAnalyzerModel.analyzeFlyers();
  res.json(result);
});

app.get('/api/flyers/stats', (req, res) => {
  res.json(flyerAnalyzerModel.getStats());
});

// -------------------------------------------------------------
// 8. DATABASE & SUPABASE CONNECTION STATUS
// -------------------------------------------------------------
app.get('/api/database/status', async (req, res) => {
  const configured = supabaseService.isConfigured();
  if (!configured) {
    return res.json({
      success: true,
      provider: 'supabase',
      configured: false,
      mode: 'in-memory-high-fidelity-catalog',
      message: 'Supabase credentials not configured in environment. The application is running using the local high-fidelity Slovak grocery catalog.'
    });
  }

  const check = await supabaseService.checkConnection();
  res.json({
    success: true,
    provider: 'supabase',
    configured: true,
    connected: check.connected,
    details: check
  });
});

// -------------------------------------------------------------
// 7. SERVE STATIC FRONTEND (dist)
// -------------------------------------------------------------
const distPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  console.log(`📦 Serving static client from: ${distPath}`);
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 SupaGrocer Unified App running on http://localhost:${PORT}`);
    console.log(`📍 Supported Stores: Kaufland, Lidl, Billa, Tesco, FRESH`);
    console.log(`🕒 Automated Offer Date & Expiration Engine: ACTIVE`);
    console.log(`🌐 Open http://localhost:${PORT} in your browser`);
    console.log(`====================================================`);
  });
}

module.exports = app;
