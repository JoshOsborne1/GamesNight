import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import soundManager from './SoundManager'

// Animated number that counts up/down
const AnimatedNumber = ({ value, duration = 0.5, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const previousValue = useRef(value)
  
  useEffect(() => {
    const startValue = previousValue.current
    const endValue = value
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      const currentValue = Math.round(startValue + (endValue - startValue) * easeOutQuart)
      setDisplayValue(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        previousValue.current = value
      }
    }
    
    animate()
  }, [value, duration])
  
  return (
    <motion.span
      key={value}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={className}
    >
      {displayValue}
    </motion.span>
  )
}

// Score change popup
const ScorePopup = ({ delta, onComplete }) => {
  const isPositive = delta > 0
  
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500)
    return () => clearTimeout(timer)
  }, [onComplete])
  
  return (
    <motion.div
      initial={{ scale: 0, y: 0 }}
      animate={{ scale: 1, y: -40 }}
      exit={{ opacity: 0, y: -60 }}
      className={`absolute left-1/2 -translate-x-1/2 font-display font-bold text-2xl ${
        isPositive ? 'text-green-400' : 'text-pink-500'
      }`}
      style={{
        textShadow: isPositive 
          ? '0 0 20px rgba(0, 255, 136, 0.8)' 
          : '0 0 20px rgba(255, 0, 110, 0.8)'
      }}
    >
      {isPositive ? '+' : ''}{delta}
    </motion.div>
  )
}

// Player score card with animations
export const PlayerScoreCard = ({ 
  player, 
  rank, 
  isActive = false,
  onScoreChange,
  showControls = false
}) => {
  const [scorePopups, setScorePopups] = useState([])
  const [score, setScore] = useState(player.score)
  const scoreRef = useRef(null)
  
  // Update local score when prop changes
  useEffect(() => {
    if (player.score !== score) {
      const delta = player.score - score
      
      // Add popup
      const id = Date.now()
      setScorePopups(prev => [...prev, { id, delta }])
      
      // Play sound
      if (delta > 0) {
        soundManager.playScoreUp()
      } else {
        soundManager.playScoreDown()
      }
      
      setScore(player.score)
    }
  }, [player.score, score])
  
  const removePopup = (id) => {
    setScorePopups(prev => prev.filter(p => p.id !== id))
  }
  
  // Rank styling
  const rankStyles = {
    1: 'from-yellow-400 to-orange-500 shadow-yellow-500/50',
    2: 'from-gray-300 to-gray-400 shadow-gray-400/50',
    3: 'from-amber-600 to-amber-700 shadow-amber-600/50'
  }
  
  const rankGlow = {
    1: 'podium-1st',
    2: 'podium-2nd',
    3: 'podium-3rd'
  }
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-300
        ${isActive ? 'border-primary bg-primary/10' : 'border-light/20 bg-dark/50'}
        ${rank <= 3 ? rankGlow[rank] || '' : ''}
      `}
      style={{
        boxShadow: rank <= 3 ? undefined : '0 4px 20px rgba(0,0,0,0.3)'
      }}
    >
      {/* Rank badge */}
      {rank && (
        <div className={`
          absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center
          font-display font-bold text-sm
          ${rank <= 3 
            ? `bg-gradient-to-br ${rankStyles[rank]} text-dark` 
            : 'bg-light/20 text-light'}
        `}>
          #{rank}
        </div>
      )}
      
      {/* Player name */}
      <div className="flex items-center gap-3">
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center font-bold
          bg-gradient-to-br ${rank <= 3 ? rankStyles[rank] : 'from-primary to-secondary'}
          text-dark
        `}>
          {player.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1">
          <h3 className="font-display font-semibold text-lg">{player.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-light/60 text-sm">Score</span>
          </div>
        </div>
      </div>
      
      {/* Score display */}
      <div ref={scoreRef} className="relative mt-2">
        <motion.div
          className={`
            text-4xl font-display font-bold text-center
            ${rank === 1 ? 'text-yellow-400 glow-yellow' : 
              rank === 2 ? 'text-gray-300' : 
              rank === 3 ? 'text-amber-600' : 'text-light'}
          `}
          animate={scorePopups.length > 0 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          <AnimatedNumber value={score} className="score-roll" />
        </motion.div>
        
        {/* Score popups */}
        <AnimatePresence>
          {scorePopups.map(popup => (
            <ScorePopup
              key={popup.id}
              delta={popup.delta}
              onComplete={() => removePopup(popup.id)}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Score controls */}
      {showControls && (
        <div className="flex gap-2 mt-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              soundManager.playClick()
              onScoreChange?.(player.id, 1)
            }}
            className="w-10 h-10 rounded-lg bg-success/20 text-success border border-success/50
                       flex items-center justify-center font-bold text-xl hover:bg-success/30
                       transition-colors"
          >
            +
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              soundManager.playClick()
              onScoreChange?.(player.id, -1)
            }}
            className="w-10 h-10 rounded-lg bg-danger/20 text-danger border border-danger/50
                       flex items-center justify-center font-bold text-xl hover:bg-danger/30
                       transition-colors"
          >
            -
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              soundManager.playClick()
              onScoreChange?.(player.id, 5)
            }}
            className="px-3 h-10 rounded-lg bg-accent/20 text-accent border border-accent/50
                       flex items-center justify-center font-bold hover:bg-accent/30
                       transition-colors"
          >
            +5
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}

