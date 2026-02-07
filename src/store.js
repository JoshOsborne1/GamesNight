import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import syncManager, { MessageTypes } from './sync'

const GAME_MODES = [
  { id: 'menu', name: 'Main Menu', color: 'primary' },
  { id: 'meme', name: 'Guess the Meme', color: 'primary' },
  { id: 'geo', name: 'Geography', color: 'accent' },
  { id: 'music', name: 'Music', color: 'secondary' },
  { id: 'history', name: 'History', color: 'danger' },
  { id: 'maths', name: 'Maths', color: 'success' },
  { id: 'riddles', name: 'Riddles', color: 'primary' },
  { id: 'spelling', name: 'Spelling Bee', color: 'secondary' },
  { id: 'zoomed', name: 'Zoomed', color: 'accent' },
  { id: 'logo', name: 'Logorithmic', color: 'danger' },
  { id: 'price', name: 'Price is Right', color: 'success' }
]

// Track if we're applying a remote state update (to avoid loops)
let isApplyingRemoteState = false

const useGameStore = create(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Current state
        mode: 'menu',
        subMode: null,
        currentItem: null,
        revealed: false,
        timer: 0,
        timerActive: false,
        isPaused: false,
        
        // Player scores
        players: [],
        
        // Chaos popup
        chaosActive: false,
        chaosType: null,
        chaosItem: null,
        
        // Audio state
        audio: {
          isMuted: false,
          masterVolume: 0.7,
          bgmEnabled: false,
          bgmVolume: 0.3,
          soundVolumes: {
            correct: 0.8,
            wrong: 0.7,
            buttonClick: 0.5,
            timerTick: 0.4,
            timerWarning: 0.6,
            chaosAlarm: 0.8,
            victory: 0.9,
            gameStart: 0.7,
            scoreUp: 0.6,
            scoreDown: 0.6
          }
        },
        
        // Game Settings
        settings: {
          // Timer settings
          timerDuration: 30,
          answerTimeLimit: 15,
          
          // Difficulty
          difficulty: 'medium',
          
          // Enabled games
          enabledGames: ['meme', 'geo', 'music', 'history', 'maths', 'riddles', 'spelling', 'zoomed', 'logo', 'price'],
          
          // Display settings
          particlesEnabled: true,
          scanlinesEnabled: true,
          showTimerOnDisplay: true,
          scoreAnimationsEnabled: true,
          theme: 'purple'
        },
        
        // Game Session
        gameSession: {
          isActive: false,
          savedAt: null,
          history: [],
          currentRound: 0,
          maxRounds: 10
        },
        
        // History tracking
        usedItems: {
          meme: [],
          geo: [],
          music: [],
          history: [],
          maths: [],
          riddles: [],
          spelling: [],
          zoomed: [],
          logo: [],
          price: [],
          forfeit: [],
          challenge: []
        },

        // Sync status
        syncStatus: 'disconnected',
        isLeader: false,
        
        // Actions
        setMode: (mode) => {
          set({ mode, subMode: null, currentItem: null, revealed: false, timer: 0, timerActive: false })
          get().broadcastStateIfLeader()
        },
        
        setSubMode: (subMode) => {
          set({ subMode, currentItem: null, revealed: false })
          get().broadcastStateIfLeader()
        },
        
        setCurrentItem: (item) => {
          set({ currentItem: item, revealed: false })
          get().broadcastStateIfLeader()
        },
        
        reveal: () => {
          set({ revealed: true, timerActive: false })
          get().broadcastStateIfLeader()
        },
        
        setTimer: (timer) => {
          set({ timer })
          get().broadcastStateIfLeader()
        },
        
        setTimerActive: (active) => {
          set({ timerActive: active })
          get().broadcastStateIfLeader()
        },
        
        // Pause/Resume functionality
        pauseGame: () => {
          set({ isPaused: true, timerActive: false })
          get().broadcastStateIfLeader()
        },
        
        resumeGame: () => {
          set({ isPaused: false })
          get().broadcastStateIfLeader()
        },
        
        // Enhanced player management with profiles
        addPlayer: (name) => {
          const colors = ['purple', 'pink', 'blue', 'cyan', 'green', 'orange', 'red', 'indigo']
          const avatars = ['circle', 'square', 'star', 'diamond', 'triangle', 'hexagon', 'bolt', 'heart']
          const state = get()
          const colorIndex = state.players.length % colors.length
          const avatarIndex = state.players.length % avatars.length
          
          set((state) => ({ 
            players: [...state.players, { 
              name, 
              score: 0, 
              id: Date.now(),
              color: colors[colorIndex],
              avatar: avatars[avatarIndex],
              stats: {
                gamesPlayed: 0,
                wins: 0,
                totalScore: 0,
                bestScore: 0,
                correctAnswers: 0
              }
            }]
          }))
          get().broadcastStateIfLeader()
        },
        
        removePlayer: (id) => {
          set((state) => ({
            players: state.players.filter(p => p.id !== id)
          }))
          get().broadcastStateIfLeader()
        },
        
        updatePlayer: (id, updates) => {
          set((state) => ({
            players: state.players.map(p => 
              p.id === id ? { ...p, ...updates } : p
            )
          }))
          get().broadcastStateIfLeader()
        },
        
        updateScore: (id, delta) => {
          set((state) => ({
            players: state.players.map(p => {
              if (p.id === id) {
                const newScore = p.score + delta
                return { 
                  ...p, 
                  score: newScore,
                  stats: {
                    ...p.stats,
                    totalScore: (p.stats?.totalScore || 0) + Math.max(0, delta),
                    bestScore: Math.max(p.stats?.bestScore || 0, newScore),
                    correctAnswers: (p.stats?.correctAnswers || 0) + (delta > 0 ? 1 : 0)
                  }
                }
              }
              return p
            })
          }))
          get().broadcastStateIfLeader()
        },
        
        // Record game result for history
        recordGameResult: (gameMode, winnerId, points) => {
          set((state) => ({
            gameSession: {
              ...state.gameSession,
              history: [
                {
                  gameMode,
                  winnerId,
                  points,
                  timestamp: Date.now(),
                  round: state.gameSession.currentRound
                },
                ...state.gameSession.history
              ],
              currentRound: state.gameSession.currentRound + 1
            }
          }))
          
          // Update winner stats
          if (winnerId) {
            set((state) => ({
              players: state.players.map(p => 
                p.id === winnerId 
                  ? { 
                      ...p, 
                      stats: {
                        ...p.stats,
                        gamesPlayed: (p.stats?.gamesPlayed || 0) + 1,
                        wins: (p.stats?.wins || 0) + 1
                      }
                    }
                  : {
                      ...p,
                      stats: {
                        ...p.stats,
                        gamesPlayed: (p.stats?.gamesPlayed || 0) + 1
                      }
                    }
              )
            }))
          }
          
          get().broadcastStateIfLeader()
        },
        
        markItemUsed: (mode, itemId) => {
          set((state) => ({
            usedItems: {
              ...state.usedItems,
              [mode]: [...state.usedItems[mode], itemId]
            }
          }))
          get().broadcastStateIfLeader()
        },
        
        triggerChaos: (type, item) => {
          set({ chaosActive: true, chaosType: type, chaosItem: item })
          get().broadcastStateIfLeader()
        },
        
        closeChaos: () => {
          set({ chaosActive: false, chaosType: null, chaosItem: null })
          get().broadcastStateIfLeader()
        },
        
        // Settings actions
        updateSettings: (updates) => {
          set((state) => ({
            settings: { ...state.settings, ...updates }
          }))
          get().broadcastStateIfLeader()
        },
        
        // Audio actions
        setAudioMute: (isMuted) => {
          set((state) => ({
            audio: { ...state.audio, isMuted }
          }))
          get().broadcastStateIfLeader()
        },
        
        toggleAudioMute: () => {
          set((state) => ({
            audio: { ...state.audio, isMuted: !state.audio.isMuted }
          }))
          get().broadcastStateIfLeader()
        },
        
        setMasterVolume: (volume) => {
          set((state) => ({
            audio: { ...state.audio, masterVolume: Math.max(0, Math.min(1, volume)) }
          }))
          get().broadcastStateIfLeader()
        },
        
        setSoundVolume: (soundName, volume) => {
          set((state) => ({
            audio: {
              ...state.audio,
              soundVolumes: {
                ...state.audio.soundVolumes,
                [soundName]: Math.max(0, Math.min(1, volume))
              }
            }
          }))
          get().broadcastStateIfLeader()
        },
        
        toggleBGM: () => {
          set((state) => ({
            audio: { ...state.audio, bgmEnabled: !state.audio.bgmEnabled }
          }))
          get().broadcastStateIfLeader()
        },
        
        setBGMVolume: (volume) => {
          set((state) => ({
            audio: { ...state.audio, bgmVolume: Math.max(0, Math.min(1, volume)) }
          }))
          get().broadcastStateIfLeader()
        },
        
        // Session management
        saveSession: () => {
          set((state) => ({
            gameSession: {
              ...state.gameSession,
              isActive: true,
              savedAt: Date.now()
            }
          }))
        },
        
        loadSession: () => {
          const state = get()
          if (state.gameSession.isActive) {
            set({
              players: state.players,
              gameSession: {
                ...state.gameSession,
                isActive: true
              }
            })
          }
        },
        
        clearSession: () => {
          set((state) => ({
            gameSession: {
              isActive: false,
              savedAt: null,
              history: [],
              currentRound: 0,
              maxRounds: state.settings.maxRounds || 10
            }
          }))
        },
        
        nextGame: () => {
          const { mode, subMode, currentItem } = get()
          if (currentItem) {
            get().markItemUsed(subMode || mode, currentItem.id)
          }
          set({ currentItem: null, revealed: false, timer: 0, timerActive: false })
          get().broadcastStateIfLeader()
        },
        
        resetGame: () => {
          set({
            mode: 'menu',
            subMode: null,
            currentItem: null,
            revealed: false,
            timer: 0,
            timerActive: false,
            isPaused: false,
            chaosActive: false,
            chaosType: null,
            chaosItem: null,
            usedItems: {
              meme: [], geo: [], music: [], history: [], maths: [],
              riddles: [], spelling: [], zoomed: [], logo: [], price: [],
              forfeit: [], challenge: []
            }
          })
          get().broadcastStateIfLeader()
        },

        // Sync actions
        setSyncStatus: (status) => set({ syncStatus: status }),
        setIsLeader: (isLeader) => set({ isLeader }),

        // Apply remote state (called by follower when receiving state update)
        applyRemoteState: (remoteState) => {
          if (!remoteState) return
          
          isApplyingRemoteState = true
          set({
            mode: remoteState.mode ?? 'menu',
            subMode: remoteState.subMode ?? null,
            currentItem: remoteState.currentItem ?? null,
            revealed: remoteState.revealed ?? false,
            timer: remoteState.timer ?? 0,
            timerActive: remoteState.timerActive ?? false,
            isPaused: remoteState.isPaused ?? false,
            players: remoteState.players ?? [],
            chaosActive: remoteState.chaosActive ?? false,
            chaosType: remoteState.chaosType ?? null,
            chaosItem: remoteState.chaosItem ?? null,
            audio: remoteState.audio ?? get().audio,
            settings: remoteState.settings ?? get().settings,
            usedItems: remoteState.usedItems ?? get().usedItems
          })
          isApplyingRemoteState = false
        },

        // Broadcast state if leader
        broadcastStateIfLeader: () => {
          if (isApplyingRemoteState) return
          
          const state = get()
          if (!state.isLeader) return
          if (!syncManager.isConnected()) return
          
          // Extract syncable state (exclude syncStatus and isLeader)
          const syncableState = {
            mode: state.mode,
            subMode: state.subMode,
            currentItem: state.currentItem,
            revealed: state.revealed,
            timer: state.timer,
            timerActive: state.timerActive,
            isPaused: state.isPaused,
            players: state.players,
            chaosActive: state.chaosActive,
            chaosType: state.chaosType,
            chaosItem: state.chaosItem,
            audio: state.audio,
            settings: state.settings,
            usedItems: state.usedItems
          }
          
          syncManager.broadcastState(syncableState)
        },

        // Initialize sync
        initSync: (role = 'follower') => {
          const success = syncManager.init(role)
          if (success) {
            set({ isLeader: role === 'leader' })
            
            // Subscribe to status changes
            syncManager.onStatusChange((status) => {
              set({ syncStatus: status.toLowerCase() })
            })

            // If follower, subscribe to state updates
            if (role !== 'leader') {
              syncManager.onStateUpdate((state) => {
                get().applyRemoteState(state)
              })
            } else {
              // If leader, subscribe to sync requests and broadcast state
              syncManager.onSyncRequest(() => {
                console.log('[Store] Leader received sync request, broadcasting state')
                get().broadcastStateIfLeader()
              })
            }
            
            // If leader, broadcast initial state after a short delay
            if (role === 'leader') {
              setTimeout(() => {
                get().broadcastStateIfLeader()
              }, 500)
            }
          }
          return success
        },

        // Force sync - manually request sync from leader
        forceSync: () => {
          if (!get().isLeader) {
            syncManager.requestSync(true)
          }
        },

        // Cleanup sync
        destroySync: () => {
          syncManager.destroy()
        }
      }),
      {
        name: 'game-night-storage',
        // Use localStorage for persistence
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        // Only persist these keys
        partialize: (state) => ({ 
          players: state.players,
          audio: state.audio,
          settings: state.settings,
          gameSession: state.gameSession,
          usedItems: state.usedItems
        }),
        // Version the storage for migrations
        version: 1,
        // Merge function to handle partial state
        merge: (persistedState, currentState) => {
          return {
            ...currentState,
            ...persistedState,
            // Always reset sync-related state on load
            syncStatus: 'disconnected',
            isLeader: false
          }
        }
      }
    )
  )
)

export { GAME_MODES }
export default useGameStore
