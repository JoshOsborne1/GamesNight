import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 20
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.175, 0.885, 0.32, 1.275], // spring-like easing
      when: 'beforeChildren',
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1]
    }
  }
}

// Slide transition variants
const slideVariants = {
  initial: {
    opacity: 0,
    x: 30
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.175, 0.885, 0.32, 1.275]
    }
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1]
    }
  }
}

// Fade transition variants
const fadeVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
}

// Scale transition variants (for modals/overlays)
const scaleVariants = {
  initial: {
    opacity: 0,
    scale: 0.9
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.175, 0.885, 0.32, 1.275]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
}

// Stagger container variants
const staggerContainerVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

// Stagger item variants
const staggerItemVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.175, 0.885, 0.32, 1.275]
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
}

// Main PageTransition component
export function PageTransition({
  children,
  className = '',
  variant = 'default',
  mode = 'wait'
}) {
  const variants = {
    default: pageVariants,
    slide: slideVariants,
    fade: fadeVariants,
    scale: scaleVariants
  }

  return (
    <motion.div
      variants={variants[variant]}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated container for lists with stagger effect
export function StaggerContainer({
  children,
  className = '',
  delay = 0
}) {
  return (
    <motion.div
      variants={{
        initial: {},
        enter: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay
          }
        },
        exit: {
          transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
          }
        }
      }}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual stagger item
export function StaggerItem({
  children,
  className = ''
}) {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Route wrapper with AnimatePresence
export function AnimatedRoutes({ children, location }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location?.pathname || 'default'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: [0.175, 0.885, 0.32, 1.275]
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Exit animation wrapper
export function ExitAnimation({
  children,
  onExit,
  className = ''
}) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.95,
        y: -20,
        transition: { duration: 0.25 }
      }}
      onAnimationComplete={onExit}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Game transition (specific for game switches)
export function GameTransition({
  children,
  gameId,
  className = ''
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={gameId}
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
        transition={{
          duration: 0.4,
          ease: [0.175, 0.885, 0.32, 1.275]
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  AnimatedRoutes,
  ExitAnimation,
  GameTransition,
  pageVariants,
  slideVariants,
  fadeVariants,
  scaleVariants,
  staggerContainerVariants,
  staggerItemVariants
}
