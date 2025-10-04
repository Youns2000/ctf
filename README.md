# CTF Platform

A full-stack Capture The Flag (CTF) platform built with Node.js/Express backend and React frontend.

## Features

- User authentication with JWT and Passport.js
- Email verification system
- MongoDB database integration
- RESTful API
- React-based frontend with Bootstrap styling
- Session management

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** (Mongoose ODM)
- **Authentication**: Passport.js (Local & JWT strategies)
- **Password Hashing**: bcrypt
- **Email**: Nodemailer with Mailgun

### Frontend
- **React** 17
- **React Router** for navigation
- **Bootstrap** & React Bootstrap for UI
- **Axios** for API calls
- **Framer Motion** for animations

## Prerequisites

- Node.js (v12 or higher)
- MongoDB instance
- Mailgun account (for email functionality)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ctf
```

2. Install server dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
cd ..
```

4. Configure environment variables:
   - Update MongoDB connection string in `app.js`
   - Configure email settings in `email.js`
   - Update JWT secret in `config.js`

## Running the Application

### Development Mode

Run the server with auto-reload:
```bash
npm run dev
```

### Production Mode

Build and start both server and client:
```bash
npm start
```

The server runs on port 5000 (or configured port) and the React app proxies API requests to it.

## Project Structure

```
ctf/
├── client/              # React frontend
│   ├── src/
│   ├── public/
│   └── build/
├── models/              # Mongoose models
├── routes/              # Express routes
│   └── api.js
├── db_mysql/            # Database utilities
├── app.js               # Main server file
├── email.js             # Email configuration
└── config.js            # Configuration file
```

## API Routes

All API routes are prefixed with `/api` and defined in `routes/api.js`.

## License

ISC
