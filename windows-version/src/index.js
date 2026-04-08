'use strict';

const deepgramService = require('../services/deepgramService');
const grokService = require('../services/grokService');

const DIVIDER = '='.repeat(40);

/**
 * Prints the top header banner.
 */
function printHeader() {
  console.log('\n' + DIVIDER);
  console.log(' VOCALFLOW WINDOWS - API BALANCE CHECK');
  console.log(DIVIDER);
}

/**
 * Prints the closing footer banner.
 */
function printFooter() {
  console.log('\n' + DIVIDER + '\n');
}


async function main() {
  printHeader();

  try {
    // Run both checks sequentially for clean ordered output
    await deepgramService.getBalance();
    await grokService.getBalance();
  } catch (err) {
    // Top-level safety net — individual services handle their own errors
    console.error('\n ✗ Fatal error:', err.message);
  }

  printFooter();
}

main();
