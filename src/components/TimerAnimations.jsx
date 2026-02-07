import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Circular Timer with progress ring
export function CircularTimer({
  duration = 30,
  timeLeft,
  isActive = false,
  onComplete,
  size = 180,
  strokeWidth = 10,
  warningThreshold = 10,
  dangerThreshold = 5,
  showLabel = true,
  className = ''
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = (timeLeft / duration) * 100
  const offset = circumference - (progress / 100) * circumference

  // Determine state based on time
  const isWarning = timeLeft <= warningThreshold && timeLeft > dangerThreshold
  const isDanger = timeLeft <= dangerThreshold && timeLeft > 0
  const isComplete = timeLeft <= 0

  // Color based on state
  const getColor = () => {
    if (isDanger) return '#ef4444'
    if (isWarning) return '#f59e0b'
    return '#10b981'
  }

  const getGlowColor = () => {
    if (isDanger) return 'rgba(239, 68, 68, 0.5)'
    if (isWarning) return 'rgba(245, 158, 11, 0.5)'
    return 'rgba(16, 185, 129, 0.5)'
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const color = getColor()
  const glowColor = getGlowColor()

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Background glow effect */}
      <AnimatePresence>
        {(isWarning || isDanger) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: isDanger ? 0.5 : 1,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`
            }}
          />
        )}
      </AnimatePresence>

      {/* SVG Timer */}
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id={`timerGradient-${timeLeft}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
          <filter id={`timerGlow-${timeLeft}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />

        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#timerGradient-${timeLeft})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            filter: `drop-shadow(0 0 8px ${glowColor})`
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          animate={isDanger ? {
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ duration: 0.5, repeat: isDanger ? Infinity : 0 }}
        >
          <span
            className="font-mono text-4xl font-bold"
            style={{
              color,
              textShadow: `0 0 20px ${glowColor}`
            }}
          >
            {formatTime(timeLeft)}
          </span>
        </motion.div>

        {showLabel && (
          <span className={`
            text-xs uppercase tracking-wider mt-1
            ${isActive ? 'text-white/60' : 'text-white/40'}
          `}>
            {isComplete ? 'Time Up' : isActive ? 'Running' : 'Paused'}
          </span>
        )}
      </div>

      {/* Warning indicator */}
      <AnimatePresence>
        {isDanger && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-8 h-8 rounded-full bg-danger/20 border-2 border-danger flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Linear progress timer
export function LinearTimer({
  duration = 30,
  timeLeft,
  height = 12,
  showTime = true,
  className = ''
}) {
  const progress = (timeLeft / duration) * 100
  const isLow = progress < 30

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {/* Background track */}
        <div
          className="w-full rounded-full bg-white/10 overflow-hidden"
          style={{ height }}
        >
          {/* Progress fill */}
          <motion.div
            className={`
              h-full rounded-full relative
              ${isLow ? 'bg-danger' : 'bg-gradient-to-r from-primary to-secondary'}
            `}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                backgroundSize: '200% 100%'
              }}
              animate={{
                backgroundPosition: ['200% 0%', '-200% 0%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>
        </div>

        {/* Low time warning overlay */}
        <AnimatePresence>
          {isLow && timeLeft > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: 'inset 0 0 20px rgba(239, 68, 68, 0.5)',
                animation: 'pulse 0.5s ease-in-out infinite'
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Time display */}
      {showTime && (
        <div className="flex items-center justify-between mt-2">
          <motion.span
            className={`
              font-mono font-bold
              ${isLow ? 'text-danger' : 'text-white'}
            `}
            animate={isLow ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isLow ? Infinity : 0 }}
          >
            {formatTime(timeLeft)}
          </motion.span>
          <span className="text-white/40 text-sm">
            {formatTime(duration)}
          </span>
        </div>
      )}
    </div>
  )
}

// Timer with controls
export function TimerWithControls({
  duration = 30,
  isActive = false,
  onComplete,
  onPlayPause,
  onReset,
  size = 160,
  className = ''
}) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(isActive)

  useEffect(() => {
    setIsRunning(isActive)
  }, [isActive])

  useEffect(() => {
    let interval
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1
          if (newTime <= 0) {
            onComplete?.()
            setIsRunning(false)
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, onComplete])

  const handlePlayPause = () => {
    const newState = !isRunning
    setIsRunning(newState)
    onPlayPause?.(newState)
  }

  const handleReset = () => {
    setTimeLeft(duration)
    setIsRunning(false)
    onReset?.()
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <CircularTimer
        duration={duration}
        timeLeft={timeLeft}
        isActive={isRunning}
        size={size}
      />

      {/* Controls */}
      <div className="flex items-center gap-3">
        <motion.button
          onClick={handlePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            border-2 transition-all
            ${isRunning
              ? 'bg-warning/20 border-warning text-warning hover:bg-warning/30'
              : 'bg-success/20 border-success text-success hover:bg-success/30'
            }
          `}
        >
          {isRunning ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </motion.button>

        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center
                     bg-white/5 border border-white/20 text-white/70
                     hover:text-white hover:bg-white/10 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </motion.button>
      </div>
    </div>
  )
}

export default {
  CircularTimer,
  LinearTimer,
  TimerWithControls
}
