const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: String,
  location: String,
  contact: String,
  birthday: {
    day: Number,
    month: Number,
    year: Number
  },
  gender: String,
  id: String,
  vehicle: {
    name: String,
    model: String,
    year: Number,
    color: String,
    type: String
  },
  documents: {
    registration: Buffer,
    insurance: Buffer,
    license: Buffer
  },
  preferences: {
    hasOtherJob: Boolean,
    secondJob: String,
    preferredHours: String,
    morningFrom: Number,
    morningTo: Number,
    eveningFrom: Number,
    eveningTo: Number
  },
  bankDetails: {
    bankingMethod: String,
    bankName: String,
    iban: String,
    reflectPhoneNumber: String
  },
  termsAccepted: Boolean
});

module.exports = mongoose.model('Application', applicationSchema);
