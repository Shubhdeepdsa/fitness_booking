
# Fitness Slot Booking System

A responsive and interactive fitness slot booking system built with React for the frontend and Node.js with Express for the backend. Users can book classes, view their bookings with pagination, and cancel bookings within the allowed timeframe. This project demonstrates the use of React for a dynamic UI, a REST API for managing bookings, client-side caching, and cookie-based user identification.

## Table of Contents
- Features
- Technologies Used
- Project Structure
- Getting Started
- Usage
- API Endpoints
- Pagination
- Client-Side Caching and Cookies
- Styling
- Further Improvements

## Features
- **User Identification:** Uses cookies to identify users on the client-side.
- **Class Booking:** Users can select a date and book different fitness classes.
- **View Bookings:** Displays a paginated list of user bookings.
- **Cancel Bookings:** Users can cancel their bookings within a specified time frame.
- **Responsive Design:** UI adapts to different screen sizes using custom CSS.
- **Client-Side Caching:** Stores bookings data in localStorage for performance optimization.

## Technologies Used
### Frontend
- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the backend.
- **Custom CSS**: For responsive and consistent styling across the app.

### Backend
- **Node.js & Express**: For building the REST API.
- **In-memory Storage**: For storing user data, classes, and bookings (in a real application, you would use a database).
- **CORS Middleware**: To handle cross-origin requests.
- **Cookie Parser**: For managing user identification with cookies.

## Project Structure
```
fitness-slot-booking-system/
│
├── src/
│   ├── api/
│   │   └── api.js            # Handles API requests using Axios
│   ├── components/
│   │   ├── ClassesList.jsx   # Component for displaying classes and booking slots
│   │   ├── UserBookings.jsx  # Component for displaying user bookings with pagination
│   │   ├── styles/
│   │   │   ├── ClassesList.css
│   │   │   ├── UserBookings.css
│   ├── App.css               # General app-wide styles
│   ├── App.jsx               # Main app component
│   └── index.js              # Entry point for the React application
│
├── server.js                 # Backend server with Express
├── package.json              # Dependencies and scripts
└── README.txt                # This file
```


### Getting Started

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/fitness-slot-booking-system.git
   cd fitness-slot-booking-system
   ```

2. **Install dependencies for both frontend and backend:**
   - **Backend:**
     ```bash
     npm install
     ```
   - **Frontend:**
     Navigate to the `src` directory where the React app is located and install its dependencies.
     ```bash
     npm install
     cd ..
     ```

3. **Start the backend server:**
   ```bash
   node server.js
   ```

4. **Start the React frontend:**
   - Make sure you're in the root directory of the project (or the frontend directory if structured separately).
   ```bash
   npm start
   ```

5. **Open the application:**
   - The React frontend should open automatically in your default web browser at `http://localhost:3000` (or the port specified by React).
   - The backend is running on `http://localhost:5000`.

### Additional Notes:
- If you encounter any errors, ensure both **Node.js** and **npm** are correctly installed and the environment variables (if any) are properly configured.
- If the ports conflict with other services on your system, you can change them in the server or frontend configurations.

## Usage

- **Book a Class:** Select a date and choose a class from the list to book it.
- **View Bookings:** See a list of your booked classes in the "Your Bookings" section, with pagination controls to navigate through the bookings.
- **Cancel Booking:** Click "Cancel" on any booking to remove it, if within the allowed time frame.

## API Endpoints
### GET /user/bookings
- **Description:** Retrieves a paginated list of user bookings.
- **Query Parameters:**
  - `userId`: User's identifier.
  - `page`: Current page number.
  - `limit`: Number of bookings per page (default is 5).
- **Response:**
  - `totalBookings`: Total number of bookings for the user.
  - `bookings`: Array of bookings for the current page.

### POST /book
- **Description:** Books a class for a specific date.
- **Request Body:** `{ userId, classId, date }`

### POST /cancel
- **Description:** Cancels a booking.
- **Request Body:** `{ userId, classId, date }`

## Pagination
The `UserBookings` component implements pagination to handle large datasets:
- Users can navigate through bookings using "Previous" and "Next" buttons.
- The backend supports pagination using the `page` and `limit` query parameters.
- Displays the current page and the total number of pages.

## Client-Side Caching and Cookies
- **Client-Side Caching:** The app uses `localStorage` to cache bookings, improving performance and reducing the number of API calls.
- **Cookies:** The app uses cookies to identify users on the client-side without authentication. The `userId` is stored in a cookie to simulate user-specific data.

## Styling
- The app uses **custom CSS** to style components, with a dark-themed UI for a clean look.
- **Responsive Design:** The layout is responsive and adapts to different screen sizes using media queries in CSS files.
- **Uniform Styling:** Consistent color scheme and layout achieved using shared CSS classes.

## Further Improvements
- **User Authentication:** Integrate proper user authentication for secure access.
- **Database Integration:** Replace in-memory storage with a database (e.g., MongoDB, PostgreSQL) for persistent data.
- **More Features:** Add more detailed filtering options (e.g., time slots) and notifications for waitlisted bookings.
- **Error Handling:** Implement better error handling for API requests and user interactions.

## Screenshots 

![image](https://github.com/user-attachments/assets/ffdcfab4-362d-429c-a366-62b8d7122564)
![image](https://github.com/user-attachments/assets/346ca40f-11c2-4ddc-9f97-558c0f81a0b5)

