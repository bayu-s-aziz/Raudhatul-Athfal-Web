# Troubleshooting Guide

This guide helps you diagnose and fix common issues when deploying or running the Raudhatul Athfal Al-Islam School Website.

## Quick Diagnostic Commands

```bash
# Run system requirements check
deployment/check-requirements.sh

# Check service status
sudo systemctl status ra-school

# View recent logs
deployment/logs.sh

# View error logs only
deployment/logs.sh --errors

# Test application locally
curl http://localhost:5000

# Check if port is in use
sudo lsof -i :5000
```

## Common Issues

### 1. Service Won't Start

#### Symptoms
- `sudo systemctl start ra-school` fails
- Service shows "failed" status
- Application not accessible

#### Diagnosis
```bash
# Check detailed service status
sudo systemctl status ra-school -l

# View full error logs
sudo journalctl -u ra-school -n 100 --no-pager

# Check if service file exists
ls -la /etc/systemd/system/ra-school.service
```

#### Common Causes & Solutions

**A. Port Already in Use**

```bash
# Check what's using port 5000
sudo lsof -i :5000

# If another process is using it, stop it
sudo kill -9 <PID>

# Or change PORT in .env file
nano .env
# Change PORT=5000 to PORT=5001 (or another free port)
```

**B. Missing or Invalid .env File**

```bash
# Check if .env exists
ls -la /home/YOUR_USER/web/YOUR_DOMAIN/private/app/.env

# If missing, create from example
cp .env.example .env
nano .env  # Edit with your values

# Verify environment variables
cat .env
```

**C. Database Connection Failed**

```bash
# Test database connection
psql -U ra_user -d ra_database -h localhost

# If connection fails, check PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL if needed
sudo systemctl start postgresql

# Check database credentials in .env
cat .env | grep DATABASE_URL
```

**D. Build Files Missing**

```bash
# Check if dist folder exists
ls -la dist/

# If missing or incomplete, rebuild
npm run build

# Check if dist/index.cjs exists
ls -la dist/index.cjs
```

**E. Permission Issues**

```bash
# Fix file ownership
sudo chown -R YOUR_USER:YOUR_USER /home/YOUR_USER/web/YOUR_DOMAIN/private/app

# Fix permissions
chmod -R 755 /home/YOUR_USER/web/YOUR_DOMAIN/private/app
chmod 600 .env
```

### 2. Database Connection Issues

#### Symptoms
- "Database connection failed" errors
- "password authentication failed"
- "database does not exist"

#### Diagnosis
```bash
# Test database connection
psql -U ra_user -d ra_database -h localhost

# Check PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-*-main.log

# List all databases
sudo -u postgres psql -c "\l"

# List database users
sudo -u postgres psql -c "\du"
```

#### Solutions

**A. Wrong Database Credentials**

```bash
# Verify .env file has correct credentials
cat .env | grep DATABASE_URL

# Format should be:
# DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# If wrong, update .env and restart service
nano .env
sudo systemctl restart ra-school
```

**B. Database Doesn't Exist**

```bash
# Create database
sudo -u postgres psql <<EOF
CREATE DATABASE ra_database;
CREATE USER ra_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ra_database TO ra_user;
\c ra_database
GRANT ALL ON SCHEMA public TO ra_user;
ALTER DATABASE ra_database OWNER TO ra_user;
EOF

# Run migrations
npm run db:push
```

**C. PostgreSQL Not Running**

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Enable on boot
sudo systemctl enable postgresql
```

**D. Connection Limit Reached**

```bash
# Check active connections
sudo -u postgres psql -c "SELECT count(*) FROM pg_stat_activity WHERE datname = 'ra_database';"

# Kill idle connections if needed
sudo -u postgres psql -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'ra_database' AND state = 'idle';"
```

### 3. Nginx/Website Not Loading

#### Symptoms
- Website doesn't load in browser
- "502 Bad Gateway" error
- "Connection refused"

#### Diagnosis
```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test application directly
curl http://localhost:5000

# Check custom Nginx config
cat /home/YOUR_USER/conf/web/YOUR_DOMAIN.nginx.conf_custom
```

#### Solutions

**A. Nginx Configuration Error**

```bash
# Test configuration
sudo nginx -t

# If errors, check your custom config
nano /home/YOUR_USER/conf/web/YOUR_DOMAIN.nginx.conf_custom

# Restore from template if needed
cp deployment/nginx.conf /home/YOUR_USER/conf/web/YOUR_DOMAIN.nginx.conf_custom

# Restart Nginx
sudo systemctl restart nginx
# Or via Hestia
sudo /usr/local/hestia/bin/v-restart-web
```

**B. Application Not Running**

```bash
# Check if application is running
sudo systemctl status ra-school

# Start if not running
sudo systemctl start ra-school

# Test application directly
curl http://localhost:5000
```

**C. SSL Certificate Issues**

```bash
# Renew Let's Encrypt certificate via Hestia
# Login to Hestia → WEB → Domain → SSL Support → Renew

# Or manually with certbot
sudo certbot renew

# Check certificate expiry
echo | openssl s_client -servername YOUR_DOMAIN -connect YOUR_DOMAIN:443 2>/dev/null | openssl x509 -noout -dates
```

### 4. Build Failures

#### Symptoms
- `npm run build` fails
- TypeScript errors
- Module not found errors

#### Solutions

**A. Dependency Issues**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use clean install
npm ci --production=false
```

**B. TypeScript Errors**

```bash
# Run type check
npm run check

# Fix errors shown in output
# Common fixes:
# - Update imports
# - Fix type definitions
# - Check for missing dependencies
```

**C. Out of Memory During Build**

