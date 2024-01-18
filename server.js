const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({path: __dirname+"/config/config.env"});


const port = process.env.PORT || 8000;


// Connect to database
connectDatabase();


const server = app.listen(port, () => {
    console.log(`server started at http://127.0.0.1:${port}`);
})
