const express = require("express");
const { getGithubProfileController, analyzeProfileController, getAllAnalyzedProfiles, getSingleProfileController } = require("../controllers/githubController");

const githubRouter = express.Router();

// githubRouter.get("/profiles/:userName",getGithubProfileController);
githubRouter.get("/profile_analyze/:userName",analyzeProfileController);

githubRouter.get("/get_analyzed_profiles",getAllAnalyzedProfiles);

githubRouter.get("/get_single_profile/:userName",getSingleProfileController);



module.exports = githubRouter;