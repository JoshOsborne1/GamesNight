import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../store'
import { soundManager } from './index'
import AnimatedScore from './AnimatedScore'

const { AnimatedNumber } = AnimatedScore

// Icon Components
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
)

const CrownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
  </svg>
)

const MedalIcon = ({ place }) => {
  const colors = {
    1: 'text-yellow-400',
    2: 'text-gray-300',
    3: 'text-amber-600'
  }
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={colors[place] || 'text-light-muted'}>
      <circle cx="12" cy="9" r="5" fill="currentColor" fillOpacity="0.1"/>
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
    </svg>
  )
}

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" fill="currentColor" fillOpacity="0.1"/>
  </svg>
)

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M8 16H3v5"/>
  </svg>
)

// Podium Place Component
const PodiumPlace = ({ player, place, delay }) => {
  const heights = { 1: 'h-40', 2: 'h-28', 3: 'h-20' }
  const gradients = {
    1: 'from-yellow-500/30 to-yellow-600/10',
    2: 'from-gray-300/30 to-gray-400/10',
    3: 'from-amber-600/30 to-amber-700/10'
  }
  const textColors = {
    1: 'text-yellow-400',
    2: 'text-gray-300',
    3: 'text-amber-500'
  }

  if (!player) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      className={`flex flex-col items-center ${place === 1 ? '-mt-8' : ''}`}
    >
      {/* Rank Icon */}
      <motion.div
        animate={place === 1 ? { 
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className={`mb-3 ${textColors[place]}`}
      >
        {place === 1 ? <CrownIcon /> : <MedalIcon place={place} />}
      </motion.div>

      {/* Player Info */}
      <div className="text-center mb-3">
        <p className={`font-display text-sm ${textColors[place]}`}>{player.name}</p>
        <p className={`font-display text-2xl font-bold ${textColors[place]}`}>
          <AnimatedNumber value={player.score} />
        </p>
      </div>

      {/* Podium */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        transition={{ delay: delay + 0.1, type: 'spring', stiffness: 100 }}
        className={`w-20 ${heights[place]} rounded-t-xl bg-gradient-to-t ${gradients[place]} border-t border-x border-white/10`}
      />
    </motion.div>
  )
}

// Player Row Component
const PlayerRow = ({ player, index, totalPlayers }) => {
  const isTopThree = index < 3
  
  return (
    <motion.div
      layout
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 30, opacity: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
        isTopThree 
          ? 'bg-white/5 border border-white/10' 
          : 'hover:bg-white/5'
      }`}
    >
      {/* Rank */}
      <div className="w-8 text-center">
        {index < 3 ? (
          <MedalIcon place={index + 1} />
        ) : (
          <span className="text-light-muted font-medium">{index + 1}</span>
        )}
      </div>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold"
      >
        {player.name.charAt(0).toUpperCase()}
      </div>

      {/* Name */}
      <span className="flex-1 font-medium text-light">{player.name}</span>

      {/* Score */}
      <motion.span 
        key={player.score}
        initial={{ scale: 1.2, color: '#10B981' }}
        animate={{ scale: 1, color: isTopThree ? undefined : '#F8FAFC' }}
        className={`font-display text-xl font-bold ${
          index === 0 ? 'text-yellow-400' : 
          index === 1 ? 'text-gray-300' : 
          index === 2 ? 'text-amber-500' : ''
        }`}
      >
        <AnimatedNumber value={player.score} />
      </motion.span>
    </motion.div>
  )
}

function Leaderboard({ onClose }) {
  const { players, resetGame } = useGameStore()
  const [showConfirm, setShowConfirm] = useState(false)
  
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const topThree = sortedPlayers.slice(0, 3)
  const others = sortedPlayers.slice(3)

  useEffect(() => {
    // Play sound when opening
    soundManager.playClick()
  }, [])

  const handleClose = () => {
    soundManager.playClick()
    onClose()
  }

  const handleReset = () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }
    soundManager.playClick()
    resetGame()
    setShowConfirm(false)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(15, 15, 26, 0.98)',
        backdropFilter: 'blur(20px)'
      }}
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-3xl glass-strong"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/20 text-primary">
                <TrophyIcon />
              </div>
              <div>
                <h2 className="font-display text-2xl">Leaderboard</h2>
                <p className="text-light-muted text-sm">{players.length} {players.length === 1 ? 'Player' : 'Players'} Competing</p>
              </div>
            </div>
            
            <motion.button
              onClick={handleClose}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl text-light-muted hover:text-light hover:bg-white/10 transition-colors"
            >
              <XIcon />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {sortedPlayers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 mb-6">
                <TrophyIcon />
              </div>
              <p className="text-light-muted text-lg">No players yet</p>
              <p className="text-light-muted/60 text-sm mt-1">Add players to see the leaderboard</p>
            </motion.div>
          ) : (
            <>
              {/* Podium */}
              {topThree.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center items-end gap-4 mb-10"
                >
                  {/* 2nd Place */}
                  {topThree[1] && <PodiumPlace player={topThree[1]} place={2} delay={0.2} />}
                  
                  {/* 1st Place */}
                  {topThree[0] && <PodiumPlace player={topThree[0]} place={1} delay={0.1} />}
                  
                  {/* 3rd Place */}
                  {topThree[2] && <PodiumPlace player={topThree[2]} place={3} delay={0.3} />}
                </motion.div>
              )}

              {/* Full List */}
              <div className="space-y-2">
                <AnimatePresence>
                  {sortedPlayers.map((player, i) => (
                    <PlayerRow 
                      key={player.id} 
                      player={player} 
                      index={i}
                      totalPlayers={sortedPlayers.length}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClose}
              className="flex-1 btn-primary"
            >
              Close
            </motion.button>
            
            {players.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className={`btn-secondary ${showConfirm ? 'text-danger border-danger/50' : ''}`}
              >
                <RefreshIcon />
                {showConfirm ? 'Confirm Reset' : 'Reset'}
              </motion.button>
            )}
          </div>
          
          {showConfirm && (
            <p className="text-center text-danger text-sm mt-3">Click again to confirm reset</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Leaderboard
