import React from 'react'
import { motion } from 'framer-motion'
import Modal from './Modal'
import { soundManager } from './index'

// Help Icon
const HelpCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <path d="M12 17h.01"/>
  </svg>
)

// Game Icons
const ControllerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="12" x="2" y="6" rx="2"/>
    <path d="M6 12h4"/>
    <path d="M8 10v4"/>
    <path d="M15 13h.01"/>
    <path d="M18 11h.01"/>
  </svg>
)

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
)

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
)

// Game Instructions Data
const gameInstructions = {
  meme: {
    name: 'Guess the Meme',
    description: 'Test your knowledge of internet culture and viral moments.',
    rules: [
      'A meme image or description will appear on screen',
      'Players compete to identify the meme first',
      'Correct answers earn 1 point',
      'Some rounds may have bonus points for extra details'
    ],
    scoring: [
      { label: 'Correct Guess', points: '+1 point' },
      { label: 'Bonus Details', points: '+1 point' },
      { label: 'Wrong Guess', points: '0 points' }
    ],
    tips: [
      'Think about viral videos, popular images, and internet trends',
      'React quickly - speed matters!',
      'Sometimes the most obvious answer is correct'
    ]
  },
  geo: {
    name: 'Geography',
    description: 'Test your knowledge of countries, capitals, and flags.',
    rules: [
      'Questions about capitals, countries, or flags appear',
      'Multiple choice options are provided',
      'Select the correct answer before time runs out',
      'Correct answers earn points based on difficulty'
    ],
    scoring: [
      { label: 'Easy Question', points: '+1 point' },
      { label: 'Medium Question', points: '+2 points' },
      { label: 'Hard Question', points: '+3 points' }
    ],
    tips: [
      'Look for visual clues in flag questions',
      'Eliminate obviously wrong answers first',
      'Trust your first instinct!'
    ]
  },
  music: {
    name: 'Music',
    description: 'Guess the song, artist, or complete the lyrics.',
    rules: [
      'Finish the lyric, identify the artist, or name the song',
      'Points awarded for correct answers',
      'Bonus points for naming the album or year'
    ],
    scoring: [
      { label: 'Correct Answer', points: '+1 point' },
      { label: 'Bonus Info', points: '+1 point' },
      { label: 'Sing Bonus', points: '+2 points' }
    ],
    tips: [
      'Listen carefully to the lyrics provided',
      'Think about popular songs across different decades',
      'Consider the genre hints in the questions'
    ]
  },
  history: {
    name: 'History',
    description: 'Dates, historical figures, and famous battles.',
    rules: [
      'Answer questions about historical events',
      'Identify famous figures from descriptions',
      'Match dates with significant events'
    ],
    scoring: [
      { label: 'Correct Answer', points: '+2 points' },
      { label: 'Exact Date', points: '+3 points' },
      { label: 'Partial Credit', points: '+1 point' }
    ],
    tips: [
      'Think about major world events and their timelines',
      'Connect historical figures to their achievements',
      'Use process of elimination when unsure'
    ]
  },
  maths: {
    name: 'Mathematics',
    description: 'Numbers, formulas, angles, and calculations.',
    rules: [
      'Solve mathematical problems within the time limit',
      'Show your working for bonus points',
      'Topics include BIDMAS, angles, shapes, and formulas'
    ],
    scoring: [
      { label: 'Correct Answer', points: '+2 points' },
      { label: 'Show Working', points: '+1 point' },
      { label: 'Quick Answer', points: '+1 point' }
    ],
    tips: [
      'Remember BIDMAS: Brackets, Indices, Division, Multiplication, Addition, Subtraction',
      'Draw diagrams for geometry questions',
      'Double-check your calculations!'
    ]
  },
  riddles: {
    name: 'Riddles',
    description: 'Brain teasers and lateral thinking puzzles.',
    rules: [
      'Solve tricky riddles and brain teasers',
      'Think outside the box',
      'First correct answer wins the point'
    ],
    scoring: [
      { label: 'Correct Answer', points: '+1 point' },
      { label: 'Creative Solution', points: '+2 points' }
    ],
    tips: [
      'Do not take the riddle literally - think laterally',
      'Look for wordplay and puns',
      'Sometimes the simplest answer is correct'
    ]
  },
  spelling: {
    name: 'Spelling Bee',
    description: 'Spell challenging words correctly.',
    rules: [
      'A word will be announced or shown with definition',
      'Spell the word correctly to earn points',
      'No spelling aids allowed!'
    ],
    scoring: [
      { label: 'Correct Spelling', points: '+2 points' },
      { label: 'One Mistake', points: '+1 point' },
      { label: 'Wrong Spelling', points: '0 points' }
    ],
    tips: [
      'Break the word into syllables',
      'Think about word origins (Latin, Greek, etc.)',
      'Visualize the word before spelling'
    ]
  },
  zoomed: {
    name: 'Zoomed',
    description: 'Identify everyday objects from extreme close-ups.',
    rules: [
      'A zoomed-in image of an object appears',
      'Identify what the object is',
      'The image may zoom out over time'
    ],
    scoring: [
      { label: 'Instant Guess', points: '+3 points' },
      { label: 'After First Zoom', points: '+2 points' },
      { label: 'After Second Zoom', points: '+1 point' }
    ],
    tips: [
      'Look for distinctive textures and patterns',
      'Think about common household objects',
      'Pay attention to colors and shapes'
    ]
  },
  logo: {
    name: 'Logorithmic',
    description: 'Draw brand logos from memory.',
    rules: [
      'A brand name will be revealed',
      'Draw the logo from memory on paper/whiteboard',
      'Points awarded for accuracy and creativity'
    ],
    scoring: [
      { label: 'Perfect Match', points: '+3 points' },
      { label: 'Recognizable', points: '+2 points' },
      { label: 'Good Effort', points: '+1 point' }
    ],
    tips: [
      'Focus on the key visual elements',
      'Think about brand colors',
      'Keep it simple - logos are usually clean designs'
    ]
  },
  price: {
    name: 'Price is Right',
    description: 'Guess the retail price of products.',
    rules: [
      'A product is shown with description',
      'Guess the price without going over',
      'Closest guess without exceeding wins'
    ],
    scoring: [
      { label: 'Exact Price', points: '+3 points' },
      { label: 'Within 10%', points: '+2 points' },
      { label: 'Within 25%', points: '+1 point' }
    ],
    tips: [
      'Consider brand premiums',
      'Think about product category averages',
      'Do not forget tax!'
    ]
  }
}

