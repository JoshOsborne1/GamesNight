import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Loading spinner SVG
const LoadingSpinner = ({ size = 20 }) => (
  <svg 
    className="animate-spin" 
    style={{ width: size, height: size }}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

// Ripple effect component
const RippleEffect = ({ x, y, onComplete }) => (
  <motion.span
    className="absolute bg-white/30 rounded-full pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
    animate={{ width: 300, height: 300, x: -150, y: -150, opacity: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    onAnimationComplete={onComplete}
  />
)

const variantStyles = {
  primary: {
    base: 'bg-primary text-white border-primary',
    hover: 'hover:bg-primary/90 hover:border-primary/90 hover:shadow-lg hover:shadow-primary/30',
    active: 'active:bg-primary/80',
    disabled: 'disabled:bg-primary/50 disabled:border-primary/50 disabled:cursor-not-allowed'
  },
  secondary: {
    base: 'bg-secondary text-white border-secondary',
    hover: 'hover:bg-secondary/90 hover:border-secondary/90 hover:shadow-lg hover:shadow-secondary/30',
    active: 'active:bg-secondary/80',
    disabled: 'disabled:bg-secondary/50 disabled:border-secondary/50 disabled:cursor-not-allowed'
  },
  accent: {
    base: 'bg-accent text-white border-accent',
    hover: 'hover:bg-accent/90 hover:border-accent/90 hover:shadow-lg hover:shadow-accent/30',
    active: 'active:bg-accent/80',
    disabled: 'disabled:bg-accent/50 disabled:border-accent/50 disabled:cursor-not-allowed'
  },
  success: {
    base: 'bg-success text-dark border-success',
    hover: 'hover:bg-success/90 hover:border-success/90 hover:shadow-lg hover:shadow-success/30',
    active: 'active:bg-success/80',
    disabled: 'disabled:bg-success/50 disabled:border-success/50 disabled:cursor-not-allowed'
  },
  danger: {
    base: 'bg-danger text-white border-danger',
    hover: 'hover:bg-danger/90 hover:border-danger/90 hover:shadow-lg hover:shadow-danger/30',
    active: 'active:bg-danger/80',
    disabled: 'disabled:bg-danger/50 disabled:border-danger/50 disabled:cursor-not-allowed'
  },
  ghost: {
    base: 'bg-transparent text-light border-light/20',
    hover: 'hover:bg-light/5 hover:border-light/40 hover:text-white',
    active: 'active:bg-light/10',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed'
  },
  outline: {
    base: 'bg-transparent text-light border-light/30',
    hover: 'hover:bg-light/5 hover:border-light/50 hover:text-white',
    active: 'active:bg-light/10',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed'
  }
}

const sizeStyles = {
  xs: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg',
  sm: 'px-4 py-2 text-sm gap-2 rounded-xl',
  md: 'px-6 py-3 text-base gap-2.5 rounded-xl',
  lg: 'px-8 py-4 text-lg gap-3 rounded-2xl',
  xl: 'px-10 py-5 text-xl gap-3.5 rounded-2xl'
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  type = 'button',
  className = '',
  ripple = true,
  ...props
}) {
  const [ripples, setRipples] = useState([])
  const buttonRef = useRef(null)
  
  const handleClick = useCallback((e) => {
    // Always prevent default if it's a submit button to handle manually
    if (type === 'submit') {
      e.preventDefault()
    }
    
    if (disabled || loading) return
    
    // Create ripple
    if (ripple && buttonRef.current) {
      const button = buttonRef.current
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const newRipple = {
        x,
        y,
        id: Date.now() + Math.random()
      }
      
      setRipples(prev => [...prev, newRipple])
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 600)
    }
    
    // Call the onClick handler
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }, [onClick, disabled, loading, ripple, type])
  
  const styles = variantStyles[variant] || variantStyles.primary
  const sizeClass = sizeStyles[size] || sizeStyles.md
  
  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden
        inline-flex items-center justify-center
        font-display font-semibold
        border-2
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark focus:ring-current
        cursor-pointer
        ${sizeClass}
        ${styles.base}
        ${styles.hover}
        ${styles.active}
        ${styles.disabled}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      {/* Ripple effects */}
      <AnimatePresence>
        {ripple && ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
            animate={{ 
              width: 400, 
              height: 400, 
              x: -200, 
              y: -200, 
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
      
      {/* Loading spinner */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <LoadingSpinner size={size === 'sm' ? 16 : 20} />
          </motion.span>
        )}
      </AnimatePresence>
      
      {/* Content */}
      <span className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && iconPosition === 'left' && (
          <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
        )}
        <span>{children}</span>
        
        {icon && iconPosition === 'right' && (
          <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
        )}
      </span>
    </motion.button>
  )
}

// Icon Button variant with ripple support
export function IconButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'ghost',
  size = 'md',
  className = '',
  ripple = true,
  ...props
}) {
  const [ripples, setRipples] = useState([])
  const buttonRef = useRef(null)
  
  const handleClick = useCallback((e) => {
    if (disabled || loading) return
    
    // Create ripple
    if (ripple && buttonRef.current) {
      const button = buttonRef.current
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const newRipple = {
        x,
        y,
        id: Date.now() + Math.random()
      }
      
      setRipples(prev => [...prev, newRipple])
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 600)
    }
    
    // Call the onClick handler
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }, [onClick, disabled, loading, ripple])
  
  const sizeClasses = {
    xs: 'p-1.5',
    sm: 'p-2',
    md: 'p-2.5',
    lg: 'p-3',
    xl: 'p-4'
  }
  
  const styles = variantStyles[variant] || variantStyles.ghost
  
  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden
        inline-flex items-center justify-center
        rounded-xl
        border-2
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark focus:ring-current
        cursor-pointer
        ${sizeClasses[size] || sizeClasses.md}
        ${styles.base}
        ${styles.hover}
        ${styles.active}
        ${styles.disabled}
        ${className}
      `}
      whileHover={disabled || loading ? {} : { scale: 1.1 }}
      whileTap={disabled || loading ? {} : { scale: 0.9 }}
      {...props}
    >
      {/* Ripple effects */}
      <AnimatePresence>
        {ripple && ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
            animate={{ width: 200, height: 200, x: -100, y: -100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
      
      {loading ? <LoadingSpinner size={16} /> : children}
    </motion.button>
  )
}

export default Button
