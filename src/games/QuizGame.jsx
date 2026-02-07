import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../store'
import audioController from '../audio'
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  AnimatedNumber
} from '../components'
import { geography, music, history, maths, riddles, spelling } from '../data'

const categoryData = {
  geo: geography,
  music: music,
  history: history,
  maths: maths,
  riddles: riddles,
  spelling: spelling
}

const categoryNames = {
  geo: 'GEOGRAPHY',
  music: 'MUSIC',
  history: 'HISTORY',
  maths: 'MATHEMATICS',
  riddles: 'RIDDLES',
  spelling: 'SPELLING BEE'
}

const categoryColors = {
  geo: '#3b82f6',
  music: '#8b5cf6',
  history: '#f97316',
  maths: '#10b981',
  riddles: '#eab308',
  spelling: '#ec4899'
}

function QuizGame({ category }) {
  const { currentItem, revealed, subMode, setSubMode } = useGameStore()
  const [selectedOption, setSelectedOption] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const data = categoryData[category]

  // Get available sub-modes
  const subModes = Object.keys(data)

  // Auto-select sub-mode if only one
  useEffect(() => {
    if (!subMode && subModes.length === 1) {
      setSubMode(subModes[0])
    }
  }, [])

  const handleSubModeSelect = (sm) => {
    audioController.playClick()
    setSubMode(sm)
  }

  const handleOptionSelect = (index) => {
    if (revealed || showResult) return
    audioController.playClick()
    setSelectedOption(index)
    setShowResult(true)

    // Check if correct and play sound
    const isCorrect = currentItem?.options ?
      currentItem.options[index] === currentItem.answer :
      index === 0

    setTimeout(() => {
      if (isCorrect) {
        audioController.playCorrect()
      } else {
        audioController.playWrong()
      }
    }, 200)
  }

  const color = categoryColors[category]

  // Sub-mode selection screen
  if (!subMode && subModes.length > 1) {
    return (
      <PageTransition className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.h2
            className="font-display text-3xl md:text-4xl mb-2"
            style={{
              color,
              textShadow: `0 0 30px ${color}40`
            }}
          >
            {categoryNames[category]}
          </motion.h2>

          <p className="text-white/60">Choose a challenge type</p>
        </motion.div>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          delay={0.2}
        >
          {subModes.map((sm, i) => (
            <StaggerItem key={sm}>
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubModeSelect(sm)}
                className="w-full p-8 rounded-2xl bg-white/5 border-2 border-white/20
                         hover:border-primary/50 transition-all group
                         backdrop-blur-sm glass"
              >
                <motion.div
                  className="mb-4 mx-auto w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${color}20` }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </motion.div>
                <p className="font-display text-xl capitalize mb-2">{sm}</p>
                <p className="text-white/60 text-sm">{data[sm].length} questions</p>
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </PageTransition>
    )
  }

  // Waiting screen
  if (!currentItem) {
    return (
      <PageTransition className="text-center px-4">
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
            className="mb-6"
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="mx-auto">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </motion.div>

          <p className="text-2xl font-display text-white/80 mb-2">
            Ready for {categoryNames[category]}!
          </p>

          <p className="text-white/60">
            Press NEW on Host Controller to start
          </p>
        </motion.div>
      </PageTransition>
    )
  }

  const item = currentItem
  const isMultiChoice = item.options
  const isSpelling = category === 'spelling'

  return (
    <PageTransition className="text-center px-4 relative">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="glass rounded-3xl p-6 md:p-12 border border-white/10 max-w-4xl mx-auto relative overflow-hidden"
      >
        {/* Category header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="text-left">
            <p
              className="text-sm font-display font-bold"
              style={{ color }}
            >
              {categoryNames[category]}
            </p>
            <p className="text-white/40 text-xs capitalize">
              {subMode}
            </p>
          </div>

          {/* Question number indicator could go here */}
        </motion.div>

        {/* Question */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2
            className="text-2xl md:text-4xl font-display leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isSpelling ? (
              <>
                Spell: <span style={{ color }} className="glow-purple">"{item.word}"</span>
              </>
            ) : (
              item.question || item.lyrics || item.description
            )}
          </motion.h2>

          {item.song && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-secondary mt-4 text-lg"
              style={{ color: categoryColors.music }}
            >
              {item.song}
            </motion.p>
          )}
        </motion.div>

        {/* Options */}
        <AnimatePresence mode="wait">
          {isMultiChoice && !revealed && (
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              delay={0.3}
            >
              {item.options.map((opt, i) => {
                const isSelected = selectedOption === i
                const isCorrectAnswer = opt === item.answer
                const showCorrectness = showResult

                return (
                  <StaggerItem key={i}>
                    <motion.button
                      whileHover={!showResult ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleOptionSelect(i)}
                      disabled={showResult}
                      className={`
                        w-full p-5 rounded-xl border-2 font-display text-left
                        transition-all duration-300 relative overflow-hidden
                        ${showCorrectness
                          ? isCorrectAnswer
                            ? 'bg-success/20 border-success shadow-lg shadow-success/20'
                            : isSelected
                              ? 'bg-danger/20 border-danger'
                              : 'bg-white/5 border-white/10 opacity-50'
                          : isSelected
                            ? 'bg-primary/20 border-primary'
                            : 'bg-white/5 border-white/20 hover:border-primary/50 hover:bg-white/10'
                        }
                      `}
                    >
                      <span className={`
                        inline-flex items-center justify-center w-8 h-8 rounded-full mr-3
                        font-bold transition-colors
                        ${showCorrectness
                          ? isCorrectAnswer
                            ? 'bg-success text-dark'
                            : isSelected
                              ? 'bg-danger text-dark'
                              : 'bg-white/20'
                          : isSelected
                            ? 'bg-primary text-white'
                            : 'bg-white/20'
                        }
                      `}>
                        {String.fromCharCode(65 + i)}
                      </span>

                      <span className="text-lg">{opt}</span>

                      {/* Correct/Incorrect indicator */}
                      <AnimatePresence>
                        {showCorrectness && (isCorrectAnswer || (isSelected && !isCorrectAnswer)) && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute right-4 text-2xl"
                          >
                            {isCorrectAnswer ? (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3">
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                              </svg>
                            )}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          )}
        </AnimatePresence>

        {/* Answer reveal */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="overflow-hidden"
            >
              <motion.div
                className="bg-success/10 border-2 border-success rounded-2xl p-8 relative"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="mb-4"
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="mx-auto">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
                    <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-success text-3xl md:text-4xl font-display glow-green"
                >
                  {isSpelling ? item.word : item.answer}
                </motion.p>

                {item.hint && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/60 mt-4 text-lg"
                  >
                    {item.hint}
                  </motion.p>
                )}

                {item.working && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 p-4 bg-dark/50 rounded-xl"
                  >
                    <p className="text-white/80">{item.working}</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </PageTransition>
  )
}

export default QuizGame
