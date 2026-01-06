const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// LOG ca să vezi dacă request-ul ajunge și ce Origin are
app.use((req, res, next) => {
  console.log(req.method, req.url, "origin=", req.headers.origin);
  next();
});

const corsOptions = {
  origin: true, // acceptă orice origin (îl reflectă)
  methods: ["GET", "OPTIONS"],
};

app.use(cors(corsOptions));

// IMPORTANT: preflight pentru orice rută (în Express/Router nou, NU "*")
app.options(/.*/, cors(corsOptions));

// static data
app.get("/albums.json", (req, res) => {
  res.sendFile(path.join(__dirname, "albums.json"));
});
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/albums", express.static(path.join(__dirname, "albums")));
app.get("/", (req, res) => res.send("Server Express merge ✅"));

app.listen(8000, () => console.log("Server on http://localhost:8000"));