// Animated leaderboard with podium
export const AnimatedLeaderboard = ({ players, maxDisplay = 10 }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const displayPlayers = sortedPlayers.slice(0, maxDisplay)
  
  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {displayPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            layout
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ delay: index * 0.1 }}
            className={`
              flex items-center gap-4 p-4 rounded-xl border-2
              ${index < 3 ? 'bg-gradient-to-r border-transparent' : 'bg-dark/50 border-light/10'}
              ${index === 0 ? 'from-yellow-500/20 to-transparent' : ''}
              ${index === 1 ? 'from-gray-400/20 to-transparent' : ''}
              ${index === 2 ? 'from-amber-700/20 to-transparent' : ''}
            `}
          >
            {/* Rank */}
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-display font-bold
              ${index === 0 ? 'bg-yellow-400 text-dark' : 
                index === 1 ? 'bg-gray-300 text-dark' : 
                index === 2 ? 'bg-amber-600 text-white' : 
                'bg-light/20 text-light'}
            `}>
              {index + 1}
            </div>
            
            {/* Avatar */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
              ${index < 3 
                ? 'bg-gradient-to-br from-primary to-secondary text-dark' 
                : 'bg-light/10 text-light'}
            `}>
              {player.name.charAt(0).toUpperCase()}
            </div>
            
            {/* Name */}
            <div className="flex-1">
              <span className={`
                font-display font-semibold text-lg
                ${index === 0 ? 'text-yellow-400 glow-yellow' : 'text-light'}
              `}>
                {player.name}
              </span>
              {index === 0 && (
                <span className="ml-2 text-2xl">👑</span>
              )}
            </div>
            
            {/* Score */}
            <div className="text-right">
              <span className={`
                font-display font-bold text-2xl
                ${index === 0 ? 'text-yellow-400' : 
                  index === 1 ? 'text-gray-300' : 
                  index === 2 ? 'text-amber-600' : 'text-light'}
              `}>
                <AnimatedNumber value={player.score} />
              </span>
              <span className="text-light/40 text-sm ml-1">pts</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Total score display
export const TotalScoreDisplay = ({ score, label = 'Total Score', size = 'large' }) => {
  const sizes = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl',
    xl: 'text-8xl'
  }
  
  return (
    <div className="text-center">
      <p className="text-light/60 text-sm uppercase tracking-wider mb-2">{label}</p>
      <motion.div
        className={`font-display font-bold ${sizes[size]} glow-purple`}
        key={score}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <AnimatedNumber value={score} />
      </motion.div>
    </div>
  )
}

export default {
  AnimatedNumber,
  PlayerScoreCard,
  AnimatedLeaderboard,
  TotalScoreDisplay
}
