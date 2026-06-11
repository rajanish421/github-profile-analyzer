const axios = require("axios");



const getGithubProfile = async (userName)=>{
    try {
        
        const response = await axios.get(`https://api.github.com/users/${username}`);
        console.log(response);
        // return response;

    } catch (error) {
        throw error;
    }
};

module.exports = {getGithubProfile};