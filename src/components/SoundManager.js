// Re-export from new audio module for backwards compatibility
import audioController from '../audio'

// Export the audio controller as soundManager for existing code
export default audioController
export { audioController as SoundManager }