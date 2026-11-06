const offerService = require('./offerService');
const { CHAINS } = require('../data/storesData');

class OptimizerService {
  /**
   * Optimize a custom shopping basket
   * @param {Array} basketItems - Array of { itemId, quantity }
   * @param {Object} manualOverrides - { itemId: chainId } manual assignment
   */
  optimizeBasket(basketItems = [], manualOverrides = {}) {
    if (!basketItems || basketItems.length === 0) {
      return {
        isEmpty: true,
        totalItemsCount: 0,
        optimalSplit: [],
        singleStoreComparison: {},
        totalOptimalCost: 0,
        totalRegularCost: 0,
        totalSaved: 0,
        savingsPercent: 0
      };
    }

    const allItems = offerService.currentCycle.items.map((it) => offerService.enrichItem(it));
    const itemsMap = new Map(allItems.map((it) => [it.id, it]));

    const chainTotals = {
      kaufland: { total: 0, items: [] },
      lidl: { total: 0, items: [] },
      billa: { total: 0, items: [] },
      tesco: { total: 0, items: [] },
      fresh: { total: 0, items: [] }
    };

    const optimalStoreSplits = {
      kaufland: { chainId: 'kaufland', chainName: CHAINS.kaufland.name, brandColor: CHAINS.kaufland.brandColor, items: [], subtotal: 0 },
      lidl: { chainId: 'lidl', chainName: CHAINS.lidl.name, brandColor: CHAINS.lidl.brandColor, items: [], subtotal: 0 },
      billa: { chainId: 'billa', chainName: CHAINS.billa.name, brandColor: CHAINS.billa.brandColor, items: [], subtotal: 0 },
      tesco: { chainId: 'tesco', chainName: CHAINS.tesco.name, brandColor: CHAINS.tesco.brandColor, items: [], subtotal: 0 },
      fresh: { chainId: 'fresh', chainName: CHAINS.fresh.name, brandColor: CHAINS.fresh.brandColor, items: [], subtotal: 0 }
    };

    let totalOptimalCost = 0;
    let totalRegularCost = 0;
    let totalItemsCount = 0;

    basketItems.forEach(({ itemId, quantity = 1 }) => {
      const product = itemsMap.get(itemId);
      if (!product) return;

      const qty = Math.max(1, quantity);
      totalItemsCount += qty;

      // Determine price in each store for single-store comparison
      ['kaufland', 'lidl', 'billa', 'tesco', 'fresh'].forEach((cId) => {
        const storePriceObj = product.prices[cId];
        const storePrice = storePriceObj ? storePriceObj.price : product.highestRegularPrice;
        chainTotals[cId].total += storePrice * qty;
        chainTotals[cId].items.push({
          itemId,
          nameSk: product.nameSk,
          unitPrice: storePrice,
          totalPrice: parseFloat((storePrice * qty).toFixed(2)),
          isOffer: storePriceObj ? storePriceObj.isOffer : false
        });
      });

      // Target store: manual override or best lowest price store
      const chosenStore = manualOverrides[itemId] || product.lowestStore || 'kaufland';
      const chosenPriceObj = product.prices[chosenStore];
      const finalPrice = chosenPriceObj ? chosenPriceObj.price : product.lowestPrice;
      const regularPrice = product.highestRegularPrice;

      const lineTotal = parseFloat((finalPrice * qty).toFixed(2));
      const lineRegular = parseFloat((regularPrice * qty).toFixed(2));

      totalOptimalCost += lineTotal;
      totalRegularCost += lineRegular;

      optimalStoreSplits[chosenStore].items.push({
        id: product.id,
        nameSk: product.nameSk,
        nameEn: product.nameEn,
        unit: product.unit,
        quantity: qty,
        unitPrice: finalPrice,
        regularUnitPrice: regularPrice,
        lineTotal,
        savings: parseFloat((lineRegular - lineTotal).toFixed(2)),
        isOffer: chosenPriceObj?.isOffer || false,
        badge: chosenPriceObj?.badge || null,
        image: product.image,
        flyerPage: chosenPriceObj?.flyerPage || null
      });

      optimalStoreSplits[chosenStore].subtotal += lineTotal;
    });

    // Clean up empty splits
    const activeSplits = Object.values(optimalStoreSplits)
      .filter((s) => s.items.length > 0)
      .map((s) => ({
        ...s,
        subtotal: parseFloat(s.subtotal.toFixed(2)),
        itemsCount: s.items.reduce((sum, it) => sum + it.quantity, 0)
      }))
      .sort((a, b) => b.subtotal - a.subtotal);

    // Format single-store comparison
    const singleStoreComparison = Object.keys(chainTotals).map((cId) => {
      const cost = parseFloat(chainTotals[cId].total.toFixed(2));
      const diffVsOptimal = parseFloat((cost - totalOptimalCost).toFixed(2));
      return {
        chainId: cId,
        chainName: CHAINS[cId].name,
        brandColor: CHAINS[cId].brandColor,
        totalCost: cost,
        diffVsOptimal,
        isCheapestSingleStore: false
      };
    }).sort((a, b) => a.totalCost - b.totalCost);

    if (singleStoreComparison.length > 0) {
      singleStoreComparison[0].isCheapestSingleStore = true;
    }

    const totalSaved = parseFloat(Math.max(0, totalRegularCost - totalOptimalCost).toFixed(2));
    const savingsPercent = totalRegularCost > 0 ? Math.round((totalSaved / totalRegularCost) * 100) : 0;

    return {
      isEmpty: false,
      totalItemsCount,
      totalOptimalCost: parseFloat(totalOptimalCost.toFixed(2)),
      totalRegularCost: parseFloat(totalRegularCost.toFixed(2)),
      totalSaved,
      savingsPercent,
      activeStoresCount: activeSplits.length,
      optimalSplit: activeSplits,
      singleStoreComparison,
      recommendation: activeSplits.length > 1
        ? `Rozdelením do ${activeSplits.length} obchodov ušetríte ${totalSaved} € oproti bežným cenám.`
        : `Všetky vybrané položky sú najlacnejšie v obchode ${activeSplits[0]?.chainName}.`
    };
  }
}

const optimizerService = new OptimizerService();

module.exports = optimizerService;
