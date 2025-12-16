#!/bin/bash

# Health Check & Monitoring Script
# Checks the health of the application and reports status

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
APP_URL="${APP_URL:-http://localhost:5000}"
HEALTH_ENDPOINT="${APP_URL}/api/health"

print_status() {
    local status=$1
    local message=$2
    
    if [ "$status" = "ok" ]; then
        echo -e "${GREEN}✅ $message${NC}"
    elif [ "$status" = "warn" ]; then
        echo -e "${YELLOW}⚠️  $message${NC}"
    else
        echo -e "${RED}❌ $message${NC}"
    fi
}

echo "🏥 Health Check for Raudhatul Athfal School Website"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Check if service is running
echo "Checking systemd service..."
if systemctl is-active --quiet ra-school; then
    print_status "ok" "Service is running"
else
    print_status "error" "Service is not running"
    echo ""
    echo "Start the service with: sudo systemctl start ra-school"
    exit 1
fi
echo ""

# 2. Check if port is listening
echo "Checking port availability..."
if command -v lsof &> /dev/null; then
    if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        print_status "ok" "Port 5000 is listening"
    else
        print_status "error" "Port 5000 is not listening"
    fi
else
    print_status "warn" "lsof not installed, skipping port check"
fi
echo ""

# 3. Check HTTP response
echo "Checking HTTP response..."
if command -v curl &> /dev/null; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL 2>/dev/null || echo "000")
    
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "304" ]; then
        print_status "ok" "Application responds with HTTP $HTTP_CODE"
    elif [ "$HTTP_CODE" = "000" ]; then
        print_status "error" "Cannot connect to application"
    else
        print_status "warn" "Application responds with HTTP $HTTP_CODE"
    fi
else
    print_status "warn" "curl not installed, skipping HTTP check"
fi
echo ""

# 4. Check health endpoint
echo "Checking health endpoint..."
if command -v curl &> /dev/null && command -v jq &> /dev/null; then
    HEALTH_RESPONSE=$(curl -s $HEALTH_ENDPOINT 2>/dev/null)
    
    if [ -n "$HEALTH_RESPONSE" ]; then
        STATUS=$(echo $HEALTH_RESPONSE | jq -r '.status' 2>/dev/null || echo "unknown")
        DATABASE=$(echo $HEALTH_RESPONSE | jq -r '.database' 2>/dev/null || echo "unknown")
        UPTIME=$(echo $HEALTH_RESPONSE | jq -r '.uptime' 2>/dev/null || echo "0")
        
        if [ "$STATUS" = "healthy" ]; then
            print_status "ok" "Application status: $STATUS"
            print_status "ok" "Database status: $DATABASE"
            
            # Convert uptime to human readable
            UPTIME_INT=${UPTIME%.*}
            HOURS=$((UPTIME_INT / 3600))
            MINUTES=$(((UPTIME_INT % 3600) / 60))
            echo -e "   Uptime: ${HOURS}h ${MINUTES}m"
        else
            print_status "error" "Application status: $STATUS"
            print_status "error" "Database status: $DATABASE"
        fi
    else
        print_status "error" "Health endpoint not responding"
    fi
elif ! command -v jq &> /dev/null; then
    print_status "warn" "jq not installed, skipping health endpoint check"
    echo "   Install jq for detailed health checks: sudo apt-get install jq"
fi
echo ""

# Check database connectivity
echo "Checking database connectivity..."
if command -v psql &> /dev/null; then
    # Try to read DB credentials from .env if available
    if [ -f ".env" ]; then
        # Safely extract DATABASE_URL without executing arbitrary code
        DATABASE_URL=$(grep -E '^DATABASE_URL=' .env | head -1 | cut -d= -f2- | sed 's/^["'"'"']//' | sed 's/["'"'"']$//')
        
        if [ -n "$DATABASE_URL" ]; then
            if psql "$DATABASE_URL" -c "SELECT 1;" >/dev/null 2>&1; then
                print_status "ok" "Database connection successful"
            else
                print_status "error" "Database connection failed"
            fi
        else
            print_status "warn" "DATABASE_URL not found in .env"
        fi
    else
        print_status "warn" ".env file not found, skipping direct DB check"
    fi
else
    print_status "warn" "psql not installed, skipping database check"
fi
echo ""

# 6. Check disk space
echo "Checking disk space..."
DISK_USAGE=$(df -h / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    print_status "ok" "Disk usage: ${DISK_USAGE}%"
elif [ "$DISK_USAGE" -lt 90 ]; then
    print_status "warn" "Disk usage: ${DISK_USAGE}% (consider cleanup)"
else
    print_status "error" "Disk usage: ${DISK_USAGE}% (critical - cleanup needed)"
fi
echo ""

# 7. Check memory usage
echo "Checking memory usage..."
if command -v free &> /dev/null; then
    MEM_USAGE=$(free | grep Mem | awk '{printf("%.0f", $3/$2 * 100)}')
    if [ "$MEM_USAGE" -lt 80 ]; then
        print_status "ok" "Memory usage: ${MEM_USAGE}%"
    elif [ "$MEM_USAGE" -lt 90 ]; then
        print_status "warn" "Memory usage: ${MEM_USAGE}%"
    else
        print_status "error" "Memory usage: ${MEM_USAGE}% (high)"
    fi
else
    print_status "warn" "Cannot check memory usage"
fi
echo ""

# 8. Check recent errors in logs
echo "Checking recent errors in logs..."
if command -v journalctl &> /dev/null; then
    ERROR_COUNT=$(sudo journalctl -u ra-school --since "5 minutes ago" -p err --no-pager 2>/dev/null | grep -c "." || echo "0")
    
    if [ "$ERROR_COUNT" -eq 0 ]; then
        print_status "ok" "No errors in last 5 minutes"
    else
        print_status "warn" "$ERROR_COUNT error(s) in last 5 minutes"
        echo "   View errors: deployment/logs.sh --errors"
    fi
else
    print_status "warn" "Cannot check logs"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Health check completed"
echo ""
echo "For continuous monitoring:"
echo "  • View logs: deployment/logs.sh --follow"
echo "  • Check service: sudo systemctl status ra-school"
echo "  • Monitor resources: htop or top"
echo ""