```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=2048 npm run build

# Or create swap space (if low memory)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### 5. Deployment Script Issues

#### Symptoms
- `deployment/deploy.sh` fails
- Git pull fails
- Permission denied errors

#### Solutions

**A. Git Pull Fails**

```bash
# Check git status
git status

# Check remote
git remote -v

# Reset local changes if needed (CAUTION: loses local changes)
git fetch origin
git reset --hard origin/main

# Or stash changes
git stash
git pull
```

**B. Permission Issues with Scripts**

```bash
# Make scripts executable
chmod +x deployment/*.sh

# Run with correct permissions
sudo deployment/setup.sh  # Initial setup needs sudo
./deployment/deploy.sh     # Regular deploy as user
```

**C. Service Restart Fails**

```bash
# Check if user has sudo permissions
sudo -l

# If needed, add user to sudoers for systemctl
sudo visudo
# Add: your_user ALL=(ALL) NOPASSWD: /bin/systemctl restart ra-school
```

### 6. SSL/HTTPS Issues

#### Symptoms
- Certificate warnings in browser
- "Not secure" warning
- HTTP not redirecting to HTTPS

#### Solutions

**A. Enable SSL in Hestia**

1. Login to Hestia Control Panel
2. WEB → Select your domain
3. SSL Support → Let's Encrypt
4. Enable "Force SSL redirect"
5. Save

**B. Manual Certificate Renewal**

```bash
# Renew certificate
sudo certbot renew

# Restart web server
sudo systemctl restart nginx
```

**C. Mixed Content Issues**

Check that all resources (CSS, JS, images) use HTTPS or relative URLs.

### 7. Performance Issues

#### Symptoms
- Slow page loads
- High CPU/memory usage
- Timeouts

#### Diagnosis
```bash
# Check resource usage
top

# Check memory usage
free -h

# Check disk usage
df -h

# Check application memory
ps aux | grep node

# View systemd resource limits
sudo systemctl show ra-school
```

#### Solutions

**A. Optimize Node.js Memory**

```bash
# Edit service file
sudo nano /etc/systemd/system/ra-school.service

# Add under [Service]:
Environment="NODE_OPTIONS=--max-old-space-size=512"

# Reload and restart
sudo systemctl daemon-reload
sudo systemctl restart ra-school
```

**B. Enable Nginx Caching**

Add to Nginx configuration:

```nginx
proxy_cache_path /var/cache/nginx/ra-school levels=1:2 keys_zone=ra_cache:10m max_size=100m inactive=60m;

location / {
    proxy_cache ra_cache;
    proxy_cache_valid 200 60m;
    # ... other proxy settings
}
```

**C. Database Query Optimization**

```bash
# Check slow queries
sudo -u postgres psql ra_database -c "SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;"

# Add indexes if needed (check schema)
```

### 8. Log Issues

#### Symptoms
- Can't view logs
- "Permission denied" when accessing logs
- Logs not updating

#### Solutions

```bash
# View logs with sudo
sudo journalctl -u ra-school -f

# Check journal size
sudo journalctl --disk-usage

# Clean old logs if needed
sudo journalctl --vacuum-time=7d

# Check log rotation config
cat /etc/systemd/journald.conf
```

## Emergency Recovery

### Application Crashed and Won't Start

```bash
# 1. Check what's wrong
sudo systemctl status ra-school
deployment/logs.sh --errors

# 2. Stop the service
sudo systemctl stop ra-school

# 3. Check for port conflicts
sudo lsof -i :5000

# 4. Verify build files
ls -la dist/

# 5. Test database connection
psql -U ra_user -d ra_database -h localhost -c "SELECT 1;"

# 6. Rebuild if needed
npm run build

# 7. Start service
sudo systemctl start ra-school

# 8. Monitor logs
deployment/logs.sh --follow
```

### Database Corrupted

```bash
# 1. Stop application
sudo systemctl stop ra-school

# 2. Backup current database
pg_dump -U ra_user ra_database > backup_emergency_$(date +%Y%m%d).sql

# 3. Drop and recreate database
sudo -u postgres psql <<EOF
DROP DATABASE ra_database;
CREATE DATABASE ra_database OWNER ra_user;
EOF

# 4. Restore from backup
psql -U ra_user -d ra_database < backup_latest.sql

# Or run fresh migrations
npm run db:push

# 5. Start application
sudo systemctl start ra-school
```

### System Out of Disk Space

```bash
# 1. Check disk usage
df -h
du -sh /* | sort -h

# 2. Clean logs
sudo journalctl --vacuum-time=3d

# 3. Clean old packages
sudo apt-get autoremove
sudo apt-get clean

# 4. Clean npm cache
npm cache clean --force

# 5. Remove old backups
find ~/backups -mtime +30 -delete
```

## Getting Help

If you're still having issues:

1. **Check logs**: `deployment/logs.sh --follow`
2. **Run requirements check**: `deployment/check-requirements.sh`
3. **Review documentation**: [DEPLOYMENT.md](DEPLOYMENT.md)
4. **Check service status**: `sudo systemctl status ra-school`

### Useful Log Locations

- Application logs: `sudo journalctl -u ra-school`
- Nginx access: `/var/log/nginx/access.log`
- Nginx errors: `/var/log/nginx/error.log`
- PostgreSQL: `/var/log/postgresql/postgresql-*-main.log`
- System logs: `sudo journalctl -xe`

### Support Resources

- Hestia Documentation: https://hestiacp.com/docs/
- Node.js Docs: https://nodejs.org/docs/
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Nginx Docs: https://nginx.org/en/docs/

---

**Remember**: Always backup before making major changes!
