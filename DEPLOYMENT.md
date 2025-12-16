# Deployment Guide for Oracle Ampere A1 VPS with Hestia

This guide will help you deploy the Raudhatul Athfal Al-Islam school website on an Oracle Ampere A1 VPS running Hestia Control Panel.

## Prerequisites

- Oracle Ampere A1 VPS with Hestia Control Panel installed
- Domain name configured in Hestia
- SSH access to the server
- Node.js 20.x or later
- PostgreSQL 16 or later

## Architecture Overview

The application consists of:
- **Frontend**: React application built with Vite
- **Backend**: Express.js server (Node.js)
- **Database**: PostgreSQL
- **Web Server**: Nginx (reverse proxy)
- **Process Manager**: systemd service

## Deployment Steps

### 1. Server Preparation

#### 1.1 Install Node.js 20.x

```bash
# SSH into your VPS
ssh root@your-server-ip

# Install Node.js 20.x (ARM64 compatible)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

#### 1.2 Verify PostgreSQL Installation

Hestia typically includes PostgreSQL. Verify it's running:

```bash
sudo systemctl status postgresql
```

If PostgreSQL is not installed:

```bash
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib
```

### 2. Create Application User in Hestia

1. Log into Hestia Control Panel (`https://your-server-ip:8083`)
2. Go to **Users** → **Add User**
3. Create a user (e.g., `raschool`)
4. Set a secure password
5. Assign appropriate package and limits

### 3. Database Setup

#### 3.1 Create PostgreSQL Database

Option A - Using Hestia Web Interface:
1. Log into Hestia as the user you created
2. Go to **DB** → **Add Database**
3. Database name: `ra_database`
4. Database user: `ra_user`
5. Set a strong password
6. Click **Save**

Option B - Using Command Line:

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE ra_database;
CREATE USER ra_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE ra_database TO ra_user;

# Grant schema privileges (PostgreSQL 15+)
\c ra_database
GRANT ALL ON SCHEMA public TO ra_user;
ALTER DATABASE ra_database OWNER TO ra_user;

# Exit psql
\q
```

### 4. Application Deployment

#### 4.1 Clone Repository

```bash
# SSH as the user created in Hestia (e.g., raschool)
ssh raschool@your-server-ip

# Navigate to web directory
cd ~/web/yourdomain.com/

# Create application directory
mkdir -p private/app
cd private/app

# Clone the repository
git clone https://github.com/bayu-s-aziz/Raudhatul-Athfal-Web.git .

# Or upload files via SFTP/SCP
```

#### 4.2 Install Dependencies

```bash
cd ~/web/yourdomain.com/private/app

# Install production dependencies
npm ci --production=false
```

#### 4.3 Configure Environment Variables

```bash
# Create .env file
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

Update the following in `.env`:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://ra_user:your_secure_password@localhost:5432/ra_database
SESSION_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
```

#### 4.4 Initialize Database

```bash
# Run database migrations
npm run db:push
```

#### 4.5 Build Application

```bash
# Build both frontend and backend
npm run build
```

This will create:
- `dist/public/` - Frontend static files
- `dist/index.cjs` - Backend server bundle

### 5. Configure systemd Service

#### 5.1 Create Service File

```bash
# Create service file as root
sudo nano /etc/systemd/system/ra-school.service
```

Add the following content (adjust paths and user):

```ini
[Unit]
Description=Raudhatul Athfal Al-Islam School Website
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=simple
User=raschool
Group=raschool
WorkingDirectory=/home/raschool/web/yourdomain.com/private/app
Environment="NODE_ENV=production"
EnvironmentFile=/home/raschool/web/yourdomain.com/private/app/.env
ExecStart=/usr/bin/node /home/raschool/web/yourdomain.com/private/app/dist/index.cjs
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
ReadWritePaths=/home/raschool/web/yourdomain.com/private/app

[Install]
WantedBy=multi-user.target
```

#### 5.2 Enable and Start Service

```bash
# Reload systemd to recognize new service
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable ra-school

# Start the service
sudo systemctl start ra-school

# Check service status
sudo systemctl status ra-school

# View logs
sudo journalctl -u ra-school -f
```

### 6. Configure Nginx Reverse Proxy

#### 6.1 Update Hestia Nginx Configuration

Hestia manages Nginx configurations per domain. We need to add reverse proxy rules.

```bash
# Navigate to Nginx configuration directory
cd /home/raschool/conf/web/

# Create or edit the custom Nginx configuration
sudo nano yourdomain.com.nginx.conf_custom
```

Add the following configuration:

```nginx
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
```

#### 6.2 Restart Nginx

```bash
# Test Nginx configuration
sudo nginx -t

# If test passes, restart Nginx
sudo systemctl restart nginx
```

Alternatively, use Hestia CLI:

```bash
sudo /usr/local/hestia/bin/v-restart-web
```

### 7. SSL/HTTPS Configuration

#### 7.1 Enable SSL in Hestia

1. Log into Hestia Control Panel
2. Go to **WEB** section
3. Select your domain
4. Click **SSL Support**
5. Choose **Let's Encrypt** (recommended)
6. Click **Save**

Hestia will automatically obtain and configure SSL certificate.

#### 7.2 Force HTTPS Redirect

In Hestia panel, enable **SSL Force** for your domain to redirect all HTTP traffic to HTTPS.

### 8. Firewall Configuration

Ensure the following ports are open:

```bash
# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH
sudo ufw allow 22/tcp

