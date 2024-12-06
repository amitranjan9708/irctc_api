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
