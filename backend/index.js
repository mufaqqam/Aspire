const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const port = 3000;
const fs = require("fs");// Import the fs module for file system operations
const imageModel = require("./models");// Import the imageModel module from the ./models file

app.use(cors());// Enable Cross-Origin Resource Sharing (CORS) for the express app

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Connect to MongoDB database.
 *
 * @param {string} process.env.MONGODB_URI - MongoDB connection string.
 * @param {Object} { useNewUrlParser, useUnifiedTopology } - Options for MongoDB connection.
 */
mongoose
  .connect(
    "mongodb+srv://muffa:mufaqqam@aspire1.d8myfli.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const storage = multer.diskStorage({
  /**
   * Set the destination directory for uploaded files.
   *
   * @param {Object} req - The request object.
   * @param {Object} file - The uploaded file object.
   * @param {Function} cb - The callback function to execute.
   */
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Specify the destination directory for uploaded files
  },
  /**
   * Set the filename for uploaded files.
   *
   * @param {Object} req - The request object.
   * @param {Object} file - The uploaded file object.
   * @param {Function} cb - The callback function to execute.
   */
  filename: (req, file, cb) => {
    cb(null, file.originalname);// Set the filename for uploaded files
  },
});

const upload = multer({ storage: storage });// Create an instance of the multer middleware with the specified storage configuration

/**
 * Handle the PUT request to "/uploadimage" route with multer middleware.
 * Uploads an image file to the server.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.put(
  "/uploadimage",
  upload.single("testImage"),
  (req, res) => {
    /**
     * Create a new instance of imageModel with the provided data.
     *
     * @param {string} name - The name associated with the uploaded image.
     * @param {Object} img - The image object containing file data and content type.
     */
    0

    saveImage
      .save()
      .then((result) => {
        console.log("Image is saved to the database");
      })
      .catch((err) => {
        console.log("Error occurred while saving image:", err);
      });

    res.send('Image is saved');
  }
);

/**
 * Handle the GET request to "/image" route.
 * Retrieves all image data from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('/image', async (req, res) => {
  const allData = await imageModel.find();// Retrieve all image data from the database
  res.json(allData);// Send the retrieved data as a JSON response
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
