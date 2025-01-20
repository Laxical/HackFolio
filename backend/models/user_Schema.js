const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Simple email regex
  password: { type: String, required: true, minlength: 6 }, // Minimum password length
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  githubProfile: { type: String, default: '' },
  linkedinProfile: { type: String, default: '' },
  skills: { type: [String], default: [] }, // Default to an empty array for skills
  phoneNumber: { type: String, default: '' }, // Phone Number
  city: { type: String, default: '' }, // City
  country: { type: String, default: '' }, // Country
  bio: { type: String, default: '' }, // Bio
  roles: { type: [String], default: ['User'] }, // Array of roles, default to 'User'
  workExperience: [{
    employer: { type: String, required: false },
    role: { type: String, required: false },
    fromMonth: { type: String, required: false },
    fromYear: { type: Number, required: false },
    toMonth: { type: String },
    toYear: { type: Number },
    description: { type: String, default: '' },
    isCurrent: { type: Boolean, default: false } // Flag for current job
  }],
  education: { 
    degreeType: { type: String, default: '' }, // Degree Type
    institution: { type: String, default: '' }, // Institution Name
    fieldOfStudy: { type: String, default: '' }, // Field of Study
    graduationMonth: { type: String, default: '' }, // Month of Graduation
    graduationYear: { type: Number, default: new Date().getFullYear() }, // Year of Graduation
    certificationLinks: { type: [String], default: [] } // Array for certification links
  },
  resume: { type: String, default: '' } // Path to resume file
}, { timestamps: true });

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
