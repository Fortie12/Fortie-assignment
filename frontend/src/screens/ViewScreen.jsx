import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const ViewScreen = () => {
  const initialFormState = {
    fullName: "",
    matricNumber: "",
    email: "",
    message: "",
    department: "",
    photo: null, // Add this for photo upload
  };

  const [formData, setFormData] = useState(initialFormState);
  const [contacts, setContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "https://mern-project-backend-xtdt.onrender.com/api/contacts"
      );
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
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
        const response = await axios.post(
          "https://mern-project-backend-xtdt.onrender.com/api/contacts",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setContacts([...contacts, response.data]);
      } else {
        const response = await axios.put(
          `https://mern-project-backend-xtdt.onrender.com/api/contacts/${contacts[editIndex]._id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const updatedContacts = [...contacts];
        updatedContacts[editIndex] = response.data;
        setContacts(updatedContacts);
        setEditIndex(-1);
      }
      setFormData(initialFormState);
      alert("Contact submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(
        `https://mern-project-backend-xtdt.onrender.com/api/contacts/${contactId}`
      );
      const updatedContacts = contacts.filter(
        (contact) => contact._id !== contactId
      );
      setContacts(updatedContacts);
      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Error deleting contact. Please try again.");
    }
  };

  const handleEdit = (index) => {
    const contactToEdit = contacts[index];
    setFormData({ ...contactToEdit });
    setEditIndex(index);
  };

  return (
    <Container>
      <h2 className="text-center my-4">Contacts List</h2>
      <Row>
        {contacts.map((contact, index) => (
          <Col key={contact._id} md={4} className="mb-4">
            <Card>
              {contact.photo && (
                <Card.Img
                  variant="top"
                  src={contact.photo}
                  alt={contact.fullName}
                />
              )}
              <Card.Body>
                <Card.Title>{contact.fullName}</Card.Title>
                <Card.Text>
                  <strong>Matric Number:</strong> {contact.matricNumber}
                  <br />
                  <strong>Email:</strong> {contact.email}
                  <br />
                  <strong>Department:</strong> {contact.department}
                  <br />
                  <strong>Message:</strong> {contact.message}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleEdit(index)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(contact._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default ViewScreen;
