const offerService = require('./offerService');
const { CHAINS } = require('../data/storesData');

class LifecycleEngine {
  constructor() {
    this.lastCheckTime = new Date().toISOString();
    this.autoRotationEnabled = true;
    this.prescribedListHistory = [];
  }

  /**
   * Check lifecycle status and time remaining for current weekly leaflets
   */
  getLifecycleStatus() {
    const now = new Date();
    const validUntil = new Date(offerService.currentCycle.validUntil);
    const validFrom = new Date(offerService.currentCycle.validFrom);

    const diffMs = validUntil.getTime() - now.getTime();
    const isExpired = diffMs <= 0;

    const daysRemaining = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    const hoursRemaining = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutesRemaining = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)));

    return {
      currentCycleId: offerService.currentCycle.cycleId,
      currentCycleName: offerService.currentCycle.cycleName,
      validFrom: offerService.currentCycle.validFrom,
      validUntil: offerService.currentCycle.validUntil,
      upcomingCycleId: offerService.upcomingCycle.cycleId,
      upcomingCycleName: offerService.upcomingCycle.cycleName,
      upcomingValidFrom: offerService.upcomingCycle.validFrom,
      upcomingValidUntil: offerService.upcomingCycle.validUntil,
      isExpired,
      isExpiringSoon: daysRemaining <= 1,
      timeRemaining: {
        totalMs: Math.max(0, diffMs),
        days: daysRemaining,
        hours: hoursRemaining,
        minutes: minutesRemaining,
        formatted: `${daysRemaining}d ${hoursRemaining}h ${minutesRemaining}m`
      },
      lastCheckTime: this.lastCheckTime,
      totalCyclesRotated: offerService.rotationHistory.length - 1
    };
  }

  /**
   * Generates a "Prescribed Smart Grocery List" based on current active offers.
   * Curates must-have staples and highest discount items, prescribing the optimal store for each.
   */
  generatePrescribedList() {
    const items = offerService.currentCycle.items.map((item) => offerService.enrichItem(item));

    // Group items by recommended store
    const storeSplits = {};
    Object.keys(CHAINS).forEach((chainId) => {
      storeSplits[chainId] = {
        chainId,
        chainName: CHAINS[chainId].name,
        brandColor: CHAINS[chainId].brandColor,
        loyaltyProgram: CHAINS[chainId].loyaltyProgram,
        items: [],
        subtotal: 0,
        subtotalRegular: 0,
        savings: 0
      };
    });

    let totalPrescribedCost = 0;
    let totalRegularCost = 0;

    // Select the top deals and staple items
    const selectedDeals = items.filter(
      (item) => item.isStaple || item.maxSavingsPercent >= 30
    );

    selectedDeals.forEach((item) => {
      const bestStore = item.lowestStore;
      if (storeSplits[bestStore]) {
        storeSplits[bestStore].items.push({
          id: item.id,
          nameSk: item.nameSk,
          nameEn: item.nameEn,
          unit: item.unit,
          price: item.lowestPrice,
          regularPrice: item.highestRegularPrice,
          savings: item.maxSavingsAmount,
          savingsPercent: item.maxSavingsPercent,
          badge: item.prices[bestStore]?.badge || 'Najnižšia cena',
          image: item.image
        });

        storeSplits[bestStore].subtotal += item.lowestPrice;
        storeSplits[bestStore].subtotalRegular += item.highestRegularPrice;
        storeSplits[bestStore].savings += item.maxSavingsAmount;

        totalPrescribedCost += item.lowestPrice;
        totalRegularCost += item.highestRegularPrice;
      }
    });

    // Clean up empty store splits and round values
    const activeSplits = Object.values(storeSplits)
      .filter((s) => s.items.length > 0)
      .map((s) => ({
        ...s,
        subtotal: parseFloat(s.subtotal.toFixed(2)),
        subtotalRegular: parseFloat(s.subtotalRegular.toFixed(2)),
        savings: parseFloat(s.savings.toFixed(2))
      }));

    const totalSavings = parseFloat((totalRegularCost - totalPrescribedCost).toFixed(2));
    const totalSavingsPercent = totalRegularCost > 0 ? Math.round((totalSavings / totalRegularCost) * 100) : 0;

    const prescription = {
      prescriptionId: `rx-${offerService.currentCycle.cycleId}-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      cycleId: offerService.currentCycle.cycleId,
      cycleName: offerService.currentCycle.cycleName,
      validUntil: offerService.currentCycle.validUntil,
      headline: `Odporúčaný nákupný zoznam (${offerService.currentCycle.cycleName})`,
      summary: `Ušetrite až ${totalSavings.toFixed(2)} € (${totalSavingsPercent} %) rozdelením nákupu podľa najnovších letákov.`,
      totalItemsCount: selectedDeals.length,
      totalPrescribedCost: parseFloat(totalPrescribedCost.toFixed(2)),
      totalRegularCost: parseFloat(totalRegularCost.toFixed(2)),
      totalSavings,
      totalSavingsPercent,
      storeSplits: activeSplits
    };

    return prescription;
  }

  /**
   * Automatically rotates the offer cycle when validity expires or when manually simulated.
   * Replaces current offers with upcoming offers, synthesizes new future offers, and produces a new prescription.
   */
  rotateCycle(reason = 'End of offer validity date reached') {
    const oldCycle = JSON.parse(JSON.stringify(offerService.currentCycle));
    const now = new Date();

    // 1. Promote upcoming cycle to current cycle
    const newCurrent = JSON.parse(JSON.stringify(offerService.upcomingCycle));
    newCurrent.status = 'active';

    // Set new dates for current (e.g. 7 days starting from now)
    const newValidFrom = new Date(now);
    const newValidUntil = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    newCurrent.validFrom = newValidFrom.toISOString();
    newCurrent.validUntil = newValidUntil.toISOString();

    // 2. Synthesize new upcoming cycle for following week
    const futureValidFrom = new Date(newValidUntil.getTime() + 1000);
    const futureValidUntil = new Date(futureValidFrom.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Randomize some discounts slightly to create authentic dynamic offers for the next cycle
    const nextItems = newCurrent.items.map((item) => {
      const cloned = JSON.parse(JSON.stringify(item));
      const stores = ['kaufland', 'lidl', 'billa', 'tesco', 'fresh'];
      const luckyStore = stores[Math.floor(Math.random() * stores.length)];

      stores.forEach((s) => {
        if (cloned.prices[s]) {
          if (s === luckyStore) {
            // Mega discount for lucky store
            const drop = (cloned.prices[s].regularPrice * 0.35 + Math.random() * 0.15);
            cloned.prices[s].price = parseFloat((cloned.prices[s].regularPrice - drop).toFixed(2));
            cloned.prices[s].isOffer = true;
            cloned.prices[s].discountPercent = Math.round((drop / cloned.prices[s].regularPrice) * 100);
            cloned.prices[s].badge = 'Nový letákový hit';
          }
        }
      });
      return cloned;
    });

    const nextUpcoming = {
      cycleId: `cycle-w${Math.floor(Math.random() * 40) + 10}-2026`,
      cycleName: `Nové letáky (Predbežná ponuka)`,
      validFrom: futureValidFrom.toISOString(),
      validUntil: futureValidUntil.toISOString(),
      totalDeals: nextItems.length,
      status: 'upcoming',
      items: nextItems
    };

    // Update OfferService state
    offerService.currentCycle = newCurrent;
    offerService.upcomingCycle = nextUpcoming;

    // Log rotation history
    offerService.rotationHistory.unshift({
      timestamp: now.toISOString(),
      archivedCycleId: oldCycle.cycleId,
      newCycleId: newCurrent.cycleId,
      reason
    });

    // 3. Generate brand new prescribed shopping list for user
    const newPrescription = this.generatePrescribedList();
    this.prescribedListHistory.unshift(newPrescription);

    return {
      success: true,
      message: 'Ponuky a ceny letákov boli úspešne aktualizované! Vygenerovaný nový predpísaný zoznam.',
      archivedCycle: oldCycle.cycleName,
      activeCycle: newCurrent.cycleName,
      validUntil: newCurrent.validUntil,
      newPrescription
    };
  }

  /**
   * Periodic check called by cron or requests
   */
  checkAndAutoRotate() {
    this.lastCheckTime = new Date().toISOString();
    const status = this.getLifecycleStatus();
    if (status.isExpired && this.autoRotationEnabled) {
      console.log(`[LifecycleEngine] Current cycle ${status.currentCycleId} expired. Triggering automated rotation...`);
      return this.rotateCycle('Automatic expiration trigger');
    }
    return null;
  }
}

const lifecycleEngine = new LifecycleEngine();

module.exports = lifecycleEngine;
