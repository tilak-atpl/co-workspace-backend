const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  propertyType: String,
  images: [String], // Array for storing multiple image URLs
});

module.exports = mongoose.model('Property', propertySchema);
