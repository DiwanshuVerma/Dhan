# Dhan 💸

Dhan is a full-stack project built to explore and implement secure database transactions using MongoDB. The project focuses on financial transactions with the concept of "do all or do nothing" to ensure data consistency. It allows users to register, sign in, view their dashboard, search for other users, and send money to selected users.

## 🚀 Features

- **User Authentication**: Secure signup and signin with JWT-based authentication.
- **Dashboard**:
  - Displays the logged-in user's balance (generated randomly for demo purposes).
  - Lists all registered users fetched from MongoDB, each with a balance and a "Send Money" button.
  - Real-time search functionality to find users directly from the database.
  - Logout option to clear JWT token and redirect to signin page.
- **Send Money**:
  - Allows users to transfer money to other registered users.
  - Ensures transactional integrity using MongoDB sessions.

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**:
  - Backend hosted on **Render
  - Frontend hosted on [Netlify](https://dhan-fe.netlify.app/)
