const express = require("express");
const { getGithubProfileController, analyzeProfileController, getAllAnalyzedProfiles } = require("../controllers/githubController");

const githubRouter = express.Router();

// githubRouter.get("/profiles/:userName",getGithubProfileController);
githubRouter.get("/profile_analyze/:userName",analyzeProfileController);

githubRouter.get("/get_analyzed_profiles",getAllAnalyzedProfiles);



module.exports = githubRouter;