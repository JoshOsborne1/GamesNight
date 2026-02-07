import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import { soundManager } from './index'
import useGameStore from '../store'

// Icon Components
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const GamepadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12"/>
    <line x1="8" y1="10" x2="8" y2="14"/>
    <line x1="15" y1="13" x2="15.01" y2="13"/>
    <line x1="18" y1="11" x2="18.01" y2="11"/>
    <rect width="20" height="12" x="2" y="6" rx="2"/>
  </svg>
)

const VolumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
)

const DisplayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="3" rx="2"/>
    <line x1="8" x2="16" y1="21" y2="21"/>
    <line x1="12" x2="12" y1="17" y2="21"/>
  </svg>
)

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
)

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
    <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/>
    <path d="M7 3v4a1 1 0 0 0 1 1h7"/>
  </svg>
)

const RotateCcwIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"/>
    <path d="M3 3v9h9"/>
  </svg>
)

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 w-full justify-center ${
      active 
        ? 'bg-primary text-white shadow-lg shadow-primary/25' 
        : 'text-light/70 hover:text-light hover:bg-light/5'
    }`}
  >
    <Icon />
    {label}
  </motion.button>
)

const Slider = ({ value, min, max, step = 1, onChange, label, suffix = '' }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm text-light/70">{label}</span>
      <span className="text-sm font-display text-primary">{value}{suffix}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-light/10 rounded-lg appearance-none cursor-pointer accent-primary"
    />
  </div>
)

const Toggle = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-light/5 hover:bg-light/10 transition-colors">
    <div>
      <p className="text-light font-medium">{label}</p>
      {description && <p className="text-light/50 text-sm">{description}</p>}
    </div>
    <motion.button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full relative transition-colors ${
        checked ? 'bg-primary' : 'bg-light/20'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-white absolute top-0.5"
        animate={{ left: checked ? '26px' : '2px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  </div>
)

function Settings({ isOpen, onClose }) {
  const { 
    audio, 
    setAudioMute, 
    setMasterVolume, 
    setSoundVolume, 
    toggleBGM, 
    setBGMVolume,
    resetGame,
    players,
    settings,
    updateSettings,
    gameSession,
    saveSession,
    loadSession,
    clearSession
  } = useGameStore()

  const [activeTab, setActiveTab] = useState('game')
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const [showConfirmClear, setShowConfirmClear] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleClose = () => {
    soundManager.playClick()
    onClose()
  }

  const handleReset = () => {
    if (!showConfirmReset) {
      setShowConfirmReset(true)
      return
    }
    soundManager.playClick()
    resetGame()
    setShowConfirmReset(false)
    setSaveMessage('Game reset successfully')
    setTimeout(() => setSaveMessage(''), 2000)
  }

  const handleSaveSession = () => {
    soundManager.playClick()
    saveSession()
    setSaveMessage('Session saved!')
    setTimeout(() => setSaveMessage(''), 2000)
  }

  const handleLoadSession = () => {
    soundManager.playClick()
    loadSession()
    setSaveMessage('Session restored!')
    setTimeout(() => setSaveMessage(''), 2000)
  }

  const handleClearHistory = () => {
    if (!showConfirmClear) {
      setShowConfirmClear(true)
      return
    }
    soundManager.playClick()
    clearSession()
    setShowConfirmClear(false)
    setSaveMessage('History cleared!')
    setTimeout(() => setSaveMessage(''), 2000)
  }

  const gameModes = [
    { id: 'meme', name: 'Guess the Meme' },
    { id: 'geo', name: 'Geography' },
    { id: 'music', name: 'Music' },
    { id: 'history', name: 'History' },
    { id: 'maths', name: 'Mathematics' },
    { id: 'riddles', name: 'Riddles' },
    { id: 'spelling', name: 'Spelling Bee' },
    { id: 'zoomed', name: 'Zoomed' },
    { id: 'logo', name: 'Logorithmic' },
    { id: 'price', name: 'Price is Right' }
  ]

  const difficultyLevels = [
    { id: 'easy', name: 'Easy', desc: 'More time, simpler questions' },
    { id: 'medium', name: 'Medium', desc: 'Balanced challenge' },
    { id: 'hard', name: 'Hard', desc: 'Less time, harder questions' }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20 text-primary">
            <SettingsIcon />
          </div>
          <span>Settings</span>
        </div>
      }
      size="lg"
    >
      <div className="space-y-4">
        {/* Tabs */}
        <motion.div 
          className="flex gap-2 p-1 rounded-2xl bg-light/5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TabButton 
            active={activeTab === 'game'} 
            onClick={() => setActiveTab('game')}
            icon={GamepadIcon}
            label="Game"
          />
          <TabButton 
            active={activeTab === 'audio'} 
            onClick={() => setActiveTab('audio')}
            icon={VolumeIcon}
            label="Audio"
          />
          <TabButton 
            active={activeTab === 'display'} 
            onClick={() => setActiveTab('display')}
            icon={DisplayIcon}
            label="Display"
          />
          <TabButton 
            active={activeTab === 'session'} 
            onClick={() => setActiveTab('session')}
            icon={SaveIcon}
            label="Session"
          />
        </motion.div>

        {/* Game Settings Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'game' && (
            <motion.div
              key="game"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Difficulty */}
              <div className="p-4 rounded-2xl bg-light/5 border border-light/10">
                <h4 className="font-display text-lg mb-4 flex items-center gap-2">
                  <LayersIcon />
                  Difficulty Level
                </h4>
                <div className="space-y-2">
                  {difficultyLevels.map((level) => (
                    <motion.button
                      key={level.id}
                      onClick={() => updateSettings({ difficulty: level.id })}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                        settings.difficulty === level.id
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-light/5 border-light/10 text-light hover:border-light/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{level.name}</p>
                          <p className="text-sm opacity-70">{level.desc}</p>
                        </div>
                        {settings.difficulty === level.id && <CheckIcon />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Timer Settings */}
              <div className="p-4 rounded-2xl bg-light/5 border border-light/10">
                <h4 className="font-display text-lg mb-4 flex items-center gap-2">
                  <ClockIcon />
                  Timer Settings
                </h4>
                <div className="space-y-4">
                  <Slider
                    label="Default Timer Duration"
                    value={settings.timerDuration}
                    min={10}
                    max={120}
                    step={5}
                    suffix="s"
                    onChange={(v) => updateSettings({ timerDuration: v })}
                  />
                  <Slider
                    label="Answer Time Limit"
                    value={settings.answerTimeLimit}
                    min={5}
                    max={60}
                    step={5}
                    suffix="s"
                    onChange={(v) => updateSettings({ answerTimeLimit: v })}
                  />
                </div>
              </div>

              {/* Enabled Games */}
              <div className="p-4 rounded-2xl bg-light/5 border border-light/10">
                <h4 className="font-display text-lg mb-4">Enabled Game Modes</h4>
                <div className="grid grid-cols-2 gap-2">
                  {gameModes.map((game) => (
                    <motion.button
                      key={game.id}
                      onClick={() => {
                        const enabled = settings.enabledGames.includes(game.id)
                        updateSettings({
                          enabledGames: enabled
                            ? settings.enabledGames.filter(g => g !== game.id)
                            : [...settings.enabledGames, game.id]
                        })
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl text-sm text-left transition-all ${
                        settings.enabledGames.includes(game.id)
                          ? 'bg-success/10 border border-success/50 text-success'
                          : 'bg-light/5 border border-light/10 text-light/50'
                      }`}
                    >
                      {game.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Audio Settings Tab */}
          {activeTab === 'audio' && (
            <motion.div
              key="audio"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Toggle
                label="Master Mute"
                checked={audio.isMuted}
                onChange={setAudioMute}
                description="Silence all audio output"
              />

              <div className="p-4 rounded-2xl bg-light/5 border border-light/10">
                <h4 className="font-display text-lg mb-4">Volume Levels</h4>
                <div className="space-y-4">
                  <Slider
                    label="Master Volume"
                    value={Math.round(audio.masterVolume * 100)}
                    min={0}
                    max={100}
                    suffix="%"
                    onChange={(v) => setMasterVolume(v / 100)}
                  />
                  
                  <Toggle
                    label="Background Music"
                    checked={audio.bgmEnabled}
                    onChange={toggleBGM}
                    description="Play ambient music during gameplay"
                  />
                  
                  {audio.bgmEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="ml-4"
                    >
                      <Slider
                        label="BGM Volume"
                        value={Math.round(audio.bgmVolume * 100)}
                        min={0}
                        max={100}
                        suffix="%"
                        onChange={(v) => setBGMVolume(v / 100)}
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-light/5 border border-light/10">
                <h4 className="font-display text-lg mb-4">Sound Effects</h4>
                <div className="space-y-3">
                  {[
                    { key: 'correct', label: 'Correct Answer' },
                    { key: 'wrong', label: 'Wrong Answer' },
                    { key: 'buttonClick', label: 'Button Click' },
                    { key: 'timerTick', label: 'Timer Tick' },
                    { key: 'timerWarning', label: 'Timer Warning' },
                    { key: 'chaosAlarm', label: 'Chaos Alarm' },
                    { key: 'victory', label: 'Victory' },
                    { key: 'gameStart', label: 'Game Start' },
                    { key: 'scoreUp', label: 'Score Up' },
                    { key: 'scoreDown', label: 'Score Down' }
                  ].map((sound) => (
                    <Slider
                      key={sound.key}
                      label={sound.label}
                      value={Math.round((audio.soundVolumes[sound.key] || 0.5) * 100)}
                      min={0}
                      max={100}
                      suffix="%"
                      onChange={(v) => setSoundVolume(sound.key, v / 100)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Display Settings Tab */}
          {activeTab === 'display' && (
            <motion.div
              key="display"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Toggle
                label="Particle Effects"
                checked={settings.particlesEnabled}
                onChange={(v) => updateSettings({ particlesEnabled: v })}
                description="Show background particle animations"
              />

              <Toggle
                label="Scanlines Effect"
                checked={settings.scanlinesEnabled}
                onChange={(v) => updateSettings({ scanlinesEnabled: v })}
                description="CRT monitor scanline overlay"
              />

              <Toggle
                label="Show Timer on Display"
                checked={settings.showTimerOnDisplay}
                onChange={(v) => updateSettings({ showTimerOnDisplay: v })}
                description="Display countdown timer on main screen"
              />

              <Toggle
                label="Show Score Animations"
                checked={settings.scoreAnimationsEnabled}
                onChange={(v) => updateSettings({ scoreAnimationsEnabled: v })}
                description="Animate score changes"
              />

              <div className="p-4 rounded-2xl bg-light/5 border border-light/10">
                <h4 className="font-display text-lg mb-4">Theme</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['purple', 'blue', 'green', 'orange', 'pink', 'red'].map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => updateSettings({ theme: color })}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl border-2 capitalize transition-all ${
                        settings.theme === color
                          ? 'border-primary bg-primary/10'
                          : 'border-light/10 hover:border-light/30'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full mx-auto mb-2 bg-${color}-500`} 
                        style={{ backgroundColor: `var(--color-${color})` }}
                      />
                      <span className="text-sm">{color}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Session Management Tab */}
          {activeTab === 'session' && (
            <motion.div
              key="session"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Session Status */}
              <div className="p-4 rounded-2xl bg-light/5 border border-light/10">
                <h4 className="font-display text-lg mb-4">Current Session</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-light/60">Players:</span>
                    <span className="font-display">{players.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light/60">Session Active:</span>
                    <span className={gameSession.isActive ? 'text-success' : 'text-light/40'}>
                      {gameSession.isActive ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {gameSession.savedAt && (
                    <div className="flex justify-between">
                      <span className="text-light/60">Last Saved:</span>
                      <span className="text-light/80">
                        {new Date(gameSession.savedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Session Actions */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={handleSaveSession}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <SaveIcon />
                  Save Session
                </motion.button>

                <motion.button
                  onClick={handleLoadSession}
                  whileTap={{ scale: 0.98 }}
                  disabled={!gameSession.isActive}
                  className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcwIcon />
                  Restore Session
                </motion.button>
              </div>

              {/* Game History */}
              <div className="p-4 rounded-2xl bg-light/5 border border-light/10">
                <h4 className="font-display text-lg mb-4">Game History</h4>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {gameSession.history?.length > 0 ? (
                    gameSession.history.map((entry, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-3 rounded-xl bg-light/5 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium capitalize">{entry.gameMode}</p>
                          <p className="text-xs text-light/50">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <span className="text-success font-display">+{entry.points}</span>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center text-light/40 py-4">No games played yet</p>
                  )}
                </div>
              </div>

              {/* Reset Section */}
              <div className="p-4 rounded-2xl bg-danger/10 border border-danger/30">
                <h4 className="font-display text-lg mb-4 text-danger flex items-center gap-2">
                  <TrashIcon />
                  Danger Zone
                </h4>
                
                <div className="space-y-2">
                  <motion.button
                    onClick={handleReset}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 rounded-xl bg-danger/20 border border-danger/50 text-danger hover:bg-danger/30 transition-all"
                  >
                    {showConfirmReset ? 'Click again to confirm reset' : 'Reset Current Game'}
                  </motion.button>

                  <motion.button
                    onClick={handleClearHistory}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 rounded-xl bg-light/5 border border-light/20 text-light/70 hover:bg-light/10 transition-all"
                  >
                    {showConfirmClear ? 'Click again to confirm' : 'Clear Game History'}
                  </motion.button>
                </div>
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {saveMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-xl bg-success/10 border border-success/30 text-success text-center"
                  >
                    {saveMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}

export default Settings
