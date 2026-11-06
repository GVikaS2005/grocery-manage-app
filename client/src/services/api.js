const API_BASE = '/api';

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  async getCities() {
    const res = await fetch(`${API_BASE}/location/cities`);
    return res.json();
  },

  async getNearbyStores(params = {}) {
    const res = await fetch(`${API_BASE}/location/stores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    return res.json();
  },

  async getStoresAndMalls() {
    const res = await fetch(`${API_BASE}/stores`);
    return res.json();
  },

  async getMatrix(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/offers/matrix?${query}`);
    return res.json();
  },

  async getUpcoming() {
    const res = await fetch(`${API_BASE}/offers/upcoming`);
    return res.json();
  },

  async getLeaflets() {
    const res = await fetch(`${API_BASE}/offers/leaflets`);
    return res.json();
  },

  async getLifecycle() {
    const res = await fetch(`${API_BASE}/offers/lifecycle`);
    return res.json();
  },

  async simulateRotation() {
    const res = await fetch(`${API_BASE}/offers/simulate-rotation`, {
      method: 'POST'
    });
    return res.json();
  },

  async getCurrentPrescription() {
    const res = await fetch(`${API_BASE}/prescriptions/current`);
    return res.json();
  },

  async optimizeBasket(items, manualOverrides = {}) {
    const res = await fetch(`${API_BASE}/optimizer/split`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, manualOverrides })
    });
    return res.json();
  },

  async syncPublicFlyers() {
    const res = await fetch(`${API_BASE}/offers/sync-scrape`, {
      method: 'POST'
    });
    return res.json();
  },

  async analyzeFlyers() {
    const res = await fetch(`${API_BASE}/flyers/analyze`, {
      method: 'POST'
    });
    return res.json();
  },

  async getFlyerStats() {
    const res = await fetch(`${API_BASE}/flyers/stats`);
    return res.json();
  }
};
