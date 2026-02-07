import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

// Animated gradient mesh background
export function GradientMesh() {
  return (
    <div className="gradient-mesh">
      <div className="gradient-blob gradient-blob-1" />
      <div className="gradient-blob gradient-blob-2" />
      <div className="gradient-blob gradient-blob-3" />
    </div>
  )
}

// Subtle particle field
export function ParticleField({ count = 50 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
      color: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)]
    }))
  }, [count])

  return (
    <div className="particle-field">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            opacity: particle.opacity
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

// Glass morphism overlay effect
export function GlassOverlay({ children, className = '', intensity = 'medium' }) {
  const intensityClasses = {
    light: 'glass-light',
    medium: 'glass',
    strong: 'glass-strong'
  }

  return (
    <div className={`${intensityClasses[intensity]} ${className}`}>
      {children}
    </div>
  )
}

// Combined background effects
export function BackgroundEffects({
  showGradientMesh = true,
  showParticles = true,
  particleCount = 40,
  className = ''
}) {
  return (
    <div className={`fixed inset-0 z-0 pointer-events-none ${className}`}>
      {showGradientMesh && <GradientMesh />}
      {showParticles && <ParticleField count={particleCount} />}
      
      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 15, 0.4) 100%)'
        }}
      />
    </div>
  )
}

// Ambient glow effect that follows cursor
export function AmbientGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000 ease-out"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)`
      }}
    />
  )
}

// Grid pattern overlay
export function GridPattern({ opacity = 0.03 }) {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}
    />
  )
}

// Noise texture overlay for subtle depth
export function NoiseTexture({ opacity = 0.02 }) {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity
      }}
    />
  )
}

export default {
  GradientMesh,
  ParticleField,
  GlassOverlay,
  BackgroundEffects,
  AmbientGlow,
  GridPattern,
  NoiseTexture
}
