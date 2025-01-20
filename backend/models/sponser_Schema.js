const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  userName:{type:String,required:true},
  companyName: { type: String, required: true, unique: true }, // Unique company name
  website: { type: String, required: true }, // Company website URL
  email: { type: String, required: true }, // Contact email
  phoneNumber: { type: String, required: true }, // Contact phone number
  logo: { type: String, required: false }, // URL of the company logo image
  verificationStatus: { 
    type: String, 
    enum: ['Pending', 'Verified', 'Rejected'], 
    default: 'Pending' // Status of the verification process
  },
  registrationNumber: { type: String, required: true }, // Official registration number (e.g., from a government body)
  taxId: { type: String, required: true }, // Tax identification number for legitimacy verification
  address: { 
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zip: { type: String, default: '' },
    country: { type: String, default: '' }, // Country of the company
  }, // Address details
  description: { type: String, default: '' }, // Brief description of the company
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the sponsor was added
});

// Create the Sponsor model using the schema
const Sponsor = mongoose.model('Sponsor', sponsorSchema);

module.exports = Sponsor;
