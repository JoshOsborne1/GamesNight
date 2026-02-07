import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from './store'
import audioController from './audio'
import MainMenu from './games/MainMenu'
import MemeGame from './games/MemeGame'
import QuizGame from './games/QuizGame'
import ZoomedGame from './games/ZoomedGame'
import LogoGame from './games/LogoGame'
import PriceGame from './games/PriceGame'
import ChaosPopup from './components/ChaosPopup'
import Leaderboard from './components/Leaderboard'

// TV Display - View Only, Non-Interactive
// This component is designed to be shown on a TV/big screen
// It receives state from the Host controller via sync

function Display() {
  const { 
    mode, 
    chaosActive, 
    players, 
    revealed,
    timer,
    timerActive,
    currentItem,
    initSync,
    destroySync,
    syncStatus
  } = useGameStore()
  
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  // Initialize as FOLLOWER (TV Display follows Host state)
  useEffect(() => {
    console.log('[Display] Initializing as FOLLOWER...')
    initSync('follower')
    
    return () => {
      destroySync()
    }
  }, [])

  // Keyboard shortcuts (TV remote friendly)
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'l' || e.key === 'L') {
        setShowLeaderboard(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const renderGame = () => {
    switch (mode) {
      case 'menu':
        return <MainMenu />
      case 'meme':
        return <MemeGame />
      case 'geo':
      case 'music':
      case 'history':
      case 'maths':
      case 'riddles':
      case 'spelling':
        return <QuizGame category={mode} />
      case 'zoomed':
        return <ZoomedGame />
      case 'logo':
        return <LogoGame />
      case 'price':
        return <PriceGame />
      default:
        return <MainMenu />
    }
  }

  return (
    <div 
      className="min-h-screen bg-dark text-light overflow-hidden relative select-none"
      style={{ cursor: 'none' }} // Hide cursor on TV display
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(131, 56, 236, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(131, 56, 236, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Connection Status - Small, unobtrusive */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
          ${syncStatus === 'connected' 
            ? 'bg-success/20 text-success border border-success/30' 
            : 'bg-warning/20 text-warning border border-warning/30'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${
            syncStatus === 'connected' ? 'bg-success' : 'bg-warning animate-pulse'
          }`} />
          {syncStatus === 'connected' ? 'Connected' : 'Connecting...'}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header - Clean, minimal */}
        <header className="p-6 flex justify-between items-center pointer-events-none">
          <h1 className="font-display text-2xl text-primary">
            GAME NIGHT
          </h1>
          <div className="flex gap-4">
            {players.length > 0 && (
              <div className="text-right">
                <span className="text-light/60 text-sm">Players</span>
                <p className="font-display text-xl">{players.length}</p>
              </div>
            )}
          </div>
        </header>

        {/* Game Area */}
        <main className="flex-1 flex items-center justify-center p-8 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-6xl"
            >
              {renderGame()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-light/40 text-sm pointer-events-none">
          Feb 13th • THE ARENA
        </footer>
      </div>

      {/* Timer Overlay - Large, visible */}
      {timerActive && timer > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-6xl font-display font-bold ${
              timer <= 5 ? 'text-danger animate-pulse' : 'text-primary'
            }`}
          >
            {timer}s
          </motion.div>
        </div>
      )}

      {/* Chaos Popup Overlay */}
      <AnimatePresence>
        {chaosActive && <ChaosPopup />}
      </AnimatePresence>

      {/* Leaderboard Overlay */}
      <AnimatePresence>
        {showLeaderboard && (
          <Leaderboard onClose={() => setShowLeaderboard(false)} />
        )}
      </AnimatePresence>

      {/* Reveal Overlay - Shows when answer revealed */}
      <AnimatePresence>
        {revealed && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center"
          >
            <div className="bg-success/20 backdrop-blur-sm border-2 border-success rounded-2xl p-8">
              <p className="text-success text-4xl font-display font-bold">
                {currentItem.answer || currentItem.word || 'ANSWER'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Display
