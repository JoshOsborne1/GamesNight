/** Game Night Controller - Sync Manager
 * Handles cross-tab/device communication between Host (controller) and Display (TV)
 *
 * Architecture:
 * - Host (Controller) is the LEADER: owns the state, broadcasts updates
 * - Display (TV) is the FOLLOWER: receives state, view-only
 *
 * Transport Priority:
 * 1. WebSocket (primary) - for cross-device sync
 * 2. BroadcastChannel (fallback) - for same-browser tab sync
 */

const CHANNEL_NAME = 'game-night-sync';
const SYNC_INTERVAL = 5000; // 5 seconds
const TIMEOUT_MS = 10000; // 10 seconds for sync response
const WS_RECONNECT_DELAY = 3000; // 3 seconds between reconnection attempts
const WS_MAX_RECONNECT_ATTEMPTS = 5;

export const MessageTypes = {
  STATE_UPDATE: 'STATE_UPDATE',
  SYNC_REQUEST: 'SYNC_REQUEST',
  SYNC_RESPONSE: 'SYNC_RESPONSE',
  PING: 'PING',
  PONG: 'PONG',
  LEADER_ANNOUNCE: 'LEADER_ANNOUNCE',
  // WebSocket specific
  REGISTER: 'register',
  CONNECTED: 'CONNECTED',
  REGISTERED: 'REGISTERED',
  PING_REQUEST: 'PING_REQUEST'
};

export const SyncStatus = {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  ERROR: 'ERROR'
};

class SyncManager {
  constructor() {
    // BroadcastChannel properties
    this.channel = null;
    
    // WebSocket properties
    this.wsClient = null;
    this.useWebSocket = false;
    this.wsReconnectAttempts = 0;
    this.wsReconnectTimeout = null;
    this.role = 'follower'; // Store role for reconnection
    
    // Common properties
    this.isLeader = false;
    this.status = SyncStatus.DISCONNECTED;
    this.statusListeners = [];
    this.stateListeners = [];
    this.syncRequestListeners = []; // Listeners for when follower requests sync
    this.leaderId = null;
    this.tabId = `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.lastPing = 0;
    this.pingInterval = null;
    this.syncTimeout = null;
  }

  /**
   * Auto-detect WebSocket URL
   * Priority: VITE_WS_URL env var > derived from current location
   */
  getWebSocketUrl() {
    // Check for environment variable first
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WS_URL) {
      return import.meta.env.VITE_WS_URL;
    }
    
    // Fallback to derived URL
    if (typeof window === 'undefined') return null;
    
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const hostname = window.location.hostname;
    const port = protocol === 'wss:' ? '' : ':3001'; // Use port 3001 for ws, default for wss
    
    return `${protocol}//${hostname}${port}`;
  }

  /**
   * Initialize WebSocket connection
   * Returns true if WebSocket connection is attempted
   */
  connectWebSocket() {
    const wsUrl = this.getWebSocketUrl();
    
    if (!wsUrl) {
      console.log('[Sync] No WebSocket URL available, using BroadcastChannel');
      return false;
    }

    try {
      console.log(`[Sync] Connecting to WebSocket: ${wsUrl}`);
      this.wsClient = new WebSocket(wsUrl);
      
      this.wsClient.onopen = () => {
        console.log('[Sync] WebSocket connected');
        this.wsReconnectAttempts = 0;
        
        // Register with the server
        this.wsClient.send(JSON.stringify({
          type: MessageTypes.REGISTER,
          role: this.isLeader ? 'host' : 'display',
          clientId: this.tabId
        }));
      };

      this.wsClient.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleWebSocketMessage(message);
        } catch (error) {
          console.error('[Sync] Failed to parse WebSocket message:', error);
        }
      };

      this.wsClient.onclose = (event) => {
        console.log(`[Sync] WebSocket closed: code=${event.code}, reason=${event.reason}`);
        this.useWebSocket = false;
        this.wsClient = null;
        
        // Attempt reconnection if not intentionally closed
        if (event.code !== 1000) {
          this.scheduleWebSocketReconnect();
        }
        
        // Update status if we were using WebSocket
        if (this.useWebSocket) {
          this.setStatus(SyncStatus.DISCONNECTED);
        }
      };

