import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import './SlideStyles.css'

function InfoSlide({ content, color = '#667eea' }) {
  const [gifUrl, setGifUrl] = useState(null)
  const [gifLoading, setGifLoading] = useState(true)

  useEffect(() => {
    // Using curated funny GIFs - reliable Giphy URLs
    const getGifForProtocol = () => {
      const gifMap = {
        'waiting impatiently': [
          // HTTP Polling - waiting, checking, polling, refresh
          'https://media.giphy.com/media/l0MYC0LajMaPoKHCM/giphy.gif', // Checking watch repeatedly
          'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif', // Waiting impatiently
          'https://media.giphy.com/media/l46CyJmS9KUbokzs0/giphy.gif', // Checking phone repeatedly
          'https://media.giphy.com/media/3o7abldb0xltq2n5fq/giphy.gif', // Impatient tapping
          'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif', // Refresh/reload animation
          'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif' // Clock watching
        ],
        'real-time communication': [
          // WebSocket - bidirectional, real-time, instant, two-way
          'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', // Two-way chat bubbles
          'https://media.giphy.com/media/3o7aD2saal8vX3f7O8/giphy.gif', // Real-time messaging
          'https://media.giphy.com/media/l0MYC6mJLyhq0rE1y/giphy.gif', // Instant communication
          'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', // Live connection
          'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif', // Data exchange
          'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif' // Bidirectional flow
        ],
        'listening attentively': [
          // SSE - one-way, streaming, receiving, listening
          'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', // Listening/streaming
          'https://media.giphy.com/media/l0MYC6mJLyhq0rE1y/giphy.gif', // Receiving data stream
          'https://media.giphy.com/media/3o7aD2saal8vX3f7O8/giphy.gif', // One-way data flow
          'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif', // Streaming content
          'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', // Continuous stream
          'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif' // Data reception
        ],
        'futuristic technology': [
          // WebTransport - futuristic, multiple streams, advanced, next-gen
          'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif', // Futuristic tech
          'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', // Advanced technology
          'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif', // Modern tech
          'https://media.giphy.com/media/3o7aD2saal8vX3f7O8/giphy.gif', // Next-gen
          'https://media.giphy.com/media/l46CyJmS9KUbokzs0/giphy.gif', // Multiple streams
          'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif' // High-tech
        ]
      }
      
      const topic = content.gifTopic || 'waiting impatiently'
      const gifs = gifMap[topic] || gifMap['waiting impatiently']
      
      // Use first GIF as primary (most reliable), with fallbacks
      const primaryGif = gifs[0]
      const fallbackGifs = gifs.slice(1)
      
      const tryLoadGif = (gifUrl, fallbackIndex = 0) => {
        const img = new Image()
        
        img.onload = () => {
          setGifUrl(gifUrl)
          setGifLoading(false)
        }
        
        img.onerror = () => {
          if (fallbackIndex < fallbackGifs.length) {
            // Try next fallback
            tryLoadGif(fallbackGifs[fallbackIndex], fallbackIndex + 1)
          } else {
            // All failed, use a universal fallback
            setGifUrl('https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif')
            setGifLoading(false)
          }
        }
        
        img.src = gifUrl
      }
      
      // Start with primary GIF
      tryLoadGif(primaryGif)
    }

    // Load GIF with a small delay for smooth UX
    const timer = setTimeout(() => {
      getGifForProtocol()
    }, 300)

    return () => clearTimeout(timer)
  }, [content.gifTopic])

  return (
    <div className="slide info-slide">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="slide-content"
        style={{ '--protocol-color': color }}
      >
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="slide-title"
          style={{ color }}
        >
          {content.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="info-description"
        >
          {content.description}
        </motion.p>

        <div className="info-layout">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="info-points"
          >
            <ul>
              {content.points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="info-gif"
          >
            {gifLoading ? (
              <div className="gif-loading">
                <Loader className="spinner" size={40} />
                <p>Loading hilarious GIF...</p>
              </div>
            ) : (
              gifUrl && (
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  src={gifUrl}
                  alt="Funny GIF"
                  className="gif-image"
                  onError={(e) => {
                    // Fallback if GIF fails to load
                    console.log('GIF failed to load, using fallback')
                    e.target.onerror = null
                    // Try multiple fallback GIFs
                    const fallbacks = [
                      'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif',
                      'https://media.giphy.com/media/l0MYC0LajMaPoKHCM/giphy.gif',
                      'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif'
                    ]
                    const currentIndex = fallbacks.indexOf(e.target.src)
                    const nextIndex = (currentIndex + 1) % fallbacks.length
                    e.target.src = fallbacks[nextIndex]
                  }}
                  loading="eager"
                />
              )
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default InfoSlide
