# Complaints Management System

A modern, feature-rich complaints management system built with React and TypeScript. This application provides a comprehensive platform for managing government complaints, users, and units with a beautiful, responsive UI.

## 🚀 Features

### Core Functionality
- **Complaints Management**: Create, view, assign, and track complaints with detailed information
- **User Management**: Manage users with role-based access control
- **Government Units**: Create and manage government units with manager assignments
- **Statistics Dashboard**: Visual analytics with charts and KPIs
- **Activity Logs**: Track all system activities with filtering and export capabilities
- **Version History**: View complaint version history and changes

### Technical Features
- **Authentication & Authorization**: Secure login system with role-based access control
- **Internationalization (i18n)**: Support for English and Arabic languages
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Real-time Updates**: Powered by React Query for efficient data fetching and caching
- **Form Validation**: Comprehensive form validation using React Hook Form and Yup

## 🛠️ Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Pre-built component library
- **Lucide React** - Icon library
- **Recharts** - Chart library for statistics

### State Management & Data Fetching
- **Zustand** - Lightweight state management
- **TanStack Query (React Query)** - Server state management and data fetching
- **React Hook Form** - Form state management
- **Yup** - Schema validation

### Routing & Navigation
- **React Router DOM** - Client-side routing
- **TanStack Router** - Type-safe routing

### HTTP Client
- **Axios** - HTTP client with interceptors

### Internationalization
- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next

### Other Libraries
- **Sonner** - Toast notifications
- **React Toastify** - Additional toast notifications
- **class-variance-authority** - Component variant management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd complaints-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_BASE_URL=your-api-base-url
   ```
   
   Example:
   ```env
   VITE_BASE_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## 📁 Project Structure

```
complaints-system/
├── public/                 # Static assets
│   └── images/             # Image files
├── src/
│   ├── features/           # Feature modules
│   │   ├── activity-log/   # Activity log feature
│   │   ├── auth/           # Authentication feature
│   │   ├── complaints/     # Complaints management
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── government-unit/# Government units management
│   │   ├── statistics/     # Statistics and analytics
│   │   ├── users/          # User management
│   │   └── version-history/# Version history tracking
│   ├── shared/             # Shared components and utilities
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   └── layouts/        # Layout components
│   ├── lib/                # Library configurations
│   │   ├── axios/          # Axios configuration
│   │   └── storage/        # Storage utilities
│   ├── stores/             # Zustand stores
│   ├── routes/             # Route configuration
│   ├── locales/            # Translation files
│   │   ├── en.json         # English translations
│   │   └── ar.json         # Arabic translations
│   ├── theme/              # Theme configuration
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Application entry point
├── package.json
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Features Overview

### Authentication
- Secure login system
- Role-based access control
- Protected routes
- Token-based authentication

### Complaints Management
- View all complaints in a table format
- Filter complaints by status, date, and other criteria
- Assign complaints to users
- Add notes to complaints
- Export complaints data
- Pagination support

### Dashboard
- Overview statistics
- Quick access to main features
- Visual data representation

### User Management
- Create, edit, and delete users
- User role management
- User filtering and search
- Pagination support

### Government Units
- Create and manage government units
- Assign managers to units
- Edit unit information
- Unit filtering and pagination

### Statistics
- KPI cards showing key metrics
- Line charts for trends
- Pie charts for distribution
- Export statistics data

### Activity Logs
- View all system activities
- Filter by date, user, and action type
- Export activity logs
- Pagination support

## 🌐 Internationalization

The application supports multiple languages:
- **English (en)** - Default language
- **Arabic (ar)** - RTL support

To add a new language:
1. Create a new JSON file in `src/locales/`
2. Add the language to `src/i18n/config.ts`
3. Use the `useTranslation` hook in components

## 🎨 Theming

The application supports both light and dark themes:
- Theme preference is persisted in localStorage
- Toggle theme using the theme toggle component
- All components are theme-aware

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BASE_URL` | Base URL for the API | Yes |

## 🚀 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

   The built files will be in the `dist/` directory.

## 📝 Code Style

The project uses ESLint for code linting. Run `npm run lint` to check for issues.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure code passes linting (`npm run lint`)
4. Submit a pull request

## 📄 License

This project is private and proprietary.

## 👥 Authors

- Yumna

## 🙏 Acknowledgments

- Built with modern React best practices
- Uses shadcn/ui for beautiful, accessible components
- Powered by Vite for fast development experience
