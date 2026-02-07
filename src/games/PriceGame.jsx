import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import useGameStore from '../store'
import audioController from '../audio'
import {
  AnimatedButton,
  PageTransition,
  AnimatedNumber
} from '../components'
import { products } from '../data/prices'

function PriceGame() {
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
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-success/20 text-success border-2 border-success/40"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12" />
              <path d="M8 10h8" />
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
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
          </motion.div>

          <p className="text-2xl font-display text-white/80 mb-2">
            Ready for Price is Right!
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

  const product = currentItem
  const productData = products.find(p => p.id === product.id) || product

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
          <p className="text-white/60 font-display">PRICE IS RIGHT</p>

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
        className="glass rounded-3xl p-8 md:p-12 border border-success/30 max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <motion.p
            className="text-2xl md:text-3xl font-display mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            How much is this on Amazon?
          </motion.p>

          <motion.div
            className="bg-success/10 border border-success/30 rounded-2xl p-8 mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <motion.p
              className="text-3xl md:text-4xl font-display text-white mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {productData.name}
            </motion.p>

            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-success/20 text-success text-sm font-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {productData.category}
            </motion.span>

            <motion.p
              className="text-white/60 mt-4 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {productData.hint}
            </motion.p>
          </motion.div>

          {revealed && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-success/20 border-2 border-success rounded-2xl p-8"
            >
              <p className="text-white/60 text-lg mb-2">Actual Price:</p>
              <motion.p
                className="text-success text-5xl md:text-6xl font-bold glow-green"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                £<AnimatedNumber value={productData.price} />
              </motion.p>
            </motion.div>
          )}
        </div>

        {!revealed && (
          <motion.p
            className="text-white/40 font-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Closest without going over wins!
          </motion.p>
        )}
      </motion.div>
    </PageTransition>
  )
}

export default PriceGame
