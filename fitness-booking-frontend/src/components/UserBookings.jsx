import React, { useState, useEffect } from "react";
import { cancelBooking } from "../api/api";
import "./styles/UserBookings.css"; // Import the CSS file

const UserBookings = ({ bookings, fetchBookings, setMessage }) => {
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalBookings, setTotalBookings] = useState(0); // Track total bookings
  const bookingsPerPage = 5; // Number of bookings per page

  // Fetch bookings with pagination
  useEffect(() => {
    const fetchPaginatedBookings = async () => {
      try {
        await fetchBookings(currentPage, bookingsPerPage, setTotalBookings);
      } catch (error) {
        console.error("Error fetching paginated bookings:", error);
      }
    };
    fetchPaginatedBookings();
  }, [currentPage, fetchBookings]);

  // Handle cancellation
  const handleCancellation = async (classId, date) => {
    try {
      const response = await cancelBooking("user123", classId, date);
      setMessage(response.message);

      // Refresh bookings after successful cancellation
      await fetchBookings(currentPage, bookingsPerPage, setTotalBookings);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        console.error("Error cancelling booking:", error);
        setMessage("Cancellation failed.");
      }
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">Your Bookings</h2>
      <div>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.scheduleId} className="booking-card">
              <h3 className="booking-title">
                {booking.classType} on {booking.date}
              </h3>
              <button
                className="cancel-button"
                onClick={() =>
                  handleCancellation(booking.classId, booking.date)
                }
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <p className="no-bookings">No bookings found.</p>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {Math.ceil(totalBookings / bookingsPerPage)}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalBookings / bookingsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserBookings;
