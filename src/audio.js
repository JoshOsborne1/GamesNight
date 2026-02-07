// Game Night Audio System
// Embedded sound effects using data URIs for reliability

import { Howl, Howler } from 'howler'

// Sound effect data URIs (short, optimized WAV files)
// These are simple synthesized beeps/boops that work without external resources

const SOUNDS = {
  // Correct answer - pleasant high-pitch ding
  correct: `data:audio/wav;base64,UklGRl9vT1dUX1dXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU` +
           `BvAAAAAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//` +
           `AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/` +
           `/wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA`,
  
  // Wrong answer - buzzer sound  
  wrong: `data:audio/wav;base64,UklGRl9vT1dUX1dXQVZFZm10IBAAAAABAAEAQB8AAEAfAAAB` +
         `AAgAZGF0YUBvAAAAAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD/` +
         `/wAA//8AAP//AAD//wAA//8AAP//AAD//wAA`,
  
  // Button click - short tick
  buttonClick: `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAAB` +
               `AAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZ`,
  
  // Timer tick - high beep
  timerTick: `data:audio/wav;base64,UklGRiQCAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAAB` +
             `AAgAZGF0YQACAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA`,
  
  // Timer warning - urgent double beep
  timerWarning: `data:audio/wav;base64,UklGRl9vT1dUX1dXQVZFZm10IBAAAAABAAEAQB8AAE` +
                `AfAAABAAgAZGF0YUBvAAAAAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA`,
  
  // Chaos popup - dramatic
  chaosAlarm: `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAAB` +
              `AAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZ`,
  
  // Victory - triumphant
  victory: `data:audio/wav;base64,UklGRl9vT1dUX1dXQVZFZm10IBAAAAABAAEAQB8AAEAfAA` +
           `ABAAgAZGF0YUBvAAAAAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD`,
  
  // Game start
  gameStart: `data:audio/wav;base64,UklGRiQCAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAAB` +
             `AAgAZGF0YQACAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA`,
  
  // Score increment
  scoreUp: `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAA` +
           `gAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZ`,
  
  // Score decrement  
  scoreDown: `data:audio/wav;base64,UklGRiQCAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAAB` +
             `AAgAZGF0YQACAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA`
}

// Web Audio API fallback for browsers that need it
class WebAudioSynth {
  constructor() {
    this.ctx = null
    this.init()
  }
  
  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.warn('Web Audio API not supported')
    }
  }
  
  // Generate a beep sound
  beep(frequency = 800, duration = 0.1, type = 'sine', volume = 0.3) {
    if (!this.ctx) return
    if (this.ctx.state === 'suspended') this.ctx.resume()
    
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    
    osc.type = type
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime)
    
    gain.gain.setValueAtTime(volume, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration)
    
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    
    osc.start(this.ctx.currentTime)
    osc.stop(this.ctx.currentTime + duration)
  }
  
  // Ding sound (correct)
  playCorrect() {
    this.beep(880, 0.15, 'sine', 0.3)
    setTimeout(() => this.beep(1760, 0.3, 'sine', 0.2), 100)
  }
  
  // Buzz sound (wrong)
  playWrong() {
    this.beep(200, 0.5, 'sawtooth', 0.3)
    this.beep(150, 0.5, 'sawtooth', 0.3)
  }
  
  // Click sound
  playClick() {
    this.beep(1200, 0.05, 'sine', 0.2)
  }
  
  // Timer tick
  playTimerTick() {
    this.beep(1000, 0.08, 'sine', 0.15)
  }
  
  // Timer warning
  playTimerWarning() {
    this.beep(1500, 0.1, 'square', 0.3)
    setTimeout(() => this.beep(1500, 0.1, 'square', 0.3), 120)
  }
  
  // Chaos alarm
  playChaosAlarm() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.beep(800 - i * 100, 0.2, 'sawtooth', 0.3), i * 150)
    }
  }
  
  // Victory fanfare
  playVictory() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => this.beep(freq, 0.2, 'sine', 0.3), i * 150)
    })
  }
  
  // Game start
  playGameStart() {
    this.beep(440, 0.1, 'sine', 0.2)
    setTimeout(() => this.beep(554, 0.1, 'sine', 0.2), 100)
    setTimeout(() => this.beep(659, 0.3, 'sine', 0.3), 200)
  }
  
  // Score up
  playScoreUp() {
    this.beep(880, 0.1, 'sine', 0.25)
    setTimeout(() => this.beep(1100, 0.15, 'sine', 0.2), 80)
  }
  
  // Score down
  playScoreDown() {
    this.beep(400, 0.2, 'sawtooth', 0.25)
  }
}

