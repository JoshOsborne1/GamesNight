/**
 * Game Night Controller - WebSocket Sync Client
 * Handles real-time synchronization with remote WebSocket server
 * Use this for production deployment where Host and Display are on different devices
 */

const RECONNECT_DELAY = 2000;
const MAX_RECONNECT_DELAY = 30000;

export const MessageTypes = {
  CONNECTED: 'CONNECTED',
  STATE_UPDATE: 'STATE_UPDATE',
  SYNC_REQUEST: 'SYNC_REQUEST',
  CLIENT_JOINED: 'CLIENT_JOINED',
  CLIENT_DISCONNECTED: 'CLIENT_DISCONNECTED',
  PING: 'PING',
  PONG: 'PONG'
};

export const SyncStatus = {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  ERROR: 'ERROR'
};

class WebSocketSyncManager {
  constructor() {
    this.ws = null;
    this.isLeader = false;
    this.status = SyncStatus.DISCONNECTED;
    this.statusListeners = [];
    this.stateListeners = [];
    this.clientId = null;
    this.reconnectAttempts = 0;
    this.reconnectTimeout = null;
    this.wsUrl = null;
  }

  /**
   * Initialize WebSocket connection
   * @param {string} role - 'leader' (host) or 'follower' (display)
   * @param {string} wsUrl - WebSocket server URL (default: from env)
   */
  init(role = 'follower', wsUrl = null) {
    this.isLeader = role === 'leader';
    this.wsUrl = wsUrl || import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
    
    this.connect();
    
    console.log(`[WS-Sync] Initializing as ${role}, connecting to ${this.wsUrl}`);
    return true;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    this.setStatus(SyncStatus.CONNECTING);

    try {
      this.ws = new WebSocket(this.wsUrl);
      
      this.ws.onopen = () => {
        console.log('[WS-Sync] Connected to server');
        this.reconnectAttempts = 0;
        this.setStatus(SyncStatus.CONNECTING);
        
        // Identify ourselves to the server
        this.send({
          type: 'IDENTIFY',
          role: this.isLeader ? 'host' : 'display'
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('[WS-Sync] Failed to parse message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('[WS-Sync] Disconnected:', event.code, event.reason);
        this.setStatus(SyncStatus.DISCONNECTED);
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('[WS-Sync] WebSocket error:', error);
        this.setStatus(SyncStatus.ERROR);
      };
    } catch (error) {
      console.error('[WS-Sync] Failed to connect:', error);
      this.setStatus(SyncStatus.ERROR);
      this.scheduleReconnect();
    }
  }

  scheduleReconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    const delay = Math.min(
      RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts),
      MAX_RECONNECT_DELAY
    );

    console.log(`[WS-Sync] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts + 1})`);

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  handleMessage(message) {
    switch (message.type) {
      case 'CONNECTED':
        this.clientId = message.clientId;
        console.log(`[WS-Sync] Server assigned ID: ${this.clientId}`);
        break;

      case 'STATE_UPDATE':
        if (!this.isLeader) {
          console.log('[WS-Sync] Received state update');
          this.setStatus(SyncStatus.CONNECTED);
          this.notifyStateListeners(message.state, message.source);
        }
        break;

      case 'CLIENT_JOINED':
        console.log(`[WS-Sync] Client joined: ${message.role}`);
        break;

      case 'CLIENT_DISCONNECTED':
        console.log(`[WS-Sync] Client disconnected: ${message.role}`);
        break;

      case 'PONG':
        // Keepalive response
        break;
    }
  }

  send(message) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        ...message,
        timestamp: Date.now()
      }));
    }
  }

  /**
   * Leader broadcasts state update to all followers
   */
  broadcastState(state) {
    if (this.isLeader) {
      this.send({
        type: 'STATE_UPDATE',
        state
      });
    }
  }

  /**
   * Follower requests current state from leader
   */
  requestSync() {
    this.send({
      type: 'SYNC_REQUEST'
    });
  }

  onStatusChange(callback) {
    this.statusListeners.push(callback);
    callback(this.status);
    return () => {
      this.statusListeners = this.statusListeners.filter(cb => cb !== callback);
    };
  }

  onStateUpdate(callback) {
    this.stateListeners.push(callback);
    return () => {
      this.stateListeners = this.stateListeners.filter(cb => cb !== callback);
    };
  }

  notifyStateListeners(state, source) {
    this.stateListeners.forEach(cb => cb(state, source));
  }

  setStatus(status) {
    if (this.status !== status) {
      this.status = status;
      this.statusListeners.forEach(cb => cb(status));
    }
  }

  isConnected() {
    return this.status === SyncStatus.CONNECTED;
  }

  destroy() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.statusListeners = [];
    this.stateListeners = [];
    this.setStatus(SyncStatus.DISCONNECTED);
  }
}

// Singleton instance
const wsSyncManager = new WebSocketSyncManager();

export default wsSyncManager;
export { WebSocketSyncManager };
