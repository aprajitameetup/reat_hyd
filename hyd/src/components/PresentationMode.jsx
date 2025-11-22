import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Presentation, X } from 'lucide-react'
import IntroductionSlide from './slides/IntroductionSlide'
import AgendaSlide from './slides/AgendaSlide'
import InfoSlide from './slides/InfoSlide'
import QuizSlide from './slides/QuizSlide'
import ComparisonTab from './ComparisonTab'
import './PresentationMode.css'

const slides = [
  { id: 'intro', component: IntroductionSlide, title: 'Introduction' },
  { id: 'agenda', component: AgendaSlide, title: 'Agenda' },
  { id: 'info1', component: InfoSlide, title: 'HTTP Polling', props: { 
    protocol: 'HTTP Polling',
    content: {
      title: 'HTTP Polling: The Classic Approach',
      description: 'Like checking Swiggy every 2 minutes for your biryani order...',
      points: [
        'Client: "Is biryani ready?" (every 2 seconds)',
        'Server: "No, still cooking" (99% of the time)',
        'Client: "Ready now?" (2 seconds later)',
        'Server: "Still not ready"',
        'Repeat until biryani is finally ready',
        'Wastes bandwidth, battery, and your patience (but biryani is worth it!)'
      ],
      gifTopic: 'waiting impatiently',
      color: '#667eea'
    }
  }},
  { id: 'info2', component: InfoSlide, title: 'WebSocket', props: {
    protocol: 'WebSocket',
    content: {
      title: 'WebSocket: The Real-Time Hero',
      description: 'Like a proper WhatsApp call - both sides can talk, unlike AI that just keeps explaining!',
      points: [
        'One connection, infinite conversations (like family WhatsApp group)',
        'Both sides can talk anytime (bidirectional)',
        'No more "are we there yet?" questions',
        'Perfect for chat, gaming, live updates',
        'Low latency, high efficiency',
        'But... you gotta manage that connection (like managing heavy traffic!)'
      ],
      gifTopic: 'real-time communication',
      color: '#f5576c'
    }
  }},
  { id: 'info3', component: InfoSlide, title: 'SSE', props: {
    protocol: 'SSE',
    content: {
      title: 'Server-Sent Events: One-Way Street',
      description: 'Like listening to a radio station - server keeps talking, you just listen!',
      points: [
        'Server streams data to client (like continuous updates)',
        'Client just sits and receives (no interruptions allowed)',
        'Auto-reconnects if connection drops (very reliable)',
        'Perfect for live feeds, notifications, stock prices',
        'Simple to implement, works everywhere',
        'But... client can\'t send data back!'
      ],
      gifTopic: 'listening attentively',
      color: '#00f2fe'
    }
  }},
  { id: 'info4', component: InfoSlide, title: 'WebTransport', props: {
    protocol: 'WebTransport',
    content: {
      title: 'WebTransport: The Future is Here',
      description: 'Like having multiple channels working simultaneously - all super fast!',
      points: [
        'Multiple streams at once (multiplexing magic)',
        'Ultra-low latency (QUIC protocol - super fast!)',
        'Built-in encryption (your data is secure!)',
        'No head-of-line blocking (all streams work independently)',
        'The coolest kid on the block',
        'But... needs modern browsers and HTTP/3'
      ],
      gifTopic: 'futuristic technology',
      color: '#38f9d7'
    }
  }},
  { id: 'comparison', component: ComparisonTab, title: 'Comparison', props: { isPresentation: true } },
  { id: 'quiz', component: QuizSlide, title: 'Quiz Time!' }
]

function PresentationMode({ onExit }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen()
        } else {
          onExit()
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, isFullscreen])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const CurrentSlideComponent = slides[currentSlide].component
  const slideProps = slides[currentSlide].props || {}

  return (
    <div className="presentation-mode">
      <div className="presentation-header">
        <div className="slide-counter">
          Slide {currentSlide + 1} of {slides.length}
        </div>
        <div className="presentation-controls">
          <button onClick={toggleFullscreen} className="control-btn" title="Fullscreen (F)">
            <Presentation size={20} />
          </button>
          <button onClick={onExit} className="control-btn" title="Exit (Esc)">
            <X size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="slide-container"
        >
          <CurrentSlideComponent 
            {...slideProps}
            slideNumber={currentSlide + 1}
            totalSlides={slides.length}
          />
        </motion.div>
      </AnimatePresence>

      <div className="presentation-navigation">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="nav-btn prev"
        >
          <ChevronLeft size={24} />
          Previous
        </button>
        
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              title={slides[index].title}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="nav-btn next"
        >
          Next
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="presentation-hint">
        <span>Use ← → arrow keys or Space to navigate • F for fullscreen • Esc to exit</span>
      </div>
    </div>
  )
}

export default PresentationMode
