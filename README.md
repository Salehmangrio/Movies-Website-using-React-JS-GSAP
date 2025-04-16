
# React Movie App

This is a simple movie application built with **React**, **Vite**, and **TailwindCSS**. It allows users to search for movies and view details about them, including cast and crew information.
The app uses the TMDB API to fetch movie data and displays it in a user-friendly interface. The application is designed to be responsive and works well on both desktop and mobile devices.
The app is built using modern React features and follows best practices for state management and component structure. It also includes animations using **GSAP** for a more engaging user experience.
The app is structured to be modular, making it easy to add new features or modify existing ones. The use of TailwindCSS allows for rapid styling and customization without the need for complex CSS files.

## Table of Contents
- [React Movie App](#react-movie-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [App Structure](#app-structure)
    - [Routing Setup](#routing-setup)
  - [Dependencies](#dependencies)
  - [Getting Started](#getting-started)

## Features

- ⚛️ React 19 with Vite
- 🚀 Fast Refresh using Vite
- 🎬 Movie and Actor Pages
- 🔎 Search functionality
- 🌈 TailwindCSS for styling
- 🎥 GSAP for animations
- 📡 Axios for API calls
- 📁 Modular file structure
- 🌐 Routing with `react-router-dom`

## App Structure

```bash
src/
│
├── components/
│   └── Navbar.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Movies.jsx
│   ├── MovieDetails.jsx
│   ├── Search.jsx
│   ├── Actors.jsx
│   └── ActorDetails.jsx
│
└── App.jsx
```

### Routing Setup

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Actors from './pages/Actors';
import ActorDetails from './pages/ActorDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/actor/:id" element={<ActorDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
```

## Dependencies

```json
"dependencies": {
  "@gsap/react": "^2.1.2",
  "@heroicons/react": "^2.2.0",
  "@tailwindcss/vite": "^4.1.4",
  "axios": "^1.8.4",
  "gsap": "^3.12.7",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.5.0",
  "tailwindcss": "^4.1.4"
}
```

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/Salehmangrio/Movies-Website-using-React-JS-GSAP.git
   cd Movies-Website-using-React-JS-GSAP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```
