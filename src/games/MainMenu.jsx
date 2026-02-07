import React from 'react'
import { motion } from 'framer-motion'
import useGameStore, { GAME_MODES } from '../store'
import {
  GameCard,
  soundManager,
  StaggerContainer,
  StaggerItem,
  PageTransition
} from '../components'

function MainMenu() {
  const { setMode } = useGameStore()

  const titleVariants = {
    initial: { opacity: 0, y: -50, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  }

  const underlineVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: { delay: 0.5, duration: 0.8, ease: 'easeOut' }
    }
  }

  const games = GAME_MODES.filter(g => g.id !== 'menu')

  // Game descriptions
  const gameDescriptions = {
    meme: 'Guess viral memes and vines',
    geo: 'Capitals, flags, and countries',
    music: 'Lyrics, artists, and songs',
    history: 'Dates, figures, and battles',
    maths: 'Numbers, angles, and formulas',
    riddles: 'Brain teasers and puzzles',
    spelling: 'Spell challenging words',
    zoomed: 'Identify zoomed-in objects',
    logo: 'Draw brands from memory',
    price: 'Guess Amazon prices'
  }

  const handleGameSelect = (gameId) => {
    soundManager.playClick()
    setMode(gameId)
  }

  return (
    <PageTransition className="text-center px-4 pt-20">
      {/* Main Title with animation */}
      <motion.div
        variants={titleVariants}
        initial="initial"
        animate="animate"
        className="mb-4"
      >
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl gradient-text"
          style={{
            textShadow: '0 0 40px rgba(139, 92, 246, 0.3)'
          }}
        >
          GAME NIGHT
        </motion.h1>

        <motion.div
          variants={underlineVariants}
          className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-4 max-w-md mx-auto"
        />
      </motion.div>

      {/* Event Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <p className="text-lg md:text-xl text-white/60 font-display">
          February 13th
        </p>
        <motion.p
          animate={{
            textShadow: [
              '0 0 10px rgba(139, 92, 246, 0.5)',
              '0 0 20px rgba(139, 92, 246, 0.8)',
              '0 0 10px rgba(139, 92, 246, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary font-display font-bold text-xl md:text-2xl mt-1"
        >
          THE ARENA
        </motion.p>
      </motion.div>

      {/* Decorative Icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="flex justify-center gap-4 mb-10"
      >
        {[
          { color: '#ec4899', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
          { color: '#8b5cf6', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
          { color: '#3b82f6', path: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' }
        ].map((icon, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="w-12 h-12"
          >
            <svg viewBox="0 0 24 24" fill={icon.color}>
              <path d={icon.path} />
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* Games Grid using stagger animation */}
      <StaggerContainer
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto"
        delay={0.6}
      >
        {games.map((game) => (
          <StaggerItem key={game.id}>
            <GameCard
              gameId={game.id}
              name={game.name}
              description={gameDescriptions[game.id]}
              color={game.color}
              onClick={() => handleGameSelect(game.id)}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-12 flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(139, 92, 246, 0)',
              '0 0 0 10px rgba(139, 92, 246, 0.1)',
              '0 0 0 0 rgba(139, 92, 246, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
          <span className="text-white/60 text-sm md:text-base">
            Use the Host Controller to start a game
          </span>
        </motion.div>

        {/* Keyboard shortcuts hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex gap-4 text-xs text-white/40"
        >
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white/10 rounded">L</kbd>
            <span>Leaderboard</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white/10 rounded">M</kbd>
            <span>Mute</span>
          </span>
        </motion.div>
      </motion.div>
    </PageTransition>
  )
}

export default MainMenu
