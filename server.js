const app = require("./src/app");

const PORT = 3000 || process.env.PORT;


app.listen(PORT,()=>{
    console.log("Server is running on port 3000");
    
});