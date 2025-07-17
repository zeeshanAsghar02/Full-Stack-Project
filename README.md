# Project Report: AUIS Nexus Management System

## 1. Introduction

The AUIS Nexus Management System is a comprehensive full-stack web application designed to manage users, events, and a blog platform. Developed using the MERN (MongoDB, Express.js, React, Node.js) stack, it provides a robust and scalable solution for community interaction and administrative oversight. The system features secure user authentication and authorization, an intuitive admin dashboard for content and user management, and dynamic functionalities for event participation and blog engagement.

## 2. Technology Stack

### 2.1 Backend
The backend is built with Node.js and the Express.js framework, providing a RESTful API. MongoDB is used as the NoSQL database, with Mongoose as the ODM (Object Data Modeling) library for simplified data interaction.

*   **Runtime Environment:** Node.js
*   **Web Framework:** Express.js
*   **Database:** MongoDB (NoSQL)
*   **ODM:** Mongoose
*   **Authentication & Security:**
    *   `bcryptjs`: For password hashing.
    *   `jsonwebtoken`: For creating and verifying JSON Web Tokens (JWT) for user sessions.
    *   `crypto`: Node.js built-in module for cryptographic functions (used in token generation).
    *   `helmet`: Secures Express apps by setting various HTTP headers.
    *   `xss-clean`: Protects against Cross-site Scripting (XSS) attacks.
    *   `express-rate-limit`: Limits repeated requests to public APIs to prevent brute-force attacks.
    *   `hpp` (HTTP Parameter Pollution): Protects against parameter pollution attacks.
    *   `cors`: Enables Cross-Origin Resource Sharing.
*   **Email Service:** SendGrid (via `@sendgrid/mail` package) for sending transactional emails (e.g., email verification, password reset and we will be moving towards using basic google smtp for this purpose in future).
*   **Error Handling:** `express-async-handler` for simplifying asynchronous error handling.
*   **File Uploads:** ImageKit for external image storage and management.
*   **Environment Variables:** `dotenv` for loading environment variables.
*   **Logging:** `morgan` for development logging.

### 2.2 Frontend
The frontend is a single-page application (SPA) developed with React, utilizing Material-UI for a modern and responsive user interface. Redux Toolkit is employed for efficient state management across the application.

*   **JavaScript Library:** React (v19.1.0)
*   **UI Framework:** Material-UI (`@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`)
*   **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
*   **Routing:** React Router DOM (`react-router-dom` v7.6.1)
*   **API Communication:** Axios (`axios`)
*   **Animations:** `framer-motion`
*   **Mapping:** `react-leaflet` (for interactive maps, if implemented)
*   **Testing:** `@testing-library/react`, `jest-dom`
*   **Build Tool:** Create React App (`react-scripts`)

## 3. Project Architecture

The system follows a **MERN stack architecture**, characterized by a separation of concerns between the frontend and backend:

*   **Client-Side (Frontend):** A React application serves as the user interface. It communicates with the backend solely through RESTful API calls. React Router handles client-side routing, providing a seamless user experience. Redux manages the global state, including user authentication status, data fetched from the backend, and UI states.
*   **Server-Side (Backend):** A Node.js Express server acts as the API layer. It receives HTTP requests from the frontend, processes them, interacts with the MongoDB database, and sends back JSON responses. Middleware is extensively used for security, logging, and error handling.
*   **Database:** MongoDB stores all application data, including user profiles, events, and blog posts. Mongoose provides an object-document mapping layer, facilitating interaction with the database.
*   **API Communication:** All interactions between the frontend and backend occur via RESTful API endpoints. Axios is used on the frontend to make these HTTP requests.
*   **External Services:** SendGrid is integrated for email functionalities (verification, password reset). ImageKit handles image uploads and storage, offloading file management from the server.

This decoupled architecture allows for independent development and scaling of the frontend and backend components.

## 4. Key Features and Functionalities

The AUIS Nexus Management System offers a wide range of features for both general users and administrators:

### 4.1 User Authentication and Authorization
*   **User Registration:** Users can sign up with their details, followed by an email verification process to activate their account.
*   **User Login:** Secure login functionality with email and password.
*   **Password Reset:** A "Forgot Password" feature allows users to request a password reset link sent to their registered email, enabling them to set a new password.
*   **Role-Based Authorization:** The system supports two primary roles: `user` and `admin`. Access to certain routes and functionalities is restricted based on the user's role.
*   **User Profile Management:** Authenticated users can view and update their profile details.
*   **User Deactivation:** Users can be "soft-deleted" by setting their `active` status to `false`, rather than permanent removal from the database.

