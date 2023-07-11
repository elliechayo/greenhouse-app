const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  socialTitle: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  postedPlants: [],
  wishlist: [],
  cart: []
});

const User = mongoose.model('User', userSchema);

module.exports = User;