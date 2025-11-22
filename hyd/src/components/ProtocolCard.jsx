import { motion } from 'framer-motion'
import './ProtocolCard.css'

function ProtocolCard({ protocol, isActive, isConnected, onClick, Icon }) {
  return (
    <motion.div
      className={`protocol-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{
        borderColor: isActive ? protocol.color : 'var(--border-color)',
        background: isActive ? `linear-gradient(135deg, ${protocol.color}15 0%, ${protocol.color}05 100%)` : 'var(--bg-card)'
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="protocol-card-header">
        <div 
          className="protocol-icon"
          style={{ background: protocol.gradient }}
        >
          <Icon size={24} />
        </div>
        <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
          <span className="status-dot"></span>
        </div>
      </div>
      <h3>{protocol.name}</h3>
      <p>{protocol.description}</p>
      {isActive && (
        <motion.div
          className="active-indicator"
          style={{ background: protocol.gradient }}
          layoutId="activeIndicator"
        />
      )}
    </motion.div>
  )
}

export default ProtocolCard
