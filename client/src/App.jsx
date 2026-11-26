import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ComparisonMatrix from './components/ComparisonMatrix';
import SmartBasket from './components/SmartBasket';
import StoreLocator from './components/StoreLocator';
import LifecyclePrescriptions from './components/LifecyclePrescriptions';
import LeafletsView from './components/LeafletsView';
import NotificationBanner from './components/NotificationBanner';
import FlyerAnalyzerModal from './components/FlyerAnalyzerModal';
import WeeklySmartFlyer from './components/WeeklySmartFlyer';
import { translations } from './data/translations';
import { api } from './services/api';
import confetti from 'canvas-confetti';

export default function App() {
  const [lang, setLang] = useState('sk');
  const t = translations[lang] || translations.sk;

  // Navigation
  const [activeTab, setActiveTab] = useState('flyer');

  // Location
  const [cities, setCities] = useState([
    { id: 'bratislava', name: 'Bratislava', isCapital: true },
    { id: 'kosice', name: 'Košice' },
    { id: 'zilina', name: 'Žilina' },
    { id: 'nitra', name: 'Nitra' },
    { id: 'banska_bystrica', name: 'Banská Bystrica' },
    { id: 'trnava', name: 'Trnava' },
    { id: 'presov', name: 'Prešov' },
    { id: 'trencin', name: 'Trenčín' },
    { id: 'poprad', name: 'Poprad' }
  ]);
  const [selectedCity, setSelectedCity] = useState('bratislava');
  const [userCoords, setUserCoords] = useState(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [storesData, setStoresData] = useState(null);

  // Matrix & Filter State
  const [matrixItems, setMatrixItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [sortBy, setSortBy] = useState('discount');

  // Basket & Optimization ("Fix where to buy where")
  const [basket, setBasket] = useState([
    { itemId: 'maslo-250g', quantity: 1 },
    { itemId: 'mlieko-15-1l', quantity: 2 },
    { itemId: 'vajcia-10ks', quantity: 1 },
    { itemId: 'chlieb-psenicno-razny-500g', quantity: 1 },
    { itemId: 'banany-1kg', quantity: 2 },
    { itemId: 'kuracie-rezne-1kg', quantity: 1 }
  ]);
  const [manualOverrides, setManualOverrides] = useState({});
  const [optimization, setOptimization] = useState(null);

  // Lifecycle & Prescriptions
  const [lifecycle, setLifecycle] = useState(null);
  const [prescription, setPrescription] = useState(null);
  const [leaflets, setLeaflets] = useState([]);
  const [notification, setNotification] = useState(null);

  // Loading States
  const [isRotating, setIsRotating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState(null);

  // AI Flyer Analyzer Model State
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isAnalyzingFlyers, setIsAnalyzingFlyers] = useState(false);
  const [analyzerResult, setAnalyzerResult] = useState(null);

  // Initial Load
  useEffect(() => {
    loadInitialData();
  }, []);

  // Reload stores when city changes
  useEffect(() => {
    loadStores();
  }, [selectedCity, userCoords]);

  // Reload matrix when filters change
  useEffect(() => {
    loadMatrix();
  }, [selectedCategory, searchQuery, onlyOffers, sortBy]);

  // Recalculate basket optimization when basket or overrides change
  useEffect(() => {
    recalculateOptimization();
  }, [basket, manualOverrides]);

  const loadInitialData = async () => {
    try {
      // 1. Cities
      const citiesRes = await api.getCities().catch(() => null);
      if (citiesRes?.cities) setCities(citiesRes.cities);

      // 2. Stores
      await loadStores();

      // 3. Matrix
      await loadMatrix();

      // 4. Lifecycle & Prescription
      const lfRes = await api.getLifecycle().catch(() => null);
      if (lfRes) setLifecycle(lfRes);

      const rxRes = await api.getCurrentPrescription().catch(() => null);
      if (rxRes?.prescription) setPrescription(rxRes.prescription);

      // 5. Leaflets
      const leafletsRes = await api.getLeaflets().catch(() => null);
      if (leafletsRes?.leaflets) setLeaflets(leafletsRes.leaflets);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  const loadStores = async () => {
    try {
      const res = await api.getNearbyStores({
        cityId: selectedCity,
        lat: userCoords?.lat,
        lng: userCoords?.lng
      });
      if (res.success) {
        setStoresData(res);
      }
    } catch (err) {
      console.error('Failed to load nearby stores:', err);
    }
  };

  const loadMatrix = async () => {
    try {
      const res = await api.getMatrix({
        category: selectedCategory,
        search: searchQuery,
        onlyOffers: onlyOffers ? 'true' : 'false',
        sortBy
      });

      if (res.success) {
        setMatrixItems(res.items || []);
        if (res.categories) setCategories(res.categories);
        if (res.lifecycle) setLifecycle(res.lifecycle);
      }
    } catch (err) {
      console.error('Failed to load comparison matrix:', err);
    }
  };

  const recalculateOptimization = async () => {
    try {
      if (basket.length === 0) {
        setOptimization({ isEmpty: true });
        return;
      }
      const res = await api.optimizeBasket(basket, manualOverrides);
      if (res.success) {
        setOptimization(res);
      }
    } catch (err) {
      console.error('Failed to recalculate optimization:', err);
    }
  };

  // Add Item to Basket
  const handleAddToBasket = (item) => {
    setBasket((prev) => {
      const existing = prev.find((b) => b.itemId === item.id);
      if (existing) {
        return prev.map((b) =>
          b.itemId === item.id ? { ...b, quantity: b.quantity + 1 } : b
        );
      }
      return [...prev, { itemId: item.id, quantity: 1 }];
    });
  };

  // Remove or decrement
  const handleRemoveFromBasket = (itemId) => {
    setBasket((prev) => {
      const existing = prev.find((b) => b.itemId === itemId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((b) => b.itemId !== itemId);
      }
      return prev.map((b) =>
        b.itemId === itemId ? { ...b, quantity: b.quantity - 1 } : b
      );
    });
  };

  // Add all staple items to basket
  const handleAddAllStaples = () => {
    const stapleIds = [
      'maslo-250g',
      'mlieko-15-1l',
      'vajcia-10ks',
      'kuracie-rezne-1kg',
      'chlieb-psenicno-razny-500g',
      'banany-1kg',
      'zemiaky-25kg',
      'olej-slnecnicovy-1l',
      'cukor-krystalovy-1kg',
      'muka-hladka-1kg'
    ];

    setBasket((prev) => {
      const currentMap = new Map(prev.map((b) => [b.itemId, b.quantity]));
      stapleIds.forEach((id) => {
        if (!currentMap.has(id)) {
          currentMap.set(id, 1);
        }
      });
      return Array.from(currentMap.entries()).map(([itemId, quantity]) => ({ itemId, quantity }));
    });

    confetti({ particleCount: 70, spread: 50, origin: { y: 0.7 } });
  };

  // Manual Override: "Fix where to buy where"
  const handleOverrideStore = (itemId, chainId) => {
    setManualOverrides((prev) => ({
      ...prev,
      [itemId]: chainId
    }));
  };

  const handleClearBasket = () => {
    setBasket([]);
    setManualOverrides({});
  };

  // Simulate flyer validity expiration & automated rotation (Step 4)
  const handleSimulateRotation = async () => {
    setIsRotating(true);
    try {
      const res = await api.simulateRotation();
      if (res.success) {
        // Refresh matrix and prescription
        await loadMatrix();
        const lfRes = await api.getLifecycle();
        if (lfRes) setLifecycle(lfRes);

        if (res.newPrescription) {
          setPrescription(res.newPrescription);
        }

        setNotification({
          title: t.newFlyersActive,
          message: `${res.message} ${res.activeCycle} (Platnosť do: ${new Date(res.validUntil).toLocaleDateString()})`
        });

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.4 }
        });
      }
    } catch (err) {
      console.error('Rotation failed:', err);
    } finally {
      setIsRotating(false);
    }
  };

  // Load prescription into active basket
  const handleLoadPrescriptionToBasket = (rx) => {
    if (!rx?.storeSplits) return;
    const newBasket = [];
    const newOverrides = {};

    rx.storeSplits.forEach((split) => {
      split.items.forEach((it) => {
        newBasket.push({ itemId: it.id, quantity: 1 });
        newOverrides[it.id] = split.chainId;
      });
    });

    setBasket(newBasket);
    setManualOverrides(newOverrides);
    setActiveTab('basket');
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
  };

  // Use GPS location (Step 1)
  const handleUseGps = () => {
    if (!navigator.geolocation) {
      alert('Geolokácia nie je podporovaná vo vašom prehliadači.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsDetectingLocation(false);
      },
      (err) => {
        console.warn('Geolocation denied or unavailable:', err);
        setIsDetectingLocation(false);
      },
      { timeout: 7000 }
    );
  };

  // Sync public web leaflets
  const handleSyncPublicFlyers = async () => {
    setIsSyncing(true);
    try {
      const res = await api.syncPublicFlyers();
      setLastSyncResult(res);
      await loadInitialData();
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Run AI Flyer Analyzer Model
  const handleRunFlyerAnalysis = async () => {
    setIsAnalyzingFlyers(true);
    try {
      const res = await api.analyzeFlyers();
      setAnalyzerResult(res);
      await loadInitialData();
      setNotification({
        title: 'AI Analýza letákov úspešná!',
        message: 'Boli stiahnuté letáky aktuálneho aj budúceho týždňa a načítaných 85+ detailných odrôd tovaru.'
      });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    } catch (err) {
      console.error('Flyer analysis failed:', err);
    } finally {
      setIsAnalyzingFlyers(false);
    }
  };

  const totalBasketItems = basket.reduce((sum, b) => sum + b.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col antialiased">
      {/* Top Banner Alert (Shown when flyers rotate or new offers are live) */}
      <NotificationBanner
        notification={notification}
        onClose={() => setNotification(null)}
        onViewPrescription={() => {
          setNotification(null);
          setActiveTab('lifecycle');
        }}
      />

      {/* Main App Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        cities={cities}
        lang={lang}
        setLang={setLang}
        t={t}
        lifecycle={lifecycle}
        basketCount={totalBasketItems}
        onSimulateRotation={handleSimulateRotation}
        isRotating={isRotating}
        onOpenModelModal={() => setIsModelModalOpen(true)}
      />

      {/* AI Flyer Analyzer Modal */}
      <FlyerAnalyzerModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        onRunAnalysis={handleRunFlyerAnalysis}
        isAnalyzing={isAnalyzingFlyers}
        analysisResult={analyzerResult}
        t={t}
        lang={lang}
      />

      {/* App Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
        {activeTab === 'flyer' && (
          <WeeklySmartFlyer
            matrixItems={matrixItems}
            basket={basket}
            onAddToBasket={handleAddToBasket}
            onRemoveFromBasket={handleRemoveFromBasket}
            lifecycle={lifecycle}
            t={t}
            lang={lang}
          />
        )}

        {activeTab === 'matrix' && (
          <ComparisonMatrix
            matrixData={matrixItems}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onlyOffers={onlyOffers}
            setOnlyOffers={setOnlyOffers}
            sortBy={sortBy}
            setSortBy={setSortBy}
            basket={basket}
            onAddToBasket={handleAddToBasket}
            onRemoveFromBasket={handleRemoveFromBasket}
            onAddAllStaples={handleAddAllStaples}
            t={t}
            lang={lang}
          />
        )}

        {activeTab === 'basket' && (
          <SmartBasket
            basket={basket}
            optimization={optimization}
            manualOverrides={manualOverrides}
            onOverrideStore={handleOverrideStore}
            onRemoveItem={handleRemoveFromBasket}
            onClearBasket={handleClearBasket}
            t={t}
            lang={lang}
          />
        )}

        {activeTab === 'stores' && (
          <StoreLocator
            storesData={storesData}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
            onUseGps={handleUseGps}
            isDetectingLocation={isDetectingLocation}
            t={t}
            lang={lang}
          />
        )}

        {activeTab === 'lifecycle' && (
          <LifecyclePrescriptions
            lifecycle={lifecycle}
            prescription={prescription}
            onSimulateRotation={handleSimulateRotation}
            onLoadPrescriptionToBasket={handleLoadPrescriptionToBasket}
            isRotating={isRotating}
            t={t}
            lang={lang}
          />
        )}

        {activeTab === 'leaflets' && (
          <LeafletsView
            leaflets={leaflets}
            onSyncPublicFlyers={handleSyncPublicFlyers}
            isSyncing={isSyncing}
            lastSyncResult={lastSyncResult}
            t={t}
            lang={lang}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm">SupaGrocer SK</span>
            <span>• Inteligentný monitor supermarketových akcií & letákov</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Obchody: Kaufland • Lidl • Billa • Tesco • FRESH</span>
            <span>Krajina: Slovensko (SK)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
