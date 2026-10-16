# CampusWhisper Frontend

A high-performance, cryptographic anonymous student social network and campus pulse web application. Built with React 19, Tailwind CSS v4, Zustand, and Vite, CampusWhisper provides a modern, accessible interface for university students to discuss academic courses, placement updates, campus life, and confessions with complete identity decoupling and zero digital footprint.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Design System & Aesthetics](#design-system--aesthetics)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Environment Configuration](#environment-configuration)
- [Installation & Quick Start](#installation--quick-start)
- [Available Scripts](#available-scripts)
- [Application Routes](#application-routes)
- [State Management](#state-management)
- [Security & Privacy Principles](#security--privacy-principles)

---

## Overview

Traditional student forums often fail to protect student anonymity, exposing participants to academic bias, peer pressure, or social repercussions. CampusWhisper solves this problem through a decoupled architecture:
- Student credentials verify unique university affiliation during sign-in.
- Published content is cryptographically disconnected from account records.
- Each post and comment is assigned an ephemeral, rotating pseudonymous identity (e.g., "Anonymous Falcon", "Silent Architect").
- Sensitive safety issues can be escalated directly to university administration via an encrypted Safe Report portal.

---

## Key Features

### 1. Live Campus Feed & Channel Filtering
- Multi-channel filtering: Placement, Academics, Events, Confessions, and General.
- Real-time sort orders: Trending (algorithmic upvote velocity), Latest (chronological), and Top Discussed (comment volume).
- Instant global search across whisper text, channels, and pseudonyms.

### 2. Dual Whisper Composer
- Inline Feed Composer: Quick-publish bar located directly at the top of the feed with channel tags and focus expansion.
- Full-Screen Modal Composer: Includes live character countdown (0/500), channel selector pills, privacy guarantees, and keyboard shortcut (`Ctrl + Enter`).

### 3. Institutional Safe Reporting Portal
- Confidential incident submission for harassment, academic dishonesty, safety hazards, and discrimination.
- Severity classification: Standard Review, Urgent Priority, and Immediate Hazard.
- Automated Encrypted Reference Ticket Generator (`CW-SAFE-XXXX-XXX`) allowing students to follow up on review status anonymously without revealing identity.

### 4. Interactive Anonymous Posts
- Optimistic upvoting and downvoting with micro-animations.
- Expandable long-form content reading.
- Shareable permalinks with one-click clipboard copying.
- Bookmark and save functionality.
- Threaded discussions with community upvoting on replies.

### 5. Anonymous Identity Dashboard
- Profile management with pseudonym rotation generator.
- Verified student affiliation badge without exposing personal details.
- Real-time session metrics: Whispers Published, Upvotes Received, and Replies Posted.
- Transparent security audit summary detailing database decoupling.

### 6. Seamless Offline & Demo Resilience
- Intelligent fallback data: If backend microservices are offline or unreachable, the frontend gracefully loads verified seed discussions, enabling full UI testing, filtering, and interaction without runtime failures.
- One-click instant verified student demo access.

---

## Design System & Aesthetics

- Obsidian & Deep Slate Palette: Custom design tokens optimized for contrast, readability, and modern dark aesthetics (`#090d16` background, `#111827` surface).
- Glassmorphic Styling: Frosted glass panels with hardware-accelerated blur (`backdrop-blur-md`) and subtle border luminescence.
- Hardware-Accelerated CSS Animations: Smooth entrance fades (`animate-fade-in`), slide-ups (`animate-slide-up`), modal zooms (`animate-scale-in`), and glowing pulse indicators.
- Geometric Abstract Avatars: Deterministic multi-stop color gradients mapped to user aliases, providing visual distinction without using cartoon or emoji graphics.
- Strictly Zero Emojis: All iconography is powered exclusively by Lucide vector glyphs for a consistent, professional, and institutional appearance.

---

## Architecture & Tech Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | React | 19.2.4 | Component-based UI runtime with concurrent rendering |
| **Build Tool** | Vite | 8.0.3 | Next-generation ESM bundler and HMR dev server |
| **Styling** | Tailwind CSS | 4.2.2 | Utility-first CSS engine with modern `@theme` variables |
| **State Store** | Zustand | 5.0.12 | Lightweight, centralized, scalable state management |
| **Routing** | React Router | 7.13.2 | Client-side declarative application routing |
| **HTTP Client** | Axios | 1.12.2 | Promise-based HTTP client with request/response interceptors |
| **Icons** | Lucide React | 1.7.0 | Clean, customizable SVG vector icons |

---

## Project Directory Structure

```
CampusWhisper/
├── public/
│   ├── favicon.svg              # Platform icon
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── axios.js             # Centralized Axios client with JWT interceptors
│   ├── assets/                  # Static assets and vectors
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx # Route guard for authenticated members
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx    # Responsive 3-column layout container
│   │   │   ├── Navbar.jsx       # Fixed top glassmorphic navigation header
│   │   │   ├── Sidebar.jsx      # Left navigation & campus channels
│   │   │   └── RightWidgetSidebar.jsx # Right trending topics & ethics pulse
│   │   ├── modals/
│   │   │   └── CreatePostModal.jsx # Advanced whisper authoring modal
│   │   └── ui/
│   │       ├── CommentCard.jsx  # Threaded comment item component
│   │       ├── EmptyState.jsx   # Context-aware empty state visualizer
│   │       ├── ErrorMessage.jsx # High-visibility error notification banner
│   │       ├── InlineFeedComposer.jsx # Feed-top fast composer
│   │       ├── Loader.jsx       # Animated SVG loading spinner
│   │       └── PostCard.jsx     # Primary interactive whisper card
│   ├── pages/
│   │   ├── AuthPage.jsx         # Sign in, registration, and demo session
│   │   ├── HomeFeed.jsx         # Filterable, sortable campus live stream
│   │   ├── LandingPage.jsx      # Public product landing hero and preview
│   │   ├── NotificationsPage.jsx # Categorized peer notification feed
│   │   ├── PostDetails.jsx      # Individual whisper permalink and discussion
│   │   ├── ProfilePage.jsx      # Anonymous identity and privacy dashboard
│   │   └── SafeReportPage.jsx   # Institutional confidential whistleblower form
│   ├── store/
│   │   ├── useAuthStore.js      # Authentication, user session, and demo login
│   │   └── usePostStore.js      # Whispers list, optimistic votes, filtering, search
│   ├── utils/
│   │   ├── avatar.js            # Geometric gradient and initials generator
│   │   └── cn.js                # Tailwind class merging utility
│   ├── App.css
│   ├── App.jsx                  # Main routing configuration
│   ├── index.css                # Global CSS variables, design tokens, and keyframes
│   └── main.jsx                 # Application entry point
├── .env                         # Local environment variables
├── .env.example                 # Environment configuration template
├── index.html                   # HTML document root with Inter font bindings
├── package.json                 # Project dependencies and script definitions
└── vite.config.js               # Vite bundler configuration
```

---

## Environment Configuration

Environment variables are managed using standard Vite conventions. Variables intended for client-side consumption must be prefixed with `VITE_`.

### 1. Template File: `.env.example`
The repository includes a template file `.env.example`:

```bash
# Base URL of the backend API (Spring Boot REST service)
VITE_API_BASE_URL=http://localhost:8080/api

# Application Branding & Metadata
VITE_APP_NAME=CampusWhisper
VITE_APP_DESCRIPTION="Verified and Encrypted Anonymous Student Network"

# Feature Flags
VITE_ENABLE_OFFLINE_FALLBACK=true
```

### 2. Creating Local Configuration
To configure your local development environment:

```bash
cp .env.example .env
```

Ensure `VITE_API_BASE_URL` points to your active Spring Boot backend service.

---

## Installation & Quick Start

### Prerequisites
- Node.js: `v18.0.0` or higher
- npm: `v9.0.0` or higher

### Steps

1. Navigate to the frontend directory:
   ```bash
   cd CampusWhisper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Launch the development server:
   ```bash
   npm run dev
   ```

5. Access the application in your browser:
   ```
   http://localhost:5173
   ```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory. |
| `npm run preview` | Serves the production build locally for pre-deployment inspection. |
| `npm run lint` | Executes ESLint to verify code quality and style compliance. |

---

## Application Routes

| Path | Access Level | Description |
| :--- | :--- | :--- |
| `/` | Public | Platform landing page with hero overview and interactive preview. |
| `/login` | Public | Authentication portal (Sign In, Account Creation, Demo Access). |
| `/feed` | Public | Live campus stream with sorting, search, and channel filters. |
| `/categories` | Public | Channel-filtered views (Placements, Academics, Events, Confessions). |
| `/post/:id` | Public | Detailed whisper permalink with threaded discussions. |
| `/notifications` | Protected | Personal decoupled notifications for replies and milestones. |
| `/report` | Protected | Confidential whistleblower and ethics incident reporting. |
| `/profile` | Protected | Anonymous identity dashboard and pseudonym rotation. |

---

## State Management

Application state is managed using **Zustand**, providing predictable, reactive stores without boilerplate:

- **`useAuthStore`** ([`src/store/useAuthStore.js`](file:///E:/project/resume/Campus/Whisper/CampusWhisper/src/store/useAuthStore.js)):
  - Manages JWT tokens, authenticated student session, and logout lifecycle.
  - Implements `demoLogin()` for instant test access.
  - Synchronizes token state with browser `localStorage` and configures Axios headers.
  
- **`usePostStore`** ([`src/store/usePostStore.js`](file:///E:/project/resume/Campus/Whisper/CampusWhisper/src/store/usePostStore.js)):
  - Manages whisper collections, active channel filter, and active sorting method.
  - Manages global search queries across posts.
  - Implements optimistic upvoting and downvoting for immediate UI responsiveness.
  - Seamlessly handles fallback mock whispers when backend services are offline.

---

## Security & Privacy Principles

1. **Client-Side Decoupling**: Authenticated student credentials are used solely to sign API requests. The client UI never attaches email addresses, student IDs, or real names to whisper payloads.
2. **Ephemeral Personas**: When publishing whispers or replies, client payloads generate distinct pseudonyms from rotating pools to prevent cross-post identity linking.
3. **No Digital Fingerprinting**: The frontend does not record device telemetry, canvas fingerprints, or browser identifiers.
4. **Token Revocation**: Signing out immediately purges local session storage and resets all cached authentication states.

---

## License

This project is licensed under the MIT License.
