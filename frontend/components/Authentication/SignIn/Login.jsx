import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
export default function Register() {

    const [email , setEmail] = useState()
    const [password , setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState('');  // New state for error message
    const navigate = useNavigate();

const handelSubmit = (e) => {
   e.preventDefault();

  axios.post('http://localhost:5000/login', { email, password })
  .then(result => {
    if (result.data.message === "success") {
      // Store the token
      localStorage.setItem('token', result.data.token);
      alert("Logged in successfully");
      navigate('/');
    } else {
      setErrorMessage(result.data.message); // Show the error message from the backend
    }
  })
  .catch(error => console.log(error));


}
    
  return (
    <Container className="mt-5">
    <Row className="justify-content-md-center">
      <Col md={6}>
        <h2 className="text-center">Login</h2>
        <Form onSubmit={handelSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Enter email"
            required 
            onChange={(e) => setEmail(e.target.value)
            }/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" required 
            onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>


          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
  {/* Display error message if email already exists */}
  {errorMessage && <p className="mt-3 text-center text-danger">{errorMessage}</p>}

        <p className="mt-3 text-center">
          No Account? <Link to="/register"> SignUp</Link>
        </p>
      </Col>
    </Row>
  </Container>
  )
}
