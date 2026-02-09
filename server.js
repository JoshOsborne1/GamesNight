/**
 * Game Night Controller - WebSocket Server
 * Handles real-time synchronization between Host (mobile) and Display (TV)
 * across different devices on the same network.
 */

import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const PORT = process.env.WEBSOCKET_PORT || 3001;

// Store connected clients with their roles
const clients = new Map(); // ws -> { role: 'host' | 'display', id: string }

// Current game state (managed by host)
let gameState = {
  mode: 'menu',
  currentItem: null,
  revealed: false,
  players: [],
  scores: {},
  settings: {}
};

// Create HTTP server
const server = createServer((req, res) => {
  // Health check endpoint
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', clients: clients.size }));
    return;
  }
  
  res.writeHead(404);
  res.end();
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Generate unique client ID
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Broadcast to all clients except sender
function broadcast(message, excludeWs = null) {
  const data = JSON.stringify(message);
  wss.clients.forEach(client => {
    if (client !== excludeWs && client.readyState === 1) {
      client.send(data);
    }
  });
}

// Broadcast to specific role
function broadcastToRole(message, role) {
  const data = JSON.stringify(message);
  wss.clients.forEach(client => {
    const clientInfo = clients.get(client);
    if (clientInfo?.role === role && client.readyState === 1) {
      client.send(data);
    }
  });
}

// Handle new connection
wss.on('connection', (ws) => {
  const clientId = generateId();
  clients.set(ws, { id: clientId, role: null });
  
  console.log(`[WS] Client connected: ${clientId}`);
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'CONNECTED',
    clientId,
    timestamp: Date.now()
  }));
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      handleMessage(ws, message);
    } catch (error) {
      console.error('[WS] Failed to parse message:', error);
    }
  });
  
  ws.on('close', () => {
    const clientInfo = clients.get(ws);
    console.log(`[WS] Client disconnected: ${clientInfo?.id} (${clientInfo?.role})`);
    clients.delete(ws);
    
    // Notify other clients about disconnection
    broadcast({
      type: 'CLIENT_DISCONNECTED',
      clientId: clientInfo?.id,
      role: clientInfo?.role
    });
  });
  
  ws.on('error', (error) => {
    console.error('[WS] WebSocket error:', error);
  });
});

// Handle incoming messages
function handleMessage(ws, message) {
  const clientInfo = clients.get(ws);
  
  switch (message.type) {
    case 'IDENTIFY':
      // Client identifies itself as host or display
      clientInfo.role = message.role;
      console.log(`[WS] Client ${clientInfo.id} identified as ${message.role}`);
      
      // Notify others
      broadcast({
        type: 'CLIENT_JOINED',
        clientId: clientInfo.id,
        role: message.role
      }, ws);
      
      // If display connects, send current state
      if (message.role === 'display' && gameState.mode !== 'menu') {
        ws.send(JSON.stringify({
          type: 'STATE_UPDATE',
          state: gameState,
          timestamp: Date.now()
        }));
      }
      break;
      
    case 'STATE_UPDATE':
      // Host updates game state
      if (clientInfo?.role === 'host') {
        gameState = { ...gameState, ...message.state };
        broadcast({
          type: 'STATE_UPDATE',
          state: gameState,
          source: 'host',
          timestamp: Date.now()
        });
      }
      break;
      
    case 'SYNC_REQUEST':
      // Display requests current state
      ws.send(JSON.stringify({
        type: 'STATE_UPDATE',
        state: gameState,
        source: 'sync',
        timestamp: Date.now()
      }));
      break;
      
    case 'PING':
      ws.send(JSON.stringify({ type: 'PONG', timestamp: Date.now() }));
      break;
      
    default:
      console.log(`[WS] Unknown message type: ${message.type}`);
  }
}

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[WS] Game Night Controller WebSocket server running on port ${PORT}`);
  console.log(`[WS] Connect from clients using: ws://<server-ip>:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[WS] Shutting down...');
  wss.clients.forEach(client => client.close());
  server.close(() => {
    console.log('[WS] Server closed');
    process.exit(0);
  });
});
