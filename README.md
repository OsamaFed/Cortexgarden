# Cortexgarden 🌳

Cortexgarden is a web-based platform that offers cognitive and logic games designed to enhance focus, reasoning, and memory through interactive quizzes and mental exercises.  
This project was developed to apply what I have recently learned in **Next.js**, including app routing, state management, and modular component design.

---

## Overview

Cortexgarden combines modern web technologies to deliver a dynamic and responsive game experience.  
It uses **Next.js App Router** for routing and APIs, **React** for UI components, and **Redux Toolkit** for centralized state management.  
The application also supports light and dark themes, and utilizes efficient caching for smooth gameplay.

---

## Tech Stack

| Category | Technology | Description |
|-----------|-------------|-------------|
| Framework | **Next.js (v15.5.4)** | Application framework with app routing and server-side rendering |
| Library | **React (v19.1.0)** | UI library for building modular and interactive components |
| State Management | **Redux Toolkit (v2.9.0)** | Simplified and centralized state management |
| React Integration | **react-redux (v9.2.0)** | Connects React components to the Redux store |
| Theming | **next-themes (v0.4.6)** | Manages light and dark modes |
| Icons | **lucide-react (v0.545.0)** | Provides scalable and modern icons |
| Utility | **he (v1.2.0)** | Decodes HTML entities inside trivia content |

---

## Features

- Cognitive and logic-based games  
- Dynamic trivia and math question generation  
- Centralized state handling with Redux Toolkit  
- Light and dark theme support  
- Responsive design using CSS Modules  
- Local caching and efficient data fetching  
- Modular, maintainable codebase  

---
## Project Structure

/app
├── all-games/
│   └── page.js
├── api/
│   ├── math-questions/
│   │   └── route.js
│   ├── questions/
│   │   └── route.js
├── mind-train/
│   └── page.js
├── play/
│   ├── results/
│   ├── page.js
│   ├── Results.module.css
│   ├── Error.js
│   ├── FinishOverlay.js
│   ├── GameCard.js
│   ├── Loading.js
│   ├── NoGames.js
│   └── Play.module.css
├── favicon.ico
├── GameSelector.js
├── globals.css
├── layout.js
├── page.js
├── page.module.css
├── providers.js
└── welcome.module.css

/components
├── Spinner.js
├── Spinner.module.css
└── ThemeToggle.js

/lib
├── gameLogic.js
└── questionCache.js

/store
├── Gameslice.js
├── Prov.js
└── useGameStore.js
### Purpose
Cortexgarden was created as a personal project to practice and showcase the concepts I recently learned in **Next.js**, **React**, and **Redux Toolkit**.  
The goal was to integrate modern web technologies into a single, maintainable, and interactive application that focuses on cognitive and logic-based games.
