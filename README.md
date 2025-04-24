# Order Management System

A comprehensive order management application with server-side pagination, built with Next.js 15, React 19, Mantine UI, and Tailwind CSS for the frontend, and Nest.js with Prisma for the backend.

## Features

- **Dashboard** with key metrics and recent activity
- **Order Management**
  - Create, view, edit, and delete orders
  - Change order status
  - Associate products with orders
  - Manage customer information
- **Customer Management**
  - Customer database with search functionality
  - Customer order history
  - Customer details and metrics
- **Product Management**
  - Product catalog with categories
  - Stock management
  - Product details and pricing
- **Server-side Pagination** for optimal performance
- **Responsive Design** for all device sizes
- **Swagger API Documentation**
- **Global State Management** with Zustand
- **Docker Development Environment**

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- Mantine UI Components
- Tailwind CSS
- TypeScript
- Zustand (State Management)

### Backend
- Nest.js
- Prisma ORM
- PostgreSQL
- Swagger (API Documentation)

### DevOps
- pnpm (Monorepo)
- Docker & Docker Compose
- GitHub Actions (CI/CD)

## Project Structure

```
order-management/
├── apps/
│   ├── web/                 # Frontend Next.js
│   └── api/                 # Backend Nest.js
├── packages/
│   ├── database/            # Prisma schema and migrations
│   ├── eslint-config/       # Shared ESLint configuration
│   └── tsconfig/            # Shared TypeScript configuration
├── pnpm-workspace.yaml
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL (or Docker)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/order-management.git
   cd order-management
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory:
   ```plaintext
   # Database
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/order_management"

   # API
   NEXT_PUBLIC_API_URL="http://localhost:3001/api"
   ```

4. Generate Prisma client and push schema to database
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

5. Start the development servers
   ```bash
   pnpm dev
   ```

### Using Docker

Alternatively, you can use Docker to run the entire application:

```bash
docker-compose up -d
```

This will start:

- PostgreSQL database on port 5432
- API server on port 3001
- Web application on port 3000

## Development Workflow

### Running in Development Mode

```bash
# Run both frontend and backend
pnpm dev

# Run only frontend
pnpm --filter web dev

# Run only backend
pnpm --filter api dev
```

### Database Management

```bash
# Open Prisma Studio
pnpm db:studio

# Apply schema changes
pnpm db:push

# Generate Prisma client
pnpm db:generate
```

### Building for Production

```bash
pnpm build
```

## Deployment

### Manual Deployment

1. Build the application
   ```bash
   pnpm build
   ```

2. Start the production servers
   ```bash
   pnpm start
   ```

### CI/CD Pipeline

The project includes a GitHub Actions workflow in `.github/workflows/ci.yml` that:

1. Runs linting
2. Builds the application
3. Deploys to production (when merged to main)

## API Documentation

See [API.md](./docs/API.md) for detailed API documentation.

## Authors

See [AUTHORS.md](./AUTHORS.md) for information about the project contributors.

## License

This project is licensed under the MIT License - see the LICENSE file for details.