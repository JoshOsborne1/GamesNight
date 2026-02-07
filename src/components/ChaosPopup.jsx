import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../store'
import audioController from '../audio'

// Icon Components
const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <triangle points="10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="currentColor" fillOpacity="0.1"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
)

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" fillOpacity="0.1"/>
  </svg>
)

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
)

function ChaosPopup() {
  const { chaosType, chaosItem, closeChaos } = useGameStore()

  useEffect(() => {
    // Play chaos alarm sound on mount
    audioController.playChaosAlarm()
    
    // Auto-close after 15 seconds
    const timer = setTimeout(() => {
      closeChaos()
    }, 15000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    audioController.playClick()
    closeChaos()
  }

  const typeConfig = {
    forfeit: {
      gradient: 'from-danger/30 via-danger/20 to-transparent',
      border: 'border-danger/40',
      text: 'text-danger',
      title: 'Forfeit',
      subtitle: 'Challenge Failed',
      icon: WarningIcon,
      buttonBg: 'bg-danger hover:bg-danger/90'
    },
    challenge: {
      gradient: 'from-accent/30 via-accent/20 to-transparent',
      border: 'border-accent/40',
      text: 'text-accent',
      title: 'Challenge',
      subtitle: 'Group Activity',
      icon: TargetIcon,
      buttonBg: 'bg-accent hover:bg-accent/90'
    },
    reward: {
      gradient: 'from-success/30 via-success/20 to-transparent',
      border: 'border-success/40',
      text: 'text-success',
      title: 'Reward',
      subtitle: 'Power Up',
      icon: StarIcon,
      buttonBg: 'bg-success hover:bg-success/90'
    }
  }

  const config = typeConfig[chaosType]
  const IconComponent = config?.icon || WarningIcon

  if (!chaosItem || !config) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(15, 15, 26, 0.95)',
        backdropFilter: 'blur(20px)'
      }}
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`relative max-w-xl w-full overflow-hidden rounded-3xl border ${config.border} bg-gradient-to-b ${config.gradient}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-light-muted hover:text-light hover:bg-white/10 transition-colors z-10"
          whileTap={{ scale: 0.9 }}
        >
          <XIcon />
        </motion.button>

        <div className="p-8 md:p-12 text-center">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 ${config.text}`}
            style={{
              background: `linear-gradient(135deg, currentColor 0%, transparent 100%)`,
              backgroundColor: 'rgba(255,255,255,0.05)'
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <IconComponent />
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-medium uppercase tracking-widest text-light-muted mb-2"
          >
            {config.subtitle}
          </motion.p>

          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className={`font-display text-4xl md:text-5xl mb-8 ${config.text}`}
          >
            {config.title}
          </motion.h2>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass rounded-2xl p-6 md:p-8 mb-8"
          >
            {chaosType === 'challenge' ? (
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-display text-light">{chaosItem.name}</h3>
                <p className="text-lg text-light-muted">{chaosItem.description}</p>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${chaosType}/10 border border-${chaosType}/20`}>
                  <span className={`text-sm font-medium ${config.text}`}>{chaosItem.type}</span>
                </div>
              </div>
            ) : (
              <p className="text-2xl md:text-3xl font-display text-light leading-relaxed">{chaosItem.text}</p>
            )}
          </motion.div>

          {/* Action Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 py-4 rounded-xl font-semibold text-white transition-all ${config.buttonBg} shadow-lg`}
          >
            Got it
          </motion.button>

          {/* Auto-close hint */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-light-muted/60 text-sm"
          >
            Auto-closes in 15 seconds
          </motion.p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50" />
      </motion.div>
    </motion.div>
  )
}

export default ChaosPopup
