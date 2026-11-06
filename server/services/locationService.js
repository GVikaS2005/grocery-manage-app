const { STORES, CHAINS, CITIES, SHOPPING_MALLS } = require('../data/storesData');

/**
 * Calculate Great-Circle Distance (Haversine formula) in kilometers
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Format distance to human readable
 */
function formatDistance(distKm) {
  if (distKm < 1) {
    return `${Math.round(distKm * 1000)} m`;
  }
  return `${distKm.toFixed(1)} km`;
}

/**
 * Get nearby stores for a coordinate or city
 */
function getNearbyStores({ lat, lng, cityId, maxDistanceKm = 30, chainFilter = null }) {
  // If no lat/lng provided, use city coordinates
  let userLat = lat;
  let userLng = lng;

  if ((!userLat || !userLng) && cityId) {
    const city = CITIES.find((c) => c.id === cityId.toLowerCase());
    if (city) {
      userLat = city.lat;
      userLng = city.lng;
    }
  }

  // Fallback to Bratislava center
  if (!userLat || !userLng) {
    userLat = 48.1486;
    userLng = 17.1077;
  }

  // Calculate distances for all stores
  let results = STORES.map((store) => {
    const distanceKm = calculateDistanceKm(userLat, userLng, store.lat, store.lng);
    const chainInfo = CHAINS[store.chainId] || {};

    // Estimated travel times
    const walkMinutes = Math.round((distanceKm / 4.8) * 60);
    const driveMinutes = Math.max(2, Math.round((distanceKm / 35) * 60));

    return {
      ...store,
      distanceKm: parseFloat(distanceKm.toFixed(2)),
      distanceText: formatDistance(distanceKm),
      walkMinutes,
      driveMinutes,
      chainName: chainInfo.name || store.chainId,
      brandColor: chainInfo.brandColor || '#3b82f6',
      logo: chainInfo.logo,
      website: chainInfo.website,
      flyerUrl: chainInfo.flyerUrl,
      loyaltyProgram: chainInfo.loyaltyProgram
    };
  });

  // Filter by chain if specified
  if (chainFilter && chainFilter !== 'all') {
    results = results.filter((s) => s.chainId === chainFilter);
  }

  // Filter by distance (or keep at least top 10 closest if distance threshold is small)
  results.sort((a, b) => a.distanceKm - b.distanceKm);

  // Nearby malls
  const malls = SHOPPING_MALLS.map((mall) => {
    const distanceKm = calculateDistanceKm(userLat, userLng, mall.lat, mall.lng);
    return {
      ...mall,
      distanceKm: parseFloat(distanceKm.toFixed(2)),
      distanceText: formatDistance(distanceKm)
    };
  }).sort((a, b) => a.distanceKm - b.distanceKm);

  return {
    userLocation: { lat: userLat, lng: userLng },
    totalStoresFound: results.length,
    stores: results,
    malls: malls.slice(0, 5),
    availableChains: Object.values(CHAINS)
  };
}

module.exports = {
  calculateDistanceKm,
  formatDistance,
  getNearbyStores,
  CITIES,
  CHAINS
};
