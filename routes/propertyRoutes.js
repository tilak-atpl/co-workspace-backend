const express = require("express");
const Property = require("../models/property");
const router = express.Router();
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Add a new property with image upload
router.post("/", upload.array("images", 10), async (req, res) => {
  // Allow up to 10 images
  const { name, location, price, description, propertyType } = req.body;

  // Map through the files to create image URLs
  const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

  const property = new Property({
    name,
    location,
    price,
    description,
    propertyType,
    images: imageUrls, // Store array of image URLs
  });

  try {
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.send(properties);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update property
router.put("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete property
router.delete("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    res.send(property);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
