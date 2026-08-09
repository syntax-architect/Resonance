# Resonance - Enterprise-Grade Audio Streaming Platform

![Resonance Banner](https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop)

Resonance is a high-performance, fully responsive audio streaming application inspired by Spotify. Built with modern web technologies, it demonstrates enterprise-level architecture, state management, and real-time backend integration.

## 🚀 Live Demo

*(Add your deployment link here, e.g., https://resonance-app.onrender.com)*

## ✨ Key Features

- **Full-Fledged Audio Player:** Global persistent audio player with play, pause, skip, and volume controls.
- **Dynamic Queue Management:** Interactive drag-and-drop queue system for seamless playback control.
- **Enterprise Authentication:** Secure user authentication and session management powered by Clerk.
- **Cloud Database Integration:** Real-time data synchronization and library management using Supabase.
- **Third-Party API Integration:** Dynamic music catalog fetched via the Jamendo API.
- **Responsive & Mobile-First:** A flawless user experience across all devices, featuring a desktop sidebar and a mobile-optimized tab bar.
- **Global State Management:** Efficient state handling for the player, queue, and user library using Zustand.

## 🛠️ Tech Stack

**Frontend Architecture:**
- **Framework:** React 19 + Vite (Blazing fast HMR and optimized builds)
- **State Management:** Zustand (Lightweight, unopinionated global state)
- **Routing:** React Router DOM v7
- **Styling:** Custom CSS with CSS Variables for theme consistency
- **Icons:** Lucide React

**Backend & Services:**
- **Authentication:** Clerk
- **Database (BaaS):** Supabase (PostgreSQL)
- **External Data:** Jamendo Music API

## 📦 Local Development Setup

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/resonance.git
cd resonance
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following keys:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here

# Supabase Database
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Jamendo Music API
VITE_JAMENDO_CLIENT_ID=your_jamendo_client_id_here
```

### 4. Run the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🏗️ Architecture & Design Decisions

- **Decoupled Backend:** By utilizing Supabase and Clerk, the application adheres to a modern Jamstack/Headless architecture. This allows the frontend to be served globally via a CDN (Static Site), ensuring infinite scalability and minimal latency.
- **Zustand over Redux:** Zustand was chosen for global state management (Player, Queue, Library) to reduce boilerplate while maintaining strict predictable state updates, which is crucial for a globally persistent audio player.
- **Vite Build System:** Migrated away from Create React App (CRA) to Vite for significantly faster cold starts and optimized production bundling using Rollup.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/resonance/issues).

## 📝 License

This project is [MIT](LICENSE) licensed.
