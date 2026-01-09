# Deployment Files

This directory contains deployment configuration files and scripts for hosting the Raudhatul Athfal Al-Islam School Website on an Oracle Ampere A1 VPS with Hestia Control Panel.

## Files Overview

### Configuration Files

- **`ra-school.service`** - systemd service unit file for managing the Node.js application
- **`nginx.conf`** - Nginx reverse proxy configuration
- **`.env.example`** - Environment variables template (located in root directory)

### Scripts

All scripts should be made executable before use:
```bash
chmod +x deployment/*.sh
```

#### `setup.sh`
Initial setup script that configures the server environment. Run this **ONCE** during initial deployment.

**Usage:**
```bash
sudo ./setup.sh
```

**What it does:**
- Checks/installs Node.js 20.x
- Verifies PostgreSQL installation
- Creates database and user
- Sets up systemd service
- Configures Nginx reverse proxy
- Creates .env file with credentials

#### `deploy.sh`
Automated deployment script for updating the application. Use this for regular deployments.

**Usage:**
```bash
./deploy.sh
```

**What it does:**
- Pulls latest code from Git
- Installs dependencies
- Builds the application
- Runs database migrations
- Restarts the service
- Verifies deployment

#### `backup.sh`
Database backup script. Should be run regularly (consider adding to cron).

**Usage:**
```bash
./backup.sh
```

**What it does:**
- Creates PostgreSQL database dump
- Compresses the backup
- Removes backups older than 30 days
- Stores in `~/backups/` directory

**Cron example** (daily backup at 2 AM):
```bash
0 2 * * * /path/to/deployment/backup.sh >> /var/log/ra-backup.log 2>&1
```

#### `logs.sh`
Log viewer utility for monitoring application logs.

**Usage:**
```bash
# View last 50 lines
./logs.sh

# Follow logs in real-time
./logs.sh --follow

# View last 100 lines
./logs.sh --lines 100

# Show only errors
./logs.sh --errors

# Follow errors only
./logs.sh --follow --errors
```

## Quick Start Guide

### First Time Setup

1. **Clone the repository** on your VPS:
```bash
ssh user@your-vps-ip
cd /home/YOUR_USER/web/YOUR_DOMAIN/private/
git clone https://github.com/bayu-s-aziz/Raudhatul-Athfal-Web.git app
cd app
```

2. **Run the setup script**:
```bash
sudo ./deployment/setup.sh
```
Follow the prompts to configure your installation.

3. **Install dependencies and build**:
```bash
npm ci --production=false
npm run build
```

4. **Initialize database**:
```bash
npm run db:push
```

5. **Start the service**:
```bash
sudo systemctl start ra-school
```

6. **Verify deployment**:
```bash
sudo systemctl status ra-school
./deployment/logs.sh --follow
```

### Regular Deployments

For updates after initial setup:

```bash
cd /home/YOUR_USER/web/YOUR_DOMAIN/private/app
./deployment/deploy.sh
```

## Manual Installation Steps

If you prefer to set things up manually instead of using the setup script:

### 1. Create systemd service

```bash
# Copy service file
sudo cp deployment/ra-school.service /etc/systemd/system/

# Edit the file and replace placeholders
sudo nano /etc/systemd/system/ra-school.service
# Replace: YOUR_USER, YOUR_DOMAIN

# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable ra-school
```

### 2. Configure Nginx

```bash
# Copy Nginx config to Hestia directory
sudo cp deployment/nginx.conf /home/YOUR_USER/conf/web/YOUR_DOMAIN.nginx.conf_custom

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo /usr/local/hestia/bin/v-restart-web
# or
sudo systemctl restart nginx
```

### 3. Create .env file

```bash
# Copy from example
cp .env.example .env

# Edit with your values
nano .env
```

### 4. Create database

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE ra_database;
CREATE USER ra_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ra_database TO ra_user;
\c ra_database
GRANT ALL ON SCHEMA public TO ra_user;
ALTER DATABASE ra_database OWNER TO ra_user;
\q
```

## Environment Variables

Required variables in `.env`:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/database
SESSION_SECRET=generate_random_secret_here
```

Generate session secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Troubleshooting

### Service won't start
```bash
# Check service status
sudo systemctl status ra-school

# View detailed logs
./deployment/logs.sh --errors

# Check if port 5000 is in use
sudo lsof -i :5000
```

### Database connection issues
```bash
# Test database connection
psql -U ra_user -d ra_database -h localhost

# Check PostgreSQL is running
sudo systemctl status postgresql
```

### Nginx issues
```bash
# Test Nginx configuration
sudo nginx -t

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### View all logs
```bash
# Application logs
./deployment/logs.sh --follow

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-16-main.log
```

## Security Notes

- Keep `.env` file secure (permissions: 600)
- Never commit `.env` to version control
- Use strong passwords for database
- Keep system and Node.js updated
- Enable UFW firewall
- Use SSL/HTTPS (enable in Hestia)
- Regular backups (use backup.sh script)

## Monitoring

### Check service health
```bash
# Service status
sudo systemctl status ra-school

# View logs
./deployment/logs.sh

# Check application response
curl http://localhost:5000
```

### Resource usage
```bash
# Memory and CPU usage
sudo systemctl show ra-school --property=MemoryCurrent,CPUUsageNSec

# Process information
ps aux | grep node
```

## Support

For detailed information, see:
- `DEPLOYMENT.md` - Complete deployment documentation
- `README.md` - Application documentation (if available)

For issues:
- Check logs: `./deployment/logs.sh`
- Verify service: `sudo systemctl status ra-school`
- Test database: `psql -U ra_user -d ra_database`

## Additional Resources

- [Hestia Control Panel](https://hestiacp.com/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
