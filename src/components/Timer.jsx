import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// SVG Icons
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <rect x="6" y="4" width="4" height="16"/>
    <rect x="14" y="4" width="4" height="16"/>
  </svg>
)

const ResetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
)

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
    <path d="M12 9v4"/>
    <path d="M12 17h.01"/>
  </svg>
)

// Circular Timer Component
function CircularTimer({
  duration = 30,
  isActive = false,
  onComplete,
  onTick,
  size = 200,
  strokeWidth = 8,
  warningThreshold = 10,
  dangerThreshold = 5,
  showControls = true,
  onPlayPause,
  onReset,
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
          onTick?.(newTime)
          if (newTime <= 0) {
            onComplete?.()
            setIsRunning(false)
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, onComplete, onTick])
  
  const progress = (timeLeft / duration) * 100
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference
  
  // Determine color based on time left
  const getColor = () => {
    if (timeLeft <= dangerThreshold) return '#FF006E' // danger
    if (timeLeft <= warningThreshold) return '#FFD700' // warning
    return '#00FF88' // success
  }
  
  const getGlowColor = () => {
    if (timeLeft <= dangerThreshold) return 'rgba(255, 0, 110, 0.5)'
    if (timeLeft <= warningThreshold) return 'rgba(255, 215, 0, 0.5)'
    return 'rgba(0, 255, 136, 0.5)'
  }
  
  const color = getColor()
  const glowColor = getGlowColor()
  
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
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color} stopOpacity="0.5" />
            </linearGradient>
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
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#timerGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              filter: `drop-shadow(0 0 10px ${glowColor})`
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            animate={timeLeft <= dangerThreshold ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.5, repeat: timeLeft <= dangerThreshold ? Infinity : 0 }}
          >
            <span 
              className="font-pixel text-4xl"
              style={{ 
                color,
                textShadow: `0 0 20px ${glowColor}`
              }}
            >
              {formatTime(timeLeft)}
            </span>
          </motion.div>
          
          <span className="text-light/40 text-sm font-display mt-1">
            {isRunning ? 'RUNNING' : 'PAUSED'}
          </span>
        </div>
        
        {/* Warning indicator */}
        <AnimatePresence>
          {timeLeft <= warningThreshold && timeLeft > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-2 -right-2"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-danger/20 border-2 border-danger flex items-center justify-center text-danger"
              >
                <WarningIcon />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Controls */}
      {showControls && (
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
            {isRunning ? <PauseIcon /> : <PlayIcon />}
          </motion.button>
          
          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-light/5 border border-light/20 text-light/70 hover:text-light hover:bg-light/10 transition-all"
          >
            <ResetIcon />
          </motion.button>
        </div>
      )}
    </div>
  )
}

// Linear Progress Bar Timer
function ProgressTimer({
  duration = 30,
  isActive = false,
  onComplete,
  onTick,
  height = 12,
  warningThreshold = 10,
  dangerThreshold = 5,
  showTime = true,
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
          onTick?.(newTime)
          if (newTime <= 0) {
            onComplete?.()
            setIsRunning(false)
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, onComplete, onTick])
  
  const progress = (timeLeft / duration) * 100
  
  // Determine color based on time left
  const getColor = () => {
    if (timeLeft <= dangerThreshold) return 'bg-danger'
    if (timeLeft <= warningThreshold) return 'bg-warning'
    return 'bg-success'
  }
  
  const getGlow = () => {
    if (timeLeft <= dangerThreshold) return 'shadow-danger/50'
    if (timeLeft <= warningThreshold) return 'shadow-warning/50'
    return 'shadow-success/50'
  }
  
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
          className="w-full rounded-full bg-light/10 overflow-hidden"
          style={{ height }}
        >
          {/* Animated progress fill */}
          <motion.div
            className={`h-full rounded-full ${getColor()} shadow-lg ${getGlow()}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="h-full w-full"
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
        
        {/* Warning pulse overlay for low time */}
        <AnimatePresence>
          {timeLeft <= dangerThreshold && timeLeft > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: 'inset 0 0 20px rgba(255, 0, 110, 0.5)',
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
            className={`font-display font-bold ${
              timeLeft <= dangerThreshold ? 'text-danger' : 
              timeLeft <= warningThreshold ? 'text-warning' : 'text-success'
            }`}
            animate={timeLeft <= dangerThreshold ? {
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5, repeat: timeLeft <= dangerThreshold ? Infinity : 0 }}
          >
            {formatTime(timeLeft)}
          </motion.span>
          
          <span className="text-light/40 text-sm font-display">
            {formatTime(duration)}
          </span>
        </div>
      )}
    </div>
  )
}

// Simple countdown display (no controls)
function CountdownDisplay({
  timeLeft,
  totalTime,
  size = 'md',
  showIcon = true,
  className = ''
}) {
  const warningThreshold = totalTime * 0.3
  const dangerThreshold = totalTime * 0.15
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'text-2xl'
      case 'md': return 'text-4xl'
      case 'lg': return 'text-6xl'
      case 'xl': return 'text-8xl'
      default: return 'text-4xl'
    }
  }
  
  const getColor = () => {
    if (timeLeft <= dangerThreshold) return 'text-danger'
    if (timeLeft <= warningThreshold) return 'text-warning'
    return 'text-success'
  }
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showIcon && timeLeft <= dangerThreshold && (
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-danger"
        >
          <WarningIcon />
        </motion.div>
      )}
      
      <motion.span
        className={`font-pixel ${getSizeClass()} ${getColor()}`}
        animate={timeLeft <= dangerThreshold ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 0.5, repeat: timeLeft <= dangerThreshold ? Infinity : 0 }}
        style={{
          textShadow: timeLeft <= dangerThreshold 
            ? '0 0 20px rgba(255, 0, 110, 0.8)' 
            : 'none'
        }}
      >
        {formatTime(timeLeft)}
      </motion.span>
    </div>
  )
}

// Export all timer variants
export { CircularTimer, ProgressTimer, CountdownDisplay }
export default CircularTimer