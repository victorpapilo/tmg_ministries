import { motion, useScroll, useSpring } from 'framer-motion'
export default function ScrollProgress(){const {scrollYProgress}=useScroll();const scaleX=useSpring(scrollYProgress,{stiffness:120,damping:30,restDelta:.001});return <motion.div className="scroll-progress" style={{scaleX,transformOrigin:'0%'}}/>}
