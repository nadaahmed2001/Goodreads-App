import React, {useState} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [first_name, setFirst_name] = useState();
  const [last_name, setLast_name] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState(); // New state for Confirm Password
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();

    // Validate if password and confirmPassword match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return; // Stop submit
    }

    axios
      .post('http://localhost:5000/register', {first_name,last_name, email, password,role:"user",create_at:{ currentTime: new Date().toLocaleString() }})
      .then((result) => {
        console.log(result);
        if (result.data === 'Email Already Exist') {
          setErrorMessage(
            'Email already exists! Please use a different email.'
          );
        } else {
          alert("Account Created Successfully")
          navigate('/login');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Sign Up</h2>
          <Form onSubmit={handelSubmit}>
            <Form.Group className="mb-3" controlId="formBasicname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                required
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                required
                onChange={(e) => setLast_name(e.target.value)}
              />
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>

          {/* Display error message if passwords do not match */}
          {errorMessage && (
            <p className="mt-3 text-center text-danger">{errorMessage}</p>
          )}

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login"> Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
