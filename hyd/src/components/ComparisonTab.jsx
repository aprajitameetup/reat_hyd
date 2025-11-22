import { motion } from 'framer-motion'
import { Shield, Zap, Clock, ArrowRightLeft, ArrowDown, ArrowUpDown, Layers } from 'lucide-react'
import './ComparisonTab.css'

const protocols = [
  {
    id: 'http',
    name: 'HTTP Polling',
    color: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'Traditional request-response pattern with periodic client requests',
    direction: 'Bidirectional (via polling)',
    connection: 'Stateless',
    useCases: [
      'Simple data fetching',
      'REST APIs',
      'When real-time updates are not critical',
      'Compatible with all browsers and servers'
    ],
    security: [
      'HTTPS for encryption',
      'JWT tokens for authentication',
      'CORS policies',
      'Rate limiting',
      'Input validation'
    ],
    pros: [
      'Universal browser support',
      'Simple to implement',
      'Works through firewalls/proxies',
      'Stateless and cacheable'
    ],
    cons: [
      'High latency for real-time updates',
      'Inefficient (unnecessary requests)',
      'Server overhead from frequent polling',
      'Battery drain on mobile devices'
    ],
    technicalDetails: {
      protocol: 'HTTP/1.1 or HTTP/2',
      transport: 'TCP',
      overhead: 'High (full HTTP headers per request)',
      latency: 'High (polling interval dependent)',
      scalability: 'Limited by polling frequency'
    }
  },
  {
    id: 'websocket',
    name: 'WebSocket',
    color: '#f5576c',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    description: 'Full-duplex bidirectional communication over a single TCP connection',
    direction: 'Bidirectional',
    connection: 'Persistent',
    useCases: [
      'Real-time chat applications',
      'Collaborative editing',
      'Live gaming',
      'Financial trading platforms',
      'Live notifications',
      'IoT device control'
    ],
    security: [
      'WSS (WebSocket Secure) for encryption',
      'Origin validation',
      'Subprotocol negotiation',
      'Rate limiting per connection',
      'Message size limits',
      'Authentication during handshake'
    ],
    pros: [
      'True bidirectional communication',
      'Low latency',
      'Efficient (minimal overhead after handshake)',
      'Single persistent connection',
      'Widely supported'
    ],
    cons: [
      'More complex than HTTP',
      'Requires connection management',
      'Proxy/firewall issues',
      'No automatic reconnection',
      'Stateful connections'
    ],
    technicalDetails: {
      protocol: 'WebSocket (RFC 6455)',
      transport: 'TCP',
      overhead: 'Low (2-14 bytes per frame)',
      latency: 'Very Low',
      scalability: 'High (one connection per client)'
    }
  },
  {
    id: 'sse',
    name: 'Server-Sent Events',
    color: '#00f2fe',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    description: 'Unidirectional server-to-client streaming over HTTP',
    direction: 'Unidirectional (Server → Client)',
    connection: 'Persistent (HTTP)',
    useCases: [
      'Live news feeds',
      'Stock price updates',
      'Social media feeds',
      'Progress updates',
      'Live dashboards',
      'Event notifications'
    ],
    security: [
      'HTTPS for encryption',
      'Same-origin policy',
      'CORS configuration',
      'Authentication via headers',
      'Event ID tracking',
      'Connection timeout limits'
    ],
    pros: [
      'Simple to implement',
      'Automatic reconnection',
      'Works through HTTP proxies',
      'Built-in event ID support',
      'Low server overhead',
      'Text-based (easy to debug)'
    ],
    cons: [
      'Unidirectional only',
      'Text-only (no binary)',
      'Limited to 6 connections per domain',
      'Not suitable for client-to-server streaming'
    ],
    technicalDetails: {
      protocol: 'HTTP with text/event-stream',
      transport: 'TCP',
      overhead: 'Low (HTTP headers + event data)',
      latency: 'Low',
      scalability: 'Medium (HTTP connection limits)'
    }
  },
  {
    id: 'webtransport',
    name: 'WebTransport',
    color: '#38f9d7',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    description: 'Modern multiplexed transport protocol with multiple streams',
    direction: 'Bidirectional (Multiple Streams)',
    connection: 'Persistent (QUIC)',
    useCases: [
      'Low-latency gaming',
      'High-frequency trading',
      'Video streaming',
      'Large file transfers',
      'Multi-stream applications',
      'Next-gen real-time apps'
    ],
    security: [
      'Built on QUIC (encrypted by default)',
      'Certificate pinning',
      'Origin validation',
      'Stream-level security',
      'No mixed content',
      'Modern TLS 1.3'
    ],
    pros: [
      'Multiple bidirectional streams',
      'Very low latency (QUIC)',
      'Built-in encryption',
      'Connection migration',
      'Multiplexing without head-of-line blocking',
      'Future-proof technology'
    ],
    cons: [
      'Limited browser support (Chrome, Edge)',
      'Requires HTTP/3 server',
      'More complex setup',
      'Newer technology (less documentation)',
      'Requires specific server infrastructure'
    ],
    technicalDetails: {
      protocol: 'WebTransport over HTTP/3',
      transport: 'QUIC (UDP-based)',
      overhead: 'Very Low',
      latency: 'Ultra Low',
      scalability: 'Very High (multiplexed streams)'
    }
  }
]

