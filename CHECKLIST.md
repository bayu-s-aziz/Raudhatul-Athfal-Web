# Pre-Deployment Checklist

Use this checklist before deploying to production to ensure everything is properly configured.

## Server Setup

### System Requirements
- [ ] Oracle Ampere A1 VPS (or compatible ARM64/x86_64 server)
- [ ] Hestia Control Panel installed and configured
- [ ] At least 2GB RAM (4GB recommended)
- [ ] At least 5GB free disk space
- [ ] Domain name configured and pointing to server
- [ ] SSH access configured

### Software Requirements
- [ ] Node.js 20.x or later installed
- [ ] PostgreSQL 16 or later installed and running
- [ ] Nginx installed (comes with Hestia)
- [ ] Git installed
- [ ] systemd available (for service management)

Run the requirements check:
```bash
deployment/check-requirements.sh
```

## Pre-Deployment Configuration

### Hestia Setup
- [ ] Hestia user created
- [ ] Domain added to Hestia
- [ ] Web directory structure created
- [ ] DNS properly configured
- [ ] Hestia Control Panel accessible

### Application Files
- [ ] Repository cloned to correct location
- [ ] All files have correct permissions
- [ ] User owns application directory
- [ ] Scripts are executable (`chmod +x deployment/*.sh`)

### Database Setup
- [ ] PostgreSQL database created
- [ ] Database user created with proper permissions
- [ ] Database credentials documented securely
- [ ] Test database connection successful

