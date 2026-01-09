#!/bin/bash

# Log Viewer Script for Raudhatul Athfal Al-Islam School Website
#
# Usage: ./logs.sh [options]
#
# Options:
#   -f, --follow      Follow log output in real-time
#   -n, --lines NUM   Show last NUM lines (default: 50)
#   -e, --errors      Show only error logs
#   -h, --help        Show this help message

# Default values
LINES=50
FOLLOW=false
ERRORS_ONLY=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -f|--follow)
            FOLLOW=true
            shift
            ;;
        -n|--lines)
            LINES="$2"
            shift 2
            ;;
        -e|--errors)
            ERRORS_ONLY=true
            shift
            ;;
        -h|--help)
            echo "Usage: ./logs.sh [options]"
            echo ""
            echo "Options:"
            echo "  -f, --follow      Follow log output in real-time"
            echo "  -n, --lines NUM   Show last NUM lines (default: 50)"
            echo "  -e, --errors      Show only error logs"
            echo "  -h, --help        Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Service name
SERVICE_NAME="ra-school"

# Check if service exists
if ! systemctl list-unit-files | grep -q "$SERVICE_NAME.service"; then
    echo "❌ Service '$SERVICE_NAME' not found"
    echo "Make sure the service is installed correctly"
    exit 1
fi

# Show service status
echo "📊 Service Status:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
sudo systemctl status "$SERVICE_NAME" --no-pager -l | head -5
echo ""

# Build journalctl command
CMD="sudo journalctl -u $SERVICE_NAME"

if [ "$ERRORS_ONLY" = true ]; then
    CMD="$CMD -p err"
fi

if [ "$FOLLOW" = true ]; then
    echo "📋 Following logs (Press Ctrl+C to stop)..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    $CMD -f
else
    echo "📋 Last $LINES log entries:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    $CMD -n "$LINES" --no-pager
fi
