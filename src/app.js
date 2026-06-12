const express = require("express");
const githubRouter = require("./routes/githubRoutes");
const pool = require("./config/db");


const app = express();
app.use(express.json());



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



app.use("/api/github",githubRouter);



module.exports = app;