### Environment Configuration
- [ ] `.env` file created from `.env.example`
- [ ] `DATABASE_URL` configured correctly
- [ ] `SESSION_SECRET` generated (use `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] `PORT` set to 5000 (or desired port)
- [ ] `NODE_ENV` set to "production"
- [ ] `.env` file has correct permissions (600)

## Initial Deployment

### Build and Install
- [ ] Dependencies installed: `npm ci --production=false`
- [ ] Application builds successfully: `npm run build`
- [ ] `dist/` directory created with all files
- [ ] `dist/index.cjs` exists
- [ ] `dist/public/` contains frontend assets

### Database Initialization
- [ ] Database migrations run: `npm run db:push`
- [ ] Database schema created successfully
- [ ] Test data inserted (if needed)

### systemd Service
- [ ] Service file created in `/etc/systemd/system/ra-school.service`
- [ ] Service file has correct paths (user, domain, app directory)
- [ ] Service enabled: `sudo systemctl enable ra-school`
- [ ] Service starts successfully: `sudo systemctl start ra-school`
- [ ] Service status is active: `sudo systemctl status ra-school`
- [ ] No errors in service logs: `deployment/logs.sh`

### Nginx Configuration
- [ ] Custom Nginx config created
- [ ] Nginx configuration tests pass: `sudo nginx -t`
- [ ] Nginx restarted: `sudo systemctl restart nginx`
- [ ] Application accessible via domain (HTTP)

### SSL/HTTPS Setup
- [ ] Let's Encrypt SSL enabled in Hestia
- [ ] SSL certificate obtained successfully
- [ ] HTTPS works without warnings
- [ ] HTTP redirects to HTTPS
- [ ] SSL force redirect enabled in Hestia

## Post-Deployment Verification

### Functionality Tests
- [ ] Website loads correctly via HTTPS
- [ ] All pages are accessible
- [ ] Navigation works properly
- [ ] Forms submit successfully
- [ ] API endpoints respond correctly
- [ ] Database operations work
- [ ] Session handling works

### Performance Tests
- [ ] Page load times acceptable (<3 seconds)
- [ ] No console errors in browser
- [ ] Static assets load quickly
- [ ] API responses are fast (<1 second)

### Security Verification
- [ ] HTTPS enforced
- [ ] No mixed content warnings
- [ ] Security headers present
- [ ] `.env` file not publicly accessible
- [ ] Database credentials not exposed
- [ ] No sensitive data in logs

### Monitoring Setup
- [ ] Health check endpoint accessible: `curl https://yourdomain.com/api/health`
- [ ] Logs are being written: `deployment/logs.sh`
- [ ] Health check script works: `deployment/health-check.sh`
- [ ] Service auto-restarts on failure (test with `sudo systemctl kill ra-school`)

## Maintenance Setup

### Backup Configuration
- [ ] Database backup script tested: `deployment/backup.sh`
- [ ] Backup directory created and accessible
- [ ] Cron job for automated backups (optional)
  ```bash
  # Example: Daily backup at 2 AM
  crontab -e
  0 2 * * * /path/to/deployment/backup.sh >> /var/log/ra-backup.log 2>&1
  ```

### Monitoring & Alerting
- [ ] Log monitoring configured
- [ ] Disk space monitoring
- [ ] Service status monitoring
- [ ] Email alerts configured (optional)

### Documentation
- [ ] Deployment details documented
- [ ] Server credentials stored securely
- [ ] Database credentials stored securely
- [ ] Emergency contact information available
- [ ] Rollback procedure documented

## Firewall & Security

### Firewall Configuration
- [ ] UFW firewall enabled
- [ ] Port 80 (HTTP) allowed
- [ ] Port 443 (HTTPS) allowed
- [ ] Port 22 (SSH) allowed
- [ ] Port 8083 (Hestia) allowed
- [ ] Port 5000 NOT exposed externally (only localhost)
- [ ] Unnecessary ports blocked

### Security Hardening
- [ ] SSH key authentication enabled
- [ ] Password authentication disabled (optional)
- [ ] Fail2ban configured (optional)
- [ ] Regular security updates enabled
- [ ] Non-root user for application
- [ ] File permissions properly set

## Performance Optimization

### Server Configuration
- [ ] Nginx caching configured (optional)
- [ ] Gzip compression enabled
- [ ] Database connection pooling configured
- [ ] Node.js memory limits set appropriately

### Application Optimization
- [ ] Static assets cached
- [ ] Database queries optimized
- [ ] Unused dependencies removed
- [ ] Production build minified

## Testing Scenarios

### Basic Functionality
```bash
# Test health endpoint
curl https://yourdomain.com/api/health

# Test main page
curl -I https://yourdomain.com/

# Check service status
sudo systemctl status ra-school

# View recent logs
deployment/logs.sh --lines 20

# Run health check
deployment/health-check.sh
```

### Load Testing (Optional)
- [ ] Application handles concurrent users
- [ ] Database handles concurrent connections
- [ ] No memory leaks during extended use
- [ ] Server resources within acceptable limits

## Rollback Plan

### Preparation
- [ ] Previous version backup available
- [ ] Database backup before deployment
- [ ] Rollback procedure documented
- [ ] Quick rollback command prepared

### Rollback Commands
```bash
# Stop service
sudo systemctl stop ra-school

# Restore previous version
git checkout <previous-commit>
npm ci --production=false
npm run build

# Restore database (if needed)
psql -U ra_user -d ra_database < backup_before_deploy.sql

# Restart service
sudo systemctl start ra-school
```

## Go-Live Checklist

### Final Verification
- [ ] All previous checklist items completed
- [ ] Production environment tested thoroughly
- [ ] SSL certificate valid
- [ ] Domain resolves correctly
- [ ] Email notifications working (if configured)
- [ ] Monitoring systems active
- [ ] Backup systems tested
- [ ] Team informed of deployment
- [ ] Support contacts available

### Communication
- [ ] Stakeholders notified of deployment
- [ ] Maintenance window communicated (if needed)
- [ ] Support team ready
- [ ] Documentation updated

## Post-Launch Monitoring

### First 24 Hours
- [ ] Monitor logs continuously: `deployment/logs.sh --follow`
- [ ] Check error rates
- [ ] Monitor server resources
- [ ] Verify all features working
- [ ] Check user feedback

### First Week
- [ ] Daily health checks
- [ ] Review server metrics
- [ ] Check database performance
- [ ] Monitor disk space
- [ ] Review security logs

### Ongoing
- [ ] Weekly health checks
- [ ] Monthly security updates
- [ ] Regular backups verified
- [ ] Performance monitoring
- [ ] Capacity planning

## Emergency Contacts

Document and keep updated:
- [ ] Server hosting provider support
- [ ] Domain registrar support
- [ ] SSL certificate provider
- [ ] Database administrator
- [ ] System administrator
- [ ] Development team lead

## Sign-Off

**Deployment Date**: _________________

**Deployed By**: _________________

**Verified By**: _________________

**Notes**:
```
_____________________________________________________
_____________________________________________________
_____________________________________________________
```

---

**Keep this checklist updated for future deployments!**
