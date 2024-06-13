const Contact = require('../models/contactModel');

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    await contact.save();

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    await contact.remove();
    res.json({ message: 'Contact removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
};
