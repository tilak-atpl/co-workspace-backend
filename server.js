const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/property-listing");
// Event listeners for connection success and error
const db = mongoose.connection;

// Log success message on successful connection
db.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

// Log error if the connection fails
db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Optional: Log when the connection is disconnected
db.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

// routes
app.use("/api/properties", propertyRoutes);
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