      this.wsClient.onerror = (error) => {
        console.error('[Sync] WebSocket error:', error);
        // Don't set status here - onclose will handle cleanup
      };

      return true;
    } catch (error) {
      console.error('[Sync] Failed to create WebSocket:', error);
      return false;
    }
  }

  /**
   * Schedule WebSocket reconnection with exponential backoff
   */
  scheduleWebSocketReconnect() {
    if (this.wsReconnectAttempts >= WS_MAX_RECONNECT_ATTEMPTS) {
      console.log('[Sync] Max WebSocket reconnection attempts reached');
      return;
    }

    const delay = WS_RECONNECT_DELAY * Math.pow(1.5, this.wsReconnectAttempts);
    this.wsReconnectAttempts++;

    console.log(`[Sync] Scheduling WebSocket reconnect in ${delay}ms (attempt ${this.wsReconnectAttempts})`);
    
    clearTimeout(this.wsReconnectTimeout);
    this.wsReconnectTimeout = setTimeout(() => {
      if (!this.wsClient || this.wsClient.readyState === WebSocket.CLOSED) {
        this.connectWebSocket();
      }
    }, delay);
  }

  /**
   * Handle WebSocket-specific messages
   */
  handleWebSocketMessage(message) {
    // Ignore our own messages
    if (message.clientId === this.tabId) return;

    switch (message.type) {
      case MessageTypes.CONNECTED:
        console.log('[Sync] WebSocket server confirmed connection');
        break;

      case MessageTypes.REGISTERED:
        console.log('[Sync] WebSocket registration confirmed');
        this.useWebSocket = true;
        this.setStatus(SyncStatus.CONNECTED);
        
        // If follower, request sync
        if (!this.isLeader) {
          this.requestSync();
        }
        break;

      case MessageTypes.STATE_UPDATE:
        if (!this.isLeader) {
          console.log('[Sync] Follower received state update via WebSocket');
          this.notifyStateListeners(message.state, message.source || 'websocket');
        }
        break;

      case MessageTypes.PING_REQUEST:
        // Server requests ping response
        if (this.wsClient && this.wsClient.readyState === WebSocket.OPEN) {
          this.wsClient.send(JSON.stringify({
            type: MessageTypes.PING,
            clientId: this.tabId
          }));
        }
        break;

      case MessageTypes.SYNC_REQUEST:
        if (this.isLeader) {
          console.log('[Sync] Leader received sync request via WebSocket');
          this.notifySyncRequestListeners(message.requestFullState);
        }
        break;

      case MessageTypes.SYNC_RESPONSE:
        if (!this.isLeader) {
          console.log('[Sync] Follower received sync response via WebSocket');
          this.setStatus(SyncStatus.CONNECTED);
          this.leaderId = message.leaderId;
          if (message.state) {
            this.notifyStateListeners(message.state, 'sync');
          }
        }
        break;

      case MessageTypes.LEADER_ANNOUNCE:
        if (!this.isLeader) {
          console.log('[Sync] Follower detected leader announcement via WebSocket');
          this.leaderId = message.tabId || message.clientId;
          this.setStatus(SyncStatus.CONNECTED);
          this.requestSync();
        }
        break;

      default:
        // Pass through to common handler
        this.handleMessage(message);
    }
  }

  // Initialize the sync manager
  init(role = 'follower') {
    this.role = role;
    this.isLeader = role === 'leader';

    // Try WebSocket first
    const wsAttempted = this.connectWebSocket();

    // Initialize BroadcastChannel as fallback/backup
    this.initBroadcastChannel();

    // Wait briefly for WebSocket to connect before determining primary transport
    if (wsAttempted) {
      this.setStatus(SyncStatus.CONNECTING);
      
      // Give WebSocket 2 seconds to connect, then check status
      setTimeout(() => {
        if (!this.useWebSocket && this.channel) {
          console.log('[Sync] WebSocket not available, using BroadcastChannel as primary');
          if (this.isLeader) {
            this.setStatus(SyncStatus.CONNECTED);
          }
        }
      }, 2000);
    }

    // Start heartbeat
    this.startHeartbeat();

    console.log(`[Sync] Initialized as ${role} (${this.tabId})`);
    return true;
  }

  /**
   * Initialize BroadcastChannel (fallback transport)
   */
  initBroadcastChannel() {
    if (typeof window === 'undefined' || !window.BroadcastChannel) {
      console.warn('[Sync] BroadcastChannel not supported');
      return false;
    }

    try {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      
      this.channel.onmessage = (event) => {
        // Only handle if not using WebSocket
        if (!this.useWebSocket) {
          this.handleMessage(event.data);
        }
      };
      
      this.channel.onmessageerror = (error) => {
        console.error('[Sync] BroadcastChannel message error:', error);
        if (!this.useWebSocket) {
          this.setStatus(SyncStatus.ERROR);
        }
      };

      if (!this.useWebSocket) {
        this.setStatus(SyncStatus.CONNECTING);

        if (this.isLeader) {
          // Leader announces itself
          this.broadcastChannel({
            type: MessageTypes.LEADER_ANNOUNCE,
            tabId: this.tabId,
            timestamp: Date.now()
          });
          console.log('[Sync] LEADER initialized and announced (BroadcastChannel)');
        } else {
          // Follower requests initial sync
          this.requestSync();
          console.log('[Sync] FOLLOWER initialized, requesting sync (BroadcastChannel)...');
        }
      }

      return true;
    } catch (error) {
      console.error('[Sync] Failed to initialize BroadcastChannel:', error);
      return false;
    }
  }

  // Handle incoming BroadcastChannel messages
  handleMessage(message) {
    if (!message || message.tabId === this.tabId) return;

    switch (message.type) {
      case MessageTypes.STATE_UPDATE:
        if (!this.isLeader) {
          console.log('[Sync] Follower received state update');
          this.notifyStateListeners(message.state, message.source);
        }
        break;

      case MessageTypes.SYNC_REQUEST:
        if (this.isLeader) {
          console.log('[Sync] Leader received sync request, notifying listeners');
          this.notifySyncRequestListeners(message.requestFullState);
        }
        break;

      case MessageTypes.SYNC_RESPONSE:
        if (!this.isLeader) {
          console.log('[Sync] Follower received sync response');
          this.setStatus(SyncStatus.CONNECTED);
          this.leaderId = message.leaderId;
          if (message.state) {
            this.notifyStateListeners(message.state, 'sync');
          }
        }
        break;

      case MessageTypes.LEADER_ANNOUNCE:
        if (!this.isLeader) {
          console.log('[Sync] Follower detected leader announcement');
          this.leaderId = message.tabId;
          this.setStatus(SyncStatus.CONNECTED);
          this.requestSync();
        }
        break;

      case MessageTypes.PING:
        if (this.isLeader) {
          this.broadcastChannel({
            type: MessageTypes.PONG,
            timestamp: Date.now()
          });
        }
        break;

      case MessageTypes.PONG:
        if (!this.isLeader) {
          this.lastPing = Date.now();
          this.setStatus(SyncStatus.CONNECTED);
        }
        break;
    }
  }

  // Broadcast via BroadcastChannel only
  broadcastChannel(message) {
    if (this.channel) {
      this.channel.postMessage({
        ...message,
        tabId: this.tabId,
        timestamp: Date.now()
      });
    }
  }

  // Broadcast via WebSocket only
  broadcastWebSocket(message) {
    if (this.wsClient && this.wsClient.readyState === WebSocket.OPEN) {
      this.wsClient.send(JSON.stringify({
        ...message,
        clientId: this.tabId,
        timestamp: Date.now()
      }));
    }
  }

  // Broadcast a message using the active transport (WebSocket preferred)
  broadcast(message) {
    if (this.useWebSocket && this.wsClient && this.wsClient.readyState === WebSocket.OPEN) {
      this.broadcastWebSocket(message);
    } else {
      this.broadcastChannel(message);
    }
  }

  // Leader broadcasts state update
  broadcastState(state) {
    if (this.isLeader) {
      const message = {
        type: MessageTypes.STATE_UPDATE,
        state,
        source: 'leader'
      };
      
      // Always send via both channels if available (for reliability)
      if (this.wsClient && this.wsClient.readyState === WebSocket.OPEN) {
        this.broadcastWebSocket(message);
      }
      if (this.channel) {
        this.broadcastChannel(message);
      }
    }
  }

  // Follower requests sync from leader
  requestSync(requestFullState = true) {
    console.log('[Sync] Requesting sync...');
    
    if (!this.useWebSocket) {
      this.setStatus(SyncStatus.CONNECTING);
    }
    
    const message = {
      type: MessageTypes.SYNC_REQUEST,
      requestFullState,
      timestamp: Date.now()
    };
    
    // Try both channels
    this.broadcast(message);

    // Set timeout for sync response
    clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(() => {
      if (this.status !== SyncStatus.CONNECTED) {
        this.setStatus(SyncStatus.DISCONNECTED);
      }
    }, TIMEOUT_MS);
  }

  // Start heartbeat to detect disconnections
  startHeartbeat() {
    clearInterval(this.pingInterval);
    this.pingInterval = setInterval(() => {
      if (!this.isLeader) {
        // Follower pings leader
        this.broadcast({ type: MessageTypes.PING });
        
        // Check if we've missed too many pings (only for BroadcastChannel)
        if (!this.useWebSocket && this.lastPing > 0 && Date.now() - this.lastPing > TIMEOUT_MS * 2) {
          this.setStatus(SyncStatus.DISCONNECTED);
          this.requestSync();
        }
      }
      
      // WebSocket ping is handled by PING_REQUEST from server
    }, SYNC_INTERVAL);
  }

  // Subscribe to status changes
  onStatusChange(callback) {
    this.statusListeners.push(callback);
    // Immediately call with current status
    callback(this.status);
    return () => {
      this.statusListeners = this.statusListeners.filter(cb => cb !== callback);
    };
  }

  // Subscribe to state updates (for followers)
  onStateUpdate(callback) {
    this.stateListeners.push(callback);
    return () => {
      this.stateListeners = this.stateListeners.filter(cb => cb !== callback);
    };
  }

  // Subscribe to sync requests (for leaders)
  onSyncRequest(callback) {
    this.syncRequestListeners.push(callback);
    return () => {
      this.syncRequestListeners = this.syncRequestListeners.filter(cb => cb !== callback);
    };
  }

  // Notify sync request listeners
  notifySyncRequestListeners(requestFullState) {
    this.syncRequestListeners.forEach(cb => cb(requestFullState));
  }

  // Notify state listeners
  notifyStateListeners(state, source) {
    this.stateListeners.forEach(cb => cb(state, source));
  }

  // Update status and notify listeners
  setStatus(status) {
    if (this.status !== status) {
      this.status = status;
      this.statusListeners.forEach(cb => cb(status));
    }
  }

  // Check if connected
  isConnected() {
    return this.status === SyncStatus.CONNECTED;
  }

  // Check if using WebSocket
  isUsingWebSocket() {
    return this.useWebSocket;
  }

  // Force reconnection (useful after network changes)
  reconnect() {
    // Close existing WebSocket
    if (this.wsClient) {
      this.wsClient.close(1000, 'Reconnecting');
      this.wsClient = null;
    }
    
    this.useWebSocket = false;
    this.wsReconnectAttempts = 0;
    
    // Attempt reconnection
    this.connectWebSocket();
  }

  // Cleanup
  destroy() {
    clearInterval(this.pingInterval);
    clearTimeout(this.syncTimeout);
    clearTimeout(this.wsReconnectTimeout);
    
    // Close WebSocket
    if (this.wsClient) {
      this.wsClient.close(1000, 'Shutting down');
      this.wsClient = null;
    }
    
    // Close BroadcastChannel
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
    
    this.useWebSocket = false;
    this.statusListeners = [];
    this.stateListeners = [];
    this.syncRequestListeners = [];
    this.setStatus(SyncStatus.DISCONNECTED);
  }
}

// Singleton instance
const syncManager = new SyncManager();

export default syncManager;
export { SyncManager };
