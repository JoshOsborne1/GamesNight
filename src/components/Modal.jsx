import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Close Icon
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
)

// Alert Icons
const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
    <path d="M12 9v4"/>
    <path d="M12 17h.01"/>
  </svg>
)

const SuccessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
)

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
)

const ChaosIcons = {
  forfeit: AlertIcon,
  challenge: InfoIcon,
  reward: SuccessIcon
}

const ChaosColors = {
  forfeit: {
    bg: 'bg-danger/20',
    border: 'border-danger',
    text: 'text-danger',
    glow: 'shadow-danger/50'
  },
  challenge: {
    bg: 'bg-accent/20',
    border: 'border-accent',
    text: 'text-accent',
    glow: 'shadow-accent/50'
  },
  reward: {
    bg: 'bg-success/20',
    border: 'border-success',
    text: 'text-success',
    glow: 'shadow-success/50'
  }
}

// Backdrop component
function Backdrop({ onClick, blur = true }) {
  return (
    <motion.div
      className={`fixed inset-0 z-40 ${blur ? 'backdrop-blur-xl' : ''} bg-dark/60`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, rgba(13, 2, 33, 0.9) 0%, rgba(131, 56, 236, 0.1) 50%, rgba(13, 2, 33, 0.9) 100%)'
      }}
    />
  )
}

// Main Modal Component
function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true,
  blur = true,
  footer = null,
  className = ''
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]'
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Backdrop onClick={closeOnBackdrop ? onClose : undefined} blur={blur} />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className={`
                pointer-events-auto w-full ${sizeClasses[size] || sizeClasses.md}
                relative overflow-hidden
                rounded-3xl
                bg-gradient-to-br from-light/10 to-light/5
                border border-light/20
                shadow-2xl
                ${className}
              `}
              initial={{ 
                opacity: 0, 
                scale: 0.9,
                y: 50
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.9,
                y: 50
              }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 25
              }}
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-tl-3xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-secondary/20 to-transparent rounded-tr-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/20 to-transparent rounded-bl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/20 to-transparent rounded-br-3xl pointer-events-none" />
              
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-light/10">
                  {title ? (
                    <motion.h2 
                      className="font-display text-xl font-bold text-light"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {title}
                    </motion.h2>
                  ) : <div />}
                  
                  {showCloseButton && (
                    <motion.button
                      onClick={onClose}
                      className="p-2 rounded-xl bg-light/5 border border-light/10 text-light/60 hover:text-light hover:bg-light/10 hover:border-light/30 transition-all"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CloseIcon />
                    </motion.button>
                  )}
                </div>
              )}
              
              {/* Content */}
              <motion.div 
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {children}
              </motion.div>
              
              {/* Footer */}
              {footer && (
                <motion.div 
                  className="px-6 py-4 border-t border-light/10 bg-light/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {footer}
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Specialized Chaos Modal
export function ChaosModal({
  isOpen,
  onClose,
  chaosType,
  chaosItem,
  onAccept
}) {
  const colors = ChaosColors[chaosType] || ChaosColors.forfeit
  const IconComponent = ChaosIcons[chaosType] || AlertIcon
  
  const titles = {
    forfeit: 'FORFEIT CHALLENGE',
    challenge: 'GROUP CHALLENGE',
    reward: 'POWER UP REWARD'
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Backdrop onClick={onClose} blur={true} />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className={`
                pointer-events-auto w-full max-w-lg
                relative overflow-hidden
                rounded-3xl
                ${colors.bg}
                border-2 ${colors.border}
                shadow-2xl ${colors.glow}
              `}
              initial={{ 
                opacity: 0, 
                scale: 0.5,
                rotateX: -30
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateX: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                rotateX: 30
              }}
              transition={{ 
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
            >
              {/* Animated background pulse */}
              <motion.div
                className={`absolute inset-0 ${colors.bg} opacity-50`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              
              <div className="relative z-10 p-8 text-center">
                {/* Type Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className={`
                    w-20 h-20 mx-auto mb-6 rounded-2xl
                    ${colors.bg} ${colors.text}
                    flex items-center justify-center
                    border-2 ${colors.border}
                  `}
                >
                  <IconComponent />
                </motion.div>
                
                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`font-pixel text-2xl mb-4 ${colors.text} glow-pink`}
                >
                  {titles[chaosType]}
                </motion.h2>
                
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-dark/50 rounded-2xl p-6 mb-6 border border-light/10"
                >
                  {chaosItem?.title && (
                    <h3 className="font-display text-xl text-light mb-2">{chaosItem.title}</h3>
                  )}
                  <p className="text-light/80 text-lg leading-relaxed">
                    {chaosItem?.text || chaosItem?.description || 'Something chaotic is about to happen!'}
                  </p>
                  
                  {chaosItem?.difficulty && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="text-light/50 text-sm">Difficulty:</span>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < (chaosItem.difficulty === 'high' ? 3 : chaosItem.difficulty === 'medium' ? 2 : 1)
                                ? colors.bg.replace('/20', '')
                                : 'bg-light/20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4 justify-center"
                >
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl bg-light/10 border border-light/20 text-light/70 hover:text-light hover:bg-light/20 transition-all font-display"
                  >
                    Skip
                  </motion.button>
                  
                  <motion.button
                    onClick={() => {
                      onAccept?.()
                      onClose()
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-8 py-3 rounded-xl font-display font-bold
                      ${colors.bg} ${colors.text} border-2 ${colors.border}
                      hover:brightness-110 transition-all
                      shadow-lg ${colors.glow}
                    `}
                  >
                    Accept Challenge
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal