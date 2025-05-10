# Globetrotter Challenge 🌍

The **Globetrotter Challenge** is a web-based geography quiz game where players guess cities based on clues, earn scores, and invite friends via unique links (e.g., `?inviter=2`). It features a responsive frontend, robust backend API, and PostgreSQL database, all deployed on free-tier cloud platforms. This project highlights full-stack development, Dockerized deployments, secure authentication, and a modern UI.

---

## 🧭 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Docker Deployment](#docker-deployment)
- [Deployed Links](#deployed-links)
- [Technical Choices](#technical-choices)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Improvements](#future-improvements)
- [Contact](#contact)

---

## ✨ Features

- **Interactive Quiz Game** – Players guess cities from clues, choose answers, and view fun facts/trivia.
- **User Authentication** – Secure JWT-based signup/login system.
- **Invite System** – Share invite links like `?inviter=2` to show inviter’s score without login.
- **Score Tracking** – Tracks correct/incorrect answers and displays a score card.
- **Responsive UI** – Stylish frontend with animations (Confetti/SadFace) and a modern gradient theme.
- **Dockerized Backend** – Single container with Node.js and PostgreSQL, seeded with 100 destinations.
- **Cloud Deployment** – Frontend on Vercel, backend on Render (free-tier).

---

## 🛠️ Tech Stack

### Frontend

- **React** – Component-based UI
- **Vite** – Fast bundler for dev/prod
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui** – Reusable UI components
- **React Router** – Client-side routing
- **Axios** – HTTP client
- **Vercel** – Frontend deployment

### Backend

- **Node.js / Express** – Server framework
- **PostgreSQL** – Relational database
- **Sequelize** – ORM for DB queries
- **JWT** – JSON Web Token for auth
- **bcrypt** – Password hashing
- **Docker** – Containerization
- **Render** – Docker backend hosting

### Additional Tools

- **Git/GitHub** – Version control
- **Postman** – API testing
- **ESLint / Prettier** – Code quality
- **Nodemon** – Dev auto-restart

---

## 📁 Project Structure

globetrotter-challenge/
├── backend/
│ ├── controllers/ # Route logic
│ ├── db/ # DB connection (Sequelize)
│ ├── middleware/ # Auth and error handling
│ ├── models/ # DB models
│ ├── routes/ # API endpoints
│ ├── sql/ # Seed data
│ ├── .env # Environment variables
│ ├── app.js # Express config
│ ├── server.js # Entry point
│ ├── Dockerfile # Docker config
│ ├── start.sh # Init script
├── frontend/
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Game/Login pages
│ │ ├── lib/ # API utils
│ ├── public/ # Static assets
│ ├── tailwind.config.js # Tailwind config
│ ├── vite.config.js # Vite config
├── README.md


---

## 📡 API Routes

All endpoints are prefixed with `/api/v1`.

### Authentication (`/auth`)

| Method | Endpoint  | Description             | Auth Required |
|--------|-----------|-------------------------|----------------|
| POST   | /signup   | Register new user       | ❌             |
| POST   | /login    | Login and get token     | ❌             |

### Game (`/game`)

| Method | Endpoint  | Description                 | Auth Required |
|--------|-----------|-----------------------------|----------------|
| GET    | /         | Fetch clues and options     | ✅             |
| POST   | /submit   | Submit answer and result    | ✅             |

### Score (`/score`)

| Method | Endpoint              | Description                      | Auth Required |
|--------|------------------------|----------------------------------|----------------|
| GET    | /                      | Get current user’s scores        | ✅             |
| GET    | /invitee/:userId       | Get inviter's score (public)     | ❌             |

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18+)
- Docker
- Git
- npm (Node package manager)

---
## 🛠️ High Level Design
<img width="1046" alt="Screenshot 2025-05-11 at 3 43 42 AM" src="https://github.com/user-attachments/assets/3f25c17d-e7af-4566-baad-33fef39a1efa" />