function HelpModal({ isOpen, onClose, gameId }) {
  const handleClose = () => {
    soundManager.playClick()
    onClose()
  }

  const instruction = gameId ? gameInstructions[gameId] : null

  if (!instruction) {
    // Show general help
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="How to Play"
        size="lg"
      >
        <div className="space-y-6">
          {/* Overview */}
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/20 text-primary">
                <ControllerIcon />
              </div>
              <h3 className="font-display text-lg text-primary">Game Night Controller</h3>
            </div>
            <p className="text-light/70">
              A multiplayer trivia and party game experience. Use the Host Controller to manage games, 
              while players compete on the main display.
            </p>
          </div>

          {/* Quick Start */}
          <div>
            <h4 className="font-display text-lg mb-4 flex items-center gap-2">
              <ArrowRightIcon />
              Quick Start Guide
            </h4>
            <div className="space-y-3">
              {[
                { icon: UsersIcon, text: 'Add players using the Players tab in Host Controller' },
                { icon: ControllerIcon, text: 'Select a game mode from the Games tab' },
                { icon: TargetIcon, text: 'Click "New" to generate a question/item' },
                { icon: ClockIcon, text: 'Players compete to answer correctly' },
                { icon: TrophyIcon, text: 'Award points to the winner using + button' }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-light/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-display font-bold">
                    {i + 1}
                  </div>
                  <div className="p-2 rounded-lg bg-light/10 text-light/70">
                    <step.icon />
                  </div>
                  <span className="text-light/80">{step.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="p-4 rounded-2xl bg-light/5 border border-light/10">
            <h4 className="font-display text-lg mb-3">Keyboard Shortcuts</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'L', action: 'Toggle Leaderboard' },
                { key: 'M', action: 'Mute/Unmute Audio' },
                { key: 'ESC', action: 'Close Modals' },
                { key: 'H', action: 'Show Help' }
              ].map((shortcut, i) => (
                <div key={i} className="flex items-center gap-3">
                  <kbd className="px-3 py-1.5 rounded-lg bg-light/10 text-primary font-display text-sm min-w-[3rem] text-center">
                    {shortcut.key}
                  </kbd>
                  <span className="text-light/60 text-sm">{shortcut.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  // Show game-specific help
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={instruction.name}
      size="lg"
    >
      <div className="space-y-6">
        {/* Description */}
        <p className="text-light/70 text-lg">{instruction.description}</p>

        {/* Rules */}
        <div>
          <h4 className="font-display text-lg mb-3 flex items-center gap-2 text-primary">
            <TargetIcon />
            How to Play
          </h4>
          <div className="space-y-2">
            {instruction.rules.map((rule, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-light/5"
              >
                <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <ArrowRightIcon />
                </div>
                <span className="text-light/80">{rule}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scoring */}
        <div className="p-4 rounded-2xl bg-success/10 border border-success/30">
          <h4 className="font-display text-lg mb-3 flex items-center gap-2 text-success">
            <TrophyIcon />
            Scoring
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {instruction.scoring.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center p-3 rounded-xl bg-light/5"
              >
                <p className="text-light/60 text-sm mb-1">{item.label}</p>
                <p className="font-display text-xl text-success">{item.points}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="p-4 rounded-2xl bg-accent/10 border border-accent/30">
          <h4 className="font-display text-lg mb-3 flex items-center gap-2 text-accent">
            <LightbulbIcon />
            Pro Tips
          </h4>
          <div className="space-y-2">
            {instruction.tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="text-accent flex-shrink-0 mt-1">
                  <CheckIcon />
                </div>
                <span className="text-light/70">{tip}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default HelpModal
