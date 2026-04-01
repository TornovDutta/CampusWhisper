# Annomus02

A modern, anonymous social platform built with React, allowing users to share posts, engage with content, and report issues safely.

## Features

- **Anonymous Posting**: Share thoughts and content without revealing identity
- **Public Feed**: Browse posts from all users on the public feed
- **User Authentication**: Secure login and registration system
- **Post Interactions**: View detailed posts with comments and reactions
- **Notifications**: Stay updated with activity notifications
- **Safe Reporting**: Confidential reporting system for serious issues
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern UI with consistent theming

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Linting**: ESLint

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd annomus02
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── components/
│   ├── auth/          # Authentication components
│   ├── layout/        # Layout components (Navbar, Sidebar, etc.)
│   ├── modals/        # Modal dialogs
│   └── ui/            # Reusable UI components
├── pages/             # Page components
├── store/             # Zustand state stores
├── utils/             # Utility functions
└── api/               # API configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
