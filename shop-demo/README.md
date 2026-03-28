# Shop Demo - E-Commerce Platform

A modern e-commerce web application built with React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Browse and search products
- 🛒 Shopping cart management
- 👤 User authentication (login/register)
- 📦 Order management
- 💳 Checkout process
- 📱 Responsive design
- ⚡ Fast performance with Vite

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form

## Project Structure

```
src/
├── components/        # Reusable components
├── pages/            # Page components
├── store/            # Redux store and slices
├── services/         # API services
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and validators
├── hooks/            # Custom React hooks
├── routes/           # Route configuration
├── styles/           # Global styles
└── App.tsx          # Root component
```

## Getting Started

### Prerequisites

- Node.js 16+ or pnpm 7+

### Installation

```bash
# Install dependencies
pnpm install

# Create .env file from example
cp .env.example .env
```

### Development

```bash
# Start dev server
pnpm dev

# Open browser at http://localhost:5173
```

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Linting

```bash
# Run ESLint
pnpm lint
```

## Code Standards

This project follows strict TypeScript and React standards. See `CLAUDE.md` for detailed coding guidelines including:

- Type definitions
- Component structure
- State management patterns
- Styling conventions
- API service abstraction
- Testing requirements
- Git commit conventions

## API Integration

The app uses a mock API layer via services. To connect to a real API:

1. Update `API_BASE_URL` in `src/services/api.ts`
2. Implement the API endpoints according to the specifications in `plan.md`

## Mock Data

Currently using mock data in services. Replace mock calls with actual API calls as needed.

## Contributing

Please follow the code standards outlined in `CLAUDE.md` when contributing.

## License

This project is licensed under the MIT License.
