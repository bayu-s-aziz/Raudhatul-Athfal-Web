# Raudhatul Athfal Al-Islam School Website

> Modern web application for Raudhatul Athfal Al-Islam, an Islamic kindergarten (PAUD) school in Sindangkasih, Ciamis, West Java, Indonesia.

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![Express](https://img.shields.io/badge/Express-4.21-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)

## 🌟 Features

- **Modern Tech Stack**: Full-stack TypeScript application with React and Express
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database Integration**: PostgreSQL with Drizzle ORM
- **Islamic Aesthetic**: Custom design reflecting Islamic educational values
- **Production Ready**: Optimized builds and deployment configurations

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

Visit `http://localhost:5000` to see the application.

### Production Deployment

See deployment guides:
- **Quick Start**: [QUICKSTART.md](QUICKSTART.md) - 5-step deployment guide
- **Complete Guide**: [DEPLOYMENT.md](DEPLOYMENT.md) - Full deployment documentation
- **Scripts**: [deployment/README.md](deployment/README.md) - Deployment tools reference

## 📦 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast builds and HMR
- **Wouter** for routing
- **TanStack Query** for server state management
- **Tailwind CSS** for styling
- **shadcn/ui** component library

### Backend
- **Express.js** with TypeScript
- **Node.js 20**
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Passport.js** for authentication

### DevOps
- **systemd** for process management
- **Nginx** as reverse proxy
- **Hestia Control Panel** support
- Deployment automation scripts

## 📁 Project Structure

```
├── client/              # React frontend
│   └── src/
│       ├── pages/       # Page components
│       ├── components/  # UI components
│       └── lib/         # Utilities
├── server/              # Express backend
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   └── vite.ts          # Vite dev server
├── shared/              # Shared code
│   └── schema.ts        # Database schema
├── deployment/          # Deployment files
│   ├── setup.sh         # Initial setup script
│   ├── deploy.sh        # Deployment script
│   ├── backup.sh        # Database backup
│   └── logs.sh          # Log viewer
├── dist/                # Production build (generated)
└── migrations/          # Database migrations (generated)
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build            # Build for production
npm run check            # Type check

# Database
npm run db:push          # Push schema changes to database

# Production
npm run start            # Start production server
```

## 🌐 Deployment

### Supported Platforms

- ✅ Oracle Ampere A1 VPS with Hestia
- ✅ Any VPS with Node.js and PostgreSQL
- ✅ Cloud platforms (AWS, GCP, Azure)

### Deployment Options

#### Option 1: Automated Setup (Recommended)

```bash
sudo deployment/setup.sh
```

#### Option 2: Manual Setup

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions.

## 🔧 Configuration

### Environment Variables

Create a `.env` file (use `.env.example` as template):

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/database
SESSION_SECRET=your_random_secret
```

### Database Setup

```bash
# Create PostgreSQL database
sudo -u postgres psql
CREATE DATABASE ra_database;
CREATE USER ra_user WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE ra_database TO ra_user;

# Run migrations
npm run db:push
```

## 📊 Monitoring

```bash
# View application logs
deployment/logs.sh --follow

# Check service status
sudo systemctl status ra-school

# View error logs only
deployment/logs.sh --errors
```

## 🔐 Security

- Strong password requirements
- Session-based authentication
- SQL injection protection via Drizzle ORM
- XSS protection
- HTTPS/SSL support
- Environment variable security

## 🤝 Contributing

This is a school project. For issues or suggestions, please contact the development team.

## 📄 License

MIT License - See LICENSE file for details

## 📞 Contact

**Raudhatul Athfal Al-Islam**
- **Address**: Dusun Sirnagalih, Kecamatan Sindangkasih, Kabupaten Ciamis, Jawa Barat 46268
- **Location**: Sindangkasih, Ciamis, West Java, Indonesia

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for Islamic educational values
- Optimized for Oracle Ampere A1 ARM architecture
- Hestia Control Panel integration

---

**Made with ❤️ for Islamic Education**
