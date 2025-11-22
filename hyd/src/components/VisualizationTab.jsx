import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import ProtocolCard from './ProtocolCard'
import WebTransportInfo from './WebTransportInfo'
import { Activity, Send, Download, Zap } from 'lucide-react'
import './VisualizationTab.css'

const protocols = [
  {
    id: 'http',
    name: 'HTTP Polling',
    color: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: Activity,
    description: 'Request-Response pattern with periodic polling'
  },
  {
    id: 'websocket',
    name: 'WebSocket',
    color: '#f5576c',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: Send,
    description: 'Full-duplex bidirectional communication'
  },
  {
    id: 'sse',
    name: 'Server-Sent Events',
    color: '#00f2fe',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: Download,
    description: 'Unidirectional server-to-client streaming'
  },
  {
    id: 'webtransport',
    name: 'WebTransport',
    color: '#38f9d7',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    icon: Zap,
    description: 'Modern multiplexed transport protocol'
  }
]

function VisualizationTab() {
  const [selectedProtocol, setSelectedProtocol] = useState('http')
  const [httpData, setHttpData] = useState([])
  const [wsData, setWsData] = useState([])
  const [sseData, setSseData] = useState([])
  const [wtData, setWtData] = useState([])
  const [isConnected, setIsConnected] = useState({
    http: false,
    websocket: false,
    sse: false,
    webtransport: false
  })

  useEffect(() => {
    // HTTP Polling simulation
    if (selectedProtocol === 'http') {
      const interval = setInterval(async () => {
        try {
          const response = await fetch('http://localhost:3001/api/poll')
          const data = await response.json()
          setHttpData(prev => {
            const newData = [...prev, { time: Date.now(), value: data.value, type: 'Request' }]
            return newData.slice(-20)
          })
          setIsConnected(prev => ({ ...prev, http: true }))
        } catch (error) {
          setIsConnected(prev => ({ ...prev, http: false }))
        }
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [selectedProtocol])

  useEffect(() => {
    // WebSocket connection
    if (selectedProtocol === 'websocket') {
      const ws = new WebSocket('ws://localhost:3001/ws')
      
      ws.onopen = () => {
        setIsConnected(prev => ({ ...prev, websocket: true }))
        ws.send(JSON.stringify({ type: 'subscribe' }))
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setWsData(prev => {
          const newData = [...prev, { time: Date.now(), value: data.value, type: 'Message' }]
          return newData.slice(-20)
        })
      }

      ws.onerror = () => {
        setIsConnected(prev => ({ ...prev, websocket: false }))
      }

      ws.onclose = () => {
        setIsConnected(prev => ({ ...prev, websocket: false }))
      }

      return () => ws.close()
    }
  }, [selectedProtocol])

  useEffect(() => {
    // SSE connection
    if (selectedProtocol === 'sse') {
      const eventSource = new EventSource('http://localhost:3001/sse')
      
      eventSource.onopen = () => {
        setIsConnected(prev => ({ ...prev, sse: true }))
      }

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setSseData(prev => {
          const newData = [...prev, { time: Date.now(), value: data.value, type: 'Event' }]
          return newData.slice(-20)
        })
      }

      eventSource.onerror = () => {
        setIsConnected(prev => ({ ...prev, sse: false }))
        eventSource.close()
      }

      return () => eventSource.close()
    }
  }, [selectedProtocol])

  useEffect(() => {
    // WebTransport - Try real API first, fallback to simulation
    if (selectedProtocol === 'webtransport') {
      let transport = null
      let intervals = []
      
      // Check if WebTransport is supported
      if ('WebTransport' in window) {
        // Try to connect to a real WebTransport server
        // Note: This requires HTTP/3 server. For demo, we'll use a public echo server
        // or fall back to simulation if connection fails
        const connectWebTransport = async () => {
          try {
            // Try connecting to a public WebTransport echo server for demo
            // In production, you'd use your own HTTP/3 server
            const url = 'https://webtransport.day/webtransport'
            
            transport = new WebTransport(url)
            
            await transport.ready
            setIsConnected(prev => ({ ...prev, webtransport: true }))
            
            // Create bidirectional streams
            const stream1 = await transport.createBidirectionalStream()
            const stream2 = await transport.createBidirectionalStream()
            
            // Read from streams
            const reader1 = stream1.readable.getReader()
            const reader2 = stream2.readable.getReader()
            
            // Write to streams periodically
            const writer1 = stream1.writable.getWriter()
            const writer2 = stream2.writable.getWriter()
            
            const sendData = async (writer, reader, streamNum) => {
              const value = Math.floor(Math.random() * 100) + (streamNum === 1 ? 1 : 50)
              const data = new TextEncoder().encode(JSON.stringify({ value, timestamp: Date.now() }))
              
              try {
                await writer.write(data)
                
                // Try to read response
                const { done, value: response } = await reader.read()
                if (!done && response) {
                  const decoded = JSON.parse(new TextDecoder().decode(response))
                  setWtData(prev => {
                    const newData = [...prev, {
                      time: Date.now(),
                      value: decoded.value || value,
                      type: `Stream ${streamNum}`
                    }]
                    return newData.slice(-20)
                  })
                }
              } catch (error) {
                console.error(`Stream ${streamNum} error:`, error)
              }
            }
            
            // Send data periodically
            intervals.push(setInterval(() => sendData(writer1, reader1, 1), 1500))
            intervals.push(setInterval(() => sendData(writer2, reader2, 2), 1800))
            
          } catch (error) {
            console.log('WebTransport connection failed, using simulation:', error)
            // Fall back to simulation
            setIsConnected(prev => ({ ...prev, webtransport: true }))
            
            intervals = [
              setInterval(() => {
                setWtData(prev => {
                  const newData = [...prev, {
                    time: Date.now(),
                    value: Math.floor(Math.random() * 100) + 1,
                    type: 'Stream 1'
                  }]
                  return newData.slice(-20)
                })
              }, 1500),
              setInterval(() => {
                setWtData(prev => {
                  const newData = [...prev, {
                    time: Date.now(),
                    value: Math.floor(Math.random() * 100) + 50,
                    type: 'Stream 2'
                  }]
                  return newData.slice(-20)
                })
              }, 1800)
            ]
          }
        }
        
        connectWebTransport()
      } else {
        // Browser doesn't support WebTransport - use simulation
        console.log('WebTransport not supported in this browser, using simulation')
        setIsConnected(prev => ({ ...prev, webtransport: true }))
        
        intervals = [
          setInterval(() => {
            setWtData(prev => {
              const newData = [...prev, {
                time: Date.now(),
                value: Math.floor(Math.random() * 100) + 1,
                type: 'Stream 1'
              }]
              return newData.slice(-20)
            })
          }, 1500),
          setInterval(() => {
            setWtData(prev => {
              const newData = [...prev, {
                time: Date.now(),
                value: Math.floor(Math.random() * 100) + 50,
                type: 'Stream 2'
              }]
              return newData.slice(-20)
            })
          }, 1800)
        ]
      }

      return () => {
        intervals.forEach(interval => clearInterval(interval))
        if (transport) {
          transport.close()
        }
        setIsConnected(prev => ({ ...prev, webtransport: false }))
      }
    }
  }, [selectedProtocol])

  const getCurrentData = () => {
    switch (selectedProtocol) {
      case 'http': return httpData
      case 'websocket': return wsData
      case 'sse': return sseData
      case 'webtransport': {
        // Combine streams for WebTransport visualization
        const stream1 = wtData.filter(item => item.type === 'Stream 1')
        const stream2 = wtData.filter(item => item.type === 'Stream 2')
        const combined = []
        const maxLen = Math.max(stream1.length, stream2.length)
        for (let i = 0; i < maxLen; i++) {
          combined.push({
            time: stream1[i]?.time || stream2[i]?.time || Date.now(),
            stream1: stream1[i]?.value,
            stream2: stream2[i]?.value
          })
        }
        return combined
      }
      default: return []
    }
  }

  const currentProtocol = protocols.find(p => p.id === selectedProtocol)

  return (
    <div className="visualization-tab">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="protocol-selector"
      >
        {protocols.map((protocol) => {
          const Icon = protocol.icon
          return (
            <motion.div
              key={protocol.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ProtocolCard
                protocol={protocol}
                isActive={selectedProtocol === protocol.id}
                isConnected={isConnected[protocol.id]}
                onClick={() => setSelectedProtocol(protocol.id)}
                Icon={Icon}
              />
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="visualization-container"
      >
        <div className="chart-header">
          <h2 style={{ background: currentProtocol.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {currentProtocol.name} Visualization
          </h2>
          <div className={`status-indicator ${isConnected[selectedProtocol] ? 'connected' : 'disconnected'}`}>
            <span className="status-dot"></span>
            {isConnected[selectedProtocol] ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={getCurrentData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis 
                dataKey="time" 
                stroke="#a0aec0"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis stroke="#a0aec0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a2332',
                  border: `1px solid ${currentProtocol.color}`,
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
                labelFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <Legend />
              {selectedProtocol === 'webtransport' ? (
                <>
                  <Line
                    type="monotone"
                    dataKey="stream1"
                    stroke={currentProtocol.color}
                    strokeWidth={3}
                    dot={{ fill: currentProtocol.color, r: 5 }}
                    activeDot={{ r: 8 }}
                    name="Stream 1"
                  />
                  <Line
                    type="monotone"
                    dataKey="stream2"
                    stroke="#43e97b"
                    strokeWidth={3}
                    dot={{ fill: "#43e97b", r: 5 }}
                    activeDot={{ r: 8 }}
                    name="Stream 2"
                  />
                </>
              ) : (
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={currentProtocol.color}
                  strokeWidth={3}
                  dot={{ fill: currentProtocol.color, r: 5 }}
                  activeDot={{ r: 8 }}
                  name="Data Flow"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <ProtocolDiagram protocol={selectedProtocol} isConnected={isConnected[selectedProtocol]} />
        
        {selectedProtocol === 'webtransport' && (
          <WebTransportInfo 
            isSupported={'WebTransport' in window}
            isConnected={isConnected.webtransport}
          />
        )}
      </motion.div>
    </div>
  )
}

function ProtocolDiagram({ protocol, isConnected }) {
  const getDiagramContent = () => {
    switch (protocol) {
      case 'http':
        return (
          <div className="diagram http-diagram">
            <div className="diagram-client">
              <div className="diagram-box">Client</div>
            </div>
            <div className="diagram-connection">
              <motion.div
                key="request"
                initial={{ x: -100, opacity: 0 }}
                animate={{ 
                  x: [0, 300, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
                className="arrow request"
              >
                → GET /api/poll
              </motion.div>
              <motion.div
                key="response"
                initial={{ x: 300, opacity: 0 }}
                animate={{ 
                  x: [300, 0, 300],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1,
                  repeatDelay: 1
                }}
                className="arrow response"
              >
                ← Response
              </motion.div>
            </div>
            <div className="diagram-server">
              <div className="diagram-box">Server</div>
            </div>
          </div>
        )
      case 'websocket':
        return (
          <div className="diagram websocket-diagram">
            <div className="diagram-client">
              <div className="diagram-box">Client</div>
            </div>
            <div className="diagram-connection">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="bidirectional-arrow"
              >
                ↔ WebSocket Connection
              </motion.div>
              <motion.div
                animate={{ x: [0, 200, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="arrow both"
              >
                ←→ Bidirectional
              </motion.div>
            </div>
            <div className="diagram-server">
              <div className="diagram-box">Server</div>
            </div>
          </div>
        )
      case 'sse':
        return (
          <div className="diagram sse-diagram">
            <div className="diagram-client">
              <div className="diagram-box">Client</div>
            </div>
            <div className="diagram-connection">
              <motion.div
                animate={{ x: [200, 0, 200] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="arrow unidirectional"
              >
                ← Server Push
              </motion.div>
            </div>
            <div className="diagram-server">
              <div className="diagram-box">Server</div>
            </div>
          </div>
        )
      case 'webtransport':
        return (
          <div className="diagram webtransport-diagram">
            <div className="diagram-client">
              <div className="diagram-box">Client</div>
            </div>
            <div className="diagram-connection">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="multiplexed-connection"
              >
                ⚡ Multiplexed Streams
              </motion.div>
              <motion.div
                animate={{ x: [0, 200, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="arrow both"
              >
                ←→ Multiple Channels
              </motion.div>
            </div>
            <div className="diagram-server">
              <div className="diagram-box">Server</div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="protocol-diagram"
    >
      <h3>Protocol Flow Diagram</h3>
      {getDiagramContent()}
    </motion.div>
  )
}

export default VisualizationTab
