# 🔧 Setup Instructions

Get Game Night Controller running for your party - step by step.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Network Setup](#network-setup)
3. [Installation](#installation)
4. [TV Display Setup](#tv-display-setup)
5. [Host Controller Setup](#host-controller-setup)
6. [Pre-Game Checklist](#pre-game-checklist)
7. [Advanced Configuration](#advanced-configuration)
8. [Troubleshooting Setup Issues](#troubleshooting-setup-issues)

---

## System Requirements

### Minimum Requirements

| Component | Requirement |
|-----------|-------------|
| **Server Device** | Any computer (Windows/Mac/Linux) |
| **TV Display** | Smart TV, monitor, or any screen with a web browser |
| **Host Controller** | Smartphone or tablet (iOS/Android) |
| **Network** | WiFi router (all devices on same network) |
| **Node.js** | Version 18 or higher |
| **npm** | Version 8 or higher |

### Recommended Setup

For the best experience:

- **Dedicated laptop** for running the server (stays plugged in)
- **Large TV** (50"+) with HDMI input
- **Modern smartphone** (iPhone 8+ or Android equivalent)
- **5GHz WiFi** for lower latency
- **External speakers** for better sound

### Browser Compatibility

| Browser | TV Display | Host Controller |
|---------|------------|-----------------|
| Chrome | ✅ Excellent | ✅ Excellent |
| Safari | ✅ Excellent | ✅ Excellent |
| Firefox | ✅ Good | ✅ Good |
| Edge | ✅ Good | ✅ Good |
| Samsung Internet | ⚠️ OK | ⚠️ OK |
| Internet Explorer | ❌ Not supported | ❌ Not supported |

---

## Network Setup

### The Golden Rule

> **All devices must be on the same WiFi network**

This includes:
- The computer running the game server
- The TV/display device
- The host's phone/tablet
- Any other controller devices

### Finding Your Server IP Address

You'll need your computer's local IP address. Here's how to find it:

#### Windows

**Method 1 - Command Prompt:**
```cmd
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter

**Method 2 - Settings:**
1. Open Settings → Network & Internet
2. Click on your WiFi connection
3. Look for "IPv4 address"

**Example output:** `192.168.1.105`

#### Mac

**Method 1 - Terminal:**
```bash
ipconfig getifaddr en0
```

**Method 2 - System Preferences:**
1. System Preferences → Network
2. Select WiFi on the left
3. IP address shown on the right

**Example output:** `192.168.1.105`

#### Linux

```bash
hostname -I
```
Or:
```bash
ip addr show
```

**Example output:** `192.168.1.105`

### Network Checklist

- [ ] All devices connected to same WiFi network name (SSID)
- [ ] Server computer has a stable connection
- [ ] No VPN active on any device (can block local connections)
- [ ] Firewall allows connections on port 5173

---

## Installation

### Step 1: Install Node.js

If you don't have Node.js installed:

1. Visit [nodejs.org](https://nodejs.org)
2. Download the **LTS** (Long Term Support) version
3. Run the installer
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Get the Code

Navigate to the project directory:

```bash
cd /root/.openclaw/workspace/agents/gamedev/game-night-controller
```

Or if you have it elsewhere:

```bash
cd path/to/game-night-controller
```

### Step 3: Install Dependencies

```bash
npm install
```

This downloads all required packages. You'll see progress output.

**Expected time:** 1-2 minutes depending on connection speed

### Step 4: Start the Server

```bash
npm run dev
```

You should see output like:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.105:5173/
  ➜  press h + enter to show help
```

**Important:** Note the `Network:` address - that's your server IP!

### Step 5: Keep the Server Running

**Don't close this terminal window!** The server must stay running.

To stop the server later, press `Ctrl+C` in the terminal.

---

## TV Display Setup

### Option 1: Smart TV Browser (Easiest)

1. Open your TV's web browser
   - Samsung: Internet app
   - LG: Web browser
   - Android TV: Chrome
   - Apple TV: Not recommended (no browser)

2. Navigate to: `http://[your-server-ip]:5173/display`
   
   **Example:** `http://192.168.1.105:5173/display`

3. Press **Full Screen** button on your TV remote if available

### Option 2: HDMI from Laptop

1. Connect laptop to TV with HDMI cable
2. Set TV to the correct HDMI input
3. On the laptop, open browser
4. Navigate to: `http://localhost:5173/display`
5. Press `F11` for full-screen mode

### Option 3: Chromecast / AirPlay

1. Cast your laptop screen to TV
2. Open browser on laptop
3. Navigate to display page
4. Go full-screen

### Option 4: Raspberry Pi / Mini PC

For a permanent setup:

1. Install Raspberry Pi OS or any Linux
2. Install Node.js
3. Clone/download the game files
4. Set to auto-start on boot
5. Connect to TV via HDMI

### Display Settings

Once loaded, you'll see:

```
┌─────────────────────────────────────────┐
│  [G] Game Night          Host Connected │
│                                         │
│                                         │
│         [Animated Background]           │
│                                         │
│           GAME NIGHT                    │
│         February 13th                   │
│            THE ARENA                    │
│                                         │
│         [Game Grid]                     │
│                                         │
│  Press L for Leaderboard  Press M to Mute│
└─────────────────────────────────────────┘
```

**Check the connection status:**
- ✅ "Host Connected" = Good to go!
- ❌ "No Host" = Check network setup

---

## Host Controller Setup

### On Your Smartphone/Tablet

1. **Connect to WiFi** - Same network as the server
2. **Open browser** - Chrome (Android) or Safari (iOS)
3. **Navigate to:** `http://[your-server-ip]:5173/host`
   
   **Example:** `http://192.168.1.105:5173/host`

4. **Bookmark the page** - For easy access during the party

### Host Controller Layout

```
┌─────────────────────────────┐
│ [H] Host Control            │
│ TV Display Connected        │
│ 192.168.1.105:5173/display  │
├─────────────────────────────┤
│ [Games] [Players] [Chaos]   │
├─────────────────────────────┤
│                             │
│    [GAME SELECTION GRID]    │
│                             │
│  ┌─────┐ ┌─────┐ ┌─────┐   │
│  │Meme │ │ Geo │ │Music│   │
│  └─────┘ └─────┘ └─────┘   │
│                             │
│  ┌─────┐ ┌─────┐ ┌─────┐   │
│  │Hist │ │Maths│ │ etc │   │
│  └─────┘ └─────┘ └─────┘   │
│                             │
└─────────────────────────────┘
```

### Testing the Connection

1. Tap any game in the grid
2. TV should immediately switch to that game
3. Tap NEW (if available)
4. A question should appear on the TV

**If nothing happens:**
- Check that all devices are on the same WiFi
- Refresh both pages
- Verify the server is still running

---

## Pre-Game Checklist

Use this checklist before your guests arrive:

### 1 Hour Before

- [ ] Server is running (`npm run dev`)
- [ ] TV shows the display page
- [ ] TV is in full-screen mode
- [ ] Host phone can access controller
- [ ] Connection status shows "Host Connected"
- [ ] Sound is working (tap a game, listen for sounds)
- [ ] Volume level is appropriate

### 15 Minutes Before

- [ ] Add all expected players to the system
- [ ] Test each game mode briefly
- [ ] Test scoring (add/subtract points)
- [ ] Test Chaos mode
- [ ] Check leaderboard display (press L on TV)
- [ ] Charge host phone to 100%

### Supplies Check

For certain games, you'll need:

| Game | Supplies Needed |
|------|-----------------|
| Logorithmic | Paper and pens for each player |
| Price is Right | Paper and pens for guesses |
| General | Drinks and snacks! |

### Backup Plan

If technology fails:
- [ ] Have a backup playlist ready
- [ ] Know some party games that don't need tech
- [ ] Have the server terminal accessible for quick restarts

---

## Advanced Configuration

### Changing the Port

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

Then access at `http://[ip]:3000/`

### Firewall Configuration

If devices can't connect, you may need to allow port 5173:

#### Windows Firewall

1. Windows Security → Firewall & network protection
2. Advanced settings
3. Inbound Rules → New Rule
4. Port → TCP → 5173 → Allow

#### Mac

```bash
# Allow port through firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/node
```

Or disable temporarily (not recommended for long-term):
```bash
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate off
```

#### Linux (ufw)

```bash
sudo ufw allow 5173/tcp
```

### Environment Variables

Create a `.env` file for customization:

```env
# Server port
PORT=5173

# Host
HOST=0.0.0.0
```

### Production Deployment

For a more permanent setup:

```bash
# Build for production
npm run build

# The dist/ folder contains static files
# Serve with any static file server

# Example with Python
python3 -m http.server 5173 --directory dist

# Example with Node serve
npx serve dist -l 5173
```

---

## Troubleshooting Setup Issues

### "Cannot GET /display"

**Problem:** Wrong URL or server not running

**Solutions:**
1. Check server is running (look for terminal with `npm run dev`)
2. Use correct URL: `/display` not just `/`
3. Try `http://localhost:5173/display` on the server computer

### "Connection refused"

**Problem:** Firewall or wrong IP

**Solutions:**
1. Verify you're using the correct IP address
2. Check Windows/Mac firewall settings
3. Temporarily disable firewall for testing
4. Ensure all devices are on same network

### "This site can't be reached"

**Problem:** Network connectivity

**Solutions:**
1. Ping the server from another device:
   ```bash
   ping 192.168.1.105
   ```
2. Check WiFi connection on both devices
3. Try restarting the WiFi router
4. Disable VPN on all devices

### TV browser won't load

**Problem:** Smart TV browser limitations

**Solutions:**
1. Use HDMI from laptop instead
2. Try a different browser app on TV
3. Update TV firmware
4. Consider a streaming device (Fire Stick, Chromecast)

### Slow response / lag

**Problem:** Network congestion

**Solutions:**
1. Switch to 5GHz WiFi if available
2. Close other apps using bandwidth
3. Move devices closer to router
4. Restart the WiFi router

### "Host Connected" but nothing happens

**Problem:** Sync issue

**Solutions:**
1. Refresh both pages
2. Check browser console for errors (F12)
3. Restart the server
4. Try a different browser

### Audio not working

**Problem:** Browser audio restrictions

**Solutions:**
1. Click on the TV page first (enables audio)
2. Check TV volume
3. Press M on keyboard to unmute
4. Check computer audio output settings

---

## Quick Start Commands

For future game nights, save these commands:

```bash
# Navigate to game directory
cd /root/.openclaw/workspace/agents/gamedev/game-night-controller

# Start the server
npm run dev

# In browser:
# TV:     http://[your-ip]:5173/display
# Host:   http://[your-ip]:5173/host
```

---

## Support

If you encounter issues not covered here:

1. Check the main [README](../README.md) Troubleshooting section
2. Check the [HOST_GUIDE.md](./HOST_GUIDE.md) for usage help
3. Verify all devices can ping each other
4. Try restarting everything (classic IT solution!)

---

**Your Game Night Controller should now be ready!** 🎉
