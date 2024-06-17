const Contact = require('../models/Contact');

// Create a new contact
const createContact = async (req, res) => {
    try {
        const newContact = new Contact({
            ...req.body,
            photo: req.file ? `/uploads/${req.file.filename}` : ''
        });
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a contact
const updateContact = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            {
                ...req.body,
                photo: req.file ? `/uploads/${req.file.filename}` : req.body.photo
            },
            { new: true }
        );
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    updateContact,
    deleteContact
};
