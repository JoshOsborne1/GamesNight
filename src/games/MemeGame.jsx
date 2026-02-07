import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useGameStore from '../store'
import audioController from '../audio'
import {
  AnimatedButton,
  LinearTimer,
  PageTransition
} from '../components'
import memes from '../data/memes'

function MemeGame() {
  const { currentItem, revealed, setCurrentItem, setMode, players } = useGameStore()
  const [timeLeft, setTimeLeft] = useState(20)
  const [timerActive, setTimerActive] = useState(true)

  useEffect(() => {
    if (!currentItem) {
      const unused = memes.filter(m => !useGameStore.getState().usedItems.meme.includes(m.id))
      const pool = unused.length > 0 ? unused : memes
      const randomMeme = pool[Math.floor(Math.random() * pool.length)]
      setCurrentItem(randomMeme)
      setTimeLeft(20)
      setTimerActive(true)
    }
  }, [])

  useEffect(() => {
    if (revealed) {
      setTimerActive(false)
      audioController.playVictory()
    }
  }, [revealed])

  const handleBackToMenu = () => {
    audioController.playClick()
    setMode('menu')
  }

  const handleTimerComplete = () => {
    audioController.playTimerTick()
  }

  const handleTimerTick = (time) => {
    setTimeLeft(time)
    if (time <= 5 && time > 0) {
      audioController.playTimerTick()
    }
  }

  if (!currentItem) return null

  const meme = currentItem

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
          <p className="text-white/60 font-display">GUESS THE MEME</p>

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
        className="glass rounded-3xl p-8 md:p-12 border border-primary/30 max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-2xl md:text-4xl font-display leading-relaxed bg-dark/50 rounded-2xl p-8 border border-white/10"
          >
            "{meme.quote}"
          </motion.div>
        </div>

        {/* Timer with new LinearTimer component */}
        {!revealed && (
          <div className="mb-6 max-w-md mx-auto">
            <LinearTimer
              duration={20}
              timeLeft={timeLeft}
              height={12}
              showTime={true}
            />
          </div>
        )}

        <motion.div
          initial={false}
          animate={{
            height: revealed ? 'auto' : 0,
            opacity: revealed ? 1 : 0
          }}
          className="overflow-hidden"
        >
          <motion.div
            className="bg-success/10 border-2 border-success rounded-2xl p-6 mt-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <p className="text-success text-2xl md:text-3xl font-display mb-2">{meme.answer}</p>
            <p className="text-white/60">{meme.source}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageTransition>
  )
}

export default MemeGame
