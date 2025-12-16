# Quick Start Guide - Deploying to Oracle Ampere A1 with Hestia

This is a simplified quick-start guide. For complete documentation, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Prerequisites Checklist

- ✅ Oracle Ampere A1 VPS with Hestia Control Panel
- ✅ Domain name configured
- ✅ SSH access to server
- ✅ User created in Hestia

## Quick Deployment (5 Steps)

### Step 1: Prepare Your VPS

```bash
# SSH into your server
ssh root@your-server-ip

# Install Node.js 20.x (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
```

### Step 2: Clone Repository

```bash
# Switch to your Hestia user
ssh your_user@your-server-ip

# Navigate to web directory (replace with your actual domain)
cd ~/web/yourdomain.com/private/

# Clone the repository
git clone https://github.com/bayu-s-aziz/Raudhatul-Athfal-Web.git app
cd app
```

### Step 3: Run Automated Setup

```bash
# Make setup script executable (if not already)
chmod +x deployment/setup.sh

# Run the setup script (requires sudo)
sudo deployment/setup.sh
```

The setup script will:
- ✅ Install/verify Node.js and PostgreSQL
- ✅ Create database and user
- ✅ Configure systemd service
- ✅ Set up Nginx reverse proxy
- ✅ Generate .env file with credentials

### Step 4: Build and Deploy

```bash
# Install dependencies
npm ci --production=false

# Build the application
npm run build

# Initialize database
npm run db:push

# Start the service
sudo systemctl start ra-school

# Check status
sudo systemctl status ra-school
```

### Step 5: Enable SSL (via Hestia)

1. Log into Hestia Control Panel: `https://your-server-ip:8083`
2. Go to **WEB** → Select your domain
3. Click **SSL Support** → Select **Let's Encrypt**
4. Click **Save**
5. Enable **Force SSL redirect**

**Done! 🎉** Your website should now be live at `https://yourdomain.com`

## Future Updates

To deploy updates:

```bash
cd ~/web/yourdomain.com/private/app
./deployment/deploy.sh
```

## Useful Commands

```bash
# View logs in real-time
deployment/logs.sh --follow

# Check service status
sudo systemctl status ra-school

# Restart service
sudo systemctl restart ra-school

# Create database backup
deployment/backup.sh

# View recent logs
deployment/logs.sh --lines 100
```

## Troubleshooting

### Service won't start?
```bash
# Check logs
deployment/logs.sh --errors

# Check if port 5000 is available
sudo lsof -i :5000
```

### Can't connect to database?
```bash
# Test database connection
psql -U ra_user -d ra_database -h localhost

# Check .env file has correct credentials
cat .env
```

### Website not loading?
```bash
# Test application locally
curl http://localhost:5000

# Check Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Need More Help?

- 📖 **Full Documentation**: [DEPLOYMENT.md](DEPLOYMENT.md)
- 🛠️ **Deployment Scripts**: [deployment/README.md](deployment/README.md)
- 🌐 **Hestia Docs**: https://hestiacp.com/docs/

## Configuration Files

- **Environment**: `.env` (created by setup script)
- **Service**: `/etc/systemd/system/ra-school.service`
- **Nginx**: `~/conf/web/yourdomain.com.nginx.conf_custom`
- **Logs**: `sudo journalctl -u ra-school`

## Architecture

```
Browser (HTTPS:443)
    ↓
Nginx (Reverse Proxy)
    ↓
Node.js App (Port 5000)
    ↓
PostgreSQL Database (Port 5432)
```

---

**Pro Tip**: Bookmark the Hestia Control Panel and keep your `.env` file secure!
