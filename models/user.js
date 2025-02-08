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
    type: String,
    required: true,
    default:'https://static.vecteezy.com/system/resources/previews/003/586/230/non_2x/no-photo-sign-sticker-with-text-inscription-on-isolated-background-free-vector.jpg',
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