import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../store'

// SVG Icon Components
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
)

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const SoundOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
)

const SoundOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
)

function Header({ 
  showBackButton = false, 
  onMenuToggle, 
  isMenuOpen = false,
  onLeaderboardClick,
  onMuteToggle,
  isMuted = false 
}) {
  const { mode, players, setMode } = useGameStore()
  
  const isInGame = mode !== 'menu'
  
  const handleBackClick = () => {
    if (isInGame) {
      setMode('menu')
    }
  }
  
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-dark/80 backdrop-blur-xl border-b border-light/10" />
      
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Section - Back Button & Logo */}
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {showBackButton && isInGame && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackClick}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-light/5 border border-light/10 text-light/80 hover:text-light hover:border-light/30 hover:bg-light/10 transition-all"
              >
                <BackIcon />
                <span className="font-display text-sm hidden sm:inline">Back</span>
              </motion.button>
            )}
          </AnimatePresence>
          
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(255, 0, 110, 0.5)',
                    '0 0 20px rgba(255, 0, 110, 0.8)',
                    '0 0 10px rgba(255, 0, 110, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 11h4M6 15h4"/>
                  <path d="M10 11v4c0 1.1.9 2 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1"/>
                  <path d="M10 11V9a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3"/>
                  <rect width="20" height="14" x="2" y="5" rx="2"/>
                  <path d="M12 19v2"/>
                </svg>
              </motion.div>
            </div>
            
            <div className="hidden sm:block">
              <motion.h1 
                className="font-pixel text-lg text-primary leading-tight"
                animate={{ 
                  textShadow: [
                    '0 0 10px rgba(255, 0, 110, 0.5)',
                    '0 0 20px rgba(255, 0, 110, 0.8)',
                    '0 0 10px rgba(255, 0, 110, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                GAME NIGHT
              </motion.h1>
              <p className="text-xs text-light/40 font-display">THE ARENA</p>
            </div>
          </motion.div>
        </div>
        
        {/* Center Section - Current Game Name (when in game) */}
        <AnimatePresence mode="wait">
          {isInGame && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hidden md:block"
            >
              <span className="font-display text-accent text-lg uppercase tracking-wider">
                {mode}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Right Section - Player Count & Menu */}
        <div className="flex items-center gap-3">
          {/* Player Count */}
          <AnimatePresence>
            {players.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/30"
              >
                <UsersIcon />
                <span className="font-display text-success font-bold">{players.length}</span>
                <span className="text-success/60 text-sm hidden lg:inline">players</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Mute Toggle */}
          {onMuteToggle && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMuteToggle}
              className={`p-2.5 rounded-xl border transition-all ${
                isMuted 
                  ? 'bg-danger/10 border-danger/30 text-danger' 
                  : 'bg-light/5 border-light/10 text-light/70 hover:text-light hover:border-light/30'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
            </motion.button>
          )}
          
          {/* Leaderboard Button */}
          {onLeaderboardClick && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLeaderboardClick}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
              <span className="font-display text-sm font-semibold">Scores</span>
            </motion.button>
          )}
          
          {/* Menu Toggle */}
          {onMenuToggle && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuToggle}
              className={`p-2.5 rounded-xl border transition-all ${
                isMenuOpen 
                  ? 'bg-primary/20 border-primary text-primary' 
                  : 'bg-light/5 border-light/10 text-light/70 hover:text-light hover:border-light/30'
              }`}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Header