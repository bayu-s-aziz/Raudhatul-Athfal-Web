#!/bin/bash

# Deployment Script for Raudhatul Athfal Al-Islam School Website
# This script automates the deployment process on your VPS
#
# Usage: ./deploy.sh
#
# Prerequisites:
# - Git repository cloned in the correct directory
# - Node.js and npm installed
# - Database configured and migrations run at least once
# - systemd service file configured

set -e

# Configuration (Update these values)
APP_DIR="${APP_DIR:-}"
SERVICE_NAME="ra-school"
BRANCH="${BRANCH:-main}"

# Colors for output (define early)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_info() {
    echo -e "${GREEN}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Try to detect APP_DIR if not set
if [ -z "$APP_DIR" ]; then
    # Get the directory of this script
    SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    # Assume script is in deployment/ subdirectory
    APP_DIR="$(dirname "$SCRIPT_DIR")"
fi

# Verify we're in the right directory
if [ ! -f "$APP_DIR/package.json" ]; then
    print_error "Cannot find package.json. Please set APP_DIR environment variable or run from app directory."
    print_info "Example: APP_DIR=/home/user/web/domain.com/private/app ./deployment/deploy.sh"
    exit 1
fi

cd "$APP_DIR"

# Start deployment
print_info "Starting deployment for Raudhatul Athfal Al-Islam School Website..."
echo ""

# Step 1: Pull latest changes
print_info "Step 1/7: Pulling latest changes from Git..."
if git pull origin $BRANCH; then
    print_success "Successfully pulled latest changes"
else
    print_error "Failed to pull changes from Git"
    exit 1
fi
echo ""

# Step 2: Install dependencies
print_info "Step 2/7: Installing dependencies..."
if npm ci --production=false; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi
echo ""

# Step 3: Build application
print_info "Step 3/7: Building application..."
if npm run build; then
    print_success "Application built successfully"
else
    print_error "Build failed"
    exit 1
fi
echo ""

# Step 4: Run database migrations
print_info "Step 4/7: Running database migrations..."
if npm run db:push; then
    print_success "Database migrations completed"
else
    print_warning "Database migrations may have failed. Please check manually."
fi
echo ""

# Step 5: Test configuration
print_info "Step 5/7: Testing configuration..."
if [ ! -f ".env" ]; then
    print_error ".env file not found!"
    print_info "Please create .env file from .env.example"
    exit 1
fi

if [ ! -f "dist/index.cjs" ]; then
    print_error "dist/index.cjs not found! Build may have failed."
    exit 1
fi

print_success "Configuration test passed"
echo ""

# Step 6: Restart service
print_info "Step 6/7: Restarting service..."
if sudo systemctl restart $SERVICE_NAME; then
    print_success "Service restarted successfully"
    sleep 2
else
    print_error "Failed to restart service"
    print_info "Try manually: sudo systemctl restart $SERVICE_NAME"
    exit 1
fi
echo ""

# Step 7: Check service status
print_info "Step 7/7: Checking service status..."
if sudo systemctl is-active --quiet $SERVICE_NAME; then
    print_success "Service is running!"
    echo ""
    print_info "Service status:"
    sudo systemctl status $SERVICE_NAME --no-pager -l
else
    print_error "Service is not running!"
    print_info "Check logs with: sudo journalctl -u $SERVICE_NAME -n 50"
    exit 1
fi
echo ""

# Success message
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_success "Deployment completed successfully! 🎉"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_info "Next steps:"
echo "  1. Test the website in your browser"
echo "  2. Monitor logs: sudo journalctl -u $SERVICE_NAME -f"
echo "  3. Check application health: curl http://localhost:5000"
echo ""
