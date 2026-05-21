require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const artworkRoutes=require("./routes/artworkRoutes");
const activityRoutes=require("./routes/activityRoutes");
const userRoutes=require("./routes/userRoutes");
const contactMessageRoutes=require("./routes/contactMessageRoutes");

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/artworks",artworkRoutes);
app.use("/api/activities",activityRoutes);
app.use("/api/users",userRoutes);
app.use("/api/contact-messages",contactMessageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});