const express = require("express");
const githubRouter = require("./routes/githubRoutes");


const app = express();
app.use(express.json());

app.use("/api/github",githubRouter);



module.exports = app;
