import React from 'react'
import { motion } from 'framer-motion'

// SVG Icon components for each game category
const icons = {
  meme: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <circle cx="15.5" cy="8.5" r="1.5"/>
      <path d="M9 16c1.5 1 3 1 4.5 0"/>
      <path d="M3 10h18" strokeDasharray="2 2"/>
    </svg>
  ),
  
  geo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  
  music: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
      <path d="M9 8l12-2"/>
    </svg>
  ),
  
  history: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
      <path d="M3 12h2"/>
      <path d="M19 12h2"/>
      <path d="M12 3v2"/>
      <path d="M12 19v2"/>
    </svg>
  ),
  
  maths: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <path d="M8 8h8"/>
      <path d="M8 12h8"/>
      <path d="M8 16h5"/>
      <path d="M17 16l-2 2"/>
      <path d="M15 16l2 2"/>
    </svg>
  ),
  
  riddles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
    </svg>
  ),
  
  spelling: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V4h16v3"/>
      <path d="M9 20h6"/>
      <path d="M12 4v16"/>
      <path d="M8 12h8"/>
      <path d="M7 16l-2 3"/>
      <path d="M17 16l2 3"/>
    </svg>
  ),
  
  zoomed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
      <circle cx="11" cy="11" r="3" fill="currentColor" fillOpacity="0.3"/>
      <path d="M11 8v6"/>
      <path d="M8 11h6"/>
    </svg>
  ),
  
  logo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <path d="M3 9h18"/>
      <path d="M9 21V9"/>
      <path d="M7 3v6"/>
      <path d="M17 3v6"/>
    </svg>
  ),
  
  price: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
  
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  
  forfeit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  
  challenge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  
  reward: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"/>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  ),
  
  player: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  ),
  
  timer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  
  sound: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  ),
  
  mute: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  ),
  
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  
  arrowLeft: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  
  arrowRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

// Category color mappings
const categoryColors = {
  meme: { primary: '#FF006E', secondary: '#8338EC', gradient: 'from-pink-500 to-purple-500' },
  geo: { primary: '#3A86FF', secondary: '#00F5FF', gradient: 'from-blue-500 to-cyan-400' },
  music: { primary: '#8338EC', secondary: '#FF006E', gradient: 'from-purple-500 to-pink-500' },
  history: { primary: '#FF6B35', secondary: '#FF006E', gradient: 'from-orange-500 to-pink-500' },
  maths: { primary: '#00FF88', secondary: '#00F5FF', gradient: 'from-green-400 to-cyan-400' },
  riddles: { primary: '#FFD700', secondary: '#FF6B35', gradient: 'from-yellow-400 to-orange-500' },
  spelling: { primary: '#FF006E', secondary: '#3A86FF', gradient: 'from-pink-500 to-blue-500' },
  zoomed: { primary: '#00F5FF', secondary: '#8338EC', gradient: 'from-cyan-400 to-purple-500' },
  logo: { primary: '#FF6B35', secondary: '#FFD700', gradient: 'from-orange-500 to-yellow-400' },
  price: { primary: '#00FF88', secondary: '#FFD700', gradient: 'from-green-400 to-yellow-400' },
  menu: { primary: '#8338EC', secondary: '#3A86FF', gradient: 'from-purple-500 to-blue-500' },
  forfeit: { primary: '#FF006E', secondary: '#FF0000', gradient: 'from-pink-500 to-red-600' },
  challenge: { primary: '#3A86FF', secondary: '#00F5FF', gradient: 'from-blue-500 to-cyan-400' },
  reward: { primary: '#FFD700', secondary: '#FFA500', gradient: 'from-yellow-400 to-orange-400' },
  default: { primary: '#8338EC', secondary: '#FF006E', gradient: 'from-purple-500 to-pink-500' }
}

// Icon component
export const CategoryIcon = ({ 
  category = 'default', 
  size = 'md', 
  animated = true,
  className = ''
}) => {
  const iconSvg = icons[category] || icons.default
  const colors = categoryColors[category] || categoryColors.default
  
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24'
  }
  
  const IconWrapper = animated ? motion.div : 'div'
  const animationProps = animated ? {
    whileHover: { scale: 1.1, rotate: 5 },
    whileTap: { scale: 0.95 }
  } : {}
  
  return (
    <IconWrapper
      {...animationProps}
      className={`
        ${sizeClasses[size] || sizeClasses.md}
        ${className}
      `}
      style={{ color: colors.primary }}
    >
      {iconSvg}
    </IconWrapper>
  )
}

// Category card with icon
export const CategoryCard = ({ 
  category, 
  name, 
  description,
  isActive = false,
  onClick,
  size = 'md'
}) => {
  const colors = categoryColors[category] || categoryColors.default
  
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl border-2 text-left transition-all duration-300
        ${sizeClasses[size] || sizeClasses.md}
        ${isActive 
          ? 'border-primary bg-primary/20' 
          : 'border-light/20 bg-dark/50 hover:border-light/40'}
      `}
      style={{
        boxShadow: isActive ? `0 0 30px ${colors.primary}40` : undefined
      }}
    >
      {/* Background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 hover:opacity-10 transition-opacity`}
      />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div 
            className={`p-2 rounded-lg bg-gradient-to-br ${colors.gradient}`}
            style={{ opacity: 0.9 }}
          >
            <div className="w-6 h-6 text-dark">
              {icons[category] || icons.default}
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-light">{name}</h3>
            {description && (
              <p className="text-light/60 text-sm">{description}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Glow effect when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: [
              `0 0 20px ${colors.primary}20`,
              `0 0 40px ${colors.primary}40`,
              `0 0 20px ${colors.primary}20`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  )
}

// Icon button
export const IconButton = ({ 
  icon, 
  onClick, 
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const iconSvg = icons[icon] || icons.default
  
  const variantClasses = {
    default: 'bg-light/10 text-light hover:bg-light/20 border-light/20',
    primary: 'bg-primary/20 text-primary hover:bg-primary/30 border-primary/50',
    success: 'bg-success/20 text-success hover:bg-success/30 border-success/50',
    danger: 'bg-danger/20 text-danger hover:bg-danger/30 border-danger/50',
    ghost: 'bg-transparent text-light hover:bg-light/10 border-transparent'
  }
  
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
    xl: 'w-16 h-16 p-3'
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
        rounded-lg border transition-all duration-200
        ${variantClasses[variant] || variantClasses.default}
        ${sizeClasses[size] || sizeClasses.md}
        ${className}
      `}
    >
      {iconSvg}
    </motion.button>
  )
}

export { icons, categoryColors }
export default CategoryIcon
