import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Loading spinner component
function LoadingSpinner({ size = 20 }) {
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
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
}

// Ripple effect component
function Ripple({ x, y, color }) {
  return (
    <motion.span
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        backgroundColor: color || 'rgba(255, 255, 255, 0.3)'
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
  )
}

// Variant style configurations
const variantStyles = {
  primary: {
    base: 'bg-gradient-to-r from-primary to-secondary text-white',
    hover: 'hover:shadow-lg hover:shadow-primary/30',
    active: 'active:scale-[0.98]',
    focus: 'focus:ring-2 focus:ring-primary/50'
  },
  secondary: {
    base: 'bg-white/10 text-white border border-white/20',
    hover: 'hover:bg-white/15 hover:border-white/30',
    active: 'active:scale-[0.98]',
    focus: 'focus:ring-2 focus:ring-white/30'
  },
  success: {
    base: 'bg-success text-dark font-semibold',
    hover: 'hover:shadow-lg hover:shadow-success/30',
    active: 'active:scale-[0.98]',
    focus: 'focus:ring-2 focus:ring-success/50'
  },
  danger: {
    base: 'bg-danger text-white',
    hover: 'hover:shadow-lg hover:shadow-danger/30',
    active: 'active:scale-[0.98]',
    focus: 'focus:ring-2 focus:ring-danger/50'
  },
  ghost: {
    base: 'bg-transparent text-white/70',
    hover: 'hover:bg-white/10 hover:text-white',
    active: 'active:scale-[0.98]',
    focus: 'focus:ring-2 focus:ring-white/20'
  },
  outline: {
    base: 'bg-transparent border-2 border-white/30 text-white',
    hover: 'hover:bg-white/10 hover:border-white/50',
    active: 'active:scale-[0.98]',
    focus: 'focus:ring-2 focus:ring-white/30'
  }
}

// Size configurations
const sizeStyles = {
  xs: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg min-h-[28px]',
  sm: 'px-4 py-2 text-sm gap-2 rounded-xl min-h-[36px]',
  md: 'px-6 py-3 text-base gap-2.5 rounded-xl min-h-[48px]',
  lg: 'px-8 py-4 text-lg gap-3 rounded-2xl min-h-[56px]',
  xl: 'px-10 py-5 text-xl gap-3.5 rounded-2xl min-h-[64px]'
}

// Enhanced Button component with micro-interactions
export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  className = '',
  ripple = true,
  rippleColor,
  ...props
}) {
  const [ripples, setRipples] = useState([])
  const buttonRef = useRef(null)

  const handleClick = useCallback((e) => {
    if (disabled || loading) return

    // Create ripple effect
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()

      setRipples(prev => [...prev, { id, x, y }])

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, 600)
    }

    onClick?.(e)
  }, [onClick, disabled, loading, ripple])

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
        font-semibold
        transition-all duration-200
        focus:outline-none focus:ring-offset-2 focus:ring-offset-dark
        ${sizeClass}
        ${styles.base}
        ${styles.hover}
        ${styles.active}
        ${styles.focus}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={disabled || loading ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map(r => (
          <Ripple key={r.id} x={r.x} y={r.y} color={rippleColor} />
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
            <LoadingSpinner size={size === 'xs' || size === 'sm' ? 16 : 20} />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Button content */}
      <span className={`
        flex items-center gap-2
        ${loading ? 'opacity-0' : 'opacity-100'}
      `}>
        {Icon && iconPosition === 'left' && (
          <motion.span
            className="flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: -5 }}
          >
            {typeof Icon === 'function' ? <Icon /> : Icon}
          </motion.span>
        )}

        <span>{children}</span>

        {Icon && iconPosition === 'right' && (
          <motion.span
            className="flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {typeof Icon === 'function' ? <Icon /> : Icon}
          </motion.span>
        )}
      </span>
    </motion.button>
  )
}

// Icon button variant
export function IconButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) {
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
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden
        inline-flex items-center justify-center
        rounded-xl
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark
        ${sizeClasses[size] || sizeClasses.md}
        ${styles.base}
        ${styles.hover}
        ${styles.focus}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={disabled || loading ? {} : { scale: 1.1 }}
      whileTap={disabled || loading ? {} : { scale: 0.9 }}
      {...props}
    >
      {loading ? <LoadingSpinner size={16} /> : children}
    </motion.button>
  )
}

// Button group with stagger animation
export function ButtonGroup({
  children,
  className = '',
  vertical = false
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: { staggerChildren: 0.05 }
        }
      }}
      className={`
        flex
        ${vertical ? 'flex-col gap-2' : 'flex-row gap-3'}
        ${className}
      `}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Floating action button
export function Fab({
  children,
  onClick,
  disabled = false,
  color = 'primary',
  size = 'md',
  className = ''
}) {
  const colorClasses = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30',
    success: 'bg-success text-dark shadow-lg shadow-success/30',
    danger: 'bg-danger text-white shadow-lg shadow-danger/30'
  }

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full flex items-center justify-center
        ${colorClasses[color]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.1, rotate: 90 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.button>
  )
}

export default {
  AnimatedButton,
  IconButton,
  ButtonGroup,
  Fab,
  LoadingSpinner
}
