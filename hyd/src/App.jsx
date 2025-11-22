import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Presentation } from 'lucide-react'
import VisualizationTab from './components/VisualizationTab'
import ComparisonTab from './components/ComparisonTab'
import PresentationMode from './components/PresentationMode'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('visualization')
  const [presentationMode, setPresentationMode] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle shortcuts when not in presentation mode and not typing in an input
      if (presentationMode) return
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      
      // V for Visualizations
      if (e.key === 'v' || e.key === 'V') {
        e.preventDefault()
        setActiveTab('visualization')
      }
      // C for Comparison
      else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault()
        setActiveTab('comparison')
      }
      // P for Presentation
      else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        setPresentationMode(true)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [presentationMode])

  if (presentationMode) {
    return <PresentationMode onExit={() => setPresentationMode(false)} />
  }

  return (
    <div className="app">
      <motion.header 
        className="header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <h1 className="title">
            <span className="title-gradient">Protocol Deep Dive</span>
          </h1>
          <p className="subtitle">HTTP • WebSocket • SSE • WebTransport</p>
        </div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setPresentationMode(true)}
          className="presentation-mode-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Start Presentation (Press P)"
        >
          <Presentation size={20} />
          <span>Start Presentation</span>
        </motion.button>
      </motion.header>

      <div className="tabs-container">
        <div className="tabs">
          <motion.button
            className={`tab ${activeTab === 'visualization' ? 'active' : ''}`}
            onClick={() => setActiveTab('visualization')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Visualizations (Press V)"
          >
            <span>📊 Visualizations</span>
          </motion.button>
          <motion.button
            className={`tab ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Detailed Comparison (Press C)"
          >
            <span>📚 Detailed Comparison</span>
          </motion.button>
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="tab-content"
      >
        {activeTab === 'visualization' ? <VisualizationTab /> : <ComparisonTab />}
      </motion.div>

      <div className="shortcuts-hint">
        <strong>Keyboard Shortcuts</strong>
        <div><kbd>V</kbd> Visualizations</div>
        <div><kbd>C</kbd> Comparison</div>
        <div><kbd>P</kbd> Presentation</div>
      </div>
    </div>
  )
}

export default App