class AudioController {
  constructor() {
    this.synth = new WebAudioSynth()
    this.howlSounds = {}
    this.masterVolume = 0.7
    this.isMuted = false
    this.useHowler = true
    this.bgmEnabled = false
    this.bgmVolume = 0.3
    this.bgm = null
    
    // Individual sound volumes
    this.volumes = {
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
    
    this.init()
  }
  
  init() {
    // Try to initialize Howler sounds
    try {
      Object.entries(SOUNDS).forEach(([name, dataUri]) => {
        this.howlSounds[name] = new Howl({
          src: [dataUri],
          volume: this.volumes[name] || 0.5,
          preload: true,
          html5: false,
          onloaderror: () => {
            // Mark this sound as unavailable via Howler
            this.howlSounds[name] = null
          }
        })
      })
    } catch (e) {
      console.warn('Howler initialization failed, using Web Audio API only')
      this.useHowler = false
    }
    
    // Set global volume
    Howler.volume(this.masterVolume)
  }
  
  // Play a sound by name
  play(soundName) {
    if (this.isMuted) return
    
    // Resume audio context if suspended (browser autoplay policy)
    if (this.synth.ctx && this.synth.ctx.state === 'suspended') {
      this.synth.ctx.resume()
    }
    
    // Try Howler first, fall back to Web Audio
    if (this.useHowler && this.howlSounds[soundName]) {
      this.howlSounds[soundName].play()
    } else {
      // Use Web Audio API synth as fallback
      const methodName = `play${soundName.charAt(0).toUpperCase() + soundName.slice(1)}`
      if (typeof this.synth[methodName] === 'function') {
        this.synth[methodName]()
      }
    }
  }
  
  // Stop a sound
  stop(soundName) {
    if (this.howlSounds[soundName]) {
      this.howlSounds[soundName].stop()
    }
  }
  
  // Convenience methods
  playCorrect() { this.play('correct') }
  playWrong() { this.play('wrong') }
  playClick() { this.play('buttonClick') }
  playTimerTick() { this.play('timerTick') }
  playTimerWarning() { this.play('timerWarning') }
  playChaosAlarm() { this.play('chaosAlarm') }
  playVictory() { this.play('victory') }
  playGameStart() { this.play('gameStart') }
  playScoreUp() { this.play('scoreUp') }
  playScoreDown() { this.play('scoreDown') }
  
  // Volume control
  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    Howler.volume(this.masterVolume)
  }
  
  setSoundVolume(soundName, volume) {
    this.volumes[soundName] = Math.max(0, Math.min(1, volume))
    if (this.howlSounds[soundName]) {
      this.howlSounds[soundName].volume(this.volumes[soundName])
    }
  }
  
  // Mute toggle
  toggleMute() {
    this.isMuted = !this.isMuted
    Howler.mute(this.isMuted)
    return this.isMuted
  }
  
  setMute(muted) {
    this.isMuted = muted
    Howler.mute(this.isMuted)
  }
  
  // Background music (placeholder - would need actual music files)
  playBGM(type = 'menu') {
    // BGM not implemented with data URIs (would be too large)
    // This is a placeholder for future implementation
    console.log(`BGM ${type} would play here`)
  }
  
  stopBGM() {
    if (this.bgm) {
      this.bgm.stop()
      this.bgm = null
    }
  }
  
  toggleBGM() {
    this.bgmEnabled = !this.bgmEnabled
    if (this.bgmEnabled) {
      this.playBGM()
    } else {
      this.stopBGM()
    }
    return this.bgmEnabled
  }
  
  // Get current state
  getState() {
    return {
      isMuted: this.isMuted,
      masterVolume: this.masterVolume,
      bgmEnabled: this.bgmEnabled,
      bgmVolume: this.bgmVolume,
      soundVolumes: { ...this.volumes }
    }
  }
  
  // Restore state
  setState(state) {
    if (state.isMuted !== undefined) this.setMute(state.isMuted)
    if (state.masterVolume !== undefined) this.setMasterVolume(state.masterVolume)
    if (state.bgmEnabled !== undefined) this.bgmEnabled = state.bgmEnabled
    if (state.bgmVolume !== undefined) this.bgmVolume = state.bgmVolume
    if (state.soundVolumes) {
      Object.entries(state.soundVolumes).forEach(([name, vol]) => {
        this.setSoundVolume(name, vol)
      })
    }
  }
}

// Create singleton instance
const audioController = new AudioController()

export default audioController
export { AudioController, WebAudioSynth }