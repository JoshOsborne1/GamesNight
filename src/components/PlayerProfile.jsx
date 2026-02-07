import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import { soundManager } from './index'

// Avatar SVG Components
const avatars = {
  circle: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="32" r="28"/>
      <circle cx="32" cy="26" r="10"/>
      <path d="M18 50c0-8 6-14 14-14s14 6 14 14"/>
    </svg>
  ),
  square: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="10" y="10" width="44" height="44" rx="8"/>
      <circle cx="32" cy="26" r="8"/>
      <path d="M20 46c0-6 5-10 12-10s12 4 12 10"/>
    </svg>
  ),
  star: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M32 6l8 18h18l-14 12 6 18-18-12-18 12 6-18-14-12h18z"/>
    </svg>
  ),
  diamond: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M32 6l24 28-24 28-24-28z"/>
      <circle cx="32" cy="32" r="8"/>
    </svg>
  ),
  triangle: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M32 8l26 44H6z"/>
      <circle cx="32" cy="32" r="6"/>
    </svg>
  ),
  hexagon: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M32 4l20 12v24l-20 12-20-12V16z"/>
      <circle cx="32" cy="32" r="8"/>
    </svg>
  ),
  bolt: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M36 6l-4 22h16l-20 30 4-22H16z"/>
    </svg>
  ),
  heart: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M32 56s-24-16-24-32c0-8 6-16 16-16 6 0 10 4 12 8 2-4 6-8 12-8 10 0 16 8 16 16 0 16-24 32-24 32z"/>
    </svg>
  ),
  crown: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 48h40M16 48V24l-4-12 12 8 12-12 12 12 12-8-4 12v24"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <circle cx="32" cy="8" r="3" fill="currentColor"/>
      <circle cx="52" cy="12" r="3" fill="currentColor"/>
    </svg>
  ),
  ghost: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 48V20c0-8 5-16 12-16s12 8 12 16v28c0 4-2 8-6 8s-6-4-6-8c0 4-2 8-6 8s-6-4-6-8"/>
      <circle cx="26" cy="20" r="3" fill="currentColor"/>
      <circle cx="38" cy="20" r="3" fill="currentColor"/>
    </svg>
  ),
  robot: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <rect x="20" y="20" width="8" height="8" rx="2" fill="currentColor"/>
      <rect x="36" y="20" width="8" height="8" rx="2" fill="currentColor"/>
      <path d="M20 40h24"/>
    </svg>
  ),
  alien: () => (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="32" cy="32" rx="14" ry="18"/>
      <ellipse cx="26" cy="28" rx="4" ry="6" fill="currentColor"/>
      <ellipse cx="38" cy="28" rx="4" ry="6" fill="currentColor"/>
      <path d="M28 42c0 2 2 4 4 4s4-2 4-4"/>
    </svg>
  )
}

// Player Colors
const playerColors = [
  { id: 'purple', bg: 'bg-purple-500', text: 'text-purple-500', hex: '#8b5cf6' },
  { id: 'pink', bg: 'bg-pink-500', text: 'text-pink-500', hex: '#ec4899' },
  { id: 'blue', bg: 'bg-blue-500', text: 'text-blue-500', hex: '#3b82f6' },
  { id: 'cyan', bg: 'bg-cyan-500', text: 'text-cyan-500', hex: '#06b6d4' },
  { id: 'green', bg: 'bg-green-500', text: 'text-green-500', hex: '#22c55e' },
  { id: 'emerald', bg: 'bg-emerald-500', text: 'text-emerald-500', hex: '#10b981' },
  { id: 'yellow', bg: 'bg-yellow-500', text: 'text-yellow-500', hex: '#eab308' },
  { id: 'orange', bg: 'bg-orange-500', text: 'text-orange-500', hex: '#f97316' },
  { id: 'red', bg: 'bg-red-500', text: 'text-red-500', hex: '#ef4444' },
  { id: 'rose', bg: 'bg-rose-500', text: 'text-rose-500', hex: '#f43f5e' },
  { id: 'indigo', bg: 'bg-indigo-500', text: 'text-indigo-500', hex: '#6366f1' },
  { id: 'violet', bg: 'bg-violet-500', text: 'text-violet-500', hex: '#8b5cf6' }
]

// Stats Icon
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
)

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
)

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
)

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  </svg>
)

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
)

