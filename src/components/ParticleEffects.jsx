import React, { useEffect, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'

// Confetti explosion for correct answers
export const triggerConfetti = (options = {}) => {
  const defaults = {
    origin: { y: 0.7 },
    particleCount: 100,
    spread: 70,
    colors: ['#FF006E', '#8338EC', '#3A86FF', '#00F5FF', '#00FF88', '#FFD700'],
    disableForReducedMotion: true
  }
  
  confetti({ ...defaults, ...options })
}

// Victory celebration with multiple bursts
export const triggerVictory = () => {
  const duration = 3000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 }
  
  const randomInRange = (min, max) => Math.random() * (max - min) + min
  
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()
    
    if (timeLeft <= 0) {
      clearInterval(interval)
      return
    }
    
    const particleCount = 50 * (timeLeft / duration)
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#FFD700', '#FFA500', '#FF006E', '#8338EC']
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#FFD700', '#FFA500', '#FF006E', '#8338EC']
    })
  }, 250)
}

// Explosion effect
export const triggerExplosion = (x, y) => {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { x, y },
    colors: ['#FF006E', '#FF6B35', '#FFD700', '#FF0000'],
    startVelocity: 45,
    gravity: 1.2,
    ticks: 100
  })
}

// Sparkle effect for buttons
export const triggerSparkle = (element) => {
  if (!element) return
  
  const rect = element.getBoundingClientRect()
  const x = (rect.left + rect.width / 2) / window.innerWidth
  const y = (rect.top + rect.height / 2) / window.innerHeight
  
  confetti({
    particleCount: 30,
    spread: 50,
    origin: { x, y },
    colors: ['#00F5FF', '#FFFFFF', '#8338EC'],
    startVelocity: 20,
    gravity: 0.8,
    ticks: 50,
    scalar: 0.5
  })
}

// Score increment celebration
export const triggerScoreCelebration = (element) => {
  if (!element) {
    triggerConfetti({ particleCount: 50, spread: 60 })
    return
  }
  
  const rect = element.getBoundingClientRect()
  const x = (rect.left + rect.width / 2) / window.innerWidth
  const y = (rect.top + rect.height / 2) / window.innerHeight
  
  confetti({
    particleCount: 80,
    spread: 80,
    origin: { x, y },
    colors: ['#00FF88', '#00F5FF', '#FFD700'],
    startVelocity: 30,
    gravity: 1,
    ticks: 80
  })
}

// Particle burst component for React
export const ParticleBurst = ({ trigger, type = 'confetti', onComplete }) => {
  const triggeredRef = useRef(false)
  
  useEffect(() => {
    if (trigger && !triggeredRef.current) {
      triggeredRef.current = true
      
      switch (type) {
        case 'victory':
          triggerVictory()
          break
        case 'explosion':
          triggerExplosion(0.5, 0.5)
          break
        case 'confetti':
        default:
          triggerConfetti()
          break
      }
      
      setTimeout(() => {
        triggeredRef.current = false
        onComplete?.()
      }, 1000)
    }
  }, [trigger, type, onComplete])
  
  return null
}

// Animated particles background
export const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    
    // Create particles
    const particleCount = 30
    const colors = ['#FF006E', '#8338EC', '#3A86FF', '#00F5FF', '#00FF88']
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1
      })
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle with glow
        ctx.save()
        ctx.globalAlpha = particle.alpha
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

// Floating shapes background component
export const FloatingShapes = () => {
  return (
    <div className="animated-bg">
      <div className="floating-shape" />
      <div className="floating-shape" />
      <div className="floating-shape" />
      <div className="floating-shape" />
      <div className="animated-grid" />
    </div>
  )
}

// CSS Particle effect for simple DOM-based particles
export const CSSParticles = ({ active, color = '#FF006E', count = 20 }) => {
  if (!active) return null
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i
        const distance = 50 + Math.random() * 100
        const duration = 0.5 + Math.random() * 0.5
        
        return (
          <div
            key={i}
            className="particle"
            style={{
              width: '8px',
              height: '8px',
              background: color,
              left: '50%',
              top: '50%',
              '--tx': `${Math.cos(angle * Math.PI / 180) * distance}px`,
              '--ty': `${Math.sin(angle * Math.PI / 180) * distance}px`,
              animationDuration: `${duration}s`
            }}
          />
        )
      })}
    </div>
  )
}

export default {
  triggerConfetti,
  triggerVictory,
  triggerExplosion,
  triggerSparkle,
  triggerScoreCelebration,
  ParticleBurst,
  ParticleBackground,
  FloatingShapes,
  CSSParticles
}
