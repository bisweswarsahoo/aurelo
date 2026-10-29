# Aurelo 🎵 • Modern Web Music Player

**Aurelo** is a responsive, modern web-based music streaming application built with **React**, **Vite**, **Tailwind CSS**, and **Lucide React**. It harmonizes the **sleek dark-mode card ergonomics of Spotify** with the **clean, typography-driven, glassmorphic minimalism of Apple Music**.

Streaming lossless, royalty-free audio dynamically powered by the **FreeToUse API** with seamless offline/network fallback buffers.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### 2. Installation
Open your terminal in the project directory and install the dependencies:
```bash
npm install
```

### 3. Start Development Server
Launch the Vite local dev server with hot module replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port displayed in your terminal) in your browser.

### 4. Production Build
To create an optimized production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Project Architecture & Folder Structure

```
Aurelo/
├── index.html                  # HTML entry point (fonts, title, meta)
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration with React plugin
├── tailwind.config.js          # Tailwind CSS theme & styling configuration
├── postcss.config.js           # PostCSS setup
├── src/
│   ├── main.jsx                # Application root with AudioProvider wrapper
│   ├── App.jsx                 # Top-level layout & ambient glow orbs
│   ├── index.css               # Tailwind directives, glassmorphic panels, & custom sliders
│   ├── context/
│   │   └── AudioContext.jsx    # Global audio engine & state management
│   ├── services/
│   │   └── api.js              # FreeToUse API integration & verified fallback tracks
│   └── components/
│       ├── Sidebar.jsx         # Spotify-style dark navigation & playlists
│       ├── MainContent.jsx     # Apple Music stage: Hero, search, trending grid & tables
│       ├── PlayerBar.jsx       # Sticky bottom player: Scrubber, controls & volume
│       ├── ExpandedModal.jsx   # Fullscreen Apple Music immersive player modal
│       └── QueueDrawer.jsx     # Slide-over queue drawer with click-to-play
└── README.md                   # Documentation & setup guide
```

---

## 🎛️ Architecture & Audio State Engine

The player utilizes a centralized **`AudioContext`** (`/src/context/AudioContext.jsx`) to manage global playback state without interruption:

- **Single Persistent Audio Element**: Uses a persistent `HTMLAudioElement` via `useRef()` that stays active across all view transitions.
- **Synchronized Audio Events**: Real-time listeners for `timeupdate`, `loadedmetadata`, `ended`, `play`, `pause`, and `error`.
- **Dynamic Ambient Glow**: Evaluates the dominant color palette of the active track and smoothly morphs CSS variables (`--ambient-1`, `--ambient-2`, `--ambient-3`) in real-time.
- **Fail-Safe Fallback**: If network or CORS limits are reached, Aurelo automatically transitions to built-in high-fidelity audio streams.
- **Persistent Storage**: Liked tracks are synced to `localStorage`.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Space</kbd> | Play / Pause toggle |
| <kbd>&larr;</kbd> / <kbd>&rarr;</kbd> | Seek backward / forward 5 seconds |
| <kbd>&uarr;</kbd> / <kbd>&darr;</kbd> | Increase / decrease volume by 5% |
| <kbd>M</kbd> | Mute / Unmute audio |
| <kbd>L</kbd> | Like / Unlike active song |
| <kbd>/</kbd> | Focus search bar |
| <kbd>Esc</kbd> | Clear search / Close modal & queue drawer |
