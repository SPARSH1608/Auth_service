# Authentication Service
## Introduction
The Authentication Service handles user registration, login, and session management using JWT tokens. It supports role-based authorization and secure password management.

# Installation
```bash

npm install express body-parser nodemon dotenv sequelize sequelize-cli mysql2 bcrypt jsonwebtoken
```
## Setup
Database Configuration: Configure the database in config/config.json.
## Sequelize Setup:
```Initialize Sequelize: 
npx sequelize init
```

```Create Models: 
npx sequelize model:generate --name User --attributes email:string,password:string
```

```Run Migrations:
 npx sequelize db:migrate
```

Password Hashing:
 Implemented using bcrypt in the User model.

# Routes
##User Authentication:

POST /signup: Register a new user (with email and password).

POST /signin: Authenticate an existing user.

GET /isAuthenticated: Check if the user is authenticated.

GET /isAdmin: Check if the authenticated user has admin privileges.
# Security
Password Encryption: Handled using bcrypt with a salt stored in the environment variables.

Token-Based Authentication: JWT tokens are used for session management and are sent in the headers as Bearer tokens.

# Other Services Links

[FlightSearchService](https://github.com/SPARSH1608/flightandSearchService)

[AirTicketBookingService](https://github.com/SPARSH1608/AirTicketBookingService)

[AuthService](https://github.com/SPARSH1608/Auth_service)

[ReminderService](https://github.com/SPARSH1608/ReminderService)
