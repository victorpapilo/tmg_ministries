import { motion } from 'framer-motion'
export default function SectionHeading({ eyebrow, title, text, align = 'left', light = false }) {
  return <motion.div className={`section-heading ${align} ${light ? 'light' : ''}`} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.75,ease:[.22,1,.36,1]}}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </motion.div>
}
