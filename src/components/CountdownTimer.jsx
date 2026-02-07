import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import audioController from '../audio'

const CountdownTimer = ({ 
  duration = 30, 
  onComplete, 
  isActive = true,
  size = 'large',
  showMilliseconds = false,
  warningThreshold = 10,
  dangerThreshold = 5,
  onTick
}) => {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const lastTickRef = useRef(duration)
  const lastSecondRef = useRef(Math.ceil(duration))
  
  useEffect(() => {
    if (!isActive || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 0.1
        const newSecond = Math.ceil(newTime)
        
        // Sound effects for last warningThreshold seconds
        if (newTime <= warningThreshold && newSecond !== lastSecondRef.current) {
          if (newTime <= dangerThreshold) {
            // Urgent beep for danger zone
            audioController.playTimerWarning()
          } else {
            // Normal tick for warning zone
            audioController.playTimerTick()
          }
        }
        
        lastTickRef.current = newTime
        lastSecondRef.current = newSecond
        
        if (newTime <= 0) {
          clearInterval(intervalRef.current)
          audioController.playChaosAlarm() // Play alarm when time's up
          onComplete?.()
          return 0
        }
        
        onTick?.(newTime)
        return newTime
      })
    }, 100)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, isPaused, duration, onComplete, onTick, warningThreshold, dangerThreshold])
  
  // Reset when duration changes
  useEffect(() => {
    setTimeLeft(duration)
    lastTickRef.current = duration
    lastSecondRef.current = Math.ceil(duration)
  }, [duration])
  
  const formatTime = (time) => {
    const seconds = Math.floor(time)
    const ms = Math.floor((time % 1) * 10)
    
    if (showMilliseconds) {
      return `${seconds}.${ms}`
    }
    return seconds.toString()
  }
  
  const getProgressColor = () => {
    if (timeLeft <= dangerThreshold) return '#FF006E' // Red
    if (timeLeft <= warningThreshold) return '#FFD700' // Yellow
    return '#00FF88' // Green
  }
  
  const getStatus = () => {
    if (timeLeft <= dangerThreshold) return 'danger'
    if (timeLeft <= warningThreshold) return 'warning'
    return 'normal'
  }
  
  const status = getStatus()
  const progress = ((duration - timeLeft) / duration) * 100
  const color = getProgressColor()
  
  // Size configurations
  const sizes = {
    small: {
      container: 'w-16 h-16',
      text: 'text-xl',
      stroke: 3,
      label: 'text-xs'
    },
    medium: {
      container: 'w-24 h-24',
      text: 'text-3xl',
      stroke: 4,
      label: 'text-sm'
    },
    large: {
      container: 'w-32 h-32',
      text: 'text-5xl',
      stroke: 6,
      label: 'text-base'
    },
    xl: {
      container: 'w-48 h-48',
      text: 'text-7xl',
      stroke: 8,
      label: 'text-lg'
    }
  }
  
  const currentSize = sizes[size] || sizes.large
  
  // SVG circle calculations
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference
  
  return (
    <div className="relative inline-flex flex-col items-center">
      <div className={`relative ${currentSize.container}`}>
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={currentSize.stroke}
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={currentSize.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.1, ease: 'linear' }}
            style={{
              filter: `drop-shadow(0 0 10px ${color})`
            }}
          />
        </svg>
        
        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={Math.floor(timeLeft)}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ 
                scale: status === 'danger' ? [1, 1.1, 1] : 1, 
                opacity: 1 
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                scale: status === 'danger' ? {
                  repeat: Infinity,
                  duration: 0.5
                } : { duration: 0.2 }
              }}
              className={`font-display font-bold ${currentSize.text} ${
                status === 'danger' ? 'timer-urgent' : ''
              }`}
              style={{ color }}
            >
              {formatTime(timeLeft)}
            </motion.span>
          </AnimatePresence>
        </div>
        
        {/* Pulse effect for danger */}
        {status === 'danger' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                `0 0 0 0 ${color}00`,
                `0 0 0 20px ${color}20`,
                `0 0 0 0 ${color}00`
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 1
            }}
          />
        )}
      </div>
      
      {/* Label */}
      <span className={`mt-2 ${currentSize.label} text-light/60 uppercase tracking-wider`}>
        {isPaused ? 'Paused' : timeLeft === 0 ? 'Time\'s Up!' : 'Remaining'}
      </span>
    </div>
  )
}

// Linear progress bar variant
export const ProgressBar = ({ 
  progress, 
  total, 
  height = 'h-4',
  showLabel = true,
  color = 'primary',
  animated = true
}) => {
  const percentage = Math.min(100, Math.max(0, (progress / total) * 100))
  
  const colorClasses = {
    primary: 'from-pink-500 to-purple-500',
    success: 'from-green-400 to-emerald-500',
    warning: 'from-yellow-400 to-orange-500',
    danger: 'from-red-500 to-pink-600',
    accent: 'from-blue-400 to-cyan-500'
  }
  
  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-dark/50 rounded-full overflow-hidden relative progress-flair`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses[color] || colorClasses.primary} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 0.5 : 0, ease: 'easeOut' }}
          style={{
            boxShadow: '0 0 10px currentColor'
          }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-sm text-light/60">
          <span>{progress} / {total}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  )
}

// Circular countdown for special moments
export const CircularCountdown = ({ 
  from = 3, 
  onComplete, 
  size = 200,
  label = 'Get Ready!'
}) => {
  const [count, setCount] = useState(from)
  
  useEffect(() => {
    if (count <= 0) {
      audioController.playGameStart()
      onComplete?.()
      return
    }
    
    audioController.playTimerTick()
    
    const timer = setTimeout(() => {
      setCount(c => c - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [count, onComplete])
  
  const colors = ['#00FF88', '#FFD700', '#FF006E']
  const color = colors[from - count] || '#3A86FF'
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/90">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        className="text-center"
      >
        <motion.div
          key={count}
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="relative"
          style={{ width: size, height: size }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'linear' }}
              style={{
                filter: `drop-shadow(0 0 20px ${color})`
              }}
            />
          </svg>
          
          <motion.span
            className="absolute inset-0 flex items-center justify-center font-display font-bold"
            style={{ 
              fontSize: size * 0.5,
              color,
              textShadow: `0 0 30px ${color}`
            }}
          >
            {count > 0 ? count : 'GO!'}
          </motion.span>
        </motion.div>
        
        <p className="mt-4 text-light/80 text-lg font-display tracking-wider">
          {label}
        </p>
      </motion.div>
    </div>
  )
}

export default CountdownTimer