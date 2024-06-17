const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    matricNumber: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
    department: { type: String },
    photo: { type: String } // Add this field for photo uploads
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