function PlayerProfile({ player, isOpen, onClose, onUpdate, onRemove }) {
  const [editMode, setEditMode] = useState(false)
  const [editedPlayer, setEditedPlayer] = useState(player || {})

  if (!player) return null

  const color = playerColors.find(c => c.id === player.color) || playerColors[0]
  const AvatarIcon = avatars[player.avatar] || avatars.circle

  const handleClose = () => {
    soundManager.playClick()
    setEditMode(false)
    onClose()
  }

  const handleSave = () => {
    soundManager.playClick()
    onUpdate(player.id, editedPlayer)
    setEditMode(false)
  }

  const handleRemove = () => {
    soundManager.playClick()
    onRemove(player.id)
    onClose()
  }

  const calculateWinRate = () => {
    const stats = player.stats || {}
    if (!stats.gamesPlayed || stats.gamesPlayed === 0) return 0
    return Math.round(((stats.wins || 0) / stats.gamesPlayed) * 100)
  }

  const calculateAvgScore = () => {
    const stats = player.stats || {}
    if (!stats.gamesPlayed || stats.gamesPlayed === 0) return 0
    return Math.round((stats.totalScore || 0) / stats.gamesPlayed)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      title={
        <div className="flex items-center gap-3">
          <div 
            className={`w-10 h-10 rounded-xl ${color.bg} flex items-center justify-center text-white`}
          >
            <div className="w-6 h-6">
              <AvatarIcon />
            </div>
          </div>
          <span>{player.name}</span>
        </div>
      }
    >
      <div className="space-y-6">
        {!editMode ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-success/10 border border-success/30 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-success mb-1">
                  <TrophyIcon />
                  <span className="text-sm">Current Score</span>
                </div>
                <p className="font-display text-3xl text-success">{player.score || 0}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <TargetIcon />
                  <span className="text-sm">Games Played</span>
                </div>
                <p className="font-display text-3xl text-primary">{player.stats?.gamesPlayed || 0}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-2xl bg-accent/10 border border-accent/30 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-accent mb-1">
                  <ZapIcon />
                  <span className="text-sm">Win Rate</span>
                </div>
                <p className="font-display text-3xl text-accent">{calculateWinRate()}%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 rounded-2xl bg-secondary/10 border border-secondary/30 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-secondary mb-1">
                  <TrendingUpIcon />
                  <span className="text-sm">Avg Score</span>
                </div>
                <p className="font-display text-3xl text-secondary">{calculateAvgScore()}</p>
              </motion.div>
            </div>

            {/* Additional Stats */}
            {(player.stats?.wins > 0 || player.stats?.totalScore > 0) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-2xl bg-light/5 border border-light/10"
              >
                <h4 className="font-display text-lg mb-3">Career Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-light/60">Total Wins:</span>
                    <span className="font-display text-success">{player.stats?.wins || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light/60">Total Score:</span>
                    <span className="font-display">{player.stats?.totalScore || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light/60">Best Score:</span>
                    <span className="font-display text-primary">{player.stats?.bestScore || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light/60">Correct Answers:</span>
                    <span className="font-display">{player.stats?.correctAnswers || 0}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                onClick={() => {
                  soundManager.playClick()
                  setEditMode(true)
                  setEditedPlayer(player)
                }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 p-3 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
              >
                <EditIcon />
                Edit Profile
              </motion.button>

              <motion.button
                onClick={handleRemove}
                whileTap={{ scale: 0.98 }}
                className="p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20 transition-all"
              >
                <XIcon />
              </motion.button>
            </div>
          </>
        ) : (
          <>
            {/* Edit Mode */}
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm text-light/60 mb-2">Player Name</label>
                <input
                  type="text"
                  value={editedPlayer.name || ''}
                  onChange={(e) => setEditedPlayer({ ...editedPlayer, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-light/5 border border-light/20 text-light focus:border-primary focus:outline-none transition-colors"
                  placeholder="Enter name..."
                />
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-sm text-light/60 mb-2">Avatar</label>
                <div className="grid grid-cols-6 gap-2">
                  {Object.entries(avatars).map(([key, Icon]) => (
                    <motion.button
                      key={key}
                      onClick={() => setEditedPlayer({ ...editedPlayer, avatar: key })}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 rounded-xl border-2 transition-all ${
                        editedPlayer.avatar === key
                          ? `border-${color.id}-500 bg-${color.id}-500/20`
                          : 'border-light/10 hover:border-light/30'
                      }`}
                      style={{
                        borderColor: editedPlayer.avatar === key ? color.hex : undefined
                      }}
                    >
                      <div className={`w-6 h-6 ${color.text}`}
                        style={{ color: color.hex }}
                      >
                        <Icon />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm text-light/60 mb-2">Color</label>
                <div className="grid grid-cols-6 gap-2">
                  {playerColors.map((c) => (
                    <motion.button
                      key={c.id}
                      onClick={() => setEditedPlayer({ ...editedPlayer, color: c.id })}
                      whileTap={{ scale: 0.9 }}
                      className={`w-full aspect-square rounded-xl ${c.bg} border-2 transition-all ${
                        editedPlayer.color === c.id
                          ? 'border-white scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 rounded-2xl bg-light/5 border border-light/10">
                <label className="block text-sm text-light/60 mb-3">Preview</label>
                <div className="flex items-center gap-4">
                  <div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white`}
                    style={{ backgroundColor: playerColors.find(c => c.id === editedPlayer.color)?.hex || color.hex }}
                  >
                    {(() => {
                      const PreviewIcon = avatars[editedPlayer.avatar] || avatars.circle
                      return (
                        <div className="w-10 h-10">
                          <PreviewIcon />
                        </div>
                      )
                    })()}
                  </div>
                  <div>
                    <p className="font-display text-lg">{editedPlayer.name || 'Player'}</p>
                    <p className="text-light/50 text-sm">Score: {player.score}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  onClick={handleSave}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 p-3 rounded-xl bg-success/10 border border-success/30 text-success hover:bg-success/20 transition-all"
                >
                  Save Changes
                </motion.button>

                <motion.button
                  onClick={() => {
                    soundManager.playClick()
                    setEditMode(false)
                    setEditedPlayer(player)
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 p-3 rounded-xl bg-light/5 border border-light/20 text-light/70 hover:bg-light/10 transition-all"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default PlayerProfile
export { avatars, playerColors }
