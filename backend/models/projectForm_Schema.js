const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  hackathonName: {
    type: String,
    required: false,
    default: null // Set default value to null
  },
  views: {
    type: Number, // Ensure this is a Number type
    required: false,
    default: 0 // Set default value to 0
  },
  likes: {
    type: Number, // Ensure this is a Number type
    required: false,
    default: 0 // Set default value to 0
  },
  projectName: {
    type: String,
    required: false,
    maxlength: 50
  },
  tagline: {
    type: String,
    required: false,
    maxlength: 200
  },
  problem: {
    type: String,
    required: false,
    maxlength: 2000
  },
  challenges: {
    type: String,
    required: false,
    maxlength: 2000
  },
  technologies: {
    type: String,
    required: false,
    maxlength: 100
  },
  links: {
    type: String,
    required: false,
    maxlength: 1000
  },
  videoDemo: {
    type: String,
    required: false
  },
  coverUrl: {
    type: String,
    required: false
  },
  logoUrl: {
    type: String,
    required: false
  },
  imageUrls: {
    type: [String],
    required: false
  },
  reviewed: {
    type: Boolean,
    default:false,
  },
  teamCode: {
      type: String,
      default: '',
  },
  teamName:{
      type: String,
      default: '',
      
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Project", projectSchema);
