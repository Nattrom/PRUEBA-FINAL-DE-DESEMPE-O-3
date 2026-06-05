# Workspace Reservation System SPA

## Overview

Workspace Reservation System is a Single Page Application (SPA) built with JavaScript, Vite, TailwindCSS, and JSON Server.

The application simulates a workspace booking platform where users can authenticate, manage reservations, and access features according to their role.

The project follows a modular architecture and demonstrates the implementation of:

- Authentication
- Role-based access
- Session persistence
- API consumption
- SPA routing
- CRUD operations
- DOM manipulation
- Reusable components
- Error handling

---

## Features

Authentication

- User login
- Session persistence using LocalStorage
- Logout functionality
- Credential validation against JSON Server

User Role

Users can:

- View their own reservations
- Create new reservations
- Check reservation status

Administrator Role

Administrators can:

- View all reservations
- Approve reservations
- Reject reservations
- Delete reservations
- Manage reservation requests

Reservation Management

- Create reservations
- Display reservation details
- Update reservation status
- Delete reservations

Routing

- SPA navigation
- Dynamic view rendering
- Custom 404 page for unknown routes

---

## Technologies Used

- JavaScript (ES6+)
- Vite
- TailwindCSS
- JSON Server
- HTML5
- CSS3

---

## Project Structure

src
│
├── api
│   └── http.js
│
├── components
│   ├── Sidebar.js
│   └── ReservationCard.js
│
├── controllers
│   ├── login.controller.js
│   └── home.controller.js
│
├── router
│   └── router.js
│
├── services
│   └── reservation.service.js
│
├── views
│   ├── loginView.js
│   ├── homeView.js
│   └── notFound.js
│
├── utils.js
├── main.js
└── style.css

---

## Architecture

Views

Views are responsible for rendering the user interface.

Examples:

- Login View
- Home View
- Not Found View

Controllers

Controllers contain business logic and event handling.

Responsibilities:

- Form submission
- Authentication
- API interaction
- Reservation management
- DOM updates

Services

Services centralize API requests.

Examples:

- Get reservations
- Create reservations
- Update reservations
- Delete reservations

Components

Reusable UI elements.

Examples:

- Sidebar
- Reservation Card

Router

Handles SPA navigation and view rendering.

Utilities

Helper functions for:

- Session storage
- Authentication checks
- Role validation

---

## API

The project uses JSON Server as a mock REST API.

Users

{
  "id": 1,
  "email": "admin@test.com",
  "password": "A123456",
  "role": "admin",
  "name": "Administrator"
}

{
  "id": 2,
  "email": "user@test.com",
  "password": "A123456",
  "role": "user",
  "name": "User"
}

Reservations

{
  "id": 1,
  "userId": 2,
  "workspace": "Meeting Room A",
  "date": "2026-01-15",
  "startHour": "08:00",
  "endHour": "09:00",
  "reason": "Sprint Planning",
  "status": "pending"
}

---

## Installation

Install dependencies:

npm install

---

## Running the Application

Start the development server:

npm run dev

This command runs:

- Vite
- JSON Server

simultaneously.

---

## Example Scripts

{
  "scripts": {
    "client": "vite",
    "server": "json-server --watch db.json --port 3001",
    "dev": "concurrently \"npm run client\" \"npm run server\""
  }
}

---

## Test Credentials

Administrator

Email: admin@test.com
Password: A123456

User

Email: user@test.com
Password: A123456

---

## Reservation Workflow

User

1. Login
2. Access Home Page
3. Create a new reservation
4. View personal reservations
5. Logout

Administrator

1. Login
2. View all reservations
3. Approve reservations
4. Reject reservations
5. Delete reservations
6. Logout

---

## Error Handling

The application includes:

- Invalid credentials validation
- API error handling
- Empty state handling
- Custom 404 page

---

## Future Improvements

- Workspace CRUD
- Advanced route guards
- Reservation editing
- Reservation filters
- Search functionality
- Dashboard analytics
- Notifications system
- Role management

---

## Author

Developed Natalia Romerin Rincon as part of a JavaScript SPA training project using Vite, TailwindCSS, and JSON Server.