### 4.2 Admin Dashboard (`/admin` route)
The admin dashboard provides powerful tools for system management, accessible only to users with the `admin` role.
*   **User Management:** Admins can view a list of all registered users, and promote/demote users between `user` and `admin` roles.
*   **Pending Blog Reviews:** Admins have a dedicated section to review blog posts submitted by users that are in a `pending` state, with options to `Approve & Publish` or `Reject` them.
*   **Event Creation:** Admins can create new events by providing details such as title, description, date, time, venue, category, capacity, and an optional image.

### 4.3 Event Management
*   **Create Event:** Admins can create new events with comprehensive details.
*   **View Events:** All users can browse upcoming, ongoing, completed, and cancelled events. Events can be filtered and searched.
*   **View Single Event:** Detailed view of an individual event, including registered users.
*   **Update Event:** Admins can modify existing event details, including adjusting capacity (with checks to prevent capacity from dropping below registered users).
*   **Delete Event:** Admins can remove events from the system.
*   **Register/Unregister for Event:** Authenticated users can register for and unregister from upcoming events. Capacity limits are enforced.
*   **Image Uploads for Events:** Event images are handled via ImageKit, allowing for efficient storage and delivery of media.

### 4.4 Blog Management
*   **Create Blog:** Authenticated users can create new blog posts. Admin-created blogs are published directly, while regular user blogs enter a `pending` state for admin review.
*   **View Blogs:** All users can view published blog posts. Search, category, and status (e.g., `pending` for admins) filters are available.
*   **View Single Blog:** Detailed view of a blog post, including content, author, categories, tags, comments, and likes. A view counter is incremented on each view.
*   **Update Blog:** Authorized users (authors or admins) can update blog posts.
*   **Delete Blog:** Authorized users (authors or admins) can delete blog posts.
*   **Comments:** Authenticated users can add comments to blog posts.
*   **Likes:** Authenticated users can like/unlike blog posts.

### 4.5 General Features
*   **Home Page:** The main landing page of the application.
*   **About Us Page:** Provides information about the organization.
*   **Contact Us Page:** Allows users to send inquiries.
*   **Global Error Handling:** The backend incorporates centralized error handling to provide consistent error responses.
*   **Responsive UI:** The frontend leverages Material-UI components to ensure the application is responsive and user-friendly across various devices.

## 5. Database Schema (Simplified)

The application utilizes three primary Mongoose schemas: `User`, `Event`, and `Blog`.

### 5.1 User Model (`backend/models/userModel.js`)
*   `firstName`, `lastName` (String, required)
*   `email` (String, required, unique, validated format)
*   `password` (String, required, minLength: 6, selected: false) - hashed with bcrypt.
*   `role` (String, enum: ['user', 'admin'], default: 'user')
*   `isEmailVerified` (Boolean, default: false)
*   `emailVerificationToken` (String)
*   `emailVerificationExpire` (Date)
*   `resetPasswordToken` (String)
*   `resetPasswordExpire` (Date)
*   `active` (Boolean, default: true, selected: false) - for soft deletion.
*   `timestamps` (createdAt, updatedAt)

