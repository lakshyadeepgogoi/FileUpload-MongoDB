//App Create
const express = require("express");
const app = express();


//PORT Find 
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir: '/tmp/'
}));

//DB Connection
const db = require("./config/database");
db.connect();

//Cloud Connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//API Route Mount
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload",Upload );

//Activate server
app.listen(PORT, () => {
    console.log(`APP is running at ${PORT} `);
})