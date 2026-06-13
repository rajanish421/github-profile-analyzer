const pool = require("../config/db");

const {getGithubProfile} = require("../services/githubService");

// const getGithubProfileController = async(req , res)=>{
//     try {
        
//         // console.log("called from controller");
        

//         const userName = req.params.userName;

//         const result = await getGithubProfile(userName);

//         if(!result){
//             return res.status(404).json({
//                 status:false,
//                 message:"profile not found"
//             });
//         }

//         // send details to the client
//         res.status(200).json({
//             status:true,
//             message:"successfully fetch profile",
//             data:result
//         });


//     } catch (error) {
//         res.status(500).json({
//             status:false,
//             message:error
//         });
//     }
// };


// analyzed profile by username

const analyzeProfileController = async(req,res)=>{
    try {
        
        // console.log("called from analyze");
        

        const userName = req.params.userName;

        const profile = await getGithubProfile(userName);

        console.log(profile);
        

        if(!profile){
            return res.status(404).json({
                status:false,
                message:"profile not found"
            });
        }

        // console.log(profile.created_at);

        const createdDate = new Date(profile.created_at);

        const ageDays = Math.floor((Date.now() - createdDate.getTime())/(1000 * 60 * 60 * 24));

    //     const query = 
    //     `
    //         INSERT INTO github_profiles
    //         (
    //             username,
    //             name,
    //             followers,
    //             following,
    //             public_repos,
    //             public_gists,
    //             account_age_days,
    //             profile_url
    //         )
    //         VALUES (?, ?, ?, ?, ?, ?, ?, ?)

    //         ON DUPLICATE KEY UPDATE

    //             followers = VALUES(followers),
    //             following = VALUES(following),
    //             public_repos = VALUES(public_repos),
    //             public_gists = VALUES(public_gists),
    //             account_age_days = VALUES(account_age_days)
    //         `

    //    await pool.query(query,[
    //             profile.login,
    //             profile.name,
    //             profile.followers,
    //             profile.following,
    //             profile.public_repos,
    //             profile.public_gists,
    //             ageDays,
    //             profile.html_url
    //         ]);


              await pool.query(
            `
            INSERT INTO github_profiles
            (
                username,
                name,
                followers,
                following,
                public_repos,
                public_gists,
                account_age_days,
                profile_url
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)

            ON DUPLICATE KEY UPDATE

                followers = VALUES(followers),
                following = VALUES(following),
                public_repos = VALUES(public_repos),
                public_gists = VALUES(public_gists),
                account_age_days = VALUES(account_age_days)
            `,
            [
                profile.login,
                profile.name,
                profile.followers,
                profile.following,
                profile.public_repos,
                profile.public_gists,
                ageDays,
                profile.html_url
            ]
        );





            // console.log("called after await");

            res.status(201).json({
                status:true,
                message:"successfully analyzed profile",
                data:profile
            });


    } catch (error) {
        return res.status(500).json({
        status: false,
        statusCode: error.response?.status,
        message: error.message,
        githubResponse: error.response?.data
    });
    }
};



// get all analyzed profiles

const getAllAnalyzedProfiles = async(req,res)=>{
    try {
        

         const [rows] = await pool.query("SELECT * FROM github_profiles");

         res.status(201).json({
                status:true,
                message:"successfully analyzed profile",
                data:rows
            });

    } catch (error) {
           res.status(500).json({
            status:false,
            message:error
        });
    }
};


// get single profile by username

const getSingleProfileController = async(req,res)=>{
    try {
        
        const userName = req.params.userName;

        console.log(userName);

        // const query = `
        // SELECT * FROM github_profiles WHERE username = ?
        // `;
         const [rows] = await pool.query(
        'SELECT * FROM github_profiles WHERE username=?',
        [userName]
    );

      if(rows.length === 0){
        return res.status(404).json({
            message:"Profile not found"
        });
    };

    res.status(200).json({
        status:true,
        message:"fetch successfully",
        data:rows[0]
    });


    } catch (error) {
          res.status(500).json({
            status:false,
            message:error
        });
    }
};


module.exports = {analyzeProfileController,getAllAnalyzedProfiles,getSingleProfileController};