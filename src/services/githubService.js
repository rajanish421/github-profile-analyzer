const axios = require("axios");



const getGithubProfile = async (userName)=>{
    try {

    //    console.log("called");
        
        const response = await axios.get(`https://api.github.com/users/${userName}`);
        // console.log(response.data);
        return response.data;

    } catch (error) {
        console.log("Error" + error);
        res.status(500).json({
        success:false,
        error:error.response?.data || error.message
    });
    }
};

module.exports = {getGithubProfile};