import { motion } from 'framer-motion'
import { Zap, Code, Rocket } from 'lucide-react'
import './SlideStyles.css'

function IntroductionSlide() {
  return (
    <div className="slide introduction-slide">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="slide-content"
      >
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="slide-title"
        >
          <span className="title-gradient">Protocol Deep Dive</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="slide-subtitle"
        >
          HTTP • WebSocket • SSE • WebTransport
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="intro-features"
        >
          <div className="feature-card">
            <Zap className="feature-icon" size={40} />
            <h3>Real-Time Communication</h3>
            <p>Explore how modern web protocols enable instant data exchange</p>
          </div>
          
          <div className="feature-card">
            <Code className="feature-icon" size={40} />
            <h3>Live Demos</h3>
            <p>See each protocol in action with interactive visualizations</p>
          </div>
          
          <div className="feature-card">
            <Rocket className="feature-icon" size={40} />
            <h3>Future of Web</h3>
            <p>Understand the evolution from polling to WebTransport</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="intro-footer"
        >
          <p className="intro-tagline">Let's dive into the world of web protocols! 🚀</p>
          <p className="intro-hyd" style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#f5576c', fontWeight: 600 }}>
            P.S. - Hyderabad Biryani is the best biryani in the world! 🍛👑
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default IntroductionSlide
