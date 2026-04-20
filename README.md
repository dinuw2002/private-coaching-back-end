Private Coaching Platform - Backend

This is the robust, type-safe API powering the Private Coaching Platform. It is built using the MERN stack (MongoDB, Express, Node.js) with a focus on security and scalable architecture.

⚙️ Getting Started
1. Prerequisites
Node.js (v18 or higher)

A MongoDB Atlas account and cluster

2. Installation
Clone the repository and install the dependencies:

git clone <your-backend-repo-link>
cd backend
npm install

3. Environment Setup
Create a .env file in the root directory and add your credentials:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/private_coaching
JWT_SECRET=your_super_secret_random_string

4. Run the Server

# Development mode with hot-reloading
npm run dev

# Production build
npm run build
npm start

The API will be live at http://localhost:5000

📡 API Endpoints

Method               Endpoint                         Description       
POST               /api/auth/register          Register a new user account
POST               /api/auth/login             Validate credentials and return JWT