# Allow Hestia Control Panel
sudo ufw allow 8083/tcp

# Enable firewall if not already enabled
sudo ufw enable
```

### 9. Deployment Script

Create a deployment script for easy updates:

```bash
# Create deploy script
nano ~/deploy.sh
```

Add the following content:

```bash
#!/bin/bash

set -e

APP_DIR="/home/raschool/web/yourdomain.com/private/app"

echo "🚀 Starting deployment..."

# Navigate to application directory
cd $APP_DIR

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Build application
echo "🔨 Building application..."
npm run build

# Run database migrations
echo "🗄️  Running database migrations..."
npm run db:push

# Restart service
echo "♻️  Restarting service..."
sudo systemctl restart ra-school

# Check service status
echo "✅ Checking service status..."
sudo systemctl status ra-school --no-pager

echo "🎉 Deployment completed successfully!"
```

Make it executable:

```bash
chmod +x ~/deploy.sh
```

### 10. Post-Deployment Verification

#### 10.1 Check Service Status

```bash
sudo systemctl status ra-school
```

#### 10.2 Check Application Logs

```bash
# View recent logs
sudo journalctl -u ra-school -n 50

# Follow logs in real-time
sudo journalctl -u ra-school -f
```

#### 10.3 Test Application

Open your browser and navigate to:
- `http://yourdomain.com` (should redirect to HTTPS)
- `https://yourdomain.com`

Verify:
- ✅ Website loads correctly
- ✅ All pages are accessible
- ✅ Forms work properly
- ✅ Database connectivity is working

### 11. Monitoring and Maintenance

#### 11.1 Monitor Service

```bash
# Check if service is running
sudo systemctl status ra-school

# View resource usage
sudo systemctl show ra-school
```

#### 11.2 Log Rotation

Systemd journal handles log rotation automatically. To configure:

```bash
# Edit journal configuration
sudo nano /etc/systemd/journald.conf

# Set maximum log size (uncomment and adjust)
SystemMaxUse=100M
```

#### 11.3 Backup Strategy

Create regular backups:

```bash
# Backup database
pg_dump -U ra_user ra_database > backup_$(date +%Y%m%d).sql

# Backup application files
tar -czf app_backup_$(date +%Y%m%d).tar.gz /home/raschool/web/yourdomain.com/private/app
```

Use Hestia's built-in backup feature for automated backups.

#### 11.4 Updates and Deployments

To deploy updates:

```bash
# Run the deployment script
~/deploy.sh

# Or manually:
cd ~/web/yourdomain.com/private/app
git pull
npm ci --production=false
npm run build
sudo systemctl restart ra-school
```

## Troubleshooting

### Service Won't Start

```bash
# Check service status
sudo systemctl status ra-school

# View detailed logs
sudo journalctl -u ra-school -n 100

# Common issues:
# - Port 5000 already in use
# - Database connection failed
# - Missing environment variables
# - File permissions
```

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql -U ra_user -d ra_database -h localhost

# Check PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-16-main.log

# Verify database credentials in .env file
```

### Nginx Configuration Issues

```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### Port Already in Use

```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill the process if needed
sudo kill -9 <PID>
```

### Permission Denied Errors

```bash
# Fix file ownership
sudo chown -R raschool:raschool /home/raschool/web/yourdomain.com/private/app

# Fix file permissions
chmod -R 755 /home/raschool/web/yourdomain.com/private/app
```

## Performance Optimization

### 1. Enable Nginx Caching

Add to your Nginx configuration:

```nginx
# Cache configuration
proxy_cache_path /var/cache/nginx/ra-school levels=1:2 keys_zone=ra_cache:10m max_size=100m inactive=60m;

location / {
    proxy_cache ra_cache;
    proxy_cache_valid 200 60m;
    proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
    # ... rest of proxy settings
}
```

### 2. Enable Gzip Compression

Nginx in Hestia usually has gzip enabled, but verify:

```nginx
gzip on;
gzip_vary on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 3. Node.js Process Optimization

Add to systemd service file:

```ini
Environment="NODE_OPTIONS=--max-old-space-size=512"
```

### 4. Database Connection Pooling

The application uses connection pooling by default. Monitor with:

```sql
-- Check active connections
SELECT count(*) FROM pg_stat_activity WHERE datname = 'ra_database';
```

## Security Checklist

- ✅ Use strong passwords for database and user accounts
- ✅ Enable UFW firewall
- ✅ Use SSL/HTTPS (Let's Encrypt)
- ✅ Keep Node.js and system packages updated
- ✅ Set proper file permissions (no 777)
- ✅ Use environment variables for secrets (never commit .env)
- ✅ Enable fail2ban for SSH protection
- ✅ Regular backups (daily recommended)
- ✅ Monitor logs for suspicious activity
- ✅ Use Hestia's built-in security features

## Additional Resources

- [Hestia Control Panel Documentation](https://hestiacp.com/docs/)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [PostgreSQL Performance Tuning](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [Nginx Reverse Proxy Guide](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

## Support

For issues specific to this application:
- Check application logs: `sudo journalctl -u ra-school -f`
- Review Nginx logs: `/var/log/nginx/`
- Check database logs: `/var/log/postgresql/`

For Hestia-specific issues:
- Check Hestia documentation: https://hestiacp.com/docs/
- Hestia forum: https://forum.hestiacp.com/

---

**Note**: Replace `yourdomain.com`, `raschool`, and other placeholders with your actual values throughout this guide.
