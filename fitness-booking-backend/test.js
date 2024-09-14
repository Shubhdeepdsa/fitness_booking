const axios = require("axios");

const BASE_URL = "http://localhost:5000";

const testBookingSystem = async () => {
  try {
    // 1. Book a class with available capacity
    console.log("Booking a class (Yoga)...");
    let response = await axios.post(`${BASE_URL}/book`, {
      userId: "user123",
      classId: "1", // Yoga
      date: "2024-09-15",
    });
    console.log("Booking Response:", response.data);

    // 2. Book the class again until it fills up
    console.log("Booking the class again to fill it up...");
    for (let i = 0; i < 20; i++) {
      // Assuming the capacity is 20
      response = await axios.post(`${BASE_URL}/book`, {
        userId: `user${i + 124}`,
        classId: "1",
        date: "2024-09-15",
      });
      console.log(`Booking user${i + 124} Response:`, response.data);
    }

    // 3. Attempt to book another user after capacity is full to test waitlist
    console.log("Booking a class to test waitlist (user145)...");
    response = await axios.post(`${BASE_URL}/book`, {
      userId: "user145",
      classId: "1",
      date: "2024-09-15",
    });
    console.log("Waitlist Booking Response:", response.data);

    // 4. Cancel a booking to test reallocation to waitlist
    console.log("Cancelling a booking (user123)...");
    response = await axios.post(`${BASE_URL}/cancel`, {
      userId: "user123",
      classId: "1",
      date: "2024-09-15",
    });
    console.log("Cancellation Response:", response.data);

    // 5. Fetch bookings to verify
    console.log("Fetching user bookings...");
    response = await axios.get(`${BASE_URL}/user/bookings`, {
      params: {
        userId: "user145", // This user was on the waitlist
        classType: "Yoga",
        date: "2024-09-15",
      },
    });
    console.log("User Bookings:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};

testBookingSystem();