function ComparisonTab() {
  return (
    <div className="comparison-tab">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="comparison-header"
      >
        <h2>Protocol Deep Dive & Comparison</h2>
        <p>Comprehensive analysis of HTTP, WebSocket, SSE, and WebTransport</p>
      </motion.div>

      <div className="protocols-grid">
        {protocols.map((protocol, index) => (
          <motion.div
            key={protocol.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="protocol-detail-card"
          >
            <div className="protocol-header" style={{ background: protocol.gradient }}>
              <h3>{protocol.name}</h3>
              <p className="protocol-description">{protocol.description}</p>
            </div>

            <div className="protocol-content">
              <DetailSection
                icon={ArrowRightLeft}
                title="Communication Pattern"
                content={protocol.direction}
                color={protocol.color}
              />

              <DetailSection
                icon={Layers}
                title="Connection Type"
                content={protocol.connection}
                color={protocol.color}
              />

              <div className="detail-section">
                <h4>
                  <Zap size={20} style={{ color: protocol.color }} />
                  Use Cases
                </h4>
                <ul>
                  {protocol.useCases.map((useCase, i) => (
                    <li key={i}>{useCase}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h4>
                  <Shield size={20} style={{ color: protocol.color }} />
                  Security Considerations
                </h4>
                <ul>
                  {protocol.security.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pros-cons">
                <div className="pros">
                  <h4>✅ Advantages</h4>
                  <ul>
                    {protocol.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Limitations</h4>
                  <ul>
                    {protocol.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="technical-details">
                <h4>🔧 Technical Specifications</h4>
                <div className="tech-grid">
                  <div className="tech-item">
                    <span className="tech-label">Protocol:</span>
                    <span className="tech-value">{protocol.technicalDetails.protocol}</span>
                  </div>
                  <div className="tech-item">
                    <span className="tech-label">Transport:</span>
                    <span className="tech-value">{protocol.technicalDetails.transport}</span>
                  </div>
                  <div className="tech-item">
                    <span className="tech-label">Overhead:</span>
                    <span className="tech-value">{protocol.technicalDetails.overhead}</span>
                  </div>
                  <div className="tech-item">
                    <span className="tech-label">Latency:</span>
                    <span className="tech-value">{protocol.technicalDetails.latency}</span>
                  </div>
                  <div className="tech-item">
                    <span className="tech-label">Scalability:</span>
                    <span className="tech-value">{protocol.technicalDetails.scalability}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ComparisonMatrix />
      <SecurityGuide />
      <DecisionTree />
    </div>
  )
}

function DetailSection({ icon: Icon, title, content, color }) {
  return (
    <div className="detail-section">
      <h4>
        <Icon size={20} style={{ color }} />
        {title}
      </h4>
      <p>{content}</p>
    </div>
  )
}

function ComparisonMatrix() {
  const comparisonData = [
    { feature: 'Bidirectional', http: '❌ (via polling)', websocket: '✅', sse: '❌', webtransport: '✅' },
    { feature: 'Real-time', http: '⚠️ (delayed)', websocket: '✅', sse: '✅', webtransport: '✅' },
    { feature: 'Low Latency', http: '❌', websocket: '✅', sse: '✅', webtransport: '✅✅' },
    { feature: 'Browser Support', http: '✅✅✅', websocket: '✅✅', sse: '✅✅', webtransport: '⚠️' },
    { feature: 'Efficiency', http: '❌', websocket: '✅', sse: '✅', webtransport: '✅✅' },
    { feature: 'Complexity', http: '✅ (Simple)', websocket: '⚠️ (Medium)', sse: '✅ (Simple)', webtransport: '❌ (Complex)' },
    { feature: 'Auto Reconnect', http: '✅', websocket: '❌', sse: '✅', webtransport: '❌' },
    { feature: 'Multiplexing', http: '❌', websocket: '❌', sse: '❌', webtransport: '✅' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="comparison-matrix"
    >
      <h2>Quick Comparison Matrix</h2>
      <div className="matrix-table">
        <div className="matrix-header">
          <div className="matrix-cell header">Feature</div>
          <div className="matrix-cell header">HTTP Polling</div>
          <div className="matrix-cell header">WebSocket</div>
          <div className="matrix-cell header">SSE</div>
          <div className="matrix-cell header">WebTransport</div>
        </div>
        {comparisonData.map((row, i) => (
          <div key={i} className="matrix-row">
            <div className="matrix-cell feature">{row.feature}</div>
            <div className="matrix-cell">{row.http}</div>
            <div className="matrix-cell">{row.websocket}</div>
            <div className="matrix-cell">{row.sse}</div>
            <div className="matrix-cell">{row.webtransport}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function SecurityGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="security-guide"
    >
      <h2>🔒 Security Best Practices</h2>
      <div className="security-sections">
        <div className="security-section">
          <h3>Transport Layer Security</h3>
          <ul>
            <li><strong>HTTPS/WSS:</strong> Always use encrypted connections in production</li>
            <li><strong>TLS 1.3:</strong> Use the latest TLS version for best security</li>
            <li><strong>Certificate Validation:</strong> Verify server certificates properly</li>
          </ul>
        </div>
        <div className="security-section">
          <h3>Authentication & Authorization</h3>
          <ul>
            <li><strong>Token-based Auth:</strong> Use JWT or similar for stateless authentication</li>
            <li><strong>Origin Validation:</strong> Verify request origins to prevent CSRF</li>
            <li><strong>Role-based Access:</strong> Implement proper authorization checks</li>
          </ul>
        </div>
        <div className="security-section">
          <h3>Input Validation & Sanitization</h3>
          <ul>
            <li><strong>Validate All Input:</strong> Never trust client-side data</li>
            <li><strong>Sanitize Output:</strong> Prevent XSS attacks</li>
            <li><strong>Message Size Limits:</strong> Prevent DoS attacks</li>
          </ul>
        </div>
        <div className="security-section">
          <h3>Rate Limiting & DoS Protection</h3>
          <ul>
            <li><strong>Connection Limits:</strong> Limit connections per IP/user</li>
            <li><strong>Rate Limiting:</strong> Throttle requests/messages</li>
            <li><strong>Timeout Management:</strong> Close idle connections</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function DecisionTree() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="decision-tree"
    >
      <h2>🎯 When to Use What?</h2>
      <div className="decision-cards">
        <div className="decision-card" style={{ borderColor: '#667eea' }}>
          <h3>Use HTTP Polling When:</h3>
          <ul>
            <li>Real-time updates are not critical</li>
            <li>You need maximum browser compatibility</li>
            <li>Simple REST API is sufficient</li>
            <li>Update frequency is low (minutes/hours)</li>
            <li>Stateless architecture is preferred</li>
          </ul>
        </div>
        <div className="decision-card" style={{ borderColor: '#f5576c' }}>
          <h3>Use WebSocket When:</h3>
          <ul>
            <li>You need true bidirectional communication</li>
            <li>Real-time chat or collaboration features</li>
            <li>Low latency is critical</li>
            <li>Both client and server need to push data</li>
            <li>Gaming or trading applications</li>
          </ul>
        </div>
        <div className="decision-card" style={{ borderColor: '#00f2fe' }}>
          <h3>Use SSE When:</h3>
          <ul>
            <li>Only server-to-client updates needed</li>
            <li>Live feeds, notifications, or dashboards</li>
            <li>You want automatic reconnection</li>
            <li>Simple implementation is preferred</li>
            <li>Text-based data streaming</li>
          </ul>
        </div>
        <div className="decision-card" style={{ borderColor: '#38f9d7' }}>
          <h3>Use WebTransport When:</h3>
          <ul>
            <li>You need multiple concurrent streams</li>
            <li>Ultra-low latency is required</li>
            <li>Modern browser support is acceptable</li>
            <li>Gaming or high-frequency applications</li>
            <li>You want future-proof technology</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default ComparisonTab