### 5.2 Event Model (`backend/models/eventModel.js`)
*   `title` (String, required)
*   `description` (String, required)
*   `date` (Date, required)
*   `time` (String, required)
*   `venue` (String, required)
*   `image` (String, optional - stores ImageKit URL)
*   `category` (String, required, enum: ['Workshop', 'Seminar', 'Conference', 'Social', 'Other'])
*   `capacity` (Number, required)
*   `registeredUsers` (Array of `ObjectId` referencing `User` model)
*   `status` (String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming')
*   `createdBy` (`ObjectId` referencing `User` model, required)
*   `timestamps` (createdAt, updatedAt)

### 5.3 Blog Model (`backend/models/blogModel.js`)
*   `title` (String, required)
*   `content` (String, required)
*   `author` (`ObjectId` referencing `User` model, required)
*   `category` (String, required, enum: ['Islamic Thought', 'Student Voice', 'Reflections', 'News', 'Other'])
*   `tags` (Array of String)
*   `image` (String, default: 'default-blog.jpg')
*   `status` (String, enum: ['draft', 'pending', 'published', 'rejected'], default: 'draft')
*   `comments` (Array of Objects, each with `user` (ObjectId), `text` (String), `createdAt` (Date))
*   `likes` (Array of `ObjectId` referencing `User` model)
*   `views` (Number, default: 0)
*   `timestamps` (createdAt, updatedAt)
*   Text index on `title` and `content` for search.

## 6. Setup and Run Instructions

To set up and run the AUIS Nexus Management System, follow these steps:

### 6.1 Prerequisites
*   Node.js (LTS version recommended)
*   npm (Node Package Manager)
*   MongoDB (Community Edition or MongoDB Atlas cloud service)
*   A SendGrid account (for email functionalities)
*   An ImageKit account (for image uploads)

### 6.2 Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd Full Stack Project/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:** In the `backend` directory, create a file named `.env` and add the following environment variables. Replace the placeholder values with your actual credentials and settings:
    ```env
    PORT=5000
    NODE_ENV=development
    MONGO_URI=<Your MongoDB Connection String>
    JWT_SECRET=<A strong, random secret string>
    JWT_EXPIRE=1h

    # SendGrid Email Configuration
    SENDGRID_API_KEY=<Your SendGrid API Key>
    FROM_NAME=AUIS Nexus
    FROM_EMAIL=<Your Verified Sender Email on SendGrid>

    # ImageKit Configuration
    IMAGEKIT_PUBLIC_KEY=<Your ImageKit Public Key>
    IMAGEKIT_PRIVATE_KEY=<Your ImageKit Private Key>
    IMAGEKIT_URL_ENDPOINT=<Your ImageKit URL Endpoint>

    # Frontend URL (Important for email links)
    FRONTEND_URL=http://localhost:3000
    ```
    *   **MongoDB Connection String:** Get this from your MongoDB Atlas dashboard or local MongoDB setup.
    *   **JWT_SECRET:** Generate a long, random string.
    *   **SendGrid API Key:** Obtain this from your SendGrid dashboard. Ensure your `FROM_EMAIL` is a verified sender in SendGrid.
    *   **ImageKit Keys:** Obtain these from your ImageKit dashboard.
    *   **FRONTEND_URL:** This *must* match the URL where your React frontend application is running.

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The server will typically run on `http://localhost:5000` (or the port specified in your `.env` file).

### 6.3 Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd Full Stack Project/frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the frontend development server:**
    ```bash
    npm start
    ```
    The frontend application will typically open in your browser at `http://localhost:3000`.

## 7. Screenshots

**Please provide screenshots for the following key pages/functionalities:**

*   **Login Page:** (Show the login form, possibly with the "Forgot Password?" link visible)
*   **Register Page:** (Show the registration form)
*   **Home Page:** (Main landing page, showcasing the overall design)
*   **Events Page:** (List of events, demonstrating filtering/search if possible)
*   **Single Event View:** (Detailed view of an event, showing description, date, registered users, etc.)
*   **Blog Page:** (List of blog posts)
*   **Single Blog Post View:** (Detailed view of a blog, showing content, comments, likes)
*   **Admin Dashboard - User Management:** (Screenshot of the user table with promote/demote buttons)
*   **Admin Dashboard - Pending Blogs:** (Screenshot of the table showing pending blogs and review button)
*   **Admin Dashboard - Create Event Form:** (Screenshot of the form for creating a new event)
*   **Forgot Password Page:** (The page where users enter their email for a reset link)
*   **Reset Password Page:** (The page where users enter their new password after clicking the email link)
*   *(Optional)* An email received from SendGrid (e.g., verification email or password reset email) to demonstrate email functionality.

## 8. Conclusion and Future Enhancements

The AUIS Nexus Management System provides a robust foundation for community management, offering secure user interactions and comprehensive administrative tools. The modular MERN stack architecture facilitates maintainability and future expansion.

### Future Enhancements:
*   **Enhanced Admin Controls:** More granular permissions for different admin levels (e.g., 'moderator' with specific privileges).
*   **Event Search and Filtering:** Implement more advanced search and filtering options for events (e.g., by date range, venue, organizer).
*   **User Notifications:** Implement real-time notifications for event registrations, new comments, or blog status updates.
*   **Image Optimization:** Implement more advanced image optimization techniques on the frontend to improve loading times.
*   **Rich Text Editor for Blogs:** Integrate a rich text editor for a better content creation experience for blog posts.
*   **User Profiles for Authors:** Allow users to have public profiles showcasing their authored blogs and events.