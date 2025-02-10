const mongoose = require("mongoose");

//bahrain sch
const bahrainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imgUrl: {
    // type: String,
    // required: true,
    // default:'https://img.freepik.com/free-vector/flat-design-no-photo-sign_23-2149257867.jpg?w=2000&t=st=1657460751~exp=1657461351~hmac=8901ac40f546dc5b5aac55488a10ecc128b2a4c4cf6d3e06be2ffdd1eb6175e2',
    url: { type: String,}, // Cloudinary URL
    cloudinary_id: { type: String, required: true }, // Public ID for deletion
  },
  category: {
    type: String,
    enum: ['Restaurant', 'Historical', 'Cafe', 'Mall', 'Entertainment'],
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  places:[bahrainSchema],
}, {timestap: true});

const User = mongoose.model("User", userSchema);

module.exports = User;