Globetrotter Challenge
The Globetrotter Challenge is a web-based geography quiz game where players guess cities based on clues, earn scores, and invite friends via unique links (e.g., ?inviter=2). The application features a responsive frontend, a robust backend API, and a PostgreSQL database, all deployed on free-tier cloud platforms. This project showcases full-stack development skills, including Dockerized deployments, secure authentication, and a modern UI.
Table of Contents

Features
Tech Stack
Project Structure
API Routes
Setup Instructions
Prerequisites
Local Development
Docker Deployment


Deployed Links
Technical Choices
Challenges and Solutions
Future Improvements
Contact

Features

Interactive Quiz Game: Players guess cities from clues, with options to select answers and view fun facts/trivia.
User Authentication: Secure signup/login with JWT-based authentication.
Invite System: Share unique invite links (e.g., ?inviter=2) to display an inviter’s score without authentication.
Score Tracking: Tracks correct/incorrect answers, displayed in a score card.
Responsive UI: Modern, accessible frontend with animations (Confetti/SadFace) and a blue-purple gradient theme.
Dockerized Backend: Single container with Node.js and PostgreSQL, seeded with 100 destinations.
Cloud Deployment: Frontend on Vercel, backend on Render (free tier).

Tech Stack
Frontend

React: Component-based UI library for dynamic rendering.
Vite: Fast build tool for development and production.
Tailwind CSS: Utility-first CSS framework for styling.
shadcn/ui: Reusable UI components (Button, Card, Input) for a polished look.
React Router: Client-side routing for navigation (e.g., /login, /game).
Axios: HTTP client for API calls (via useApi.js).
Vercel: Hosting platform for frontend deployment.

Backend

Node.js/Express: Server framework for building RESTful APIs.
PostgreSQL: Relational database for storing users, scores, and destinations.
Sequelize: ORM for database interactions.
JWT: Secure authentication with JSON Web Tokens.
bcrypt: Password hashing for user security.
Docker: Containerization for consistent backend deployment.
Render: Hosting platform for Dockerized backend.

Additional Tools

Git/GitHub: Version control and code hosting.
ESLint/Prettier: Code linting and formatting.
Postman: API testing during development.
Nodemon: Auto-restart server during development.

Project Structure
globetrotter-challenge/
├── backend/
│   ├── controllers/         # Business logic for routes
│   ├── db/                 # Database connection (Sequelize)
│   ├── middleware/         # Authentication and error handling
│   ├── models/             # Database queries
│   ├── routes/             # API endpoints
│   ├── sql/                # Seed data (100 destinations, users)
│   ├── .env                # Environment variables
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   ├── Dockerfile          # Docker configuration
│   ├── start.sh            # Script to start PostgreSQL and Node.js
│   ├── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components (ClueCard, InvitePopup)
│   │   ├── pages/          # Page components (GamePage, Login)
│   │   ├── lib/            # API utility (useApi.js)
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   ├── public/             # Static assets
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── vite.config.js      # Vite configuration
│   ├── package.json
├── README.md

API Routes
All routes are prefixed with /api/v1.
Authentication (/auth)



Method
Endpoint
Description
Auth Required



POST
/signup
Register a new user
No


POST
/login
Login and receive JWT token
No


Game (/game)



Method
Endpoint
Description
Auth Required



GET
/
Fetch game data (clues, options)
Yes


POST
/submit
Submit answer and get result
Yes


Score (/score)



Method
Endpoint
Description
Auth Required



GET
/
Get current user’s scores
Yes


GET
/invitee/:userId
Get inviter’s score (public)
No


Setup Instructions
Prerequisites

Node.js: v18 or higher
Docker: For running the backend container
Git: For cloning the repository
PostgreSQL: Included in Docker container (no separate install needed)
npm: For installing dependencies

Local Development

Clone the Repository:
git clone https://github.com/yourusername/globetrotter-challenge.git
cd globetrotter-challenge


Backend Setup:

Navigate to backend/:cd backend


Install dependencies:npm install


Create a .env file:DB_USER=postgres
DB_HOST=localhost
DB_NAME=globetrotter
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret


Run the backend:npm start


Server runs on http://localhost:8080.




Frontend Setup:

Navigate to frontend/:cd frontend


Install dependencies:npm install


Create a .env file:VITE_API_URL=http://localhost:8080/api/v1


Run the frontend:npm run dev


App runs on http://localhost:5173.




Test the App:

Open http://localhost:5173 in a browser.
Sign up/login, play the quiz, and test the invite link (http://localhost:5173/?inviter=2).



Docker Deployment

Build and Run Backend:

From backend/:docker build -t globetrotter-backend .
docker run -p 8080:8080 --env-file .env globetrotter-backend


The Docker container includes PostgreSQL, seeded with 100 destinations and a sample user (id=2).


Verify:

Check http://localhost:8080/api/v1/score/invitee/2:{ "username": "inviter_user", "scores": { "correct_score": 10, "incorrect_score": -5 } }





Deployed Links

Frontend: https://globetrotter-frontend.vercel.app
Test the invite link: https://globetrotter-frontend.vercel.app/?inviter=2


Backend: https://globetrotter-backend.onrender.com
API base URL: https://globetrotter-backend.onrender.com/api/v1


GitHub Repository: https://github.com/yourusername/globetrotter-challenge

Note: Render’s free tier may cause cold start delays (10-30s). The database is seeded on each restart due to ephemeral storage.
Technical Choices

React + Vite: Chosen for fast development and hot module replacement, ideal for a dynamic SPA.
Tailwind CSS + shadcn/ui: Enabled rapid UI development with reusable, customizable components.
Node.js/Express: Lightweight and flexible for building RESTful APIs.
PostgreSQL + Sequelize: Relational database with ORM for structured data and easy queries.
Docker: Ensures consistent backend environments, embedding PostgreSQL for simplicity.
JWT Authentication: Secure, stateless authentication suitable for a small-scale app.
Vercel/Render: Free-tier platforms for easy deployment, with Vercel optimized for frontend and Render supporting Docker.
100 Destinations: Expanded dataset to enhance game variety, covering global cities.

Challenges and Solutions

PostgreSQL Connection Error (ECONNREFUSED):
Issue: Backend failed to connect to PostgreSQL in Docker on Render.
Solution: Updated start.sh to ensure PostgreSQL starts and seeds correctly, set DB_HOST=localhost.


Ephemeral Storage on Render:
Issue: Free tier resets PostgreSQL data on redeploy.
Solution: Seeded database with sql/seed.sql on startup, ensuring userId=2 for invite links.


Button Color Uniformity:
Issue: All buttons used the same color, reducing UX clarity.
Solution: Applied distinct Tailwind colors (blue, green, purple, pink) in GamePage.jsx and InvitePopup.jsx.


CORS Configuration:
Issue: Frontend API calls failed due to CORS restrictions.
Solution: Configured app.js to allow localhost:5173 and Vercel’s domain.



Future Improvements

Persistent Storage: Integrate Supabase for free, persistent PostgreSQL to retain user data.
Leaderboard: Add a global leaderboard to display top players.
Multiplayer Mode: Enable real-time challenges between friends.
Accessibility: Enhance ARIA labels and keyboard navigation for better inclusivity.
Performance: Implement API caching (e.g., Redis) to reduce Render cold start delays.

Contact

Name: [Your Full Name]
Email: [your.email@example.com]
LinkedIn: https://linkedin.com/in/yourprofile
GitHub: https://github.com/yourusername

Thank you for reviewing my project! I’m excited to discuss how my skills in full-stack development, cloud deployment, and UI/UX design can contribute to your team.
