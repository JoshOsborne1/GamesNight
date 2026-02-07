// Core components
export { default as ChaosPopup } from './ChaosPopup'
export { default as Leaderboard } from './Leaderboard'
export { default as soundManager } from './SoundManager'
export { default as ErrorBoundary } from './ErrorBoundary'
export { default as Header } from './Header'
export { default as GameCard } from './GameCard'
export { default as Button, IconButton } from './Button'
export { default as Modal, ChaosModal } from './Modal'
export { default as Timer, CircularTimer, ProgressTimer, CountdownDisplay } from './Timer'

// New components
export { default as HelpModal } from './HelpModal'
export { default as Settings } from './Settings'
export { default as PlayerProfile, avatars, playerColors } from './PlayerProfile'

// Animation components
export {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  AnimatedRoutes,
  ExitAnimation,
  GameTransition
} from './PageTransition'

export {
  GradientMesh,
  ParticleField,
  GlassOverlay,
  BackgroundEffects,
  AmbientGlow,
  GridPattern,
  NoiseTexture
} from './BackgroundEffects'

export {
  AnimatedNumber,
  ScorePopup,
  ScoreCard,
  AnimatedLeaderboard,
  TotalScoreDisplay
} from './ScoreAnimations'

export {
  CircularTimer as AnimatedCircularTimer,
  LinearTimer,
  TimerWithControls
} from './TimerAnimations'

export {
  AnimatedButton,
  IconButton as AnimatedIconButton,
  ButtonGroup,
  Fab,
  LoadingSpinner
} from './AnimatedButton'

// Legacy exports
export * from './ParticleEffects'
export * from './CountdownTimer'
export * from './AnimatedScore'
export * from './CategoryIcons'
