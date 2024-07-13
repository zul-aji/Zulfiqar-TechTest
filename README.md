# Zulfiqar-TechTest

Welcome to the project repository! This repository contains three main folders: Frontend, Backend, and Autotesting.

## Frontend Setup (Vite and React.js)

The Frontend is built using Vite and React.js. There are 3 pages made where one will act as a homepage, one as the form to register user and one for viewing the list of registered users.

### Prerequisites

- Node.js installed on your machine

### Setup Instructions

1. **Navigate to the Frontend folder:**

   ```bash
   cd Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```
   if this does not work, try
   ```bash
   npm install --force
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```
This command will start the development server. Open your browser and navigate to the provided localhost URL to view the frontend application.

## Backend Setup (Node.js, Express.js, MongoDB)

The Backend is built using Node.js, Express.js, and MongoDB. 

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account (for cloud database) or MongoDB installed locally

### Setup Instructions

1. **Navigate to the Backend folder:**

   ```bash
   cd Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```
   similarly, if this does not work, try
   ```bash
   npm install --force
   ```

3. **Setup MongoDB:**
   - Create a MongoDB Atlas cluster or use a local MongoDB instance.
   - Copy the MongoDB connection URL to your .env file in the Backend folder:
   ```dotenv
   DB_URL=<your_mongodb_connection_url>
   ```
   
4. **Set up WEB_URL:**
   - After successfully running the Frontend, copy the localhost URL and paste it as the WEB_URL in your .env file in the Backend folder:
   ```dotenv
   WEB_URL=<your_localhost_url>
   ```
   
5. **Start the server:**
   ```bash
   npm run locServ
   ```
This command will start the backend server. Ensure MongoDB is running and accessible.

## Autotesting Setup (Python and Selenium)

The Autotesting folder contains scripts for automated testing using Python and Selenium. There are 3 numbered python scripts in the folder and running the scripts chronologically are recommended. 

### Prerequisites

- Python installed on your machine
- Google Chrome browser installed

### Setup Instructions

1. **Navigate to the Autotesting folder:**

   ```bash
   cd Autotesting
   ```

2. **Install dependencies:**

   ```bash
   pip install selenium webdriver-manager
   ```

3. **Run the automation script:**
   ```bash
   python [chosen_script].py
   ```
This command will run the specified automation testing script using Selenium and Google Chrome.
