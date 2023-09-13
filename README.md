# Node.js File Upload and Cloudinary Integration

This Node.js application allows users to upload images and videos to the server. It utilizes the Express.js framework and the Express File Uploader middleware to handle file uploads. Uploaded files are stored on Cloudinary, a cloud-based image and video management service. Additionally, the application sends an email to the user who uploaded the file, containing a link to the uploaded file.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/lakshyadeepgogoi/FileUpload-MongoDB
   ```

2. Navigate to the project directory:

   ```
   cd your-repo
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the project root directory and set the following environment variables:

   ```
   CLOUDINARY_URL=your_cloudinary_url
   EMAIL_USERNAME=your_email_username
   EMAIL_PASSWORD=your_email_password
   ```

   Replace `your_cloudinary_url`, `your_email_username`, and `your_email_password` with your Cloudinary URL and email credentials.

5. Start the application:

   ```
   npm start
   ```

## Application Structure

The application consists of the following files:

### 1. `index.js`

This file sets up the Express app, connects to the database, and initializes the Cloudinary service. It defines the endpoints for file upload.

### 2. `/routes/FileUpload.js`

This file defines the routes for file uploads, including imageUpload, videoUpload, and imageSizeReducer. It handles incoming requests and delegates the processing to the corresponding controller functions.

### 3. `/models/File.js`

This file defines the schema for uploaded files using a database ORM (e.g., Mongoose). It also defines a post-save hook that sends an email to the user who uploaded the file.

### 4. `/controllers/fileUpload.js`

This file contains the logic for handling file uploads. It includes the following steps:

- Checking file types to ensure they are valid image or video formats.
- Uploading the files to Cloudinary for storage.
- Saving the file details (including the Cloudinary URL) to the database.
- Sending an email to the user with a link to the uploaded file.

## How Cloudinary is Used

Cloudinary is used to store and manage uploaded images and videos. It provides a cloud-based storage solution that offers various benefits, including scalability and accessibility. Here's how Cloudinary is integrated into the application:

1. **Cloudinary Configuration**: The application is configured to use Cloudinary by providing the Cloudinary URL in the `.env` file. This URL contains the credentials and settings required to interact with Cloudinary.

2. **Uploading to Cloudinary**: When a user uploads an image or video, the file is sent to Cloudinary for storage. The Express File Uploader middleware is used to handle the file upload process.

3. **File URL**: After successful upload, Cloudinary returns a URL that points to the stored file. This URL is saved in the database along with other file details.

4. **Accessing Files**: Users can access their uploaded files by using the Cloudinary URL. This URL can be included in emails sent to users or used in the application's frontend to display images and videos.

## Usage

1. Start the application as described in the installation section.

2. Access the following endpoints:

   - `POST /upload/image`: Upload an image file.
   - `POST /upload/video`: Upload a video file.
   - `GET /imageSizeReducer`: View the list of uploaded files and their details.

3. After uploading a file, check your email for a link to the uploaded file.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
