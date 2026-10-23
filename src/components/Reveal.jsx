import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function Reveal({ children, className = '', delay = 0, y = 40, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-80px' })
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function ParallaxImage({ src, alt, className = '', strength = 35 }) {
  const ref = useRef(null)
  return <motion.div ref={ref} className={`parallax-frame ${className}`} whileInView="visible" initial="hidden" viewport={{ once: true, margin: '-10% 0px' }}>
    <motion.img src={src} alt={alt} variants={{ hidden: { scale: 1.08, y: strength }, visible: { scale: 1, y: 0, transition: { duration: 1.2, ease: [0.22,1,.36,1] } } }} />
  </motion.div>
}
