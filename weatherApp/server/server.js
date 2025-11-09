import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

// Backend route
app.get("/api/weather", async (req, res) => {
  try {
    // const location = req.query.location || "32817";
    const location = "32817";
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;
    const response = await fetch(apiUrl);
    if (!response.ok) return res.status(response.status).send("Error fetching weather data");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
