const mongoose= require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,        
    },
    email:{
        type:String,
    }
});



//Post Middleware
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC", doc);

        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //sen email
        let info = await transporter.sendMail({
            from:`Lakshyadeep Gogoi`,
            to:doc.email,
            subject:"New File Uploaded on cloudinary",
            html:`<h2>Hello jee</h2> <View>File Uploaded at ${Date.now()}View Here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        })  

        console.log("Info: ",info);
    }
    catch(error){
        console.error(error);

    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;