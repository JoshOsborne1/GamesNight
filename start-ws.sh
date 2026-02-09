#!/bin/bash
# Start the Game Night Controller WebSocket Server
# Usage: ./start-ws.sh

set -e

SERVICE_NAME="game-night-ws"
LOG_FILE="/var/log/game-night-ws.log"

echo "🎮 Starting Game Night WebSocket Server..."

# Check if service is already running
if systemctl is-active --quiet "$SERVICE_NAME"; then
    echo "⚠️  Service is already running."
    echo "   Use './stop-ws.sh' to stop it first, or 'systemctl restart $SERVICE_NAME' to restart."
    exit 0
fi

# Make sure log file exists with proper permissions
touch "$LOG_FILE"
chmod 644 "$LOG_FILE"

# Start the service
systemctl start "$SERVICE_NAME"

# Wait a moment and check status
sleep 2

if systemctl is-active --quiet "$SERVICE_NAME"; then
    echo "✅ Game Night WebSocket Server started successfully!"
    echo "   Port: 3002"
    echo "   Log: $LOG_FILE"
    echo ""
    echo "   Check status: systemctl status $SERVICE_NAME"
    echo "   View logs: tail -f $LOG_FILE"
else
    echo "❌ Failed to start service. Check logs:"
    echo "   journalctl -u $SERVICE_NAME -n 20"
    exit 1
fi
