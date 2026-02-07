# Audio System Documentation

## Overview
The Game Night Controller now has a comprehensive audio system with sound effects for all game interactions. The system uses Howler.js as the primary audio engine with a Web Audio API fallback for maximum compatibility.

## Files Created/Modified

### New Files
- `/src/audio.js` - Main audio controller with embedded sounds and Web Audio API synth

### Modified Files
- `/src/store.js` - Added audio state (mute, volume, BGM settings) with persistence
- `/src/Host.jsx` - Button click sounds, score change sounds, audio settings UI
- `/src/Display.jsx` - Game start sounds, victory sounds, mute toggle
- `/src/components/ChaosPopup.jsx` - Alarm sound on popup
- `/src/games/QuizGame.jsx` - Correct/wrong answer sounds
- `/src/games/MemeGame.jsx` - Timer tick sounds, reveal sound
- `/src/games/ZoomedGame.jsx` - Victory sound on reveal
- `/src/games/LogoGame.jsx` - Victory sound on reveal
- `/src/games/PriceGame.jsx` - Victory sound on reveal
- `/src/components/SoundManager.js` - Re-exports audioController for backwards compatibility
- `/src/components/CountdownTimer.jsx` - Timer tick/warning sounds

## Audio Controller API

### Playing Sounds
```javascript
import audioController from './audio'

// Game sounds
audioController.playCorrect()      // Ding for correct answer
audioController.playWrong()        // Buzz for wrong answer
audioController.playClick()        // Button click
audioController.playTimerTick()    // Timer tick
audioController.playTimerWarning() // Urgent timer warning
audioController.playChaosAlarm()   // Chaos popup alarm
audioController.playVictory()      // Victory celebration
audioController.playGameStart()    // Game start
audioController.playScoreUp()      // Score increase
audioController.playScoreDown()    // Score decrease

// Generic play by name
audioController.play('correct')
```

### Volume Control
```javascript
audioController.setMasterVolume(0.5)        // 0-1 range
audioController.setSoundVolume('correct', 0.8) // Individual sound volume
audioController.toggleMute()                 // Toggle mute
audioController.setMute(true)               // Explicit mute
```

### State Management
```javascript
// Get current state
const state = audioController.getState()

// Restore state
audioController.setState(storeAudioState)
```

## Store Audio State
The audio state is persisted in localStorage via Zustand's persist middleware:

```javascript
const { audio, setAudioMute, setMasterVolume } = useGameStore()

// Audio state structure:
{
  isMuted: false,
  masterVolume: 0.7,
  bgmEnabled: false,
  bgmVolume: 0.3,
  soundVolumes: {
    correct: 0.8,
    wrong: 0.7,
    buttonClick: 0.5,
    timerTick: 0.4,
    timerWarning: 0.6,
    chaosAlarm: 0.8,
    victory: 0.9,
    gameStart: 0.7,
    scoreUp: 0.6,
    scoreDown: 0.6
  }
}
```

## Sound Triggers

### Host Controller
- Button clicks: All buttons
- Score up/down: +1/-1 score buttons
- Chaos alarm: When chaos popup is triggered

### Display
- Game start: When switching from menu to a game
- Victory: When answer is revealed
- Mute toggle: Press 'M' key

### Quiz Game
- Click: Option selection
- Correct: Right answer selected
- Wrong: Wrong answer selected

### Meme Game
- Timer tick: Last 5 seconds
- Victory: When revealed

### Chaos Popup
- Alarm: On popup open
- Click: Close button

### Countdown Timer
- Tick: Every second during last 10 seconds
- Warning: During danger threshold (default: last 5 seconds)
- Alarm: When timer completes

## Audio Settings UI
The Host panel includes an audio settings panel with:
- Mute toggle button
- Master volume slider
- Test sound button

## Keyboard Shortcuts
- `L` - Toggle leaderboard
- `M` - Toggle mute

## Technical Details

### Sound Generation
The audio system uses two approaches:
1. **Howler.js** - Primary audio engine for data URI sounds
2. **Web Audio API** - Fallback synthesizer that generates beeps/boops

The Web Audio synth generates sounds algorithmically:
- Correct: Two-tone ascending ding (880Hz → 1760Hz)
- Wrong: Low descending buzz (200Hz + 150Hz sawtooth)
- Click: Short high beep (1200Hz)
- Timer: Medium beep (1000Hz)
- Warning: Double square wave (1500Hz)
- Chaos: Three descending tones (800Hz → 600Hz → 400Hz)
- Victory: Major chord arpeggio (C-E-G-C)

### Browser Compatibility
- Modern browsers: Full Howler.js support
- Older browsers: Web Audio API fallback
- Autoplay policy: Audio context resumes on first user interaction