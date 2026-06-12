const express = require("express");
const githubRouter = require("./routes/githubRoutes");
const pool = require("./config/db");


const app = express();
app.use(express.json());


// test db

app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() as currentTime");

    res.json({
      success: true,
      data: rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// test running apis

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GitHub Profile Analyzer API is running"
  });
});



app.use("/api/github",githubRouter);



module.exports = app;
