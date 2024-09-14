import React, { useState, useEffect } from "react";
import ClassesList from "./components/ClassesList";
import UserBookings from "./components/UserBookings";
import { getUserBookings } from "./api/api";
import "./App.css"; // Import the CSS file

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch user bookings with pagination
  const fetchBookings = async (page = 1, limit = 5, setTotalBookings) => {
    try {
      // Fetch paginated bookings from API
      const data = await getUserBookings("user123", page, limit);
      setBookings(data.bookings); // Update the state
      setTotalBookings(data.totalBookings); // Set total bookings for pagination

      // Update the cache in localStorage
      localStorage.setItem("userBookings", JSON.stringify(data.bookings));
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings(); // Fetch initial bookings on component mount
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Fitness Slot Booking System</h1>
      <div className="main-section">
        <ClassesList fetchBookings={fetchBookings} setMessage={setMessage} />
        <UserBookings
          bookings={bookings}
          fetchBookings={fetchBookings}
          setMessage={setMessage}
        />
      </div>
      {message && <p className="message-container">{message}</p>}
    </div>
  );
};

export default App;
