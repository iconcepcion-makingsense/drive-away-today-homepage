
# Database Setup Instructions

This document provides instructions on how to set up and use the MySQL database for the car rental application.

## Prerequisites

- MySQL Server (version 5.7 or higher)
- MySQL client or MySQL Workbench

## Setup Steps

1. **Create the database and tables**

   Run the `schema.sql` file in your MySQL server to create the database structure and populate it with sample data:

   ```bash
   mysql -u your_username -p < schema.sql
   ```

   Or you can open the file in MySQL Workbench and execute it.

2. **Configure the application**

   Copy the `.env.example` file from the root directory to a new file named `.env`:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and update the database connection details:

   ```
   VITE_DB_HOST=localhost
   VITE_DB_PORT=3306
   VITE_DB_USER=your_username
   VITE_DB_PASSWORD=your_password
   VITE_DB_NAME=car_rental
   ```

3. **Start the application**

   The application will now be able to connect to your MySQL database.

## Toggling Database Mode

The application allows you to switch between using the local data defined in the code and the external MySQL database:

- In development mode, a toggle switch will appear at the bottom of the home page.
- Toggle the switch to enable or disable database mode.
- When database mode is enabled, the application will attempt to connect to the MySQL database.
- If the connection fails, it will automatically fall back to using the local data.

## Database Structure

The application uses three main tables:

1. **locations**: Stores pickup/dropoff locations
2. **car_categories**: Stores the different types of cars available
3. **car_features**: Stores features for each car category

Refer to the `schema.sql` file for the detailed structure and relationships.
