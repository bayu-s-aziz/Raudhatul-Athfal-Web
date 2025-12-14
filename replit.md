# RA Al-Islam School Website

## Overview

This is a website for Raudhatul Athfal Al-Islam, an Islamic kindergarten (PAUD) school located in Sindangkasih, Ciamis, West Java, Indonesia. The website serves as an informational and promotional platform for the school, featuring pages for home, school profile, educational programs, photo gallery, and contact form.

The project is a full-stack TypeScript application with a React frontend and Express backend, designed to showcase the school's Islamic educational programs, facilities, and values to prospective parents.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **Build Tool**: Vite with React plugin

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Layout components (Header, Footer, Layout) in `client/src/components/layout/`
- Feature-specific components in `client/src/components/home/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for TypeScript execution
- **API Pattern**: RESTful API with `/api` prefix
- **Storage**: In-memory storage (MemStorage class) with interface for future database integration

The backend serves:
- Static files in production
- API routes for contact form submissions
- Vite dev server middleware in development

### Design System
- Custom color palette based on green (primary) and gold/yellow (accent) to reflect Islamic heritage
- Typography using Poppins font family
- Light/dark theme support via ThemeProvider context
- Responsive design with mobile-first approach

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Defined in `shared/schema.ts` with tables for school info, programs, facilities, gallery, announcements, and contact messages
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod

## External Dependencies

### Database
- PostgreSQL database (configured via `DATABASE_URL` environment variable)
- Drizzle Kit for database migrations (`npm run db:push`)

### Third-Party UI Libraries
- Radix UI primitives for accessible components
- Embla Carousel for image carousels
- Lucide React for icons
- class-variance-authority for component variants

### Build & Development
- Vite for frontend bundling with HMR
- esbuild for server bundling in production
- Replit-specific plugins for development (cartographer, dev-banner, error overlay)

### Session Management
- connect-pg-simple for PostgreSQL session storage (available but not currently implemented)
- memorystore as fallback session storage