import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Contact List App</h1>
          <p className="text-center mb-4">
            Welcome to the MERN Portfolio Website. This full-stack project
            integrates a MongoDB database with a React frontend and Express.js
            backend. It features a dynamic contact form with full CRUD
            functionality and an image upload feature. Developed using the
            latest web technologies, this project provides a comprehensive
            example of a modern web application.
          </p>
          <div className="d-flex">
            <LinkContainer to='/contactform'>
            <Button variant="primary" className="me-3">
              Add Contact
            </Button>
            </LinkContainer>
            <LinkContainer to="/contacts">
            <Button variant="secondary">
              View Contacts
            </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
