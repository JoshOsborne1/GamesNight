#!/bin/bash
# Stop the Game Night Controller WebSocket Server
# Usage: ./stop-ws.sh

set -e

SERVICE_NAME="game-night-ws"

echo "🛑 Stopping Game Night WebSocket Server..."

# Check if service is running
if ! systemctl is-active --quiet "$SERVICE_NAME"; then
    echo "⚠️  Service is not running."
    exit 0
fi

# Stop the service
systemctl stop "$SERVICE_NAME"

# Wait a moment and check status
sleep 1

if ! systemctl is-active --quiet "$SERVICE_NAME"; then
    echo "✅ Game Night WebSocket Server stopped successfully!"
else
    echo "❌ Failed to stop service. Check status:"
    echo "   systemctl status $SERVICE_NAME"
    exit 1
fi
