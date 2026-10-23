import { motion } from 'framer-motion'
export default function PageTransition({ children }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45, ease: 'easeOut' }}>{children}</motion.div>
}
