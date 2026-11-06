const { CURRENT_CYCLE, UPCOMING_CYCLE, CATEGORIES, LEAFLETS_METADATA } = require('../data/productsData');
const { CHAINS } = require('../data/storesData');

class OfferService {
  constructor() {
    this.currentCycle = JSON.parse(JSON.stringify(CURRENT_CYCLE));
    this.upcomingCycle = JSON.parse(JSON.stringify(UPCOMING_CYCLE));
    this.leaflets = JSON.parse(JSON.stringify(LEAFLETS_METADATA));
    this.rotationHistory = [
      {
        timestamp: '2026-10-29T00:00:00Z',
        cycleName: 'Týždeň 44 / Archív',
        action: 'Cycle completed and archived'
      }
    ];
  }

  /**
   * Enrich product item with cheapest store calculations and comparisons
   */
  enrichItem(item) {
    const chainIds = ['kaufland', 'lidl', 'billa', 'tesco', 'fresh'];
    let lowestPrice = Infinity;
    let lowestStore = null;
    let highestRegularPrice = 0;
    const storePrices = {};

    chainIds.forEach((chainId) => {
      const p = item.prices[chainId];
      if (p) {
        storePrices[chainId] = {
          ...p,
          chainName: CHAINS[chainId]?.name || chainId,
          brandColor: CHAINS[chainId]?.brandColor || '#3b82f6',
          loyaltyProgram: CHAINS[chainId]?.loyaltyProgram
        };

        if (p.price < lowestPrice) {
          lowestPrice = p.price;
          lowestStore = chainId;
        }

        if (p.regularPrice > highestRegularPrice) {
          highestRegularPrice = p.regularPrice;
        }
      }
    });

    // Average price across all stores
    const pricesList = Object.values(item.prices).map((p) => p.price);
    const avgPrice = pricesList.reduce((a, b) => a + b, 0) / pricesList.length;

    // Savings if buying at lowest store vs average and vs highest regular
    const maxSavingsAmount = parseFloat((highestRegularPrice - lowestPrice).toFixed(2));
    const maxSavingsPercent = Math.round(((highestRegularPrice - lowestPrice) / highestRegularPrice) * 100);

    return {
      ...item,
      lowestPrice,
      lowestStore,
      lowestStoreName: CHAINS[lowestStore]?.name || lowestStore,
      lowestStoreBrandColor: CHAINS[lowestStore]?.brandColor || '#10b981',
      averagePrice: parseFloat(avgPrice.toFixed(2)),
      highestRegularPrice,
      maxSavingsAmount,
      maxSavingsPercent,
      storePrices
    };
  }

  /**
   * Get price comparison matrix for the active cycle
   */
  getComparisonMatrix({ category = 'all', search = '', onlyOffers = false, sortBy = 'discount' }) {
    let items = this.currentCycle.items.map((item) => this.enrichItem(item));

    // Category filter
    if (category && category !== 'all') {
      items = items.filter((item) => item.category === category);
    }

    // Search query filter
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.nameEn.toLowerCase().includes(q) ||
          item.nameSk.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q))
      );
    }

    // Only offers filter (where at least one store has an active offer)
    if (onlyOffers) {
      items = items.filter((item) => Object.values(item.prices).some((p) => p.isOffer));
    }

    // Sorting
    if (sortBy === 'discount') {
      items.sort((a, b) => b.maxSavingsPercent - a.maxSavingsPercent);
    } else if (sortBy === 'price-asc') {
      items.sort((a, b) => a.lowestPrice - b.lowestPrice);
    } else if (sortBy === 'price-desc') {
      items.sort((a, b) => b.lowestPrice - a.lowestPrice);
    } else if (sortBy === 'name') {
      items.sort((a, b) => a.nameSk.localeCompare(b.nameSk));
    }

    return {
      cycle: {
        cycleId: this.currentCycle.cycleId,
        cycleName: this.currentCycle.cycleName,
        validFrom: this.currentCycle.validFrom,
        validUntil: this.currentCycle.validUntil,
        status: this.currentCycle.status
      },
      categories: CATEGORIES,
      totalCount: items.length,
      chains: Object.values(CHAINS),
      items
    };
  }

  /**
   * Get upcoming offers preview (e.g. Next Week's Leaflet)
   */
  getUpcomingMatrix() {
    const items = this.upcomingCycle.items.map((item) => this.enrichItem(item));
    return {
      cycle: {
        cycleId: this.upcomingCycle.cycleId,
        cycleName: this.upcomingCycle.cycleName,
        validFrom: this.upcomingCycle.validFrom,
        validUntil: this.upcomingCycle.validUntil,
        status: this.upcomingCycle.status
      },
      categories: CATEGORIES,
      totalCount: items.length,
      chains: Object.values(CHAINS),
      items
    };
  }

  /**
   * Get public leaflet flyer covers and metadata
   */
  getLeaflets() {
    return this.leaflets;
  }
}

const offerService = new OfferService();

module.exports = offerService;
