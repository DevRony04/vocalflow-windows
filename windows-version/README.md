# VocalFlow Windows - Balance Checker

> A Windows-compatible Node.js implementation of **VocalFlow**, a voice-powered macOS application originally written in Swift.

---

## Overview

[VocalFlow](https://github.com/Vocallabsai/vocalflow) is a macOS application built with Swift that provides intelligent voice control and AI-powered features. Because the original app relies on macOS-only frameworks (AppKit, AVFoundation, etc.), it cannot run on Windows.

This **Windows version** is a lightweight Node.js implementation that replicates the **API integration layer** of VocalFlow — specifically the ability to check your **Deepgram** and **Grok (xAI)** API account balances, directly from your Windows terminal.

---

## Features

| Feature | Description |
|---|---|
| 🎙️ **Deepgram Balance Check** | Fetches your real account balance, project ID, and units remaining via the Deepgram REST API. |
| 🤖 **Grok (xAI) Key Validation** | Validates your xAI API key and displays a mock credit estimate (xAI has no public balance endpoint). |
| 🖥️ **Windows Compatible** | Pure Node.js — runs anywhere Node.js 18+ is installed. |
| 🔒 **Graceful Error Handling** | Handles invalid keys, network issues, and API errors cleanly. |

---

## Folder Structure

```
windows-version/
├── config/
│   └── api-keys.config.js   ← Put your API keys here
├── services/
│   ├── deepgramService.js   ← Deepgram balance logic
│   └── grokService.js       ← Grok validation logic
├── src/
│   └── index.js             ← Entry point
├── .gitignore
├── package.json
└── README.md
```

---

## Installation

### Prerequisites

- **Node.js** v18 or higher → [https://nodejs.org/](https://nodejs.org/)
- **npm** (bundled with Node.js)

### Steps

**1. Extract the ZIP (if downloaded as archive)**

```
Right-click the ZIP → Extract All → Choose destination
```

**2. Navigate to the `windows-version/` folder**

```powershell
cd path\to\vocalflow\windows-version
```

**3. Add your API keys**

Open `config\api-keys.config.js` in any text editor and replace the placeholder values:

```js
module.exports = {
  deepgram: {
    apiKey: 'YOUR_DEEPGRAM_KEY_HERE'   // ← paste your Deepgram key
  },
  grok: {
    apiKey: 'YOUR_GROK_KEY_HERE'       // ← paste your xAI key
  }
};
```

**4. Install dependencies**

```powershell
npm install
```

**5. Run the balance checker**

```powershell
npm start
```

---

## Expected Output

```
========================================
 VOCALFLOW WINDOWS - API BALANCE CHECK
========================================

[DEEPGRAM]
✓ API Key Valid
✓ Project Name: My VocalFlow Project
✓ Project ID: abc-123-xyz
✓ Balance: $25.50
✓ Units Remaining: 1,250,000
✓ Balance ID: bal-456-def

[GROK]
✓ API Key Valid
⚠ Balance API not available (mock: 1000 credits)
ℹ xAI does not expose a public balance/usage endpoint.
ℹ Visit https://console.x.ai/ to check your actual usage.

========================================
```

---

## API Key Links

| Service | Dashboard | Documentation |
|---|---|---|
| **Deepgram** | [console.deepgram.com](https://console.deepgram.com/) | [developers.deepgram.com](https://developers.deepgram.com/reference/) |
| **Grok (xAI)** | [console.x.ai](https://console.x.ai/) | [docs.x.ai](https://docs.x.ai/docs) |

---

## Troubleshooting

### `✗ Invalid API Key — Authentication failed (401)`
Your API key is incorrect or has been revoked. Double-check the key in `config/api-keys.config.js`.

### `✗ Network Error — Could not reach ... API`
You are not connected to the internet, or a firewall is blocking outbound HTTPS requests. Try opening [https://api.deepgram.com](https://api.deepgram.com) in your browser.

### `Cannot find module 'axios'`
You forgot to run `npm install`. Run it from inside the `windows-version/` directory.

### `Error: Cannot find module '../config/api-keys.config'`
You're running `node` from the wrong directory. Make sure to run from inside `windows-version/`:
```powershell
cd windows-version
npm start
```

### Deepgram shows `⚠ No projects found`
Your API key is valid but has no projects. Create a project at [console.deepgram.com](https://console.deepgram.com/).

---

## Notes on Grok Balance

As of April 2026, **xAI does not offer a public REST endpoint** to query account balance or credit usage programmatically. This tool validates your key is active by calling the `/v1/models` endpoint and returns a **mock credit estimate of 1,000**. To see real usage, log in to [console.x.ai](https://console.x.ai/).

---

## Original Project

The original VocalFlow macOS application is written in **Swift** and uses:
- `AVFoundation` for audio capture
- `AppKit` for the macOS UI layer
- `Deepgram` for speech-to-text
- `Grok (xAI)` for AI inference

The Swift source code lives in `Sources/VocalFlow/` and has **not been modified** by this Windows port.

---

## License

MIT
