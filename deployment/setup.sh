#!/bin/bash

# Initial Setup Script for Raudhatul Athfal Al-Islam School Website
# This script helps with the initial setup on your VPS
#
# Usage: sudo ./setup.sh
#
# This script should be run ONCE during initial setup

set -e

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Welcome message
clear
print_header "Raudhatul Athfal Al-Islam School Website - Setup Script"
echo ""
print_info "This script will help you set up the application on your VPS"
print_warning "Make sure you have:"
echo "  • Hestia Control Panel installed"
echo "  • A user created in Hestia"
echo "  • A domain configured in Hestia"
echo "  • SSH access to the server"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

# Collect user information
print_header "Configuration"
echo ""
read -p "Enter Hestia username: " HESTIA_USER
read -p "Enter domain name: " DOMAIN_NAME
read -p "Enter database name [ra_database]: " DB_NAME
DB_NAME=${DB_NAME:-ra_database}
read -p "Enter database user [ra_user]: " DB_USER
DB_USER=${DB_USER:-ra_user}
read -sp "Enter database password: " DB_PASSWORD
echo ""
echo ""

# Confirm settings
print_info "Configuration Summary:"
echo "  User: $HESTIA_USER"
echo "  Domain: $DOMAIN_NAME"
echo "  Database: $DB_NAME"
echo "  DB User: $DB_USER"
echo ""
read -p "Is this correct? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    print_error "Setup cancelled"
    exit 1
fi
echo ""

# Define paths
APP_DIR="/home/$HESTIA_USER/web/$DOMAIN_NAME/private/app"
NGINX_CONF="/home/$HESTIA_USER/conf/web/$DOMAIN_NAME.nginx.conf_custom"
SERVICE_FILE="/etc/systemd/system/ra-school.service"

# Step 1: Check Node.js
print_header "Step 1/6: Checking Node.js Installation"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js is installed: $NODE_VERSION"
else
    print_warning "Node.js is not installed"
    print_info "Installing Node.js 20.x..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    print_success "Node.js installed successfully"
fi
echo ""

# Step 2: Check PostgreSQL
print_header "Step 2/6: Checking PostgreSQL"
if systemctl is-active --quiet postgresql; then
    print_success "PostgreSQL is running"
else
    print_warning "PostgreSQL is not running"
    systemctl start postgresql
    print_success "PostgreSQL started"
fi
echo ""

# Step 3: Create Database
print_header "Step 3/6: Setting up Database"
print_info "Creating database and user..."

# Check if database already exists
DB_EXISTS=$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" || echo "")

if [ "$DB_EXISTS" = "1" ]; then
    print_warning "Database '$DB_NAME' already exists!"
    read -p "Drop and recreate? This will DELETE all data! (yes/no): " CONFIRM_DROP
    if [ "$CONFIRM_DROP" != "yes" ]; then
        print_info "Keeping existing database. Skipping database creation."
        SKIP_DB_CREATE=true
    fi
fi

if [ "$SKIP_DB_CREATE" != "true" ]; then
    # Create database and user
    sudo -u postgres psql <<EOF
-- Drop if exists
DROP DATABASE IF EXISTS $DB_NAME;
DROP USER IF EXISTS $DB_USER;

-- Create new database and user
CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASSWORD';
CREATE DATABASE $DB_NAME OWNER $DB_USER;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;

-- Connect to database and grant schema permissions
\c $DB_NAME
GRANT ALL ON SCHEMA public TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;
EOF
fi

print_success "Database created successfully"
echo ""

# Step 4: Create systemd service
print_header "Step 4/6: Creating systemd Service"
print_info "Creating service file at: $SERVICE_FILE"

cat > $SERVICE_FILE <<EOF
[Unit]
Description=Raudhatul Athfal Al-Islam School Website
Documentation=https://github.com/bayu-s-aziz/Raudhatul-Athfal-Web
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=simple
User=$HESTIA_USER
Group=$HESTIA_USER
WorkingDirectory=$APP_DIR
Environment="NODE_ENV=production"
EnvironmentFile=$APP_DIR/.env
ExecStart=/usr/bin/node $APP_DIR/dist/index.cjs
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=ra-school

# Security hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$APP_DIR

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable ra-school
print_success "Service created and enabled"
echo ""

# Step 5: Create Nginx configuration
print_header "Step 5/6: Creating Nginx Configuration"
print_info "Creating Nginx config at: $NGINX_CONF"

mkdir -p "$(dirname "$NGINX_CONF")"
cat > $NGINX_CONF <<'EOF'
# Reverse proxy to Node.js application
location / {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_read_timeout 300s;
    proxy_connect_timeout 75s;
}

# Static files optimization
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# API endpoints
location /api {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
EOF

# Restart Nginx through Hestia
if command -v v-restart-web &> /dev/null; then
    /usr/local/hestia/bin/v-restart-web
    print_success "Nginx configuration created and restarted"
else
    nginx -t && systemctl restart nginx
    print_success "Nginx configuration created and restarted"
fi
echo ""

# Step 6: Create .env file template
print_header "Step 6/6: Creating Environment Configuration"

if [ -f "$APP_DIR/.env" ]; then
    print_warning ".env file already exists, skipping..."
else
    # Generate session secret (verify node is available first)
    if command -v node &> /dev/null; then
        SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" 2>/dev/null || echo "CHANGE_ME_$(date +%s)")
    else
        print_warning "Node.js not available, using temporary session secret"
        SESSION_SECRET="CHANGE_ME_$(date +%s)"
    fi
    
    cat > "$APP_DIR/.env" <<EOF
# Node Environment
NODE_ENV=production

# Server Configuration
PORT=5000
HOST=0.0.0.0

# Database Configuration
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME

# Session Secret
SESSION_SECRET=$SESSION_SECRET
EOF

    chown $HESTIA_USER:$HESTIA_USER "$APP_DIR/.env"
    chmod 600 "$APP_DIR/.env"
    
    if [ "$SESSION_SECRET" = "CHANGE_ME_$(date +%s)" ]; then
        print_warning ".env file created with temporary session secret"
        print_info "Generate a secure one later with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    else
        print_success ".env file created"
    fi
fi
echo ""

# Final instructions
print_header "Setup Complete!"
echo ""
print_success "Initial setup completed successfully! 🎉"
echo ""
print_info "Next steps:"
echo ""
echo "1. Navigate to the application directory:"
echo "   cd $APP_DIR"
echo ""
echo "2. Install dependencies:"
echo "   npm ci --production=false"
echo ""
echo "3. Build the application:"
echo "   npm run build"
echo ""
echo "4. Run database migrations:"
echo "   npm run db:push"
echo ""
echo "5. Start the service:"
echo "   sudo systemctl start ra-school"
echo ""
echo "6. Check service status:"
echo "   sudo systemctl status ra-school"
echo ""
echo "7. View logs:"
echo "   sudo journalctl -u ra-school -f"
echo ""
echo "8. Enable SSL in Hestia Control Panel:"
echo "   Web → $DOMAIN_NAME → SSL Support → Let's Encrypt"
echo ""
print_warning "Important:"
echo "  • The application directory is: $APP_DIR"
echo "  • Make sure to clone/upload your code there"
echo "  • Database credentials are in: $APP_DIR/.env"
echo "  • Service name: ra-school"
echo ""
