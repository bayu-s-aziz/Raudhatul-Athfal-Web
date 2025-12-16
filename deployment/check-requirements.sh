#!/bin/bash

# System Requirements Check Script
# Verifies that the server meets all requirements for deployment

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
PASSED=0
FAILED=0
WARNINGS=0

print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

check_pass() {
    echo -e "${GREEN}✅ $1${NC}"
    ((PASSED++))
}

check_fail() {
    echo -e "${RED}❌ $1${NC}"
    ((FAILED++))
}

check_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS++))
}

# Start checks
clear
print_header "System Requirements Check"
echo ""

# 1. Check OS
print_header "Operating System"
if [ -f /etc/os-release ]; then
    . /etc/os-release
    echo "OS: $NAME $VERSION"
    check_pass "OS information available"
else
    check_warn "Could not determine OS version"
fi
echo ""

# 2. Check Architecture (ARM64 for Oracle Ampere)
print_header "Architecture"
ARCH=$(uname -m)
echo "Architecture: $ARCH"
if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
    check_pass "ARM64 architecture detected (Oracle Ampere compatible)"
elif [ "$ARCH" = "x86_64" ]; then
    check_pass "x86_64 architecture detected (compatible)"
else
    check_warn "Unknown architecture: $ARCH"
fi
echo ""

# 3. Check Node.js
print_header "Node.js"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "Node.js version: $NODE_VERSION"
    
    # Check if version is 20.x or higher
    MAJOR_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$MAJOR_VERSION" -ge 20 ]; then
        check_pass "Node.js 20.x or higher installed"
    else
        check_fail "Node.js version should be 20.x or higher (found: $NODE_VERSION)"
    fi
else
    check_fail "Node.js not found. Install with: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -"
fi
echo ""

# 4. Check npm
print_header "npm"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "npm version: $NPM_VERSION"
    check_pass "npm is installed"
else
    check_fail "npm not found"
fi
echo ""

# 5. Check PostgreSQL
print_header "PostgreSQL"
if command -v psql &> /dev/null; then
    PSQL_VERSION=$(psql --version | awk '{print $3}')
    echo "PostgreSQL version: $PSQL_VERSION"
    check_pass "PostgreSQL client installed"
    
    if systemctl is-active --quiet postgresql 2>/dev/null; then
        check_pass "PostgreSQL service is running"
    else
        check_fail "PostgreSQL service is not running. Start with: sudo systemctl start postgresql"
    fi
else
    check_fail "PostgreSQL not found. Install with: sudo apt-get install postgresql postgresql-contrib"
fi
echo ""

# 6. Check Nginx
print_header "Nginx"
if command -v nginx &> /dev/null; then
    NGINX_VERSION=$(nginx -v 2>&1 | cut -d'/' -f2)
    echo "Nginx version: $NGINX_VERSION"
    check_pass "Nginx is installed"
    
    if systemctl is-active --quiet nginx 2>/dev/null; then
        check_pass "Nginx service is running"
    else
        check_warn "Nginx service is not running"
    fi
else
    check_fail "Nginx not found (usually installed with Hestia)"
fi
echo ""

# 7. Check systemd
print_header "systemd"
if command -v systemctl &> /dev/null; then
    check_pass "systemd is available"
else
    check_fail "systemd not found"
fi
echo ""

# 8. Check required ports
print_header "Port Availability"
for PORT in 80 443 5000 5432 8083; do
    if ! command -v lsof &> /dev/null; then
        check_warn "lsof not installed, skipping port checks"
        break
    fi
    
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        if [ "$PORT" = "5000" ]; then
            check_warn "Port $PORT is in use (this is OK if app is already running)"
        else
            check_pass "Port $PORT is in use (expected for web services)"
        fi
    else
        if [ "$PORT" = "5000" ]; then
            check_pass "Port $PORT is available (ready for application)"
        else
            check_warn "Port $PORT is not in use"
        fi
    fi
done
echo ""

# 9. Check Hestia
print_header "Hestia Control Panel"
if [ -d "/usr/local/hestia" ]; then
    check_pass "Hestia Control Panel directory found"
    
    if command -v v-list-users &> /dev/null; then
        check_pass "Hestia CLI tools available"
    else
        check_warn "Hestia CLI tools not in PATH"
    fi
else
    check_warn "Hestia Control Panel not detected (not required but recommended)"
fi
echo ""

# 10. Check disk space
print_header "Disk Space"
DISK_AVAIL=$(df -BG / | tail -1 | awk '{print $4}' | sed 's/G//')
echo "Available disk space: ${DISK_AVAIL}GB"
if [ "$DISK_AVAIL" -gt 5 ]; then
    check_pass "Sufficient disk space available"
elif [ "$DISK_AVAIL" -gt 2 ]; then
    check_warn "Limited disk space (${DISK_AVAIL}GB available, recommended: 5GB+)"
else
    check_fail "Insufficient disk space (${DISK_AVAIL}GB available, minimum: 2GB)"
fi
echo ""

# 11. Check memory
print_header "Memory"
MEMORY=$(free -g | awk '/^Mem:/{print $2}')
echo "Total memory: ${MEMORY}GB"
if [ "$MEMORY" -ge 2 ]; then
    check_pass "Sufficient memory available"
elif [ "$MEMORY" -ge 1 ]; then
    check_warn "Limited memory (${MEMORY}GB, recommended: 2GB+)"
else
    check_warn "Low memory (${MEMORY}GB, may need swap)"
fi
echo ""

# 12. Check git
print_header "Git"
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version | awk '{print $3}')
    echo "Git version: $GIT_VERSION"
    check_pass "Git is installed"
else
    check_fail "Git not found. Install with: sudo apt-get install git"
fi
echo ""

# 13. Check firewall
print_header "Firewall"
if command -v ufw &> /dev/null; then
    UFW_STATUS=$(sudo ufw status 2>/dev/null | head -1)
    echo "UFW status: $UFW_STATUS"
    if echo "$UFW_STATUS" | grep -q "inactive"; then
        check_warn "UFW firewall is inactive"
    else
        check_pass "UFW firewall is active"
    fi
else
    check_warn "UFW not found"
fi
echo ""

# Summary
print_header "Summary"
echo ""
echo -e "${GREEN}✅ Passed:   $PASSED${NC}"
echo -e "${YELLOW}⚠️  Warnings: $WARNINGS${NC}"
echo -e "${RED}❌ Failed:   $FAILED${NC}"
echo ""

if [ "$FAILED" -eq 0 ]; then
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}System is ready for deployment! 🎉${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run: sudo deployment/setup.sh"
    echo "  2. Follow the setup wizard"
    echo "  3. Deploy your application"
else
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}Please fix the failed checks before deployment${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    exit 1
fi
