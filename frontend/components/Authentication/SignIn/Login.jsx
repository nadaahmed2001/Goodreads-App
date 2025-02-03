import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Fixed import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // New state for remember me checkbox
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/login', { email, password })
      .then(result => {
        if (result.data.message === "success") {
          // Store the token based on Remember Me selection
          if (rememberMe) {
            localStorage.setItem('token', result.data.token); // Persistent login
          } else {
            sessionStorage.setItem('token', result.data.token); // Temporary login
          }
          alert("Logged in successfully");
          navigate('/');
        } else {
          setErrorMessage(result.data.message);
        }
      })
      .catch(error => console.log(error));
  };
  // console.log(rememberMe)
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email"
                required 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter password" 
                required 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </Form.Group>

            <Form.Check
              inline
              label="Remember me"
              name="group1"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          {errorMessage && <p className="mt-3 text-center text-danger">{errorMessage}</p>}

          <p className="mt-3 text-center">
            No Account? <Link to="/register"> SignUp</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
