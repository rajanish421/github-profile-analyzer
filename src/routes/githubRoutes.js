const express = require("express");
const { getGithubProfileController, analyzeProfileController } = require("../controllers/githubController");

const githubRouter = express.Router();

// githubRouter.get("/profiles/:userName",getGithubProfileController);
githubRouter.get("/profile_analyze/:userName",analyzeProfileController);



module.exports = githubRouter;