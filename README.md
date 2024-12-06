# IRCTC Booking System

This is a simple Train Ticket Booking System built with Node.js, Express, MySQL, and JWT for user authentication. It allows users to register, log in, view trains based on routes, and book tickets. It also implements basic seat availability handling with database transactions to avoid race conditions during bookings.

## Features

- **User Registration**: Users can create accounts with a name, email, and password.
- **User Login**: Registered users can log in using their email and password, which generates a JWT for further authentication.
- **Train Search**: Users can search for trains based on the source and destination.
- **Seat Booking**: Users can book seats on available trains.
- **Race Condition Handling**: Ensures that multiple users cannot book the same seat simultaneously.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MySQL**: Relational database to store user and booking data
- **JWT (JSON Web Token)**: For user authentication
- **bcryptjs**: For hashing user passwords
- **dotenv**: For managing environment variables

## Setup and Installation

### Prerequisites

- **Node.js** and **npm** should be installed. If not, you can download and install them from [Node.js official website](https://nodejs.org/).
- **MySQL** should be installed and running.

### Steps to Run the App

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/irctc-booking-system.git
   cd irctc-booking-system


2. Install dependencies:

  ```bash
   npm install
   Create a .env file in the root of the project and add the following variables:

3. env
```bash
JWT_SECRET=your_jwt_secret_key_here
Create the MySQL database (irctc3) and tables using the provided SQL schema or run the following:

sql
Copy code
CREATE DATABASE irctc3;

USE irctc3;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE trains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  source VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  total_seats INT NOT NULL,
  available_seats INT NOT NULL
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  train_id INT NOT NULL,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (train_id) REFERENCES trains(id) ON DELETE CASCADE
);
Start the application:

bash
Copy code
npm start
The server will now run on http://localhost:5000 (default).

API Endpoints
POST /register
Description: Registers a new user.
Request body:
json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
Response:
json
Copy code
{
  "message": "User registered successfully."
}
POST /login
Description: Logs in a user and returns a JWT token.
Request body:
json
Copy code
{
  "email": "john@example.com",
  "password": "securepassword"
}
Response:
json
Copy code
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
POST /book
Description: Books a seat on a train.
Request body:
json
Copy code
{
  "trainId": 1
}
Response:
json
Copy code
{
  "message": "Seat booked successfully."
}
GET /trains
Description: Fetches trains based on the source and destination.
Query parameters:
source (string)
destination (string)
Response:
json
Copy code
[
  {
    "id": 1,
    "name": "Express 101",
    "source": "New York",
    "destination": "Los Angeles",
    "total_seats": 100,
    "available_seats": 50
  }
]
Handling Race Conditions
In this system, when multiple users try to book a seat at the same time, the application ensures that only one user can book the seat. It uses MySQL's FOR UPDATE locking mechanism within a transaction to lock the train record while a user is booking a seat. This prevents race conditions and ensures that the available seats are updated atomically.

Contributing
Fork the repository.
Create a new branch for your feature: git checkout -b feature/your-feature.
Commit your changes: git commit -m 'Add new feature'.
Push to the branch: git push origin feature/your-feature.
Open a pull request.
License
This project is open-source and available under the MIT License.

yaml
Copy code

---

Make sure to replace any placeholders like `your-username` in the repository URL, `your_jwt_secr   
