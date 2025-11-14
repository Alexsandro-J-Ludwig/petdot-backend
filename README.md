# PetDot Backend

This repository contains the backend for the PetDot application. It is built using Node.js with Express and Sequelize.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [License](#license)

## Features

- User authentication (registration, login)
- Pet management (add, view, update, delete pets)
- Appointment scheduling
- Veterinary clinic management
- Image upload for pets and clinics
- Search and filtering capabilities

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework for Node.js
- **Prisma**: Next-generation ORM for Node.js and TypeScript
- **PostgreSQL**: Relational database
- **JWT (JSON Web Tokens)**: For authentication
- **Bcrypt**: For password hashing
- **Multer**: For handling `multipart/form-data` (file uploads)
- **Joi**: For request validation
- **Dotenv**: For managing environment variables
- **TypeScript**: Superset of JavaScript that adds static typing

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (comes with Node.js) or Yarn
- PostgreSQL database server

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/petdot-backend.git
   cd petdot-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add the following variables. Replace the placeholder values with your actual configuration.