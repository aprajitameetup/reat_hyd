import express from 'express'
import { WebSocketServer } from 'ws'
import cors from 'cors'
import { createServer } from 'http'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json())

// HTTP Polling endpoint
app.get('/api/poll', (req, res) => {
  const value = Math.floor(Math.random() * 100) + 1
  const timestamp = Date.now()
  
  res.json({
    value,
    timestamp,
    message: 'HTTP Polling Response'
  })
})

// SSE endpoint
app.get('/sse', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Cache-Control')

  // Send initial connection message
  res.write(`data: ${JSON.stringify({ type: 'connected', message: 'SSE connection established' })}\n\n`)

  // Send data every 2 seconds
  const interval = setInterval(() => {
    const value = Math.floor(Math.random() * 100) + 1
    const data = {
      value,
      timestamp: Date.now(),
      type: 'update'
    }
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }, 2000)

  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval)
    res.end()
  })
})

// WebTransport endpoint (Note: WebTransport requires HTTP/3, this is a placeholder)
app.get('/webtransport', (req, res) => {
  res.json({
    message: 'WebTransport requires HTTP/3 server setup',
    note: 'For production, you need a server with HTTP/3 support (like Node.js with QUIC)'
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})

// Create HTTP server
const server = createServer(app)

// WebSocket Server
const wss = new WebSocketServer({ 
  server,
  path: '/ws'
})

wss.on('connection', (ws, req) => {
  console.log('WebSocket client connected')
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connected',
    message: 'WebSocket connection established'
  }))

  // Send periodic updates
  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      const value = Math.floor(Math.random() * 100) + 1
      ws.send(JSON.stringify({
        type: 'update',
        value,
        timestamp: Date.now()
      }))
    }
  }, 2000)

  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString())
      console.log('Received:', data)
      
      // Echo back with timestamp
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({
          type: 'echo',
          original: data,
          timestamp: Date.now()
        }))
      }
    } catch (error) {
      console.error('Error parsing message:', error)
    }
  })

  // Handle client disconnect
  ws.on('close', () => {
    console.log('WebSocket client disconnected')
    clearInterval(interval)
  })

  ws.on('error', (error) => {
    console.error('WebSocket error:', error)
    clearInterval(interval)
  })
})

// Start server
server.listen(PORT, () => {
  console.log(`
🚀 Protocol Comparison Server Running!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Server: http://localhost:${PORT}
🔌 WebSocket: ws://localhost:${PORT}/ws
📡 SSE: http://localhost:${PORT}/sse
🌐 HTTP Polling: http://localhost:${PORT}/api/poll
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `)
})
