# Node.js File Upload and Storage with Cloudinary and Nodemailer

This Node.js server application allows users to upload images and videos, which are then stored on Cloudinary, a cloud-based image and video management service. Additionally, the application sends an email to the user who uploaded the file, containing a link to the uploaded file.

## Prerequisites

Before running this application, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (for storing user information)
- A [Cloudinary](https://cloudinary.com/) account (for storing and managing uploaded files)
- Access to an email SMTP server for sending emails

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/lakshyadeepgogoi/FileUpload-MongoDB
   cd nodejs-file-upload-cloudinary
   ```

2. Install the required Node.js modules:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project with the following environment variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/yourdb
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SMTP_EMAIL=your_email@gmail.com
   SMTP_PASSWORD=your_email_password
   ```

   Replace the placeholders with your specific values.

4. Start the application:

   ```bash
   npm start
   ```

   The server will start on port 3000 by default, but you can change it in the `.env` file.

## Usage

### Uploading Files

The application provides three endpoints for uploading files:

1. **Image Upload**: To upload an image, make a `POST` request to `/api/upload/image`. Use a `multipart/form-data` request with a field named `image`.

2. **Video Upload**: To upload a video, make a `POST` request to `/api/upload/video`. Use a `multipart/form-data` request with a field named `video`.

3. **Image Size Reduction**: To upload an image and reduce its size, make a `POST` request to `/api/upload/reduce-size`. Use a `multipart/form-data` request with a field named `image`.

### File Storage

Uploaded files are stored on Cloudinary. The application uses the [Express File Uploader middleware](https://www.npmjs.com/package/express-fileuploader) to handle file uploads and then uploads the files to Cloudinary.

### Sending Email Notifications

When a file is successfully uploaded, the application sends an email to the user who uploaded the file. The email contains a link to the uploaded file. This functionality is implemented using [Nodemailer](https://nodemailer.com/).

## Project Structure

The application consists of the following files:

- `index.js`: Sets up the Express app, connects to the database and Cloudinary, and defines the endpoints for file upload.
- `/routes/FileUpload.js`: Defines the routes for file upload, which include `imageUpload`, `videoUpload`, and `imageSizeReducer`.
- `/models/File.js`: Defines the schema for the uploaded files and defines a post-save hook that sends an email to the user who uploaded the file.
- `/controllers/fileUpload.js`: Contains the logic for handling file uploads, including checking file types, uploading to Cloudinary, and saving the file to the database.

## Contributing

Feel free to contribute to this project by creating issues, suggesting improvements, or submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
