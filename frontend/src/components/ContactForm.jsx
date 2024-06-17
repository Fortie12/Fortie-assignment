import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const initialFormState = {
        fullName: '',
        matricNumber: '',
        email: '',
        message: '',
        department: '',
        photo: null // Add this for photo upload
    };

    const [formData, setFormData] = useState(initialFormState);
    const [contacts, setContacts] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('https://mern-project-backend-xtdt.onrender.com/api/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        setFormData({ ...formData, photo: event.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            if (editIndex === -1) {
                const response = await axios.post('https://mern-project-backend-xtdt.onrender.com/api/contacts', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setContacts([...contacts, response.data]);
            } else {
                const response = await axios.put(`https://mern-project-backend-xtdt.onrender.com/api/contacts/${contacts[editIndex]._id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const updatedContacts = [...contacts];
                updatedContacts[editIndex] = response.data;
                setContacts(updatedContacts);
                setEditIndex(-1);
            }
            setFormData(initialFormState);
            alert('Contact submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
    };

    const handleDelete = async (contactId) => {
        try {
            await axios.delete(`https://mern-project-backend-xtdt.onrender.com/api/contacts/${contactId}`);
            const updatedContacts = contacts.filter((contact) => contact._id !== contactId);
            setContacts(updatedContacts);
            alert('Contact deleted successfully!');
        } catch (error) {
            console.error('Error deleting contact:', error);
            alert('Error deleting contact. Please try again.');
        }
    };

    const handleEdit = (index) => {
        const contactToEdit = contacts[index];
        setFormData({ ...contactToEdit });
        setEditIndex(index);
    };

    return (
        <div>
            <h2>Contact Form With Database Plug</h2>
            <form onSubmit={handleSubmit} className='form'>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className='form-control'
                    />
                </label>
                <label>
                    Matric Number:
                    <input
                        type="text"
                        name="matricNumber"
                        value={formData.matricNumber}
                        onChange={handleInputChange}
                        required
                        className='form-control'
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className='form-control'
                    />
                </label>
                <label>
                    Message:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className='form-control'
                    />
                </label>
                <label>
                    Department:
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className='form-control'
                    />
                </label>
                <label>
                    Photo:
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        className='form-control'
                    />
                </label>
                <button type="submit" className='button'>Submit</button>
            </form>
            <h2>Contact List M.E.R.N Stack in Action</h2>
            <ul className='form'>
                {contacts.map((contact, index) => (
                    <li key={contact._id} className='form-control'>
                        <div>
                            {contact.photo && <img src={contact.photo} alt={contact.fullName} width="100" />}
                            <div>{contact.fullName} {contact.matricNumber} {contact.email} {contact.department} {contact.message}</div>
                        </div>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(contact._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactForm;
