const axios = require('axios');
const { deepgram } = require('../config/api-keys.config');

const DEEPGRAM_BASE_URL = 'https://api.deepgram.com/v1';


async function getProjects() {
  const response = await axios.get(`${DEEPGRAM_BASE_URL}/projects`, {
    headers: {
      Authorization: `Token ${deepgram.apiKey}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data.projects || [];
}


async function getProjectBalance(projectId) {
  const response = await axios.get(
    `${DEEPGRAM_BASE_URL}/projects/${projectId}/balances`,
    {
      headers: {
        Authorization: `Token ${deepgram.apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );
  const balances = response.data.balances || [];
  return balances.length > 0 ? balances[0] : null;
}

async function getBalance() {
  console.log('\n[DEEPGRAM]');

  try {
    if (
      !deepgram.apiKey ||
      deepgram.apiKey === 'YOUR_DEEPGRAM_KEY_HERE'
    ) {
      console.log('✗ API Key not configured. Please edit config/api-keys.config.js');
      return;
    }

    // Step 1: Get projects
    const projects = await getProjects();

    if (projects.length === 0) {
      console.log('✓ API Key Valid');
      console.log('⚠ No projects found on this account.');
      return;
    }

    const project = projects[0];
    console.log('✓ API Key Valid');
    console.log(`✓ Project Name: ${project.name}`);
    console.log(`✓ Project ID: ${project.project_id}`);

    // Step 2: Get balance for the first project
    const balance = await getProjectBalance(project.project_id);

    if (balance) {
      const amount = parseFloat(balance.amount || 0).toFixed(2);
      const rawUnits = balance.units;
      const units =
        rawUnits !== null &&
          rawUnits !== undefined &&
          !isNaN(Number(rawUnits))
          ? Number(rawUnits).toLocaleString()
          : 'Not Available';
      console.log(`✓ Balance: $${amount}`);
      console.log(`✓ Units Remaining: ${units}`);
    } else {
      console.log('⚠ Balance information not available for this project.');
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.log('✗ Invalid API Key — Authentication failed (401).');
      } else if (status === 403) {
        console.log('✗ API Key lacks permissions (403 Forbidden).');
      } else if (status === 404) {
        console.log(`✗ Endpoint not found (404). Check your API key tier.`);
      } else {
        console.log(`✗ API Error: ${status} — ${error.response.data?.message || 'Unknown error'}`);
      }
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.log('✗ Network Error — Could not reach Deepgram API. Check your internet connection.');
    } else {
      console.log(`✗ Unexpected Error: ${error.message}`);
    }
  }
}

module.exports = { getBalance };
