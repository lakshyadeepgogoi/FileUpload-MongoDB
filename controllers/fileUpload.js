const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//LocalFile Upload -> Handler Function

exports.localFileUpload = async (req, res) => {
    try{

        //Fetch File
        const file = req.files.file;
        console.log("File Aagyi  -> ", file);

        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}` ;
        console.log("Path ->", path);

        //add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a succesfull response
        res.json({
            success:true,
            message:"Local FIle Uploaded succesfully"
        });



    }catch(error){
        console.log("Not able to upload tyhe file in server");
        console.log(error);

    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality){
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto"; //imp
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler
exports.imageUpload = async(req, res) => {
    try{
        //data fetch
        const { name, tags, email}= req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format not supported",
            });
        }

        //file format supported
        console.log("Uploading to cloud");
        const response = await uploadFileToCloudinary(file, "Lakshyadeep");
        console.log(response);

        //Db Entry save
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,

        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image succesfully uploades",
        });

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        });

    }
}

//Video Upload Handler

exports.videoUpload = async (req,res)=>{
    try{
        //data fetch
        const { name, tags, email}= req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        const maxFileSizeInBytes = 5 * 1024 * 1024;

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type:", fileType);

        //upper limit of 5mb for video
        if (file.size > maxFileSizeInBytes) {
            console.log("File size exceds");
            return res.status(400).json({
                success: false,
                message: "File size exceeds the 5MB limit",
            });
        }

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format not supported",
            });
        }

        //file format supported
        console.log("Uploading to cloud");
        const response = await uploadFileToCloudinary(file, "Lakshyadeep");
        console.log(response);

        //Db Entry save
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,

        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video succesfully uploades",
        });




    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went Wrong ",
        })

    }
}

//imageSizeReducer

exports.imageSizeReducer = async (req, res)=> {
    try{
        //data fetch
        const { name, tags, email}= req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format not supported",
            });
        }

        //file format supported
        console.log("Uploading to cloud");
        const response = await uploadFileToCloudinary(file, "Lakshyadeep", 30);
        console.log(response);

        //Db Entry save
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,

        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image succesfully uploades",
        });

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went Wrong ",
        })
    }
}