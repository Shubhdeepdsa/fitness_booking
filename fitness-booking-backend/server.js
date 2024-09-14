const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware

app.use(bodyParser.json());
app.use(cors());
const classes = [
  {
    classId: "1",
    name: "Yoga",
    description: "Morning Yoga Session",
    totalCapacity: 20,
    time: "08:00",
  },
  {
    classId: "2",
    name: "Gym",
    description: "Strength Training",
    totalCapacity: 15,
    time: "10:00",
  },
  {
    classId: "3",
    name: "Dance",
    description: "Hip-Hop Dance",
    totalCapacity: 25,
    time: "17:00",
  },
];

const schedules = []; // Store the class schedules by date.
const bookings = []; // Store user bookings

// This is basic route to test if the server is running or not
app.get("/", (req, res) => {
  res.send("Fitness Slot booking system Backend is running.");
});

// Fetch available classes
app.get("/classes", (req, res) => {
  res.json(classes);
});
// Book a slot
app.post("/book", (req, res) => {
  const { userId, classId, date } = req.body;

  // Convert classId to string to handle comparison correctly
  const classInfo = classes.find((cls) => cls.classId === String(classId));
  if (!classInfo) {
    return res.status(404).json({ message: "Class not found" });
  }

  // Find or create the schedule for the class on the specified date
  let schedule = schedules.find(
    (sch) => sch.classId === classId && sch.date === date,
  );
  if (!schedule) {
    // If schedule does not exist for the date, create a new one
    schedule = {
      scheduleId: `${classId}-${date}`,
      classId,
      classType: classInfo.name,
      date,
      time: classInfo.time,
      totalCapacity: classInfo.totalCapacity,
      remainingCapacity: classInfo.totalCapacity,
      waitlist: [],
    };
    schedules.push(schedule);
  }

  // Check if there is remaining capacity
  if (schedule.remainingCapacity > 0) {
    // Book a slot
    schedule.remainingCapacity -= 1;
    res.json({ message: "Booking successful", status: "Booked" });
  } else {
    // Add user to the waitlist if the class is full
    schedule.waitlist.push(userId);
    res.json({
      message: "Class is full, added to waitlist",
      status: "Waitlisted",
    });
  }
});

// Cancel a booking
app.post("/cancel", (req, res) => {
  console.log("Cancel Endpoint was hit");
  const { userId, classId, date } = req.body;

  let schedule = schedules.find(
    (sch) => sch.classId === String(classId) && sch.date === date,
  );
  if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }

  const [hours, minutes] = schedule.time.split(":");
  const classStartTime = new Date(`${date}T${hours}:${minutes}:00`);
  const currentTime = new Date();
  const diffInMinutes = (classStartTime - currentTime) / (1000 * 60);

  if (diffInMinutes <= 30) {
    return res.status(400).json({
      message:
        "Class Cannot be cancelled now, as the time window for cancellation is expired now.",
    });
  }

  const isUserBooked = schedule.remainingCapacity < schedule.totalCapacity;
  const waitListIndex = schedule.waitlist.indexOf(userId);

  if (!isUserBooked && waitListIndex === -1) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (isUserBooked) {
    schedule.remainingCapacity += 1;
  }
  if (waitListIndex > -1) {
    schedule.waitlist.splice(waitListIndex, 1);
  }

  if (schedule.waitlist.length > 0 && schedule.remainingCapacity > 0) {
    const nextUserId = schedule.waitlist.shift();
    schedule.remainingCapacity -= 1;
    res.json({
      message:
        "Booking cancelled and is reallocated to the next user in the waitlist.",
    });
  } else {
    res.json({ message: "Booking Cancelled" });
  }
});

// Fetch users booking with optional filters and pagination
app.get("/user/bookings", (req, res) => {
  const { userId, classType, date, page = 1, limit = 5 } = req.query;

  // Find schedules that match the user's bookings
  let userBookings = schedules.filter((schedule) => {
    // Check if the user is booked or on the waitlist for the schedule
    const isUserBooked = schedule.remainingCapacity < schedule.totalCapacity;
    const isUserInWaitlist = schedule.waitlist.includes(userId);

    // Return schedules where the user is booked or waitlisted
    if (isUserBooked || isUserInWaitlist) {
      // Apply optional filters
      if (classType && schedule.classType !== classType) {
        return false;
      }
      if (date && schedule.date !== date) {
        return false;
      }
      return true;
    }
    return false;
  });

  // Implement pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);
  const paginatedBookings = userBookings.slice(startIndex, endIndex);

  res.json({
    totalBookings: userBookings.length,
    page: Number(page),
    limit: Number(limit),
    bookings: paginatedBookings,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
