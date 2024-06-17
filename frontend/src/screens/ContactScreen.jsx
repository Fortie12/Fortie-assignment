import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import axios from 'axios';

const ContactScreen = () => {
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


  return (
    <FormContainer>
      <h1>Create Contact</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type='text'
            name="fullName"
            placeholder='Enter name'
            value={formData.fullName}
            onChange={handleInputChange}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='matricNumber'>
          <Form.Label>Matric Number:</Form.Label>
          <Form.Control
            type='text'
            name="matricNumber"
            placeholder='Enter Matric Number'
            value={formData.matricNumber}
            onChange={handleInputChange}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='message'>
          <Form.Label>Message:</Form.Label>
          <Form.Control
            as='textarea'
            name='message'
            value={formData.message}
            onChange={handleInputChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='department'>
          <Form.Label>Department:</Form.Label>
          <Form.Control
            type='text'
            name='department'
            value={formData.department}
            onChange={handleInputChange}
            className='form-control'
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='photo'>
          <Form.Label>Photo:</Form.Label>
          <Form.Control
            type='file'
            name='photo'
            onChange={handleFileChange}
            className='form-control'
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ContactScreen;