import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import useGameStore from '../store'
import audioController from '../audio'
import {
  AnimatedButton,
  PageTransition,
  StaggerContainer,
  StaggerItem
} from '../components'
import logos from '../data/logos'

function LogoGame() {
  const { currentItem, revealed, setMode, players } = useGameStore()

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
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-danger/20 text-danger border-2 border-danger/40"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
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
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
              <path d="m12 19 7-7 3 3-7 7-3-3z" />
              <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="m2 2 7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          </motion.div>

          <p className="text-2xl font-display text-white/80 mb-2">
            Ready for Logorithmic!
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
          <p className="text-white/60 font-display">LOGO"RITHMIC</p>

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
        className="glass rounded-3xl p-8 md:p-12 border border-danger/30 max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <motion.p
            className="text-2xl md:text-3xl font-display mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Draw this logo from memory!
          </motion.p>

          {!revealed ? (
            <motion.div
              className="bg-danger/10 border-2 border-danger rounded-2xl p-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <motion.p
                className="text-danger text-4xl md:text-5xl font-display glow-pink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {item.brand}
              </motion.p>
              <motion.p
                className="text-white/60 mt-2 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {item.category}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-success/10 border-2 border-success rounded-2xl p-8"
            >
              <motion.p
                className="text-success text-4xl md:text-5xl font-display glow-green"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {item.brand}
              </motion.p>
              <p className="text-white/60 mt-2 text-lg">{item.category}</p>
              <motion.p
                className="text-white/40 mt-4 text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Hint: {item.hint}
              </motion.p>
            </motion.div>
          )}
        </div>

        <p className="text-white/40 font-display">Show your drawings when ready!</p>
      </motion.div>
    </PageTransition>
  )
}

export default LogoGame
