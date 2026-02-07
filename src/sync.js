/** Game Night Controller - BroadcastChannel Sync Manager
 * Handles cross-tab communication between Host (controller) and Display (TV)
 * 
 * Architecture:
 * - Display is the LEADER: owns the state, accepts commands
 * - Host is the FOLLOWER: sends actions, receives state updates
 */

const CHANNEL_NAME = 'game-night-sync';
const SYNC_INTERVAL = 5000; // 5 seconds
const TIMEOUT_MS = 10000; // 10 seconds for sync response

export const MessageTypes = {
  STATE_UPDATE: 'STATE_UPDATE',
  SYNC_REQUEST: 'SYNC_REQUEST',
  SYNC_RESPONSE: 'SYNC_RESPONSE',
  PING: 'PING',
  PONG: 'PONG',
  LEADER_ANNOUNCE: 'LEADER_ANNOUNCE'
};

export const SyncStatus = {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED',
  ERROR: 'ERROR'
};

class SyncManager {
  constructor() {
    this.channel = null;
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

  // Initialize the BroadcastChannel
  init(role = 'follower') {
    if (typeof window === 'undefined' || !window.BroadcastChannel) {
      console.warn('[Sync] BroadcastChannel not supported');
      this.setStatus(SyncStatus.ERROR);
      return false;
    }

    try {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      this.isLeader = role === 'leader';
      
      this.channel.onmessage = (event) => this.handleMessage(event.data);
      this.channel.onmessageerror = (error) => {
        console.error('[Sync] Message error:', error);
        this.setStatus(SyncStatus.ERROR);
      };

      this.setStatus(SyncStatus.CONNECTING);

      if (this.isLeader) {
        // Leader announces itself
        this.broadcast({
          type: MessageTypes.LEADER_ANNOUNCE,
          tabId: this.tabId,
          timestamp: Date.now()
        });
        this.setStatus(SyncStatus.CONNECTED);
        console.log('[Sync] LEADER initialized and announced');
      } else {
        // Follower requests initial sync
        this.requestSync();
        console.log('[Sync] FOLLOWER initialized, requesting sync...');
      }

      // Start heartbeat
      this.startHeartbeat();

      console.log(`[Sync] Initialized as ${role} (${this.tabId})`);
      return true;
    } catch (error) {
      console.error('[Sync] Failed to initialize:', error);
      this.setStatus(SyncStatus.ERROR);
      return false;
    }
  }

  // Handle incoming messages
  handleMessage(message) {
    if (!message || message.tabId === this.tabId) return;

    switch (message.type) {
      case MessageTypes.STATE_UPDATE:
        if (!this.isLeader) {
          // Follower receives state update from leader
          console.log('[Sync] Follower received state update');
          this.notifyStateListeners(message.state, message.source);
        }
        break;

      case MessageTypes.SYNC_REQUEST:
        if (this.isLeader) {
          // Leader received sync request - notify store to broadcast state
          console.log('[Sync] Leader received sync request, notifying listeners');
          this.notifySyncRequestListeners(message.requestFullState);
        }
        break;

      case MessageTypes.SYNC_RESPONSE:
        if (!this.isLeader) {
          // Follower received sync response
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
          // Request sync when leader announces
          this.requestSync();
        }
        break;

      case MessageTypes.PING:
        if (this.isLeader) {
          this.broadcast({
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

  // Broadcast a message to all tabs
  broadcast(message) {
    if (this.channel) {
      this.channel.postMessage({
        ...message,
        tabId: this.tabId,
        timestamp: Date.now()
      });
    }
  }

  // Leader broadcasts state update
  broadcastState(state) {
    if (this.isLeader && this.channel) {
      this.broadcast({
        type: MessageTypes.STATE_UPDATE,
        state,
        source: 'leader'
      });
    }
  }

  // Follower requests sync from leader
  requestSync(requestFullState = true) {
    console.log('[Sync] Requesting sync...');
    this.setStatus(SyncStatus.CONNECTING);
    this.broadcast({
      type: MessageTypes.SYNC_REQUEST,
      requestFullState,
      timestamp: Date.now()
    });

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
        
        // Check if we've missed too many pings
        if (this.lastPing > 0 && Date.now() - this.lastPing > TIMEOUT_MS * 2) {
          this.setStatus(SyncStatus.DISCONNECTED);
          this.requestSync();
        }
      }
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

  // Cleanup
  destroy() {
    clearInterval(this.pingInterval);
    clearTimeout(this.syncTimeout);
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
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
