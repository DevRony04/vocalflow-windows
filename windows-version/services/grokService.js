const axios = require('axios');
const { grok } = require('../config/api-keys.config');

const GROK_BASE_URL = 'https://api.x.ai/v1';
const MOCK_CREDITS = 1000;


async function validateApiKey() {
  const response = await axios.get(`${GROK_BASE_URL}/models`, {
    headers: {
      Authorization: `Bearer ${grok.apiKey}`,
      'Content-Type': 'application/json'
    }
  });
  // If we get here without throwing, the key is valid
  return response.status === 200;
}


async function getBalance() {
  console.log('\n[GROK]');

  try {
    if (!grok.apiKey || grok.apiKey === 'YOUR_GROK_KEY_HERE') {
      console.log(`✓ Grok Balance: ${MOCK_CREDITS} credits (mock)`);
      console.log('ℹ xAI does not provide a public balance API');
      return;
    }

    // Step 1: Validate key via /models endpoint
    await validateApiKey();

    // Step 2: Key is valid — report mock balance with explanation
    console.log(`✓ Grok Balance: ${MOCK_CREDITS} credits (mock)`);
    console.log('ℹ xAI does not provide a public balance API');
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.log('✗ Invalid API Key — Authentication failed (401).');
      } else if (status === 403) {
        console.log('✗ API Key lacks permissions (403 Forbidden).');
      } else if (status === 429) {
        console.log('⚠ Rate limit reached (429). Key appears valid but quota exceeded.');
      } else {
        console.log(
          `✗ API Error: ${status} — ${error.response.data?.error?.message || 'Unknown error'
          }`
        );
      }
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.log('✗ Network Error — Could not reach xAI API. Check your internet connection.');
    } else {
      console.log(`✗ Unexpected Error: ${error.message}`);
    }
  }
}

module.exports = { getBalance };
