#!/bin/bash

# Database Backup Script for Raudhatul Athfal Al-Islam School Website
#
# Usage: ./backup.sh
#
# This script creates a backup of the PostgreSQL database

set -e

# Configuration
BACKUP_DIR="${BACKUP_DIR:-$HOME/backups}"
DB_NAME="${DB_NAME:-ra_database}"
DB_USER="${DB_USER:-ra_user}"
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Generate backup filename with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/ra_database_$TIMESTAMP.sql"

# Create backup
echo "Creating database backup..."
pg_dump -U "$DB_USER" -h localhost "$DB_NAME" > "$BACKUP_FILE"

# Compress backup
echo "Compressing backup..."
gzip "$BACKUP_FILE"

# Remove old backups (older than retention period)
echo "Cleaning up old backups..."
find "$BACKUP_DIR" -name "ra_database_*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "✅ Backup completed successfully!"
echo "📦 Backup file: $BACKUP_FILE.gz"
echo "📂 Backup directory: $BACKUP_DIR"

# List recent backups
echo ""
echo "Recent backups:"
ls -lh "$BACKUP_DIR" | tail -5
