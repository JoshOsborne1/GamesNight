import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Animated number that counts up/down with easing
export function AnimatedNumber({
  value,
  duration = 0.8,
  className = '',
  prefix = '',
  suffix = ''
}) {
  const [displayValue, setDisplayValue] = useState(value)
  const previousValue = useRef(value)
  const animationRef = useRef(null)

  useEffect(() => {
    const startValue = previousValue.current
    const endValue = value
    const startTime = performance.now()
    const durationMs = duration * 1000

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / durationMs, 1)

      // Easing function - easeOutExpo for smooth deceleration
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      const currentValue = Math.round(startValue + (endValue - startValue) * easeOutExpo)
      setDisplayValue(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        previousValue.current = value
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [value, duration])

  return (
    <motion.span
      className={className}
      initial={{ y: -5, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {prefix}{displayValue.toLocaleString()}{suffix}
    </motion.span>
  )
}

// Score change popup component
export function ScorePopup({ delta, onComplete }) {
  const isPositive = delta > 0
  const colorClass = isPositive ? 'score-popup-positive' : 'score-popup-negative'
  const sign = isPositive ? '+' : ''

  return (
    <motion.div
      initial={{ scale: 0, y: 0, opacity: 0 }}
      animate={{ scale: 1, y: -50, opacity: 1 }}
      exit={{ opacity: 0, y: -70 }}
      transition={{
        duration: 0.5,
        ease: [0.175, 0.885, 0.32, 1.275]
      }}
      onAnimationComplete={onComplete}
      className={`score-popup ${colorClass}`}
    >
      {sign}{delta}
    </motion.div>
  )
}

// Animated score card with popup effects
export function ScoreCard({
  player,
  rank,
  isActive = false,
  onScoreChange,
  showControls = false,
  className = ''
}) {
  const [popups, setPopups] = useState([])
  const [displayScore, setDisplayScore] = useState(player.score)
  const prevScoreRef = useRef(player.score)

  // Detect score changes and trigger popups
  useEffect(() => {
    if (player.score !== prevScoreRef.current) {
      const delta = player.score - prevScoreRef.current
      const id = Date.now()

      setPopups(prev => [...prev, { id, delta }])
      setDisplayScore(player.score)
      prevScoreRef.current = player.score
    }
  }, [player.score])

  const removePopup = useCallback((id) => {
    setPopups(prev => prev.filter(p => p.id !== id))
  }, [])

  // Rank styling
  const rankStyles = {
    1: { gradient: 'from-yellow-400 to-orange-500', text: 'text-yellow-400', glow: 'shadow-yellow-400/30' },
    2: { gradient: 'from-gray-300 to-gray-400', text: 'text-gray-300', glow: 'shadow-gray-400/30' },
    3: { gradient: 'from-amber-600 to-amber-500', text: 'text-amber-500', glow: 'shadow-amber-500/30' }
  }

  const rankStyle = rankStyles[rank] || {
    gradient: 'from-primary to-secondary',
    text: 'text-white',
    glow: 'shadow-primary/20'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`
        relative p-5 rounded-2xl border-2
        ${isActive ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5'}
        ${className}
      `}
    >
      {/* Rank badge */}
      {rank && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
          className={`
            absolute -top-3 -left-3 w-9 h-9 rounded-full
            flex items-center justify-center font-bold text-sm
            bg-gradient-to-br ${rankStyle.gradient} text-dark
            shadow-lg ${rankStyle.glow}
          `}
        >
          {rank}
        </motion.div>
      )}

      {/* Player info */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
            bg-gradient-to-br ${rankStyle.gradient} text-dark
          `}
        >
          {player.name.charAt(0).toUpperCase()}
        </motion.div>
        <div>
          <p className="font-semibold text-lg">{player.name}</p>
          <p className="text-white/50 text-sm">Score</p>
        </div>
      </div>

      {/* Score display with popups */}
      <div className="relative text-center py-2">
        <motion.div
          key={displayScore}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className={`
            text-5xl font-bold ${rankStyle.text}
            ${rank <= 3 ? 'glow-' + (rank === 1 ? 'yellow' : rank === 2 ? 'purple' : 'pink') : ''}
          `}
        >
          <AnimatedNumber value={displayScore} />
        </motion.div>

        {/* Score popups */}
        <AnimatePresence>
          {popups.map(popup => (
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mt-4 justify-center"
        >
          {[-1, 1, 5].map((points) => (
            <motion.button
              key={points}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onScoreChange?.(player.id, points)}
              className={`
                w-10 h-10 rounded-lg font-bold flex items-center justify-center
                transition-colors
                ${points > 0
                  ? 'bg-success/20 text-success border border-success/50 hover:bg-success/30'
                  : 'bg-danger/20 text-danger border border-danger/50 hover:bg-danger/30'
                }
              `}
            >
              {points > 0 ? `+${points}` : points}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

// Animated leaderboard with rank change detection
export function AnimatedLeaderboard({ players, maxDisplay = 10 }) {
  const [prevRanks, setPrevRanks] = useState({})
  const [rankChanges, setRankChanges] = useState({})

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const displayPlayers = sortedPlayers.slice(0, maxDisplay)

  // Track rank changes
  useEffect(() => {
    const newRanks = {}
    const changes = {}

    displayPlayers.forEach((player, index) => {
      const newRank = index + 1
      newRanks[player.id] = newRank

      if (prevRanks[player.id] && prevRanks[player.id] !== newRank) {
        changes[player.id] = prevRanks[player.id] - newRank // Positive = moved up
      }
    })

    if (Object.keys(changes).length > 0) {
      setRankChanges(changes)
      setTimeout(() => setRankChanges({}), 2000)
    }

    setPrevRanks(newRanks)
  }, [players])

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {displayPlayers.map((player, index) => {
          const rank = index + 1
          const rankChange = rankChanges[player.id]

          return (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, x: -30 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: rankChange ? 1.05 : 1
              }}
              exit={{ opacity: 0, x: 30 }}
              transition={{
                layout: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className={`
                flex items-center gap-4 p-4 rounded-xl
                ${rank <= 3 ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5'}
                ${rankChange > 0 ? 'bg-success/10' : rankChange < 0 ? 'bg-danger/10' : ''}
              `}
            >
              {/* Rank */}
              <div className="w-10 flex justify-center">
                <motion.div
                  animate={rankChange ? {
                    scale: [1, 1.3, 1],
                    y: rankChange > 0 ? [0, -5, 0] : [0, 5, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${rank === 1 ? 'bg-yellow-400 text-dark' :
                      rank === 2 ? 'bg-gray-300 text-dark' :
                      rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-white/10 text-white'}
                  `}
                >
                  {rank}
                </motion.div>
              </div>

              {/* Avatar */}
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center font-bold
                ${rank <= 3
                  ? 'bg-gradient-to-br from-primary to-secondary text-white'
                  : 'bg-white/10 text-white'}
              `}>
                {player.name.charAt(0).toUpperCase()}
              </div>

              {/* Name */}
              <span className={`
                flex-1 font-medium
                ${rank === 1 ? 'text-yellow-400' : 'text-white'}
              `}>
                {player.name}
              </span>

              {/* Rank change indicator */}
              {rankChange && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`
                    text-xs font-bold px-2 py-1 rounded-full
                    ${rankChange > 0 ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}
                  `}
                >
                  {rankChange > 0 ? '▲' : '▼'} {Math.abs(rankChange)}
                </motion.span>
              )}

              {/* Score */}
              <span className={`
                font-bold text-xl
                ${rank === 1 ? 'text-yellow-400' :
                  rank === 2 ? 'text-gray-300' :
                  rank === 3 ? 'text-amber-500' : 'text-white'}
              `}>
                <AnimatedNumber value={player.score} />
              </span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// Total score display with animation
export function TotalScoreDisplay({ score, label = 'Total Score', size = 'large' }) {
  const sizes = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl',
    xl: 'text-8xl'
  }

  return (
    <div className="text-center">
      <p className="text-white/50 text-sm uppercase tracking-wider mb-2">{label}</p>
      <motion.div
        key={score}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className={`font-bold ${sizes[size]} glow-purple`}
      >
        <AnimatedNumber value={score} />
      </motion.div>
    </div>
  )
}

export default {
  AnimatedNumber,
  ScorePopup,
  ScoreCard,
  AnimatedLeaderboard,
  TotalScoreDisplay
}
