import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react'
import './WebTransportInfo.css'

function WebTransportInfo({ isSupported, isConnected }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="webtransport-info"
    >
      <div className="info-header">
        {isSupported ? (
          <CheckCircle className="icon success" size={24} />
        ) : (
          <AlertCircle className="icon warning" size={24} />
        )}
        <h3>WebTransport Setup Guide</h3>
      </div>

      <div className="info-content">
        {!isSupported && (
          <div className="info-section">
            <h4>Browser Support</h4>
            <p>WebTransport requires a supported browser:</p>
            <ul>
              <li>✅ Chrome 97+</li>
              <li>✅ Edge 98+</li>
              <li>✅ Firefox 114+</li>
              <li>❌ Safari (not yet supported)</li>
            </ul>
            <p className="note">Currently showing a simulation of WebTransport behavior.</p>
          </div>
        )}

        {isSupported && (
          <div className="info-section">
            <h4>Real WebTransport Demo</h4>
            <p>
              This demo attempts to connect to a public WebTransport echo server. 
              For a full production setup, you need an HTTP/3/QUIC server.
            </p>
            
            <div className="setup-options">
              <h5>Option 1: Use Public Echo Server</h5>
              <p>Connect to: <code>https://webtransport.day/webtransport</code></p>
              <a 
                href="https://webtransport.day" 
                target="_blank" 
                rel="noopener noreferrer"
                className="external-link"
              >
                Visit WebTransport Day <ExternalLink size={16} />
              </a>
            </div>

            <div className="setup-options">
              <h5>Option 2: Set Up Your Own Server</h5>
              <p>WebTransport requires HTTP/3/QUIC. Options include:</p>
              <ul>
                <li>
                  <strong>Node.js:</strong> Use experimental QUIC support or libraries like 
                  <code>@fails-components/webtransport</code>
                </li>
                <li>
                  <strong>Go:</strong> Use the <code>webtransport-go</code> library
                </li>
                <li>
                  <strong>Python:</strong> Use <code>aioquic</code> for HTTP/3 support
                </li>
              </ul>
              <a 
                href="https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API" 
                target="_blank" 
                rel="noopener noreferrer"
                className="external-link"
              >
                Read WebTransport Docs <ExternalLink size={16} />
              </a>
            </div>

            <div className="setup-options">
              <h5>Quick Test Server (Go Example)</h5>
              <pre className="code-block">
{`package main

import (
    "github.com/quic-go/webtransport-go"
    "net/http"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/webtransport", func(w http.ResponseWriter, r *http.Request) {
        session := r.Body.(*webtransport.Session)
        // Handle WebTransport session
    })
    
    server := &webtransport.Server{
        H3: http3.Server{Handler: mux},
    }
    server.ListenAndServe(":4433")
}`}
              </pre>
            </div>
          </div>
        )}

        <div className="info-section">
          <h4>What WebTransport Offers</h4>
          <ul className="features">
            <li>✅ Multiple bidirectional streams</li>
            <li>✅ Unidirectional streams</li>
            <li>✅ Low latency (QUIC-based)</li>
            <li>✅ Built-in encryption</li>
            <li>✅ Connection migration</li>
            <li>✅ No head-of-line blocking</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default WebTransportInfo
