import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../store'
import audioController from '../audio'
import {
  AnimatedButton,
  PageTransition
} from '../components'
import zoomed from '../data/zoomed'

function ZoomedGame() {
  const { currentItem, revealed, setMode, players } = useGameStore()
  const [imageError, setImageError] = useState(false)

  // Play victory sound on reveal
  useEffect(() => {
    if (revealed) {
      audioController.playVictory()
    }
  }, [revealed])

  const handleBackToMenu = () => {
    audioController.playClick()
    setMode('menu')
  }

  if (!currentItem) {
    return (
      <PageTransition className="text-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={handleBackToMenu}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </AnimatedButton>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-info/20 text-info border-2 border-info/40"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M11 8v6" />
              <path d="M8 11h6" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-12 border border-white/10 max-w-2xl mx-auto"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mb-6"
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </motion.div>

          <p className="text-2xl font-display text-white/80 mb-2">
            Ready for Zoomed In!
          </p>

          <p className="text-white/60">
            Press NEW on Host Controller to start
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={handleBackToMenu}
            >
              Back to Menu
            </AnimatedButton>
          </div>
        </motion.div>
      </PageTransition>
    )
  }

  const item = currentItem
  const hasSvg = item.svg && !imageError

  // Render the SVG content
  const renderZoomedImage = () => {
    if (hasSvg) {
      return (
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            filter: revealed ? 'blur(0px)' : 'blur(2px)',
            transform: revealed ? 'scale(1)' : 'scale(3)',
            transition: 'all 0.8s ease-out'
          }}
          dangerouslySetInnerHTML={{ __html: item.svg }}
        />
      )
    }

    // Fallback abstract representation
    return (
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-info/30"
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path d="M2 12h4M18 12h4M12 2v4M12 18v4" />
        </svg>
      </motion.div>
    )
  }

  return (
    <PageTransition className="text-center px-4 pt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 max-w-4xl mx-auto"
      >
        <AnimatedButton
          variant="ghost"
          size="sm"
          onClick={handleBackToMenu}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </AnimatedButton>

        <div className="flex items-center gap-2">
          <p className="text-white/60 font-display">ZOOMED IN</p>

          {players.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-success/10 border border-success/30"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="font-display text-success font-bold">{players.length}</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-3xl p-8 md:p-12 border border-info/30 max-w-4xl mx-auto"
      >
        {!revealed ? (
          <div className="mb-8">
            <motion.div
              className="w-64 h-64 md:w-96 md:h-96 mx-auto rounded-2xl flex items-center justify-center border-2 border-info/50 overflow-hidden relative bg-gradient-to-br from-blue-500/10 to-purple-500/10"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              {renderZoomedImage()}

              {/* Zoom corner indicator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-info/20 border border-info/30 text-info text-sm font-display"
              >
                Zoomed 10x
              </motion.div>

              {/* Category badge */}
              {item.category && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm font-display"
                >
                  {item.category}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="mt-6 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-white/60 text-lg font-display">
                {item.hint}
              </p>
              <p className="text-white/40 text-sm">
                Difficulty: <span className={`
                  ${item.difficulty === 'Easy' ? 'text-success' : ''}
                  ${item.difficulty === 'Medium' ? 'text-warning' : ''}
                  ${item.difficulty === 'Hard' ? 'text-error' : ''}
                `}>{item.difficulty}</span>
              </p>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <motion.div
              className="w-64 h-64 md:w-96 md:h-96 mx-auto bg-success/10 rounded-2xl flex items-center justify-center border-2 border-success relative overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <AnimatePresence>
                {hasSvg ? (
                  <motion.div
                    key="revealed-svg"
                    initial={{ scale: 3, filter: 'blur(2px)' }}
                    animate={{ scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />
                ) : null}
              </AnimatePresence>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  className="bg-success/90 rounded-full p-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-success/10 border-2 border-success rounded-2xl p-6"
            >
              <p className="text-success text-3xl md:text-4xl font-display mb-2">{item.answer}</p>
              {item.description && (
                <p className="text-success/70 text-sm">{item.description}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </PageTransition>
  )
}

export default ZoomedGame
