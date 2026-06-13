const axios = require("axios");
require("dotenv").config();


const getGithubProfile = async (userName)=>{
    try {

    //    console.log("called");
        
        // const response = await axios.get(`https://api.github.com/users/${userName}`);
        // // console.log(response.data);
        // return response.data;

        // after rate limit over of github api

        const response = await axios.get(
        `https://api.github.com/users/${userName}`,
        {
            headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
            "User-Agent": "github-profile-analyzer"
            }
        }
        );

        return response.data;


    } catch (error) {
        console.log("Error" + error);
        throw error;
    }
};

module.exports = {getGithubProfile};