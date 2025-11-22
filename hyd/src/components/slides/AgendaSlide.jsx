import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import './SlideStyles.css'

const agendaItems = [
  { id: 1, title: 'Introduction', description: 'Welcome & Overview' },
  { id: 2, title: 'HTTP Polling', description: 'The classic request-response pattern' },
  { id: 3, title: 'WebSocket', description: 'Bidirectional real-time communication' },
  { id: 4, title: 'Server-Sent Events', description: 'One-way server-to-client streaming' },
  { id: 5, title: 'WebTransport', description: 'The future of web communication' },
  { id: 6, title: 'Live Demos', description: 'See each protocol in action' },
  { id: 7, title: 'Comparison & Security', description: 'When to use what & how to secure' },
  { id: 8, title: 'Quiz Time!', description: 'Test your knowledge (with humor!)' }
]

function AgendaSlide() {
  return (
    <div className="slide agenda-slide">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="slide-content"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="slide-title"
        >
          Agenda
        </motion.h1>

        <div className="agenda-list">
          {agendaItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="agenda-item"
            >
              <div className="agenda-number">{item.id}</div>
              <div className="agenda-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <CheckCircle className="agenda-check" size={24} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="agenda-footer"
        >
          <p>Ready to explore? Let's go! 🎯</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AgendaSlide
