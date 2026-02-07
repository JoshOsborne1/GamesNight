import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ParticleBackground() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create initial particles
    const initialParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      color: ['#FF006E', '#8338EC', '#3A86FF', '#06FFA5'][Math.floor(Math.random() * 4)]
    }))
    setParticles(initialParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            filter: 'blur(1px)',
            opacity: 0.6
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export function ConfettiExplosion({ trigger }) {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    if (trigger) {
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        x: 50,
        y: 50,
        color: ['#FF006E', '#8338EC', '#3A86FF', '#06FFA5', '#FFBE0B'][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5
      }))
      setConfetti(newConfetti)
      
      setTimeout(() => setConfetti([]), 3000)
    }
  }, [trigger])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ 
              x: `${piece.x}%`, 
              y: `${piece.y}%`, 
              scale: 0,
              rotate: 0 
            }}
            animate={{ 
              x: `${piece.x + (Math.random() * 60 - 30)}%`,
              y: `${piece.y + (Math.random() * 60 - 30)}%`,
              scale: piece.scale,
              rotate: piece.rotation + 360
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: 10,
              height: 10,
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export function NeonText({ children, color = 'primary', className = '' }) {
  const colorMap = {
    primary: 'text-primary glow-pink',
    secondary: 'text-secondary glow-purple',
    accent: 'text-accent glow-blue',
    success: 'text-success',
    danger: 'text-danger'
  }

  return (
    <motion.span
      className={`${colorMap[color]} ${className}`}
      animate={{ 
        textShadow: [
          `0 0 10px currentColor, 0 0 20px currentColor`,
          `0 0 20px currentColor, 0 0 40px currentColor`,
          `0 0 10px currentColor, 0 0 20px currentColor`
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.span>
  )
}

export function AnimatedButton({ children, onClick, color = 'primary', className = '', disabled = false }) {
  const colorMap = {
    primary: 'bg-primary hover:bg-primary/80',
    secondary: 'bg-secondary hover:bg-secondary/80',
    accent: 'bg-accent hover:bg-accent/80',
    success: 'bg-success hover:bg-success/80 text-dark',
    danger: 'bg-danger hover:bg-danger/80 text-dark'
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${colorMap[color]} ${className} px-6 py-3 rounded-xl font-display font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      whileHover={{ scale: disabled ? 1 : 1.05, boxShadow: '0 0 20px currentColor' }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {children}
    </motion.button>
  )
}

export function ScoreCounter({ score, className = '' }) {
  return (
    <motion.span
      key={score}
      initial={{ scale: 1.5, color: '#06FFA5' }}
      animate={{ scale: 1, color: '#F7F7F2' }}
      transition={{ duration: 0.3 }}
      className={`font-pixel ${className}`}
    >
      {score}
    </motion.span>
  )
}

export function TimerBar({ timeLeft, maxTime = 20 }) {
  const percentage = (timeLeft / maxTime) * 100
  const isLow = percentage < 30

  return (
    <div className="w-full h-4 bg-light/20 rounded-full overflow-hidden relative">
      <motion.div
        className={`h-full rounded-full ${isLow ? 'bg-danger' : 'bg-primary'}`}
        initial={{ width: '100%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: 'linear' }}
      />
      {isLow && (
        <motion.div
          className="absolute inset-0 bg-danger/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </div>
  )
}

export function Card({ children, className = '', onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className={`bg-light/5 backdrop-blur-sm border border-light/10 rounded-2xl p-6 ${className}`}
      whileHover={{ scale: 1.02, borderColor: 'rgba(255, 0, 110, 0.5)' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingEmoji({ emoji, delay = 0 }) {
  return (
    <motion.span
      className="inline-block text-4xl"
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{ 
        duration: 3, 
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {emoji}
    </motion.span>
  )
}

export default ParticleBackground
