require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let supabase = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });
    console.log('✅ Supabase Client initialized successfully.');
  } catch (err) {
    console.warn('⚠️ Failed to initialize Supabase client:', err.message);
  }
} else {
  console.log('ℹ️ Supabase credentials not found. App running in local high-fidelity memory store mode.');
}

module.exports = {
  isConfigured: () => !!supabase,
  getClient: () => supabase,

  /**
   * Saves a calculated smart shopping prescription to Supabase
   */
  async savePrescription(prescription) {
    if (!supabase) return { error: 'Supabase not configured' };

    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .insert([{
          id: prescription.id,
          cycle_id: prescription.cycleId || 'cycle_current_2026_w48',
          total_items: prescription.totalItems,
          total_cost: prescription.totalCost,
          regular_cost: prescription.regularCost,
          total_savings: prescription.totalSavings,
          savings_percent: prescription.savingsPercent,
          store_splits: prescription.stores,
          generated_at: prescription.generatedAt || new Date().toISOString()
        }])
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.error('Error saving prescription to Supabase:', err.message);
      return { error: err.message };
    }
  },

  /**
   * Health check and table verification
   */
  async checkConnection() {
    if (!supabase) return { connected: false, reason: 'Missing credentials' };

    try {
      const { data, error } = await supabase.from('chains').select('id').limit(1);
      if (error) return { connected: false, error: error.message };
      return { connected: true, data };
    } catch (err) {
      return { connected: false, error: err.message };
    }
  }
};
