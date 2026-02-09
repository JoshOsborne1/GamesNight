# 🎮 Game Night Controller

> The ultimate party game experience with synchronized TV display and mobile host control.

![Game Night](https://img.shields.io/badge/Game-Night-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)

## 📖 Project Overview

Game Night Controller is a modern, web-based party game system designed for social gatherings. It features a dual-screen architecture where the **TV Display** shows game content to all players, while the **Host Controller** (on a phone or tablet) allows a game master to control the flow of the game.

Perfect for house parties, game nights, team building events, or any social gathering where you want to get people laughing and competing!

### Key Features

- 🎯 **10 Unique Game Modes** - From trivia to memes to price guessing
- 📱 **Host Control** - Manage games from your phone without blocking the TV
- 🏆 **Live Leaderboard** - Track scores in real-time
- ⚡ **Chaos Mode** - Random forfeits, challenges, and rewards
- 🔊 **Immersive Audio** - Sound effects and background music
- 🎨 **Stunning Visuals** - Animated UI with particle effects
- 🔄 **Sync Technology** - Host and display stay perfectly synchronized
- 💾 **Persistent State** - Scores and settings saved between sessions

---

## ✨ Features List

### Game Modes

| Game | Description | Players | Duration |
|------|-------------|---------|----------|
| **Guess the Meme** | Identify viral memes and vines from quotes | 2-20 | 10-15 min |
| **Geography** | Test your knowledge of capitals, flags, and countries | 2-20 | 15-20 min |
| **Music** | Finish lyrics, identify artists, and grab the mic | 2-20 | 15-20 min |
| **History** | Dates, historical figures, and famous battles | 2-20 | 15-20 min |
| **Maths** | Numbers, angles, formulas, and brain teasers | 2-20 | 10-15 min |
| **Riddles** | Classic and modern brain teasers | 2-20 | 10-15 min |
| **Spelling Bee** | Spell challenging words correctly | 2-20 | 10-15 min |
| **Zoomed In** | Identify objects from extreme close-ups | 2-20 | 10-15 min |
| **Logorithmic** | Draw brand logos from memory | 4-20 | 20-30 min |
| **Price is Right** | Guess Amazon product prices | 2-20 | 15-20 min |

### Host Controller Features

- **Game Selection** - Choose from all available games
- **New/Reveal/Next Controls** - Manage game flow
- **Player Management** - Add, remove, and score players
- **Chaos Mode** - Trigger random forfeits, challenges, and rewards
- **Real-time Sync** - Instant state synchronization with display

### Display Features

- **Atmospheric Visuals** - Animated backgrounds and particle effects
- **Keyboard Shortcuts** - `L` for leaderboard, `M` for mute
- **Connection Status** - Visual indicator of host connection
- **Confetti Celebrations** - Triggered on correct answers
- **Responsive Design** - Works on any TV or monitor

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A modern web browser
- WiFi network for device synchronization

### Quick Start

```bash
# Clone or navigate to the project
cd game-night-controller

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# TV Display: http://localhost:5173/display
# Host Control: http://localhost:5173/host
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎮 Usage Guide

### Setup (Before the Party)

1. **Connect the TV**
   - Open `http://[your-ip]:5173/display` on the TV
   - Ensure the TV is in full-screen mode (F11)

2. **Prepare the Host Controller**
   - Open `http://[your-ip]:5173/host` on your phone/tablet
   - Keep this device with you as the game master

3. **Add Players**
   - Go to the "Players" tab in the Host Controller
   - Add each player's name
   - Scores will be tracked automatically

### Running a Game

1. **Select a Game** (Host Controller)
   - Tap "Games" tab
   - Choose from the grid of game modes
   - The TV will automatically switch to that game

2. **Start a Round** (Host Controller)
   - Tap **NEW** to load a random question/item
   - Players see the question on the TV

3. **Let Players Answer**
   - For multiple choice: Players call out answers
   - For drawing games: Players draw on paper
   - For guessing games: Players write down guesses

4. **Reveal the Answer** (Host Controller)
   - Tap **REVEAL** when ready
   - Confetti celebration on correct answers!
   - Award points to players from the Players tab

5. **Next Round** (Host Controller)
   - Tap **NEXT** to load a new item
   - Or switch games anytime from the Games tab

### Chaos Mode

For added fun, use the Chaos tab to trigger random events:

- **Forfeit** - Random punishment (low/medium/high/extreme)
- **Challenge** - Group activity or task
- **Reward** - Power-up or bonus for a player

---

## 🎯 Game Modes Explained

### 1. Guess the Meme
Players hear or see a famous meme quote and must identify the source. From classic vines to viral TikToks.

**How to Play:**
- Host taps NEW to show a meme quote
- Players shout out their guesses
- Host taps REVEAL to show the answer
- Award points to whoever got it first

### 2. Geography
Test knowledge of world geography with three sub-modes:
- **Capitals** - Name the capital city
- **Countries** - Identify the country from facts
- **Flags** - Recognize flags (coming soon)

### 3. Music
Music lovers rejoice! Three ways to play:
- **Finish the Lyric** - Complete the song lyrics
- **Who Sings** - Identify the artist
- **Grab the Mic** - Performance challenges

### 4. History
Travel back in time with:
- **Dates** - When did it happen?
- **Figures** - Who was responsible?
- **Battles** - Famous military conflicts

### 5. Maths
Not just numbers! Includes:
- **BIDMAS** - Order of operations
- **Angles** - Geometry problems
- **Shapes** - Area and perimeter
- **Formulas** - Scientific calculations

### 6. Riddles
Classic brain teasers that make you think outside the box.

### 7. Spelling Bee
Hear a word and spell it correctly. Increasing difficulty levels.

### 8. Zoomed In
Identify everyday objects from extreme close-up images. The closer you look, the harder it gets!

### 9. Logorithmic
The ultimate memory drawing game:
- Players see a brand name
- Everyone draws the logo from memory
- Reveal shows what the logo actually looks like
- Vote on who drew it best!

### 10. Price is Right
Guess the Amazon price of weird and wonderful products. Closest without going over wins!

---

## 🔧 Troubleshooting

### Host and Display Not Syncing

**Problem:** Changes on the host don't appear on the TV.

**Solutions:**
1. Ensure both devices are on the same WiFi network
2. Refresh both pages
3. Check that the TV shows "Host Connected" in the header
4. Try restarting the dev server: `npm run dev`

### Audio Not Playing

**Problem:** No sound effects or music.

**Solutions:**
1. Press `M` on the TV display to unmute
2. Check your device's volume
3. Some browsers block autoplay - click anywhere on the page first
4. Check audio settings in your OS

### Game Won't Load

**Problem:** Stuck on "Press NEW on Host Controller".

**Solutions:**
1. Ensure you're using the Host Controller, not the Display
2. Check that you've selected a game mode (not the menu)
3. Try refreshing the host page
4. Clear browser cache and reload

### Mobile Host Controller Issues

**Problem:** Buttons too small or layout broken on phone.

**Solutions:**
1. Ensure you're at `/host` URL, not `/display`
2. Try rotating to landscape mode
3. Use a modern browser (Chrome/Safari recommended)
4. Disable any content blockers

### Build Errors

**Problem:** `npm run build` fails.

**Solutions:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 18+

# Try building again
npm run build
```

---

## 💻 Development Guide

### Project Structure

```
game-night-controller/
├── src/
│   ├── games/           # Individual game components
│   │   ├── MainMenu.jsx
│   │   ├── MemeGame.jsx
│   │   ├── QuizGame.jsx
│   │   ├── ZoomedGame.jsx
│   │   ├── LogoGame.jsx
│   │   └── PriceGame.jsx
│   ├── data/            # Game content and questions
│   │   ├── memes.js
│   │   ├── geography.js
│   │   ├── music.js
│   │   ├── chaos.js     # Forfeits & challenges
│   │   └── ...
│   ├── components/      # Shared UI components
│   │   ├── Button.jsx
│   │   ├── GameCard.jsx
│   │   ├── Leaderboard.jsx
│   │   └── ChaosPopup.jsx
│   ├── store.js         # Zustand state management
│   ├── sync.js          # Host/Display sync logic
│   ├── audio.js         # Sound effect controller
│   ├── Display.jsx      # TV display entry point
│   ├── Host.jsx         # Host controller entry point
│   └── main.jsx         # App entry point
├── docs/                # Documentation
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### Adding a New Game Mode

1. **Create the game component** in `src/games/YourGame.jsx`:

```jsx
import React from 'react'
import useGameStore from '../store'
import audioController from '../audio'

function YourGame() {
  const { currentItem, revealed, setMode } = useGameStore()
  
  // Your game logic here
  
  return (
    <div className="text-center">
      {/* Game UI */}
    </div>
  )
}

export default YourGame
```

2. **Add game data** in `src/data/yourgame.js`:

```javascript
export const yourGameData = [
  { id: 1, question: "...", answer: "..." },
  // ...
]
```

3. **Register in store** (`src/store.js`):

```javascript
const GAME_MODES = [
  // ...existing games
  { id: 'yourgame', name: 'Your Game', color: 'primary' },
]
```

4. **Add to Display** (`src/Display.jsx`):

```javascript
import YourGame from './games/YourGame'

// In renderGame() switch statement:
case 'yourgame':
  return <YourGame />
```

5. **Add host integration** (`src/Host.jsx`):

```javascript
const getRandomItem = (gameMode) => {
  switch (gameMode) {
    // ...existing cases
    case 'yourgame':
      pool = yourGameData
      break
  }
}
```

### Adding New Questions

Simply edit the data files in `src/data/`. For example, to add memes:

```javascript
// In src/data/memes.js
export default [
  // ...existing memes
  {
    id: 101,
    quote: "Your new meme quote here",
    answer: "Source of the meme",
    source: "Where it's from"
  }
]
```

### Customizing Styles

The project uses Tailwind CSS with custom configuration:

- **Colors**: Edit `tailwind.config.js` - look for `colors` section
- **Fonts**: Custom fonts are defined in `index.css`
- **Animations**: Framer Motion is used for animations
- **Effects**: Particle effects in `src/components/Particles.jsx`

### State Management

The app uses Zustand for state management with persistence:

```javascript
// Access state
const { mode, players, setMode } = useGameStore()

// State is automatically synced between Host and Display
// Just call the action - sync happens automatically!
```

### Audio System

```javascript
import audioController from './audio'

// Play sounds
audioController.playClick()
audioController.playCorrect()
audioController.playWrong()
audioController.playVictory()

// Control volume
audioController.toggleMute()
audioController.setVolume(0.5)
```

---

## 🚀 Deployment

Game Night Controller consists of two parts:
1. **Static Frontend** - The React app (Vite build)
2. **WebSocket Server** - For cross-device synchronization

### Architecture Overview

```
┌─────────────┐         ┌──────────────────┐
│  TV Display │◄───────►│  WebSocket       │
│  (Browser)  │   WS    │  Server :3001    │
└─────────────┘         └────────┬─────────┘
                                 │
┌─────────────┐                  │
│  Host Phone │◄─────────────────┘
│  (Browser)  │        WS
└─────────────┘
```

### Option 1: Full-Stack Deployment (Railway, Render, Heroku)

Best for: Single-platform deployment with everything in one place.

**Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and create project
railway login
railway init

# Deploy
railway up

# Set environment variables
railway variables set WEBSOCKET_PORT=3001
railway variables set VITE_WS_URL=wss://your-app.railway.app
```

**Render:**
1. Create a new Web Service
2. Connect your repository
3. Set:
   - Build Command: `npm install && npm run build`
   - Start Command: `node server.js`
4. Add environment variables in Render dashboard

**Heroku:**
```bash
# Create app
heroku create your-game-night

# Set buildpack (if needed)
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main

# Set environment variables
heroku config:set WEBSOCKET_PORT=3001
heroku config:set VITE_WS_URL=wss://your-game-night.herokuapp.com
```

### Option 2: Split Deployment (Vercel + Separate WS Server)

Best for: Leveraging Vercel's free tier for frontend + cheap WS hosting.

**Step 1: Deploy Frontend to Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or connect GitHub repo to Vercel dashboard for auto-deploy
```

**Step 2: Deploy WebSocket Server**

Choose one of these platforms:

| Platform | Free Tier | Notes |
|----------|-----------|-------|
| Railway | $5 credit/month | Easiest setup |
| Render | 750 hours/month | Free tier spins down |
| Fly.io | 3 VMs free | Good for always-on |
| DigitalOcean | Paid only | Reliable production |

Example with Railway:
```bash
# In server directory (or monorepo)
railway init
railway up
railway variables set WEBSOCKET_PORT=3001
```

**Step 3: Configure Environment**

In Vercel dashboard, set environment variable:
```
VITE_WS_URL=wss://your-ws-server.railway.app
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `WEBSOCKET_PORT` | No | WebSocket server port (default: 3001) |
| `VITE_WS_URL` | Yes* | WebSocket URL for client connection |

*Required for production. For local dev, defaults to `ws://localhost:3001`.

### WebSocket Server Requirements

- Node.js 18+
- Outbound/inbound WebSocket connections allowed
- Port 3001 (or custom `WEBSOCKET_PORT`)
- For HTTPS sites: WSS required (most platforms handle this automatically)

### Health Check

The WebSocket server provides a health endpoint:
```bash
curl https://your-server.com/health
# Returns: {"status":"ok","clients":2}
```

### Troubleshooting Production Deployment

**WebSocket connection fails:**
1. Ensure `VITE_WS_URL` uses `wss://` (not `ws://`) for HTTPS sites
2. Check firewall allows WebSocket connections
3. Verify the server is running: `curl your-server/health`

**Mixed content errors:**
- HTTPS sites must use `wss://` URLs
- HTTP sites can use `ws://`

**CORS issues:**
- The server accepts connections from any origin
- If issues occur, add origin checking in `server.js`

---

## 📝 License

MIT License - Feel free to use for your own game nights!

---

## 🙏 Credits

Built with:
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Howler.js](https://howlerjs.com)

---

## 📚 Additional Documentation

- [Game Rules & Details](./docs/GAMES.md)
- [Host Controller Guide](./docs/HOST_GUIDE.md)
- [Setup Instructions](./docs/SETUP.md)

---

**Ready to host the ultimate game night?** 🎉
