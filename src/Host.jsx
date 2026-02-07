import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore, { GAME_MODES } from './store'
import { 
  Button, 
  IconButton, 
  HelpModal, 
  Settings, 
  PlayerProfile,
  soundManager,
  CircularTimer,
  ProgressTimer
} from './components'
import { 
  memes, geography, music, history, maths, 
  riddles, spelling, zoomed, logos, prices 
} from './data'
import syncManager from './sync'

// Icon Components
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43-.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const HelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <path d="M12 17h.01"/>
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"/>
    <rect x="14" y="4" width="4" height="16"/>
  </svg>
)

function Host() {
  const { 
    mode, 
    currentItem, 
    revealed, 
    players,
    settings,
    timer,
    timerActive,
    setMode, 
    setCurrentItem, 
    reveal,
    addPlayer,
    removePlayer,
    updatePlayer,
    updateScore,
    triggerChaos,
    nextGame,
    setTimer,
    setTimerActive,
    resetGame,
    initSync,
    syncStatus,
    isLeader
  } = useGameStore()

  const [newPlayerName, setNewPlayerName] = useState('')
  const [activeTab, setActiveTab] = useState('games')
  const [showHelp, setShowHelp] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [showProfile, setShowProfile] = useState(false)

  // Initialize sync on mount
  useEffect(() => {
    const success = initSync('leader')
    console.log('[Host] Sync initialized:', success, 'Status:', syncStatus)
  }, [])

  // Timer countdown effect
  useEffect(() => {
    let interval
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
    } else if (timer === 0 && timerActive) {
      // Auto reveal when timer hits 0
      reveal()
      setTimerActive(false)
    }
    return () => clearInterval(interval)
  }, [timer, timerActive, setTimer, setTimerActive, reveal])

  const handleAddPlayer = (e) => {
    e.preventDefault()
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName.trim())
      setNewPlayerName('')
    }
  }

  const handleTriggerChaos = (type) => {
    const { forfeits, challenges, rewards } = require('./data/chaos')
    let item
    if (type === 'forfeit') {
      const all = [...forfeits.low, ...forfeits.medium, ...forfeits.high]
      item = all[Math.floor(Math.random() * all.length)]
    } else if (type === 'challenge') {
      item = challenges[Math.floor(Math.random() * challenges.length)]
    } else {
      item = rewards[Math.floor(Math.random() * rewards.length)]
    }
    triggerChaos(type, item)
  }

  const getRandomItem = (gameMode) => {
    let pool
    switch (gameMode) {
      case 'meme':
        pool = memes
        break
      case 'geo':
        pool = [...geography.capitals, ...geography.countries, ...geography.flags]
        break
      case 'music':
        pool = [...music.finishLyric, ...music.whoSings, ...music.grabMic]
        break
      case 'history':
        pool = [...history.dates, ...history.figures, ...history.battles]
        break
      case 'maths':
        pool = [...maths.bidmas, ...maths.angles, ...maths.shapes, ...maths.formulas]
        break
      case 'riddles':
        pool = riddles
        break
      case 'spelling':
        pool = spelling
        break
      case 'zoomed':
        pool = zoomed
        break
      case 'logo':
        pool = logos
        break
      case 'price':
        pool = prices?.products || prices || []
        break
      default:
        return null
    }
    if (!pool || pool.length === 0) return null
    return pool[Math.floor(Math.random() * pool.length)]
  }

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player)
    setShowProfile(true)
  }

  const handleUpdatePlayer = (id, updates) => {
    updatePlayer(id, updates)
    const updated = players.find(p => p.id === id)
    if (updated) {
      setSelectedPlayer({ ...updated, ...updates })
    }
  }

  const handleNewGame = () => {
    const item = getRandomItem(mode)
    if (item) {
      setCurrentItem(item)
      setTimer(settings?.timerDuration || 30)
      setTimerActive(true)
    }
  }

  const handleReveal = () => {
    reveal()
    setTimerActive(false)
  }

  const handleNext = () => {
    nextGame()
    setTimerActive(false)
  }

  return (
    <div className="min-h-screen bg-dark text-light p-3 sm:p-4 pb-24">
      <div className="max-w-lg mx-auto">
        {/* Header - Mobile Optimized */}
        <motion.header 
          className="text-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-xl sm:text-2xl text-primary mb-1">
            HOST CONTROL
          </h1>
          <p className="text-light/60 text-xs sm:text-sm">
            TV: {window.location.origin}/display
          </p>
          
          {/* Sync Status - Compact for mobile */}
          <div className="flex justify-center mt-2">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs
              ${syncStatus === 'connected' 
                ? 'bg-success/20 text-success border border-success/30' 
                : syncStatus === 'error'
                ? 'bg-danger/20 text-danger border border-danger/30'
                : 'bg-warning/20 text-warning border border-warning/30'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${
                syncStatus === 'connected' ? 'bg-success' : 
                syncStatus === 'error' ? 'bg-danger' : 'bg-warning'
              }`} />
              <span className="text-xs">
                {syncStatus === 'connected' ? 'TV Connected' : 
                 syncStatus === 'error' ? 'Error' : 'Connecting...'}
              </span>
            </div>
          </div>
        </motion.header>

        {/* Tabs - Full width, larger touch targets */}
        <motion.div 
          className="flex gap-2 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {['games', 'players', 'chaos'].map(tab => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3 sm:py-4 rounded-xl font-display uppercase text-sm sm:text-base transition-all ${
                activeTab === tab 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'bg-light/5 border border-light/20 text-light/70'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Games Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'games' && (
            <motion.div 
              key="games"
              className="space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Game Grid - 2 columns, larger touch targets */}
              <div className="grid grid-cols-2 gap-2">
                {GAME_MODES.filter(g => g.id !== 'menu').map((game, i) => {
                  const isEnabled = settings?.enabledGames?.includes(game.id) ?? true
                  return (
                    <motion.button
                      key={game.id}
                      onClick={() => isEnabled && setMode(game.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      whileTap={isEnabled ? { scale: 0.95 } : {}}
                      disabled={!isEnabled}
                      className={`p-4 sm:p-5 rounded-xl border-2 text-left transition-all min-h-[80px] flex items-center ${
                        mode === game.id 
                          ? `border-${game.color} bg-${game.color}/20 shadow-lg` 
                          : isEnabled
                            ? 'border-light/10 bg-light/5 active:border-light/30'
                            : 'border-light/5 bg-light/5 opacity-40'
                      }`}
                    >
                      <p className={`font-display text-sm sm:text-base font-semibold ${isEnabled ? `text-${game.color}` : 'text-light/40'}`}>
                        {game.name}
                      </p>
                    </motion.button>
                  )
                })}
              </div>

              {/* Game Controls - Large buttons for easy tapping */}
              <AnimatePresence>
                {mode !== 'menu' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    className="bg-light/5 rounded-xl p-3 sm:p-4 space-y-3 border border-light/10 overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-accent text-base sm:text-lg">
                        {GAME_MODES.find(g => g.id === mode)?.name}
                      </p>
                      <button
                        onClick={() => setShowHelp(true)}
                        className="p-2 text-light/40 hover:text-primary"
                      >
                        <HelpIcon />
                      </button>
                    </div>
                    
                    {/* Timer Display */}
                    {timerActive && (
                      <div className="flex justify-center py-2">
                        <CircularTimer 
                          timeLeft={timer} 
                          maxTime={settings?.timerDuration || 30}
                          size="md"
                        />
                      </div>
                    )}
                    
                    {/* Control Buttons - Large touch targets */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={handleNewGame}
                        disabled={!!currentItem}
                        className="bg-accent text-white py-4 sm:py-5 rounded-xl font-display font-bold text-sm sm:text-base disabled:opacity-50 active:scale-95 transition-transform"
                      >
                        NEW
                      </button>
                      
                      <button
                        onClick={handleReveal}
                        disabled={!currentItem || revealed}
                        className="bg-secondary text-white py-4 sm:py-5 rounded-xl font-display font-bold text-sm sm:text-base disabled:opacity-50 active:scale-95 transition-transform"
                      >
                        REVEAL
                      </button>
                      
                      <button
                        onClick={handleNext}
                        className="bg-primary text-white py-4 sm:py-5 rounded-xl font-display font-bold text-sm sm:text-base active:scale-95 transition-transform"
                      >
                        NEXT
                      </button>
                    </div>

                    {/* Timer Controls */}
                    {currentItem && !revealed && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setTimerActive(!timerActive)}
                          className="px-4 py-2 bg-light/10 rounded-lg text-sm flex items-center gap-2"
                        >
                          {timerActive ? <PauseIcon /> : <PlayIcon />}
                          {timerActive ? 'Pause' : 'Resume'}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Players Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'players' && (
            <motion.div 
              key="players"
              className="space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Add Player - Larger input and button */}
              <form onSubmit={handleAddPlayer} className="flex gap-2">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  placeholder="Player name..."
                  className="flex-1 bg-light/10 border border-light/20 rounded-xl px-4 py-3.5 text-light text-base"
                />
                <button 
                  type="submit"
                  className="bg-success text-dark px-5 sm:px-6 py-3.5 rounded-xl font-display font-bold text-sm sm:text-base"
                >
                  ADD
                </button>
              </form>

              {/* Player List */}
              <div className="space-y-2">
                <AnimatePresence>
                  {players.map((player, i) => (
                    <motion.div 
                      key={player.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handlePlayerClick(player)}
                      className="flex items-center gap-3 bg-light/5 p-3 sm:p-4 rounded-xl border border-light/10 active:bg-light/10"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-dark font-bold text-base sm:text-lg">
                        {player.name.charAt(0).toUpperCase()}
                      </div>
                      
                      <span className="flex-1 font-display text-base sm:text-lg">{player.name}</span>
                      
                      <span className="font-mono text-success text-lg sm:text-xl">{player.score}</span>
                      
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => updateScore(player.id, 1)}
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-success/20 text-success rounded-xl font-bold text-lg active:scale-90 transition-transform"
                        >
                          +
                        </button>
                        
                        <button 
                          onClick={() => updateScore(player.id, -1)}
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-danger/20 text-danger rounded-xl font-bold text-lg active:scale-90 transition-transform"
                        >
                          -
                        </button>
                        
                        <button 
                          onClick={() => removePlayer(player.id)}
                          className="w-10 h-10 sm:w-12 sm:h-12 text-light/40 rounded-xl active:text-danger"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {players.length === 0 && (
                  <div className="text-center py-8 text-light/40">
                    <p className="text-base">No players yet</p>
                    <p className="text-sm mt-1">Add players to start</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chaos Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'chaos' && (
            <motion.div 
              key="chaos"
              className="grid grid-cols-1 gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => handleTriggerChaos('forfeit')}
                className="p-5 sm:p-6 bg-danger/20 border-2 border-danger rounded-xl text-left active:scale-[0.98] transition-transform"
              >
                <p className="font-display text-danger text-lg sm:text-xl font-bold">FORFEIT</p>
                <p className="text-sm text-light/60 mt-1">Random punishment</p>
              </button>

              <button
                onClick={() => handleTriggerChaos('challenge')}
                className="p-5 sm:p-6 bg-accent/20 border-2 border-accent rounded-xl text-left active:scale-[0.98] transition-transform"
              >
                <p className="font-display text-accent text-lg sm:text-xl font-bold">CHALLENGE</p>
                <p className="text-sm text-light/60 mt-1">Group activity</p>
              </button>

              <button
                onClick={() => handleTriggerChaos('reward')}
                className="p-5 sm:p-6 bg-success/20 border-2 border-success rounded-xl text-left active:scale-[0.98] transition-transform"
              >
                <p className="font-display text-success text-lg sm:text-xl font-bold">REWARD</p>
                <p className="text-sm text-light/60 mt-1">Power up!</p>
              </button>

              <button
                onClick={() => setMode('menu')}
                className="p-4 bg-light/10 border border-light/30 rounded-xl mt-2 active:scale-[0.98] transition-transform"
              >
                <p className="font-display text-center text-sm sm:text-base">Back to Menu</p>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals */}
        {showHelp && (
          <HelpModal 
            isOpen={showHelp} 
            onClose={() => setShowHelp(false)} 
            gameId={mode !== 'menu' ? mode : null}
          />
        )}

        {showSettings && (
          <Settings
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
          />
        )}

        {showProfile && selectedPlayer && (
          <PlayerProfile
            player={selectedPlayer}
            isOpen={showProfile}
            onClose={() => {
              setShowProfile(false)
              setSelectedPlayer(null)
            }}
            onUpdate={handleUpdatePlayer}
            onRemove={removePlayer}
          />
        )}
      </div>
    </div>
  )
}

export default Host
