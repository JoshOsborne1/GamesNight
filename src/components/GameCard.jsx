import React from 'react'
import { motion } from 'framer-motion'

// SVG Game Icons
const GameIcons = {
  meme: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="20" cy="24" r="6"/>
      <circle cx="44" cy="24" r="6"/>
      <path d="M16 42c4 6 12 8 16 8s12-2 16-8" strokeLinecap="round"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
    </svg>
  ),
  geo: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8c0 0 12 16 12 24s-5.37 12-12 12-12-4-12-12 12-24 12-24z"/>
      <path d="M12 26h40M12 38h40" strokeLinecap="round"/>
    </svg>
  ),
  music: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M24 44V20l24-8v24"/>
      <circle cx="20" cy="46" r="6"/>
      <circle cx="44" cy="38" r="6"/>
      <path d="M12 12l4 4M48 8l4 4"/>
    </svg>
  ),
  history: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 16v16l12 8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 32h4M44 32h4M32 16v-4"/>
    </svg>
  ),
  maths: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 20h32M16 32h32M16 44h32" strokeLinecap="round"/>
      <circle cx="24" cy="20" r="2" fill="currentColor"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
      <circle cx="24" cy="44" r="2" fill="currentColor"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
    </svg>
  ),
  riddles: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="28" r="12"/>
      <path d="M26 24c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6"/>
      <path d="M28 40v8c0 4 4 8 4 8s4-4 4-8v-8"/>
      <path d="M32 32v-2" strokeLinecap="round"/>
    </svg>
  ),
  spelling: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 52l8-40 8 40M18 36h8"/>
      <path d="M36 28c0-4.42 3.58-8 8-8s8 3.58 8 8v8c0 4.42-3.58 8-8 8s-8-3.58-8-8v-8z"/>
      <circle cx="44" cy="24" r="2" fill="currentColor"/>
    </svg>
  ),
  zoomed: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="28" cy="28" r="16"/>
      <path d="M40 40l12 12" strokeLinecap="round"/>
      <circle cx="28" cy="28" r="8"/>
      <path d="M24 24l8 8M32 24l-8 8" strokeLinecap="round"/>
    </svg>
  ),
  logo: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="12" width="48" height="40" rx="2"/>
      <path d="M8 20h48"/>
      <path d="M16 36l8-8 8 8 16-16" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="48" cy="28" r="4"/>
    </svg>
  ),
  price: () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="32" r="22"/>
      <path d="M32 18v28"/>
      <path d="M26 24h12"/>
      <path d="M28 38h8"/>
      <path d="M30 20h4"/>
    </svg>
  )
}

const DefaultIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="12" y="12" width="40" height="40" rx="8"/>
    <circle cx="24" cy="26" r="4"/>
    <circle cx="40" cy="26" r="4"/>
    <path d="M22 40c4 4 16 4 20 0" strokeLinecap="round"/>
  </svg>
)

const colorMap = {
  primary: {
    border: 'border-primary/30',
    borderHover: 'hover:border-primary',
    bg: 'bg-primary/5',
    bgHover: 'group-hover:bg-primary/10',
    text: 'text-primary',
    glow: 'group-hover:shadow-primary/30'
  },
  secondary: {
    border: 'border-secondary/30',
    borderHover: 'hover:border-secondary',
    bg: 'bg-secondary/5',
    bgHover: 'group-hover:bg-secondary/10',
    text: 'text-secondary',
    glow: 'group-hover:shadow-secondary/30'
  },
  accent: {
    border: 'border-accent/30',
    borderHover: 'hover:border-accent',
    bg: 'bg-accent/5',
    bgHover: 'group-hover:bg-accent/10',
    text: 'text-accent',
    glow: 'group-hover:shadow-accent/30'
  },
  success: {
    border: 'border-success/30',
    borderHover: 'hover:border-success',
    bg: 'bg-success/5',
    bgHover: 'group-hover:bg-success/10',
    text: 'text-success',
    glow: 'group-hover:shadow-success/30'
  },
  danger: {
    border: 'border-danger/30',
    borderHover: 'hover:border-danger',
    bg: 'bg-danger/5',
    bgHover: 'group-hover:bg-danger/10',
    text: 'text-danger',
    glow: 'group-hover:shadow-danger/30'
  },
  warning: {
    border: 'border-warning/30',
    borderHover: 'hover:border-warning',
    bg: 'bg-warning/5',
    bgHover: 'group-hover:bg-warning/10',
    text: 'text-warning',
    glow: 'group-hover:shadow-warning/30'
  }
}

function GameCard({ 
  gameId, 
  name, 
  description, 
  color = 'primary', 
  onClick, 
  disabled = false,
  count = null
}) {
  const IconComponent = GameIcons[gameId] || DefaultIcon
  const colors = colorMap[color] || colorMap.primary
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative w-full text-left overflow-hidden rounded-2xl
        border-2 ${colors.border} ${colors.borderHover}
        ${colors.bg} ${colors.bgHover}
        backdrop-blur-sm
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      whileHover={disabled ? {} : { 
        scale: 1.03,
        y: -4,
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)'
      }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 opacity-0 ${colors.bg} transition-opacity duration-300 group-hover:opacity-100`}
      />
      
      {/* Glow effect */}
      <motion.div
        className={`
          absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300
          group-hover:opacity-100
          shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]
        `}
      />
      
      {/* Border glow */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        shadow-lg ${colors.glow}
      `} />
      
      <div className="relative z-10 p-6">
        {/* Icon Container */}
        <motion.div 
          className={`
            w-16 h-16 mx-auto mb-4 rounded-2xl
            ${colors.bg} ${colors.text}
            flex items-center justify-center
            border border-light/10
            transition-transform duration-300
            group-hover:scale-110 group-hover:rotate-3
          `}
        >
          <div className="w-10 h-10">
            <IconComponent />
          </div>
        </motion.div>
        
        {/* Title */}
        <motion.h3 
          className={`
            font-display text-xl font-bold text-center mb-2
            text-light group-hover:${colors.text}
            transition-colors duration-300
          `}
        >
          {name}
        </motion.h3>
        
        {/* Description */}
        {description && (
          <p className="text-light/50 text-sm text-center leading-relaxed">
            {description}
          </p>
        )}
        
        {/* Count badge */}
        {count !== null && count > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`
              mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              ${colors.bg} ${colors.text} text-xs font-semibold
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            {count} items
          </motion.div>
        )}
        
        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: 'inherit' }}
        />
      </div>
    </motion.button>
  )
}

export default GameCard