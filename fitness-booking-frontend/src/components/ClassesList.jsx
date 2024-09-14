import React, { useEffect, useState } from "react";
import { getClasses, bookClass } from "../api/api";
import "./styles/ClassList.css"; // Import the CSS file

const ClassesList = ({ fetchBookings, setMessage }) => {
  const [classes, setClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    // Fetch available classes
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Handle booking a class
  const handleBooking = async (classId) => {
    if (!selectedDate) {
      setMessage("Please select a date before booking.");
      alert("Please select a date before booking.");
      return;
    }

    try {
      const response = await bookClass("user123", classId, selectedDate);
      setMessage(response.message);

      // Refresh bookings after successful booking
      await fetchBookings();
    } catch (error) {
      console.error("Error booking class:", error);
      setMessage("Booking failed.");
    }
  };

  return (
    <div className="classes-container">
      <h2 className="classes-title">Available Classes</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="date-input"
      />
      <div>
        {classes.map((cls) => (
          <div key={cls.classId} className="class-card">
            <h3 className="class-title">{cls.name}</h3>
            <p className="class-description">{cls.description}</p>
            <button
              className="book-button"
              onClick={() => handleBooking(cls.classId)}
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesList;
